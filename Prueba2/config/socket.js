module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);

    const messages =[];
    //  [{
    //   id: 1,
    //   text: "Hola soy un mensaje",
    //   author: "Carlos Azaustre"
    // }];

    io.on('connection', function (socket) {
      console.log(`Connected ${socket.id} on instance`);

      socket.emit('messages', messages);
      
      socket.on('new-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
      });

      socket.on('join', room => {
        console.log(room);
        
        socket.room = room
        socket.join(room, () => {
          console.log('Rooms: ', socket.rooms)
        })
      })

      socket.on('addComment', data => {
        socket.broadcast.to(socket.room).emit('messages', data)
        // socket.broadcast.to(socket.room).emit('comment:added', data)
      })
    });

  }
}
