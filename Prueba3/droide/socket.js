module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);
    // import redis from 'socket.io-redis'
    // io.adapter(redis({host: 'localhost', port: 6379}))

    io.on('connection', (socket) => {
      console.log(`Connected ${socket.id} on instance`)
  
      socket.on('join', room => {
        socket.room = room
        socket.join(room, () => {
          console.log('Rooms: ', socket.rooms)
        })
      })
  
      socket.on('addComment', data => {
        console.log("ADD COMMENT DATA =");
        console.log(data);
        console.log(socket.room);        
        // socket.broadcast.to(socket.room).emit('comment:added', data)
        // socket.to(socket.room).emit('comment:added', data)
        socket.emit('comment:added', data)
      })
    })

  }
}