import sqlite3
from datetime import datetime

def get_connection(dbfile):
    return sqlite3.connect(dbfile)

def drop_tables(conn):
    c = conn.cursor()
    c.execute('DROP TABLE USERS')
    c.execute('DROP TABLE MESSAGES')
    conn.commit()

def create_tables(conn):
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
    
def add_user(conn, onion, username):
    c = conn.cursor()
    user = (onion, username)
    c.execute('INSERT INTO USERS VALUES(?, ?)', user)
    conn.commit()

def get_users(conn):
    c = conn.cursor()
    c.execute('''SELECT * FROM USERS;''')

    rows = c.fetchall()
    for row in rows:
        print(row)

    return rows

def get_user_messages(conn, onion):
    c = conn.cursor()
    c.execute('SELECT * FROM MESSAGES WHERE chat=?', (onion, ))

    rows = c.fetchall()
    for row in rows:
        print(row)

    return rows

def add_user_message(conn, onion, message, direction):
    timestamp = datetime.now()
    msg = (timestamp, message, onion, direction)

    c = conn.cursor()
    c.execute('INSERT INTO MESSAGES(time, message, chat, direction) VALUES(?, ?, ?, ?)', msg)
    conn.commit()


def fill_messages(conn, onion, messages):
    for msg, direction in messages:
        add_user_message(conn, onion, msg, direction)

def main(argv):
    print(argv)

    conn = get_connection("database.db")
    drop_tables(conn)
    create_tables(conn)
    add_user(conn, "flibustahezeous3.onion", "Flibusta John")
    add_user(conn, "zqktlwi4fecvo6ri.onion", "The Hidden Wiki")
    add_user(conn, "3g2upl4pq6kufc4m.onion", "Duck DuckGo")

    fill_messages(conn, "flibustahezeous3.onion", [
        ("Hello there!", 1),
        ("A have a lot books)", 0),
        ("Give me some!", 1),
        ("Yeah, just take it!", 0),
        ("Siriusly?", 1),
    ])

    fill_messages(conn, "zqktlwi4fecvo6ri.onion", [
        ("Hello Wiki!", 1),
        ("See my new articles", 0),
        ("Show me some interesting", 1),
        ("Of corse, read about hysteresis", 0),
        ("Ebat kolotit", 1),
    ])

    fill_messages(conn, "3g2upl4pq6kufc4m.onion", [
        ("dezentralization chat without sms", 1),
        ("What?", 0),
        ("Just show me all about it", 1),
        ("Just write code", 0),
        ("I want to copy", 1),
    ])

    get_users(conn)

    onions = [
        "flibustahezeous3.onion",
        "zqktlwi4fecvo6ri.onion",
        "3g2upl4pq6kufc4m.onion",
    ]

    for chat in onions:
        print(f"Messages from {chat}")
        get_user_messages(conn, chat)

if __name__ == "__main__":
    main(__name__)