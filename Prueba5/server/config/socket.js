let allMessages = [];
let created_by;
let users = [];
let chat = {
  room: "",
  users: [],
  created_by: "",
  messageHistory:[]
};


module.exports = function () {
  socket = (server) => {
    const io = require('socket.io')(server);

    io.on('connection', (socket) => {
      //AQUI TIEES QUE SACER EL USERNAME Y PONER
      // SOCKEt.id=username
      console.log(`Connected ${socket.id} on instance`);
      addUser(socket.id);
      // created_by = created_by || socket.id;
      chat.created_by=chat.created_by || socket.id;
      console.log(`CREATED BY = ${chat.created_by}`);
      

      socket.on('join', room => {
        socket.room = room
        socket.join(room, () => {
          chat.room=chat.room || socket.room;
          console.log('Rooms: ', socket.rooms)
          console.log('Room: ', chat.room)
        })
      })

      if (allMessages.length > 0) {
        socket.emit('previousComments', allMessages);
      }

      socket.on('addComment', data => {
        // console.log(Object.keys(io.sockets.sockets));

        allMessages.push(data);
        let response = []
        response.push(data);
        // socket.broadcast.to(socket.room).emit('comment:added', data)
        io.sockets.to(socket.room).emit('comment:added', response)
      })


      socket.on('disconnect', function () {
        console.log("DISCONNECT");
        console.log(`Disconnect ${socket.id} on instance`);
      });

    })

  }
}

function hola() {
  console.log("HooLLAA");
}

function addUser(userId) {
  let noExists = true;
  console.log("userID = "+userId);
  
  chat.users.forEach(user => {
    if (String(user) === String(userId)) {
      noExists = false;
      return;
    }
  });
  if (noExists) {
    chat.users.push(userId)
  }
  console.log(chat.users);  
}