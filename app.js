const express = require('express')
const app = require('express')()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')
const server = http.createServer(app)

app.use(cors())

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000",
        methods:["GET,POST"]
    }
})

io.on('connection', (socket) => {
    console.log(`${socket.id}입장`)
    console.log('소켓 연결되었습니다.')
    // socket.on('join_room', (data)=> {
    //     socket.join(data)
    // })

    socket.on('send_message',(data)=> {
        io.emit('receive_message', data)
        console.log(name , message)
    })

    socket.on('disconnect', ()=> {
        console.log('연결이 끊어졌습니다.')
    })
})

server.listen(3000, ()=>{
    console.log('3000포트로 서버가 실행되었습니다.')
})