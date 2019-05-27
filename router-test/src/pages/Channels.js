import React from 'react';
import ChatForm from './ChatForm.js'
import { Component } from 'react';
import update from 'react-addons-update'
import './Channels.css';
// Socket.IO로 웹 소켓 서버에 접속하기 --- (※1)
import socketio from 'socket.io-client'
import bodyParser from 'body-parser';

var socket = socketio.connect('http://202.31.202.161:80');
class Channels extends Component {

    constructor (props){
      super(props)
      this.state = {
        logs: [],
        name:'',
        nicknames: [],
        nickname:'',

        //소속 그룹
        teams: [],
        s_team_id: '',
        isClicked_t: false,

        //소속 채팅방
        chat_rooms: [],
        s_chat_id: '',
        s_chat_name: '',
        isClicked_c: false,
        noticeContents: "공지 없음",

        //공지 가져오기
        data: [],

        //투표 가져오기
        votes: [],
        is_vote_item: '',
    
        //기존 투표 목록
        vote_info: [],

        //투표 항목 생성
        vote_items: [],

        //투표 생성시 해당 투표 아이디
        new_vote_id: '',

        com_reg_vot: false,
        s_vote_item : ''
      }
      this.input_chat_name = React.createRef()
      this.title = React.createRef()
      this.start_date = React.createRef()
      this.end_date = React.createRef()
      this.vovo = React.createRef()
      this.invite_id = React.createRef()
      this.add_chat = this.add_chat.bind(this)
      this.setChatID = this.setChatID.bind(this)
      this.setSelectedID = this.setSelectedID.bind(this)
      this.select_vote = this.select_vote.bind(this)
      this.add_vote = this.add_vote.bind(this)
      this.add_vote_item = this.add_vote_item.bind(this)
      this.chg_vote_value = this.chg_vote_value.bind(this)
      this.regist_vote = this.regist_vote.bind(this)
      this.regist_vote_item = this.regist_vote_item.bind(this)
      this.vote_func = this.vote_func.bind(this)
      this.invite_chat = this.invite_chat.bind(this)
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

        //내 정보 조회->닉네임 설정
        fetch("http://180.71.228.163:8080/showClientInfo?client_ID="+id)
          .then(res => res.json())
          .then(
              (res) => {           
                  this.setState({
                      nicknames: res.data
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

      //투표내용 가져오기
      fetch("http://180.71.228.163:8080/viewVotes?chat_room_ID="+chat_id)
            .then(res => res.json())
            .then(
                (res) => {
                  if(res.result == 200)
                  {
                    this.setState({
                      votes: res.data
                    })
                    
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

    select_vote(e){
      this.setState({
        is_vote_item: true
      })
      
      fetch("http://180.71.228.163:8080/viewVoteInfo?vote_ID="+e.target.value)
            .then(res => res.json())
            .then(
                (res) => {
                  if(res.result == 200)
                  {
                    this.setState({
                      vote_info: res.data.vote_item
                    })
                    console.log(this.state.vote_info)
                  }
                },
                (error) => {                    
                    alert(error);
                }
            )
    }

    vote_pre(id){
      // var vote_item_id = id
      this.setState({
        s_vote_item: id
      })
    }

    vote_func(){

      fetch("http://180.71.228.163:8080/vote&vote_item_ID=" + this.state.s_vote_item
      ,{
        method: "POST"
      }
      )
      .then(res => res.json())
      .then(
          (res) => {
            if(res == 200)
            {
              alert('투표 완료')
            }
          },
          (error) => {                    
              alert(error);
          }
      )
    }

    add_vote(){
      //투표 생성
      this.setState({
        is_vote_item: false
      })     
      
    }

    add_vote_item(){
      this.state.vote_items.push("")
      this.forceUpdate()
      console.log(this.state.vote_items)
    }

    chg_vote_value(e){
      //인풋으로 받은 투표 항목의 값
      const idx = parseInt(e.target.name)
      const value = e.target.value
      this.setState({
        vote_items: update(
          this.state.vote_items,
          {
            [idx] : {$set: value}
          }
        )
      })
      console.log(this.state.vote_items)
    }

    regist_vote(){
      
      //투표 등록(추가)
      var bodyParser = require('body-parser')

      //투표 생성 -> 해당 투표 ID 받아옴
      fetch("http://180.71.228.163:8080/createVote?vote_title="+ this.title.current.value 
      +"&vote_start_date=" + this.start_date.current.value
      +"&vote_end_date=" + this.end_date.current.value
      +"&vote_duplicate=" + "0"
      +"&chat_room_ID=" + this.state.s_chat_id
      ,{
        method: "POST"
      }
      )
      .then(res=>res.text())
      .then(
          (res) => {
            this.setState({
              new_vote_id: res,
              com_reg_vot: true
            })
            console.log(this.state.new_vote_id)
            this.regist_vote_item()
          },
          (error) => {                    
              alert(error);
          }
      )

      alert('투표등록 성공')
    }

    regist_vote_item(){
      //항목들을 해당 투표에 추가
      this.state.vote_items.map((item)=>{
        console.log(item)
        fetch("http://180.71.228.163:8080/createVoteItem?vote_item_name=" + item
        +"&vote_ID="+ this.state.new_vote_id 
        ,{
          method: "POST"
        }
        )
        .then(
            (res) => {
            },
            (error) => {                    
                alert(error);
            }
        )
      })
    }

    invite_chat(e){
      if(this.invite_id.current.value==''){
        alert('아이디를 입력하세요')
        e.preventDefault()
        return;
      }
      fetch("http://180.71.228.163:8080/inviteChatRoom?client_ID="+this.invite_id.current.value
      +"&chat_room_ID="+this.state.s_chat_id       
      ,{
        method: "POST"
      }
      )
      .then(
          (res) => {
            if(res == 200){
              alert('초대 성공')
            }
            else{
              alert('해당 아이디가 존재하지 않습니다')
            }
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
      let {is_vote_item} = this.state
      let {votes} = this.state
      let {vote_info} = this.state
      let {vote_items} = this.state
      let {com_reg_vot} = this.state

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
            <div className="chat">
              <div className='chat-head'>
                <p className='text'>채팅방 이름 : {this.state.s_chat_name}</p>
                <p className="text"> 닉네임: {this.state.nicknames.client_nickname}</p>
                <input id="input_invite_id" ref={this.invite_id} placeholder='초대할 아이디'/>
                <button id="invite_chat" onClick={this.invite_chat}>+</button>
                {/* <input value={this.state.name} className="NameBoxIn" onChange={e => this.nameChanged(e)} /> */}

              </div>

              <div id='ChatBox'>{messages}</div>
              <ChatForm name={this.state.nicknames.client_nickname} roomId={this.state.s_chat_id} socket={socket} />
            </div>
              
            <div className="vote">

              <div className="chat-head2">
                <select id="select_op" onChange={this.select_vote}>
                  <option value="">--고르세오--</option>
                  {votes.map(vote=>
                    <option value={vote.vote_ID}>{vote.vote_title}</option>
                  )}
                </select>
                <button id="add_vote" onClick={this.add_vote}>추가</button>
              </div>

              <div className="vote_content">
                {is_vote_item == true &&
                  <div>
                    {/* 투표 항목 */}
                    {vote_info.map((v_item) => {
                      console.log(JSON.stringify(v_item))
                      return (<VoteItem onSuccess={this.vote_pre.bind(this)} name={v_item.vote_item_name} id={v_item.vote_item_ID} />)
                    })}
                    <button id="my_btn" onClick={this.vote_func}>투표하기</button>
                  </div>
                }
                {is_vote_item==false &&
                <div>
                  {/* 투표 생성 */}
                  <div>
                    투표 제목:
                    <input  type="text"
                            id="input_vote"
                            ref={this.title}
                            placeholder='투표 제목'/>

                    시작 날짜:
                    <input  type="datetime-local"
                            id="input_vote"
                            ref={this.start_date}
                            placeholder='시작일' />

                    종료 날짜:
                    <input  type="date"
                            id="input_vote"
                            ref={this.end_date}
                            placeholder='종료일' />
                  </div>
                  <div>
                    <button id="my_btn" onClick={this.add_vote_item}>항목추가</button>
                    {vote_items.map((item, i)=>
                        <input id="input_vote" type="text" ref={this.vovo} name={i} onChange={this.chg_vote_value} />
                    )}

                    <button id="my_btn" onClick={this.regist_vote}>투표등록</button>
                    {/* {com_reg_vot==true &&
                      <div>
                        <button onClick={this.regist_vote_item}>완료</button>
                      </div>
                    } */}
                  </div>
                </div>
                }
              </div>

            </div>
          </div>
        </div>
      )
    }
  }

  class VoteItem extends Component{
    constructor(){
      super(...arguments)
      this.state={
        id: this.props.id,
        name: this.props.name,
      }

      this.clickedRadio = this.clickedRadio.bind(this)
    }

    clickedRadio(){
      this.props.onSuccess(this.state.id)
    }

    render(){
      return(
        <div>
            <input type="radio" name="a" onClick={this.clickedRadio}/> {this.state.name}
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