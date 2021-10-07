import React from 'react'
import style from './index.module.css'

export const ChatList = ({
                             user,
                             contacts = [],
                             messages,
                             current,
                             actions
                         }) => (
    <ul className={style.component}>
        {contacts.map(contact => {
            const messageKeys = Object.keys(messages[contact.onion] || {});
            const latestMessage =
                messageKeys.length > 0 && messages[contact.onion][messageKeys.pop()]

            return (
                <li
                    key={contact.onion}
                    disabled={contact.onion === current.onion}
                    onClick={e => actions.setContact(contact)}
                    // style={{ order }} FIXME
                >
                    <col->
                        <p>{contact.username}</p>
                        <span>{latestMessage && latestMessage.text}</span>
                    </col->
                </li>
            )
        })}
    </ul>
)
