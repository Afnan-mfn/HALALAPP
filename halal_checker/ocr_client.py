from aip import AipOcr

APP_ID = '115846550'
API_KEY = 'n5dn8YcaeBWDu8dlq6zMJkg4'
SECRET_KEY = '9le9sPIKTqrTpSmNgao0H0m5SaKaAhe9'
client = AipOcr(APP_ID, API_KEY, SECRET_KEY)


# OCR
def ocr_image(image_path):
    with open(image_path, 'rb') as f:
        image_data = f.read()
    result = client.basicAccurate(image_data)
    return result
