import React from 'react';
import ChatForm from './ChatForm.js'
import { Component } from 'react';
import './Channels.css';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
var socket = socketio.connect('http://202.31.202.161:80');
class Channels extends Component {

    constructor (props){
      super(props)
      this.state = {
        logs: [],
        name:'',

        //소속 그룹
        teams: [],
        s_team_id: '',
        isClicked_t: false,

        //소속 채팅방
        chat_rooms: [],
        s_chat_id: 'main',
        s_chat_name: '',
        isClicked_c: false,
        noticeContents: "공지 없음",

        //공지 가져오기
        data: [],
      }
      this.input_chat_name = React.createRef()
      this.add_chat = this.add_chat.bind(this)
      this.setChatID = this.setChatID.bind(this)
      this.setSelectedID = this.setSelectedID.bind(this)
    }
    
    // 컴포넌트가 마운트됐을 때 --- (※5)
    componentDidMount () {
      // 실시간으로 로그를 받게 설정    
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

      //해당 id가 속한 그룹 조회
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
      //그룹 안에서 해당 아이디가 속한 채팅방 조회
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

      // 공지내용 가져오기
      fetch("http://180.71.228.163:8080/viewNotice?chat_room_ID="+chat_id)
            .then(res => res.json())
            .then(
                (res) => {
                  if(res.result == 200)
                  {
                    this.setState({
                      data: res.data[0]
                    })
                    
                    this.viewNotice()
                  }
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    viewNotice(){
      alert('공지: ' + this.state.data.notice_contents)
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
        <div key={e.chatinfo_id} className='msgContent'>
          <span >{e.send_user_id}</span>
          <span >: {e.message}</span>
          <span > ( {e.send_date} )</span>
          <p style={{clear: 'both'}} />
        </div>   
      ))

      let t_list = this.state.teams
      let { chat_rooms } = this.state
      var noticeContentss = this.state.data.notice_contents

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
              <div className="flow">
                {chat_rooms.map((name) => {
                  return <button id="chats" onClick={(e) => this.setChatID(name.chat_room_ID, name.chat_room_name, e)}>
                    {name.chat_room_name}
                  </button>
                })}
              </div>
              {/* {chat_rooms.map(name =>
                  (<ChatItem onSuccess={this.setChatID.bind(this)} chat_name = {name.chat_room_name} chat_id={name.chat_room_ID} />)
              )} */}
              <input type="text" ref={this.input_chat_name} placeholder="Create new chatting room!"/>
              <button id="add_chatroom" onClick={this.add_chat}>add</button>
              <hr />
            </div>
          </div>


          {/* chat-container */}
          <div className="ki">
            <div className='chat-head'>
              <p className='text'>메인 채팅방</p>
              <p className="text"> 이름: {window.sessionStorage.getItem(' id')}</p>
              <input value={this.state.name} className="NameBoxIn" onChange={e => this.nameChanged(e)} />
              
            </div>
            
            <div id='ChatBox'>{messages}</div>
            <ChatForm name={this.state.name} roomId={this.state.s_chat_id} socket={socket} />
          </div>
        </div>
      )
    }
  }

  // class ChatItem extends Component{
  //   constructor(){
  //     super(...arguments)
  //     this.state ={
  //       chat_name: this.props.chat_name,
  //       chat_id: this.props.chat_id
  //     }
  //     this.setChatID = this.setChatID.bind(this)
  //   }
  //   setChatID(){
  //     this.props.onSuccess(this.state.chat_id, this.state.chat_name)
  //   }
  //   render(){
  //     return (
  //       <div>
  //         <button onClick={this.setChatID}>
  //           {this.props.chat_name}
  //         </button>
  //       </div>
  //     )
  //   }
  // }

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