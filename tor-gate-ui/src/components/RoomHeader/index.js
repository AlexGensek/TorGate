import React from 'react'
import style from './index.module.css'

export const RoomHeader = ({
  state: {current},
  actions: { setSidebar, setUserList },
}) => (
        <header className={style.component}>
            {current && <h1>{current.username}</h1>}
        </header>
)
