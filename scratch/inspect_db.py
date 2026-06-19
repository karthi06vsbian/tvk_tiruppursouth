import sqlite3

def check_db():
    conn = sqlite3.connect("backend/db.sqlite3")
    cursor = conn.cursor()
    
    print("--- News Table ---")
    try:
        cursor.execute("SELECT id, title_en, img FROM api_news;")
        rows = cursor.fetchall()
        for r in rows:
            print(f"ID: {r[0]}, Title: {r[1]}, Img Path: {r[2][:100]}")
    except Exception as e:
        print("Error reading news:", e)
        
    print("\n--- Event Table ---")
    try:
        cursor.execute("SELECT id, caption_en, src FROM api_event;")
        rows = cursor.fetchall()
        for r in rows:
            print(f"ID: {r[0]}, Caption: {r[1]}, Src Path: {r[2][:100]}")
    except Exception as e:
        print("Error reading events:", e)
        
    conn.close()

if __name__ == '__main__':
    check_db()
