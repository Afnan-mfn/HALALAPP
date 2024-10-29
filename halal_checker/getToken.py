# -*- coding: utf-8 -*-

# This code shows an example of text translation from English to Simplified-Chinese.
# This code runs on Python 2.7.x and Python 3.x.
# You may install `requests` to run this code: pip install requests
# Please refer to `https://api.fanyi.baidu.com/doc/21` for complete api document
import requests
import json


# 获取token
def getToken():
    api_key = '6vCrkWFwaaTRvziUUlde5hY6'
    secret_key = 'Qi0JpIxc21pZ3NQXRQLK8jvUKcWQjVwI'

    token_url = 'https://aip.baidubce.com/oauth/2.0/token'
    url = f"{token_url}?grant_type=client_credentials&client_id={api_key}&client_secret={secret_key}"

    payload = ""
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    # 将字符串解析为 JSON
    data = json.loads(response.text).get("access_token")
    return data
