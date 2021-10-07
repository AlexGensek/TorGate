from flask import Flask, render_template, session, copy_current_request_context
from flask_socketio import SocketIO, emit, disconnect
from threading import Lock

import db


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socket_ = SocketIO(app, async_mode=async_mode, cors_allowed_origins="*")
thread = None
thread_lock = Lock()


DB_NAME = "database.db"
MY_ONION = "facebookcorewwwi.onion"

@app.route('/')
def index():
    return render_template('index.html', async_mode=socket_.async_mode)


@socket_.on('ADD_USER')
def add_user(message):
    try:
        db.add_user(message['onion'], message['username'])
    except:
        emit('ADD_USER', {'status': 'db.add_user ERROR'})
    else:
        emit('ADD_USER', {'status': 'success'})


@socket_.on('GET_USERS')
def get_users(message):
    users = []
    try:
        u = db.get_users()
        print(u)
        users = [{"username":username, "onion":onion} for (onion, username) in u]
    except Exception:
        # emit('GET_USERS', {'status': 'db.get_users ERROR'})
        emit('GET_USERS', {'status': Exception})
    else:
        emit('GET_USERS', {'onion': MY_ONION, 'contacts':users})


@socket_.on('GET_USER_MESSAGES')
def get_user_messages(message):
    print("GET_USER_MESSAGES " + str(message))
    messages = []
    try:
        messages = [
            {"timestamp":timestamp, "message":msg, "direction":d} 
                for (uid, timestamp, msg, username, d) in db.get_user_messages(message['onion'])
        ]
    except:
        emit('GET_USER_MESSAGES', {'status': 'db.get_user_messages ERROR'})
    else:
        
        emit('GET_USER_MESSAGES', {'onion': message['onion'], 'messages':messages})

# @socket_.on('NEW_USER_MESSAGE')
# def test_broadcast_message(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']},
#          broadcast=True)

@socket_.on('SEND_USER_MESSAGE')
def send_user_message(message):
    try:
        db.add_user_message(message['onion'], message['message'], 1)
    except:
        emit('SEND_USER_MESSAGE', {'status': 'db.send_user_message ERROR'})
    else:
        emit('SEND_USER_MESSAGE', {'status': 'success'})






@socket_.on('my_event', namespace='/test')
def test_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']})


@socket_.on('my_broadcast_event', namespace='/test')
def test_broadcast_message(message):
    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': message['data'], 'count': session['receive_count']},
         broadcast=True)


@socket_.on('disconnect_request', namespace='/test')
def disconnect_request():
    @copy_current_request_context
    def can_disconnect():
        disconnect()

    session['receive_count'] = session.get('receive_count', 0) + 1
    emit('my_response',
         {'data': 'Disconnected!', 'count': session['receive_count']},
         callback=can_disconnect)

def test_db():
    db.drop_tables()
    db.create_tables()
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
    test_db()

    socket_.run(app, debug=True)