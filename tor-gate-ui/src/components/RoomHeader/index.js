import React from 'react'
import style from './index.module.css'
import {Button} from "react-bootstrap";

export const RoomHeader = ({
  state: {current},
  actions: { setSidebar, setUserList },
}) => (
        <header className={style.component}>
            {current && <h1>{current.username}</h1>}
        </header>
)
