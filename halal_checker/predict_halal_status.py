import pandas as pd
import pickle
from keras.models import Sequential
from keras.layers import InputLayer, Embedding, LSTM, Dropout, Dense
from keras.optimizers import Adam
from keras.preprocessing.sequence import pad_sequences
from halal_checker.baiduTranslate import en_to_zh
from halal_checker.db import get_ingredient_connection

from mapper.addIngredientMapper import predict_halal_status_mapper
import numpy as np


# 定义模型结构
def create_model():
    model = Sequential(name="sequential")

    model.add(InputLayer(input_shape=(775,), name="input_layer"))

    model.add(Embedding(input_dim=67553, output_dim=50, name="embedding"))

    model.add(LSTM(units=100, return_sequences=True, name="lstm"))

    model.add(Dropout(rate=0.2, name="dropout"))

    model.add(LSTM(units=50, return_sequences=False, name="lstm_1"))

    model.add(Dropout(rate=0.2, name="dropout_1"))

    model.add(Dense(units=32, activation='relu', name="dense"))

    model.add(Dense(units=2, activation='softmax', name="dense_1"))

    optimizer = Adam(learning_rate=9.999999747378752e-05)

    model.compile(optimizer=optimizer, loss='sparse_categorical_crossentropy', metrics=['accuracy'])

    return model


# 在程序启动时加载模型和 Tokenizer
def load_resources():
    # 加载已训练好的 Tokenizer
    with open('others/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)

    # 创建模型
    model = create_model()

    # 加载权重
    model.load_weights("best_model.keras/model.weights.h5")

    return tokenizer, model


# AI模型输出清真状态
def predict_halal_status(ingredient, tokenizer, model):
    # 处理新输入的数据
    x_new_sequences = tokenizer.texts_to_sequences(ingredient)
    x_new_padded = pad_sequences(x_new_sequences)  # MAX_LENGTH 应为训练时使用的最大长度

    # 使用模型进行预测
    predictions = model.predict(x_new_padded)
    predicted_labels = np.argmax(predictions, axis=1)

    # 映射预测结果
    label_mapping = {0: 'halal', 1: 'haram'}
    predicted_categories = [label_mapping[label] for label in predicted_labels]
    # 数据库配置
    connection = get_ingredient_connection()
    halal_status = "清真"

    try:
        # 用于存储结果的列表
        results = []
        for text, category in zip(ingredient, predicted_categories):
            # 翻译成中文
            # 配料表
            ingredient_name = en_to_zh(text)
            # 判断清真状态
            if category == "haram":
                halal_status = "非清真"
            # 将结果存入列表
            results.append({
                "ingredient_name": ingredient_name,
                "halal_status": halal_status
            })
            # 录入数据
            predict_halal_status_mapper(ingredient_name, halal_status)
        return results
    except Exception as e:
        return e
    finally:
        # 关闭数据库连接
        connection.close()
