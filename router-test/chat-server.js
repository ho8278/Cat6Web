// --------------------------------------------------------
// 실시간 채팅 서버
// --------------------------------------------------------
// HTTP 서버 생성(애플리케이션 전송 전용) --- (※1)
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3333
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  port     : '3306',
  database : 'systemproject'
});

connection.connect()

server.listen(portNo, () => {
  console.log('서버 실행 완료:', 'http://localhost:' + portNo)
})


// 웹 소켓 서버를 실행합니다. --- (※3)
const socketio = require('socket.io')
const io = socketio.listen(server)
// 클라이언트가 접속했을 때의 이벤트 설정 --- (※4)
io.on('connection', (socket) => {
  console.log('사용자 접속:', socket.client.id)
   //채팅방에 들어왔을때


   socket.on('channelJoin',(roomId)=>{
   socket.join(roomId)
   console.log('채팅방 접속 완료')

   connection.query('SELECT * from chattinglog WHERE chatroom_id="'+roomId+'" ORDER BY send_date', function(err, rows,fields) {
    if (!err)
   {  
     for(var i = 0; i < rows.length; i++){
      const string = JSON.stringify(rows[i])
      socket.emit('receive', string)
     }
    console.log(rows)
   }
   else
      console.log('Error while performing Query.', err);   

   });

   })
      // 메시지를 받으면 --- (※5)
   socket.on('send', (msg) => {
    // 모든 클라이언트에게 전송 --- (※6)
    console.log('첫 메세지 왔다')
    console.log(msg)
    const dbmessage = JSON.parse(msg)
    console.log('위에꺼가 변환 한거임')
    io.to(dbmessage.chatroom_id).emit('receive', msg)
    connection.query('INSERT INTO chattinglog VALUES("'+dbmessage.chatinfo_id+'","'+dbmessage.send_user_id+'","'+dbmessage.chatroom_id+'","'+dbmessage.send_date+'","'+dbmessage.message+'")')
  })
})
 
 
 
 
  
 