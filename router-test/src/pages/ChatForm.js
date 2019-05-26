import React, {Component} from 'react';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
// 입력 양식 컴포넌트 --- (※2)
import './Channels.css';
import {v4} from 'uuid';

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (var i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

function getTimeStamp() {
var d = new Date();
var s =
  leadingZeros(d.getFullYear(), 4) + '-' +
  leadingZeros(d.getMonth() + 1, 2) + '-' +
  leadingZeros(d.getDate(), 2) + ' ' +

  leadingZeros(d.getHours(), 2) + ':' +
  leadingZeros(d.getMinutes(), 2) + ':' +
  leadingZeros(d.getSeconds(), 2);

return s;
}
class ChatForm extends Component {

  constructor (props) {
    super(props)
    this.state = { chatinfo_id:'', send_user_id:'', chatroom_id:'', send_date:'', message:'' }
  }

 
  messageChanged (e) {
    this.setState({message: e.target.value})
  }
  // 서버에 이름과 메시지 전송 --- (※3)
  send () {
    if(this.state.message!=''){
      var messageSocket = { 
        chatinfo_id: v4(),
        send_user_id : this.props.name,
        chatroom_id :this.props.roomId,
        send_date: getTimeStamp(),
        message: this.state.message     
      }         
      const str = JSON.stringify(messageSocket)
    this.props.socket.emit('send', str)  
  }
  this.setState({message: ''})
     // 입력 양식을 비웁니다.
  }
  render () {
    return (
      <div className= "ChatForm" >
        <p className="text"> 메시지: </p>
        <input value={this.state.message} className="chattingBox"onChange={e => this.messageChanged(e)} />
        <button onClick={e => this.send()} className="mButton"><p className='transmit'>전송</p></button>
      </div>
    )
  }
}

export default ChatForm;