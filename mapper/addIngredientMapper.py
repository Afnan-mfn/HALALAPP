from halal_checker.db import get_ingredient_connection
import datetime


def get_ingredients_mapper():
    try:
        with get_ingredient_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT ingredient_id, ingredient_name, halal_status FROM ingredient WHERE delete_status = 0"
                )
                return cursor.fetchall()
    except Exception as e:
        print(f"Error retrieving ingredients: {e}")
        return []


def get_ingredient_status_mapper(ingredient_id):
    try:
        with get_ingredient_connection() as conn:
            with conn.cursor() as cursor:
                cursor.execute(
                    "SELECT ingredient_name, halal_status FROM ingredient WHERE ingredient_id = %s",
                    (ingredient_id,),
                )
                return cursor.fetchone()
    except Exception as e:
        print(f"Error retrieving ingredient status: {e}")


def predict_halal_status_mapper(ingredient_name_cn, halal_status_cn):
    try:
        with get_ingredient_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                    INSERT INTO ingredient (ingredient_name, halal_status, create_time, delete_status)
                    VALUES (%s, %s, %s, %s)
                """
                cursor.execute(sql, (ingredient_name_cn, halal_status_cn, datetime.datetime.now(), 0))
                conn.commit()
    except Exception as e:
        print(f"Error predicting halal status: {e}")


def get_halal_status_mapper(ingredient):
    try:
        with get_ingredient_connection() as conn:
            with conn.cursor(dictionary=True) as cursor:
                query = """
                    SELECT halal_status, halal_status_explanation , mushbooh_explanation
                    FROM ingredient_explanation 
                    WHERE ingredient = %s
                """
                cursor.execute(query, (ingredient,))
                return cursor.fetchone()
    except Exception as e:
        print(f"Error retrieving halal status: {e}")
