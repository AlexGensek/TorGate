import React from 'react'
import style from './index.module.css'

const placeholder =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const UserHeader = ({ onion }) => (
  <header className={style.component}>
    {/*<img src={onioin.avatarURL || placeholder} alt={onioin} />*/}
    <div>
      <h3>Share to start chat:</h3>
      <h5>{onion && `${onion}`}</h5>
    </div>
  </header>
)
