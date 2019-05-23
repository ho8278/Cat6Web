import React, {Component} from 'react';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
// 입력 양식 컴포넌트 --- (※2)
import './Channels.css';
class ChatForm extends Component {

  constructor (props) {
    super(props)
    this.state = { name: '', message: '', roomname: '' }
  }
  messageChanged (e) {
    this.setState({message: e.target.value})
  }
  // 서버에 이름과 메시지 전송 --- (※3)
  send () {
    if(this.state.message!=''){
    this.props.socket.emit('chat-msg', {
      name: this.props.name,
      message: this.state.message,
      roomname :this.props.roomname
    })  
  }
  this.setState({message: ''})
     // 입력 양식을 비웁니다.
  }
  render () {
    return (
      <div className= "ChatForm" >
        <p className="MessageBox"> 메시지: </p>
        <input value={this.state.message} className="chattingBox"onChange={e => this.messageChanged(e)} />
        <button onClick={e => this.send()} className="mButton"><p className='transmit'>전송</p></button>
      </div>
    )
  }
}

export default ChatForm;