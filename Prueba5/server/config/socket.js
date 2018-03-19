module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      console.log(`Connected ${socket.id} on instance`);
      
      socket.on('join', room => {
        socket.room = room
        socket.join(room, () => {
          console.log('Rooms: ', socket.rooms)
        })
      })
      
      socket.on('addComment', data => {
        // socket.broadcast.to(socket.room).emit('comment:added', data)
        // socket.to(socket.room).emit('comment:added', data)
        socket.emit('comment:added', response)
      })

      socket.on('disconnect', function () {
        console.log("DISCONNECT");        
        console.log(`Disconnect ${socket.id} on instance`);
      });
      
    })

  }
}