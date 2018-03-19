module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);


    io.on('connection', function (socket) {
      console.log(`Connected ${socket.id} on instance`);

      socket.join('miHabitacion');
      
      socket.on('newMessage', function (data) {
        console.log("Hello you are in event, data = " + data);
        console.log(data);

      });

      socket.on('disconnect', function () {
        console.log("DISCONNECT");        
        console.log(`Disconnect ${socket.id} on instance`);
      });
    });

  }
}