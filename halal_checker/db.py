import mysql.connector


def get_ingredient_connection():
    return mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='123456',
        database='haha',
    )
