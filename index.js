const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    socket.on('message',({name, message})=> {
        io.emit('message', {name,message})
    })
})


http.listen(3000, function(){
    console.log('3000포트로 서버가 실행되었습니다.')
})