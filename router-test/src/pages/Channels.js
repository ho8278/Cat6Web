import React from 'react';
import ChatForm from './ChatForm.js'
import { Component } from 'react';
import './Channels.css';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
var socket = socketio.connect('http://localhost:3001');
class Channels extends Component {

    constructor (props){
      super(props)
      this.state = {
        logs: [],
        name:'',
        roomId:'main',

        //소속 그룹
        teams: [],
        s_team_id: '',
        isClicked_t: false,

        //소속 채팅방
        chat_rooms: [],
        s_chat_id: '',
        s_chat_name: '',
        isClicked_c: false
      }
      this.input_chat_name = React.createRef()
      this.add_chat = this.add_chat.bind(this)
    }
    
    // 컴포넌트가 마운트됐을 때 --- (※5)
    componentDidMount () {
      // 실시간으로 로그를 받게 설정    
      socket.emit('channelJoin', this.state.roomId);
      socket.on('recieve',(obj) => {    // 채팅을 받을때
        const logs2 = this.state.logs
        console.log(obj)
        logs2.push(obj) 
        this.setState({logs: logs2}) 
        
      })

      const id = window.sessionStorage.getItem('id');

      fetch("http://180.71.228.163:8080/viewTeams/n?client_ID="+id)
          .then(res => res.json())
          .then(
              (res) => {           
                  this.setState({
                      teams: res.data
                  })
              },
              (error) => {                    
                  alert(error);
              }
          )
    }

   componentDidUpdate()
   {
    const messageBody = document.getElementById('ChatBox')
    messageBody.scrollTop = messageBody.scrollHeight;
   }

    nameChanged (e) {
      this.setState({name: e.target.value})
    }
  
    setSelectedID(id){
      this.setState({
        s_team_id:id
      })
      const c_id = window.sessionStorage.getItem('id')

      fetch("http://180.71.228.163:8080/viewChatRooms/n?client_ID="+c_id+"&team_ID=" + id)
            .then(res => res.json())
            .then(
                (res) => {           
                    this.setState({
                        chat_rooms: res.data,
                        isClicked_t: true
                    })
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    setChatID(chat_id, chat_name){
      this.setState({
        s_chat_id: chat_id,
        s_chat_name: chat_name,
        isClicked_c: true
      })

      //해당 채팅방 로그 띄우기
    }

    add_chat(e){
      const c_id = window.sessionStorage.getItem('id')

      if(this.input_chat_name.current.value ==''){
        alert('생성할 채팅방 이름을 기입하세요')
        e.preventDefault()
        return;
      }

      fetch("http://180.71.228.163:8080/createChatRoom/n?client_ID="+c_id
      +"&chat_room_name="+this.input_chat_name.current.value
      +"&team_ID="+this.state.s_team_id,
      {
        method: "POST"
      })
            .then(
                (res) => {    
                  alert('채팅방 생성')
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    render () {
      // 로그를 사용해 HTML 요소 생성 --- (※6)
      const messages = this.state.logs.map(e => (
        <div key={e.id} className='msgContent'>
          <span >{e.sendUserId}</span>
          <span >: {e.message}</span>
          <span > ( {e.sendDate} )</span>
          <p style={{clear: 'both'}} />
        </div>   
      ))

      let t_list = this.state.teams
      let c_list = this.state.chat_rooms

      // let check_1 = this.state.isClicked_t
      // let check_2 = this.state.is
      
      return (
        <div>
          <div className="zu0p">
            <div className="select_group">
              {t_list.map((name) => {
                return <button onClick={(e) => this.setSelectedID(name.team_ID, e)}>
                  {name.team_name}
                </button>
              })}
              <hr />
            </div>

            <div className="select_chat">
              {c_list.map((name) => {
                return <button onClick={(e) => this.setChatID(name.chat_room_ID, name.chat_room_name, e)}>
                  {name.chat_room_name}
                </button>
              })}
              <input type="text" ref={this.input_chat_name} placeholder="Create new chatting room!"/>
              <button id="add_chatroom" onClick={this.add_chat}>add</button>
              <hr />
            </div>
          </div>


          {/* chat-container */}
          <div className="ki">
            <div className='chat-head'>
              <p className='text'>메인 채팅방</p>
              <p className="text"> 이름: </p><input value={this.state.name} className="NameBoxIn" onChange={e => this.nameChanged(e)} />
            </div>
            <div id='ChatBox'>{messages}</div>
            <ChatForm name={this.state.name} roomId={this.state.roomId} socket={socket} />
          </div>
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