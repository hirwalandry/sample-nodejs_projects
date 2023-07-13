const path = require('path')
const createError = require('http-errors')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

// app.use(function(req, res, next){
//     next(createError(404))
// })
// app.use(function(err, req, res, next){
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//     res.status(err.status || 500)
//     res.render('error')
// })
const PORT = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    console.log('new webSocket connection')
    
    socket.emit('message', 'welcome!')
    socket.broadcast.emit('message', 'a new user has joined')
    
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('sorry that words dont allowed')
        }

        io.emit('message', message)
        callback()
    })
    socket.on('sendLocation', (coords, callback) => {
       io.emit('message', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
       callback('successfull!')

    })
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left!')
    })
})
server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`)
})