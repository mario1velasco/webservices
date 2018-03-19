module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);
    const allMessages = [];

    io.on('connection', (socket) => {
      console.log(`Connected ${socket.id} on instance`);
      
      
      socket.on('join', room => {
        socket.room = room
        socket.join(room, () => {
          console.log('Rooms: ', socket.rooms)
        })
        socket.emit('loadOldMessages',allMessages)
      })
      
      socket.on('addComment', data => {
        allMessages.push(data);
        console.log("ADD COMMENT DATA =");
        console.log(data);
        console.log(allMessages);
        console.log("Socket.Room = " + socket.room);
        let response=[]
        response.push(data);
        // socket.broadcast.to(socket.room).emit('comment:added', data)
        // socket.to(socket.room).emit('comment:added', data)
        socket.to(socket.room).emit('comment:added', response)
      })
    })

  }
}