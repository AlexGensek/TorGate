import sqlite3
from datetime import datetime

DBFILE="database.db"

def set_dbfile(dbfile):
    DBFILE=dbfile

def drop_tables():
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
    c.execute('DROP TABLE IF EXISTS USERS')
    c.execute('DROP TABLE IF EXISTS MESSAGES')
    conn.commit()
    conn.close()

def create_tables():
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS USERS
                (onion VARCHAR PRIMARY KEY, username VARCHAR)''')

    c.execute('''CREATE TABLE IF NOT EXISTS MESSAGES
                (id SERIAL PRIMARY KEY, 
                time TIMESTAMP,
                message TEXT,
                chat VARCHAR references USERS(onion),
                direction BOOL)''')

    conn.commit()
    
def add_user(onion, username):
    print(DBFILE, onion, username)
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
    user = (onion, username)
    print(user)
    c.execute('INSERT INTO USERS VALUES(?, ?)', user)
    conn.commit()
    conn.close()

def get_users():
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
    c.execute('SELECT * FROM USERS')

    rows = c.fetchall()
    for row in rows:
        print(row)

    print("get_users " + str(rows))
    conn.close()

    return rows

def get_user_messages(onion):
    conn = sqlite3.connect(DBFILE)
    c = conn.cursor()
    c.execute('SELECT * FROM MESSAGES WHERE chat=?', (onion, ))

    rows = c.fetchall()
    for row in rows:
        print(row)

    conn.close()
    return rows

def add_user_message(onion, message, direction):
    conn = sqlite3.connect(DBFILE)

    timestamp = datetime.now()
    msg = (timestamp, message, onion, direction)
    print(msg)

    c = conn.cursor()
    c.execute('INSERT INTO MESSAGES(time, message, chat, direction) VALUES(?, ?, ?, ?)', msg)
    conn.commit()
    conn.close()


def fill_messages(onion, messages):
    conn = sqlite3.connect(DBFILE)
    for msg, direction in messages:
        add_user_message(onion, msg, direction)
    conn.close()

def main(argv):
    print(argv)

    drop_tables()
    create_tables()
    add_user("flibustahezeous3.onion", "Flibusta John")
    add_user("zqktlwi4fecvo6ri.onion", "The Hidden Wiki")
    add_user("3g2upl4pq6kufc4m.onion", "Duck DuckGo")

    fill_messages("flibustahezeous3.onion", [
        ("Hello there!", 1),
        ("A have a lot books)", 0),
        ("Give me some!", 1),
        ("Yeah, just take it!", 0),
        ("Siriusly?", 1),
    ])

    fill_messages("zqktlwi4fecvo6ri.onion", [
        ("Hello Wiki!", 1),
        ("See my new articles", 0),
        ("Show me some interesting", 1),
        ("Of corse, read about hysteresis", 0),
        ("Ebat kolotit", 1),
    ])

    fill_messages("3g2upl4pq6kufc4m.onion", [
        ("dezentralization chat without sms", 1),
        ("What?", 0),
        ("Just show me all about it", 1),
        ("Just write code", 0),
        ("I want to copy", 1),
    ])

    get_users()

    onions = [
        "flibustahezeous3.onion",
        "zqktlwi4fecvo6ri.onion",
        "3g2upl4pq6kufc4m.onion",
    ]

    for chat in onions:
        print(f"Messages from {chat}")
        get_user_messages(chat)

    users = [
            {"username":username, "onion":onion} 
                for (onion, username) in get_users()
        ]

    print(users)

if __name__ == "__main__":
    main(__name__)