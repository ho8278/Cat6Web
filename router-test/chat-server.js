// --------------------------------------------------------
// 실시간 채팅 서버
// --------------------------------------------------------
// HTTP 서버 생성(애플리케이션 전송 전용) --- (※1)
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const portNo = 3001
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


// public 디렉터리를 공개합니다.  --- (※2)
app.use('/public', express.static('./public'))
app.get('/', (req, res) => { // 루트에 접근하면 /public로 리다이렉트
  res.redirect(302, '/public')
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

   connection.query('SELECT * from chattinglog ORDER BY sendDate', function(err, rows,fields) {
    if (!err)
   {  
     for(var i = 0; i < rows.length; i++){
      socket.emit('recieve', rows[i])
     }
    console.log(rows)
   }
   else
      console.log('Error while performing Query.', err);   

   });

   })
      // 메시지를 받으면 --- (※5)
   socket.on('send', (msg) => {
    var chatMsg = JSON.parse(msg)
    // 모든 클라이언트에게 전송 --- (※6)
    console.log(chatMsg)
    io.to(chatMsg.roomId).emit('recieve', chatMsg)
    connection.query('INSERT INTO chattinglog VALUES("'+chatMsg.id+'","'+chatMsg.sendUserId+'","'+chatMsg.roomId+'","'+chatMsg.sendDate+'","'+chatMsg.message+'")')
  })
})
 
 
 
 
  
 