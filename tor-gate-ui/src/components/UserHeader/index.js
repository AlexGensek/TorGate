import React from 'react'
import style from './index.module.css'

export const UserHeader = ({onion, onClick}) => (
    <header className={style.component}>
        {/*<img src={onioin.avatarURL || placeholder} alt={onioin} />*/}
        <div>
            <h3>Share to start chat:</h3>
            <h5>{onion && `${onion}`}</h5>
        </div>
    </header>
)
