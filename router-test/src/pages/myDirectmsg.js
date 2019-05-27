import React from 'react';
import ChatForm from './ChatForm.js'
import { Component } from 'react';
import './Channels.css';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
var socket = socketio.connect('http://202.31.202.161:80');

class myDirectmsg extends Component{
 
    constructor (props){
        super(props)
        this.state = {
          logs: [],
          name:'',
          s_chat_id: ''
        }
    }
    componentDidMount () {
        // 실시간으로 로그를 받게 설정    
        let tmp = window.sessionStorage.getItem('tmp'); //임시 채팅방 id
        console.log(tmp);
        this.state.s_chat_id =tmp;
        console.log(this.state.s_chat_id);
        socket.emit('channelJoin', this.state.s_chat_id);
        socket.on('receive',(obj) => {    // 채팅을 받을때
          const conObj= JSON.parse(obj)
          const logs2 = this.state.logs
          console.log(conObj)
          logs2.push(conObj) 
          this.setState({logs: logs2}) 
          
        })
        socket.on('pastreceive',(obj) => {    // 채팅을 받을때
          const conObj= JSON.parse(obj)
          const logs2 = this.state.logs
          console.log(conObj)
          logs2.push(conObj) 
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


  render(){ 

    const mymessages = this.state.logs.map(e => (
        <div key={e.chatinfo_id} className='msgContent'>
          <span >{e.send_user_id}</span>
          <span >: {e.message}</span>
          <span > ( {e.send_date} )</span>
          <p style={{clear: 'both'}} />
        </div>   
      ))


    return(
    <div>
          <div className="ki">
            <div className='chat-head'>
              <p className='text'>메인 채팅방</p>
              <p className="text"> 이름: {window.sessionStorage.getItem(' id')}</p>
              <input value={this.state.name} className="NameBoxIn" onChange={e => this.nameChanged(e)} />
            </div>
            <div id='ChatBox'>{mymessages}</div>
            <ChatForm name={this.state.name} roomId={this.state.s_chat_id} socket={socket} />
          </div>
      
  </div>
);}
   
};

export default myDirectmsg;