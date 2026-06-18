import pymysql

def create_database():
    try:
        connection = pymysql.connect(
            host='127.0.0.1',
            user='root',
            password='',
            port=3306
        )
        cursor = connection.cursor()
        cursor.execute("CREATE DATABASE IF NOT EXISTS tvk_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
        print("Database 'tvk_db' created or verified successfully!")
        connection.close()
    except Exception as e:
        print(f"Error connecting to MySQL: {e}")
        print("Please ensure your local MySQL server (XAMPP) is running on port 3306.")

if __name__ == '__main__':
    create_database()
