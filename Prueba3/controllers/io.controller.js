// const mongoose = require('mongoose');
// const User = require('../models/user.model');
// const ApiError = require('../models/api-error.model');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


module.exports.chat = (req, res, next) => {
  console.log("AAAAAAAAAAAAA");
  

  io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages);
  
    socket.on('new-message', function(data) {
      messages.push(data);
  
      io.sockets.emit('messages', messages);
    });
  });
}