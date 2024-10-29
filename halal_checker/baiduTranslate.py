# -*- coding: utf-8 -*-

# This code shows an example of text translation from English to Simplified-Chinese.
# This code runs on Python 2.7.x and Python 3.x.
# You may install `requests` to run this code: pip install requests
# Please refer to `https://api.fanyi.baidu.com/doc/21` for complete api document
import requests
import json

from halal_checker import getToken


# 调用百度翻译接口
# 中译英
def zh_to_en(words):
    # 获取token
    token = getToken.getToken()
    url = 'https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=' + token

    # For list of language codes, please refer to `https://ai.baidu.com/ai-doc/MT/4kqryjku9#语种列表`
    zh = 'zh'  # 中文
    en = 'en'  # 英文
    term_ids = ''  # 术语库id，多个逗号隔开

    # Build request
    headers = {'Content-Type': 'application/json'}
    payload = {'q': words, 'from': zh, 'to': en, 'termIds': term_ids}

    # Send request
    r = requests.post(url, params=payload, headers=headers)
    result = r.json()

    data = json.loads(json.dumps(result, indent=4, ensure_ascii=False))
    # 获取 dst 的值
    dst_value = data["result"]["trans_result"][0]["dst"]

    return dst_value


#  英译中
def en_to_zh(words):
    # 获取token
    token = getToken.getToken()
    url = 'https://aip.baidubce.com/rpc/2.0/mt/texttrans/v1?access_token=' + token

    # For list of language codes, please refer to `https://ai.baidu.com/ai-doc/MT/4kqryjku9#语种列表`
    zh = 'zh'  # 中文
    en = 'en'  # 英文
    term_ids = ''  # 术语库id，多个逗号隔开

    # Build request
    headers = {'Content-Type': 'application/json'}
    payload = {'q': words, 'from': en, 'to': zh, 'termIds': term_ids}

    # Send request
    r = requests.post(url, params=payload, headers=headers)
    result = r.json()

    data = json.loads(json.dumps(result, indent=4, ensure_ascii=False))
    # 获取 dst 的值
    dst_value = data["result"]["trans_result"][0]["dst"]
    return dst_value
