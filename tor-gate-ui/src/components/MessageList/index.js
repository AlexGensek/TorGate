import React from 'react'
import style from './index.module.css'
import {Message} from '../Message'

const emptyList = (
    <div className={style.empty}>
    <span role="img" aria-label="post">
      📝
    </span>
        <h2>No Messages Yet</h2>
        <p>Be the first to post in this room or invite someone to join the room</p>
    </div>
)

export const MessageList = ({messages, contact}) => {
    return (
        <ul id="messages" className={style.component}>
            {messages ? (
                <wrapper->
                    {
                        messages && messages.map(m => <Message message={m} contact={contact}/>)
                    }
                </wrapper->
            ) : (
                emptyList
            )}
        </ul>
    )
}
