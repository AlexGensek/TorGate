import React from 'react'
import style from './index.module.css'
import Linkify from 'react-linkify'

export class Message extends React.Component {
    render() {
        const contact = this.props.contact;
        const msg = this.props.message;
        return (
            this.props.message && (
                <li key={msg.timestamp} className={style.component}>
                    <div>
                        <span> <b>{(msg.direction === 0) ? contact.username : "Me"}</b> </span>
                        <span>{msg.timestamp}</span>
                        <p>
                            <Linkify properties={{target: '_blank'}}>{msg.message}</Linkify>
                        </p>
                    </div>
                </li>
            )
        )
    }
}
