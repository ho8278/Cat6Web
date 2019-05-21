import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import styles from './channelstyles.js'
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
const socket = socketio.connect('http://localhost:3001')
// 입력 양식 컴포넌트 --- (※2)

class ChatForm extends Component {
  constructor (props) {
    super(props)
    this.state = { name: '', message: '' }
  }
  nameChanged (e) {
    this.setState({name: e.target.value})
  }
  messageChanged (e) {
    this.setState({message: e.target.value})
  }
  // 서버에 이름과 메시지 전송 --- (※3)
  send () {
    socket.emit('chat-msg', {
      name: this.state.name,
      message: this.state.message
    })
    this.setState({message: ''}) // 입력 양식을 비웁니다.
  }
  render () {
    return (
      <div style={styles.form}>
        이름:<br />
        <input value={this.state.name}
          onChange={e => this.nameChanged(e)} /><br />
        메시지:<br />
        <input value={this.state.message}
          onChange={e => this.messageChanged(e)} /><br />
        <button onClick={e => this.send()}>전송</button>
      </div>
    )
  }
}

export default ChatForm;