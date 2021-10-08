import React from 'react'
import style from './index.module.css'

export const AddContactForm = ({ submit }) => (
  <form
    className={style.component}
    onSubmit={e => {
      e.preventDefault()
      submit({
        onion: e.target[0].value
      })
      e.target[0].value = ''
    }}
  >
    <input placeholder="Create a Room" type="text" required />
    <button type="submit">
      <svg>
        <use xlinkHref="index.svg#add" />
      </svg>
    </button>
  </form>
)
