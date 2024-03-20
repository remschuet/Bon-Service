import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()

DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")


class ApiDataManager:
    def __init__(self):
        self.__conn_string = f"host={DB_HOST} dbname={DB_NAME} user={DB_USER} password={DB_PASSWORD}"

    def add_application(self, app_name, api_key):
        with psycopg2.connect(self.__conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.execute("INSERT INTO applications (app_name, api_key) VALUES (%s, %s);", (app_name, api_key))

    def get_application_api_key(self, app_name):
        with psycopg2.connect(self.__conn_string) as conn:
            with conn.cursor() as cursor:
                cursor.execute("SELECT api_key FROM applications WHERE app_name = %s;", (app_name,))
                return cursor.fetchone()[0]

    