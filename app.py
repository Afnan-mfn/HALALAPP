# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify

from halal_checker import baiduTranslate
from halal_checker.ocr_client import ocr_image
from halal_checker.baiduTranslate import zh_to_en
from halal_checker.predict_halal_status import predict_halal_status, load_resources
from mapper.addIngredientMapper import get_ingredients_mapper, get_ingredient_status_mapper, get_halal_status_mapper
import os
import mysql.connector

from werkzeug.utils import secure_filename

app = Flask(__name__)

# 配置上传文件的保存目录和允许上传的文件类型
UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# 创建上传目录（如果不存在）
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# 检查文件扩展名是否合法
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def format_response(code, message, data):
    """统一格式化响应"""
    return jsonify({"code": code, "message": message, "data": data})


# 功能1：OCR识别配料表
@app.route("/api/upload", methods=["POST"])
def add_ingredient():
    try:
        if "image" not in request.files:
            return format_response(400, "请求中缺少图片部分", {})

        file = request.files["image"]
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)

            file.save(filepath)
            result = ocr_image(filepath)
            merged_text = ''.join([item["words"] for item in result["words_result"]])
            merged_text = merged_text.replace("配料：", "").strip().rstrip("。")
            return format_response(200, "成功", {"result": merged_text})

        return format_response(400, "文件类型无效", {})

    except Exception as e:
        return format_response(500, "系统出错", {"error": str(e)})


# 功能2：模型识别入库
@app.route("/api/isHalal", methods=["POST"])
def add_ingredients():
    try:
        data = request.get_json()
        merged_text = data.get("ingredients", "")

        if not merged_text:
            return format_response(400, "未提供配料信息", {})

        processed_ingredients = process_ingredients(merged_text)
        english_ingredient = [zh_to_en(processed_ingredients)]
        halal_status = predict_halal_status(english_ingredient, tokenizer, model)

        return format_response(200, "成功", {"result": halal_status})

    except Exception as e:
        return format_response(500, "系统出错", {"error": str(e)})


# 功能2：展示配料表内容
@app.route("/api/ingredients", methods=["GET"])
def get_ingredients():
    try:
        ingredients = get_ingredients_mapper()
        ingredients_with_keys = [
            {
                "ingredient_id": row[0],
                "ingredient_name": row[1],
                "halal_status": row[2],
            }
            for row in ingredients
        ]

        return format_response(200, "成功", ingredients_with_keys)

    except Exception as e:
        return format_response(500, "系统出错", {"error": str(e)})


# 功能2：查看某个配料的清真状态
@app.route("/api/ingredients/<int:ingredient_id>", methods=["GET"])
def get_ingredient_status(ingredient_id):
    try:
        ingredient = get_ingredient_status_mapper(ingredient_id)

        if ingredient:
            ingredient_info = {
                "ingredient_name": ingredient[0],
                "halal_status": ingredient[1]
            }
            return format_response(200, "成功", ingredient_info)

        return format_response(404, "未找到该配料", {})

    except Exception as e:
        return format_response(500, "系统出错", {"error": str(e)})


# 查询接口：根据ingredient返回halal_status和halal_status_explanation
@app.route('/api/getHalalStatus', methods=['GET'])
def get_halal_status():
    ingredient = request.args.get("ingredient")
    if not ingredient:
        return format_response(400, "缺少配料参数", {})

    try:
        # 从mapper中查询数据
        result_en = get_halal_status_mapper(ingredient)

        # 如果查询结果为空，返回404
        if not result_en:
            return format_response(404, "未找到该配料", {})

        # 翻译并构建返回的结果
        halal_status = translate_result(result_en["halal_status"])
        halal_status_explanation = baiduTranslate.en_to_zh(
            str(result_en.get("halal_status_explanation", "none"))
        )
        mushbooh_explanation = baiduTranslate.en_to_zh(
            str(result_en.get("mushbooh_explanation", "none"))
        )

        result_zh = {
            "halal_status": halal_status,
            "mushbooh_explanation": mushbooh_explanation,
            "halal_status_explanation": halal_status_explanation,
        }

        return format_response(200, "成功", result_zh)

    except mysql.connector.Error as err:
        return format_response(500, f"数据库错误: {err}", {})


# 处理配料表函数
def process_ingredients(ingredients_text):
    # 去掉 "配料：" 前缀并去除多余空格
    ingredients_text = ingredients_text.replace("配料：", "").strip().rstrip("。")

    return ingredients_text


def translate_result(result_en):
    # 定义英文到中文的映射字典
    translations = {
        "Halal": "清真",
        "halal": "清真",
        "Halal if follow Islamic slaughtering guidelines": "若符合伊斯兰屠宰规范则为清真",
        "mushbooh": "有嫌疑",
        "Mushbooh": "有嫌疑",
        "Haram": "非清真"
    }

    # 返回对应的中文翻译，如果没有匹配则返回"未知"
    return translations.get(result_en, "未知")


if __name__ == "__main__":
    tokenizer, model = load_resources()
    # 更改局域网，需更改host
    app.run(host="-", port=5000, debug=True)
