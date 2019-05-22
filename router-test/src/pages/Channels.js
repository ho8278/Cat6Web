import React from 'react';
import ChatForm from './ChatForm.js'
import { Component } from 'react';
import './Channels.css';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
var socket = socketio.connect('http://localhost:3001');
class Channels extends Component {

    constructor (props) {
      super(props)
      this.state = {
        logs: [],
        name:'',
        roomname:''
      }
    }
    
    // 컴포넌트가 마운트됐을 때 --- (※5)
    componentDidMount () {
      // 실시간으로 로그를 받게 설정
     
      socket.on('chat-msg', (obj) => {
        const logs2 = this.state.logs
        obj.key = 'key_' + (this.state.logs.length + 1)
        console.log(obj)
        logs2.push(obj) // 로그에 추가하기
        this.setState({logs: logs2})   
      })
 
    }

   componentDidUpdate()
   {
    const messageBody = document.getElementById('ChatBox')
    messageBody.scrollTop = messageBody.scrollHeight;
   }

    nameChanged (e) {
      this.setState({name: e.target.value})
    }
    roomnameChanged (e) {
      this.setState({roomname: e.target.value})
    }
  
    render () {
      // 로그를 사용해 HTML 요소 생성 --- (※6)
      const messages = this.state.logs.map(e => (
        <div key={e.key} >
          <span >{e.name}</span>
          <span >: {e.message}</span>
          <p style={{clear: 'both'}} />
        </div>
       
      ))
      
      return (
        <div>
          <div className='chat-head'>
          <p className='headname'>메인 채팅방</p>
          <p className="NameBox"> 이름: </p><input value={this.state.name} className="NameBoxIn" onChange={e => this.nameChanged(e)}/> 
          <p className="RoomBox">방 이름: </p><input value={this.state.roomname} className="RoomBoxIn" onChange={e => this.roomnameChanged(e)} /> 
          </div>         
          <div id='ChatBox'>{messages}</div>
          <ChatForm  name={this.state.name} roomname={this.state.roomname} socket={socket}  />
        </div>
      )
    }
  }

  export default Channels;

/*

import React from 'react';
import queryString from 'querystring';

const Channels = ({location, match}) => {
    const query = queryString.parse(location.search);
    const detail = query.detail === 'true';

    return (
        <div>
          <h2>Channels d{match.params.name}</h2>
           {detail && 'detail: blahblah'}
      </div>
    );
};

export default Channels;
 
*/