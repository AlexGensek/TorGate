import React from 'react'
import style from './index.module.css'

export const AddContactForm = ({submit}) => (
    <form
        className={style.component}
        onSubmit={e => {
            e.preventDefault()
            submit({
                username: e.target[0].value,
                onion: e.target[1].value
            })
            e.target[0].value = ''
            e.target[1].value = ''
        }}
    >
        <input placeholder="Username" type="text" required/>
        <input placeholder="Onion link" type="text" required/>
        <button type="submit">
            <svg>
                <use xlinkHref="index.svg#add"/>
            </svg>
        </button>
    </form>
)
