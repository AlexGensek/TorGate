import time
import json
from datetime import datetime

from flask import Flask, render_template, session, copy_current_request_context
from flask_socketio import SocketIO, emit, disconnect
from threading import Lock

import db
import torgate_io.torgate_io as tio


async_mode = None
app = Flask(__name__, static_folder='./tor-gate-ui/build/', static_url_path='/')
app.config['SECRET_KEY'] = 'secret!'
socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")
thread = None
thread_lock = Lock()


DB_NAME = "database.db"
MY_ONION = ""

@app.route('/')
def index():
    return app.send_static_file('index.html')
    #return render_template('index.html', async_mode=socket_.async_mode)


@socket_.on('ADD_USER')
def add_user(message):
    try:
        db.add_user(message['onion'], message['username'])
    except Exception:
        emit('ADD_USER', {'status': Exception})
    else:
        emit('ADD_USER', {'status': 'success'})


@socket_.on('GET_USERS')
def get_users(message):
    users = []
    try:
        u = db.get_users()
        users = [{"username":username, "onion":onion} for (onion, username) in u]
    except Exception:
        emit('GET_USERS', {'status': Exception})
    else:
        emit('GET_USERS', {'onion': MY_ONION, 'contacts':users})


@socket_.on('GET_USER_MESSAGES')
def get_user_messages(message):
    # print('GET_USER_MESSAGES')
    # print(message)
    messages = []
    try:
        messages = [
            {"timestamp":timestamp, "message":msg, "direction":d} 
                for (uid, timestamp, msg, username, d) in db.get_user_messages(message['onion'])
        ]
        # print(messages)
    except Exception:
        emit('GET_USER_MESSAGES', {'status': Exception})
    else:
        
        emit('GET_USER_MESSAGES', {'onion': message['onion'], 'messages':messages})

def new_user_message(data):
    # print("new_user_message")
    # print("data " + str(data))
    if data == "":
        return

    msg = json.loads(data)
    onion = msg["from"]
    message = msg["message"]
    timestamp = datetime.now()

    db.add_user_message(onion, timestamp, message, 0)
    socket_.emit('NEW_USER_MESSAGE', {'onion':onion, "messages":[
            {
                "timestamp":str(timestamp),
                "message":message,
                "direction":0
            }
        ]
        })

@socket_.on('SEND_USER_MESSAGE')
def send_user_message(message):
    # print('SEND_USER_MESSAGE')
    # print(message)
    try:
        timestamp = datetime.now()
        msg = message['message']

        my_onion = MY_ONION
        m = {
            "from":my_onion,
            "message":msg
        }

        # tio.sendMessage(message['onion'], f'{"from": \"{MY_ONION}\", "message": \"{msg}\"}')
        # print(json.dumps(m))
        db.add_user_message(message['onion'], timestamp, message['message'], 1)
        tio.sendMessage(message['onion'], json.dumps(m))
    except Exception:
        emit('SEND_USER_MESSAGE', {'status': str(Exception)})
    else:
        emit('SEND_USER_MESSAGE', {'status': 'success'})

def test_db():
    db.drop_tables()
    db.create_tables()
    db.add_user(MY_ONION, "Me")
    db.add_user("flibustahezeous3.onion", "Flibusta John")
    db.add_user("zqktlwi4fecvo6ri.onion", "The Hidden Wiki")
    db.add_user("3g2upl4pq6kufc4m.onion", "Duck DuckGo")

    db.fill_messages("flibustahezeous3.onion", [
        ("Hello there!", 1),
        ("A have a lot books)", 0),
        ("Give me some!", 1),
        ("Yeah, just take it!", 0),
        ("Siriusly?", 1),
    ])

    db.fill_messages("zqktlwi4fecvo6ri.onion", [
        ("Hello Wiki!", 1),
        ("See my new articles", 0),
        ("Show me some interesting", 1),
        ("Of corse, read about hysteresis", 0),
        ("Ebat kolotit", 1),
    ])

    db.fill_messages("3g2upl4pq6kufc4m.onion", [
        ("dezentralization chat without sms", 1),
        ("What?", 0),
        ("Just show me all about it", 1),
        ("Just write code", 0),
        ("I want to copy", 1),
    ])


if __name__ == '__main__':
    hh = '/usr/tor/hostname'
    # hh = '/home/alex/work/hakaton/hidden_service/hostname'
    print(hh)

    while MY_ONION == "":
        with open(hh) as f:
            MY_ONION = f.readline().rstrip()

        if MY_ONION == "":
            time.sleep(2)

    print("My onion hostname |" + MY_ONION + "|")
    
    # test_db()
    tio.SockServer('localhost', tio.HIDDEN_SERVICE_PORT, new_user_message).handleIncomingConnections()
    # socket_.run(app, debug=True)
    socket_.run(app, host="0.0.0.0")
