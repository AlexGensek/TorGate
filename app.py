from flask import Flask, render_template, session, copy_current_request_context
from flask_socketio import SocketIO, emit, disconnect
from threading import Lock

import db


async_mode = None
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socket_ = SocketIO(app, async_mode=async_mode)
thread = None
thread_lock = Lock()


DB_NAME = "database.db"
MY_ONION = ""
db_conn = None

@app.route('/')
def index():
    return render_template('index.html', async_mode=socket_.async_mode)


@socket_.on('ADD_USER')
def add_user(message):
    try:
        db.add_user(db_conn, message['onion'], message['username'])
    except:
        emit('add_user_response', {'status': 'db.add_user ERROR'})
    else:
        emit('add_user_response', {'status': 'success'})


@socket_.on('GET_USERS')
def get_users(message):
    users = []
    try:
        users = [
            {"username":username, "onion":onion} 
                for (onion, username) in db.get_users(db_conn)
        ]
    except:
        emit('get_users_response', {'status': 'db.add_user ERROR'})
    else:
        my_onion = ""
        emit('get_users_response', {'onion': my_onion, 'contacts':users})


@socket_.on('GET_USER_MESSAGES')
def get_user_messages(message):
    messages = []
    try:
        messages = [
            {"timestamp":timestamp, "message":msg, "direction":d} 
                for (uid, timestamp, msg, username, d) in db.get_user_messages(db_conn, message['onion'])
        ]
    except:
        emit('get_users_response', {'status': 'db.get_user_messages ERROR'})
    else:
        
        emit('get_users_response', {'onion': message['onion'], 'messages':messages})

# @socket_.on('NEW_USER_MESSAGE')
# def test_broadcast_message(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']},
#          broadcast=True)

@socket_.on('SEND_USER_MESSAGE')
def send_user_message(message):
    try:
        db.add_user_message(db_conn, message['onion'], message['message'], 1)
    except:
        emit('send_user_message', {'status': 'db.send_user_message ERROR'})
    else:
        emit('add_user_response', {'status': 'success'})






# @socket_.on('my_event', namespace='/test')
# def test_message(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']})


# @socket_.on('my_broadcast_event', namespace='/test')
# def test_broadcast_message(message):
#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': message['data'], 'count': session['receive_count']},
#          broadcast=True)


# @socket_.on('disconnect_request', namespace='/test')
# def disconnect_request():
#     @copy_current_request_context
#     def can_disconnect():
#         disconnect()

#     session['receive_count'] = session.get('receive_count', 0) + 1
#     emit('my_response',
#          {'data': 'Disconnected!', 'count': session['receive_count']},
#          callback=can_disconnect)


if __name__ == '__main__':
    db_conn = db.get_connection(DB_NAME)
    db.create_tables(db_conn)
    db.add_user(db_conn, MY_ONION, "Me")

    socket_.run(app, debug=True)