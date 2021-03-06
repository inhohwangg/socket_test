const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin : "http://localhost:3000",
        methods: ["GET","POST"],
    },
})

io.on("connection", (socket)=> {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (data)=> {
        socket.join(data)
        console.log(data)
    })

    socket.on("send_message", (data)=> {
        socket.to(data.room).emit("receive_message", data)
        console.log(socket.id, data)
    })
})

server.listen(3000, ()=> {
    console.log('3001포트로 서버가 켜졌습니다.')
})