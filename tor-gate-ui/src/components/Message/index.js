import React from 'react'
import style from './index.module.css'
import Linkify from 'react-linkify'

const time = string => {
  const date = new Date(string)
  const minutes = date.getMinutes()
  return `${date.getHours()}:${minutes < 10 ? '0' + minutes : minutes}`
}

class Attachment extends React.Component {
  componentDidMount() {
    if (this.props.link) this.setState({ src: this.props.link });
  }
  render() {
    return this.state
      ? {
          image: (
            <img controls={true} src={this.state.src} alt={this.state.name} />
          ),
          video: <video controls={true} src={this.state.src} />,
          audio: <audio controls={true} src={this.state.src} />,
          file: (
            <a href={this.state.src} download>
              Download File
            </a>
          ),
        }[this.props.type]
      : null
  }
}

export const Message = ({ contact }) => message =>
  message && (
    <li key={message.timestamp} className={style.component}>
      <div>
        {/*<span>{`${message.sender.name} | ${time(message.createdAt)}`}</span>*/}
          <span>name</span>
        <p>
          <Linkify properties={{ target: '_blank' }}>{message.message}</Linkify>
        </p>
      </div>
    </li>
  )
