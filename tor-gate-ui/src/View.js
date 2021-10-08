import React from 'react';
import io from 'socket.io-client';
import './index.css'
import {UserHeader} from "./components/UserHeader";
import {RoomHeader} from "./components/RoomHeader";
import {WelcomeScreen} from "./components/WelcomeScreen";
import {ChatList} from "./components/ChatList";
import {CreateMessageForm} from "./components/CreateMessageForm";
import {MessageList} from "./components/MessageList";
import {commands} from "./protocol";
import {AddContactForm} from "./components/AddContactForm";

class View extends React.Component {
    state = {
        myOnion: "",
        messages: {}
    }

    actions = {
        // --------------------------------------
        // User
        // --------------------------------------

        setUser: user => this.setState({user}),

        // --------------------------------------
        // Room
        // --------------------------------------

        setContact: contact => {
            this.setState({current: contact})
            this.actions.scrollToEnd()
        },

        joinRoom: room => {
            this.actions.setRoom(room)
            this.actions.subscribeToRoom(room)
            this.state.messages[room.id] &&
            this.actions.setCursor(
                room.id,
                Object.keys(this.state.messages[room.id]).pop()
            )
        },

        subscribeToRoom: room =>
            !this.state.myOnion.roomSubscriptions[room.id] &&
            this.state.myOnion.subscribeToRoom({
                roomId: room.id,
                hooks: {onMessage: this.actions.addMessage},
            }),

        createRoom: options =>
            this.state.myOnion.createRoom(options).then(this.actions.joinRoom),

        createConvo: options => {
            if (options.user.id !== this.state.myOnion.id) {
                const exists = this.state.myOnion.rooms.find(
                    x =>
                        x.name === options.user.id + this.state.myOnion.id ||
                        x.name === this.state.myOnion.id + options.user.id
                )
                exists
                    ? this.actions.joinRoom(exists)
                    : this.actions.createRoom({
                        name: this.state.myOnion.id + options.user.id,
                        addUserIds: [options.user.id],
                        private: true,
                    })
            }
        },

        addUserToRoom: ({userId, roomId = this.state.room.id}) =>
            this.state.myOnion
                .addUserToRoom({userId, roomId})
                .then(this.actions.setRoom),

        removeUserFromRoom: ({userId, roomId = this.state.room.id}) =>
            userId === this.state.myOnion.id
                ? this.state.myOnion.leaveRoom({roomId})
                : this.state.myOnion
                    .removeUserFromRoom({userId, roomId})
                    .then(this.actions.setRoom),

        // --------------------------------------
        // Cursors
        // --------------------------------------

        setCursor: (roomId, position) =>
            this.state.myOnion
                .setReadCursor({roomId, position: parseInt(position)})
                .then(x => this.forceUpdate()),

        // --------------------------------------
        // Messages
        // --------------------------------------

        addMessage: payload => {
            const roomId = payload.room.id
            const messageId = payload.id
            // Update local message cache with new message
            this.setState(prevState => ({
                messages: {
                    ...prevState.messages,
                    [roomId]: {
                        ...prevState.messages[roomId],
                        [messageId]: payload
                    }
                }
            }))
            // Update cursor if the message was read
            if (roomId === this.state.room.id) {
                const cursor = this.state.myOnion.readCursor({roomId}) || {}
                const cursorPosition = cursor.position || 0
                cursorPosition < messageId && this.actions.setCursor(roomId, messageId)
                this.actions.scrollToEnd()
            }
            // Send notification
            this.actions.showNotification(payload)
        },

        runCommand: command => {
            const commands = {
                invite: ([userId]) => this.actions.addUserToRoom({userId}),
                remove: ([userId]) => this.actions.removeUserFromRoom({userId}),
                leave: ([userId]) =>
                    this.actions.removeUserFromRoom({userId: this.state.myOnion.id}),
            }
            const name = command.split(' ')[0]
            const args = command.split(' ').slice(1)
            const exec = commands[name]
            exec && exec(args).catch(console.log)
        },

        scrollToEnd: e =>
            setTimeout(() => {
                const elem = document.querySelector('#messages')
                elem && (elem.scrollTop = 100000)
            }, 0),

        // --------------------------------------
        // Notifications
        // --------------------------------------

        showNotification: message => {
            if (
                'Notification' in window &&
                this.state.myOnion.id &&
                this.state.myOnion.id !== message.senderId &&
                document.visibilityState === 'hidden'
            ) {
                const notification = new Notification(
                    `New Message from ${message.sender.id}`,
                    {
                        body: message.text,
                        icon: message.sender.avatarURL,
                    }
                )
                notification.addEventListener('click', e => {
                    this.actions.joinRoom(message.room)
                    window.focus()
                })
            }
        },

        addUser: (socket, onion) => {
            socket.emit(commands.ADD_USER, onion);
        },

        getUsers: socket => {
            socket.emit(commands.GET_USERS, {});
        },

        getUserMessages: (socket, onion) => {
            onion && socket.emit(commands.GET_USER_MESSAGES, {onion: onion});
        },

        sendMessage: (socket, onion, message) => {
            socket.emit(commands.SEND_USER_MESSAGE, {
                onion: onion,
                message: message
            });
        }
    }


    componentDidMount() {
        const socket = io(`http://127.0.0.1:5000`); // FIXME
        this.setState({socket: socket});
        socket.on(commands.ADD_USER, (m) => {
            console.log("add user");
        });
        socket.on(commands.GET_USERS, (m) => {
            const msg = m;
            this.setState({
                myOnion: msg.onion,
                contacts: msg.contacts
            });
        });
        socket.on(commands.GET_USER_MESSAGES, (m) => {
            const msg = m;
            const onion = msg.onion;
            const messages = msg.messages.messages;
            this.setState(prevState => ({
                messages: {
                    ...prevState.messages,
                    [onion]: messages
                }
            }))

        });
        socket.on(commands.NEW_USER_MESSAGE, (m) => {
            console.log("new message");
        });
        socket.on(commands.SEND_USER_MESSAGE, (m) => {
            console.log("send message");
        });

        this.timer = setInterval(() => {
            this.actions.getUsers(socket);
            this.state.current &&
                this.actions.getUserMessages(socket, this.state.current.onion);
            }, 1000);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    render() {
        const {
            myOnion,
            current,
            contacts,
            messages,
            socket
        } = this.state
        const {addUser} = this.actions

        return (
            <main>
                <aside data-open={true}>
                    <UserHeader onion={myOnion} onClick={() => this.setState({addContactModalShow:true})}/>
                    <ChatList
                        user={myOnion}
                        contacts={contacts}
                        messages={current && messages[current.onion]}
                        current={current || {}}
                        actions={this.actions}
                    />
                    <AddContactForm submit={(onion) => {
                        addUser(socket, onion);
                    }}/>

                </aside>
                <section>
                    <RoomHeader state={this.state} actions={this.actions}/>
                    {
                        current ? (
                                <row->
                                    <col->
                                        <MessageList
                                            contact={current}
                                            messages={current && messages[current.onion]}
                                        />
                                        <CreateMessageForm state={this.state} actions={this.actions}/>
                                    </col->
                                </row->) :
                            <WelcomeScreen/>
                    }
                </section>
            </main>
        )
    }
}

export default View;