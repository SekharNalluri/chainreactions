var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var express = require('express');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'))

let availableRooms = [];

io.on('connection', function (socket) {
  socket.on('gameon', function (msg) {
    socket.to(socket.room).emit('gameon', msg);
  });


  socket.on('createroom', function (msg) {
    socket.join(msg);
    socket.room = msg
    availableRooms.push(msg);
    //TODO:if room already there ask them to retry
console.log(msg);
    var clients = Object.keys(io.sockets.adapter.rooms[socket.room].sockets);
    let participants ="";
    for(let i=0; i<clients.length; i++){

      if(i == clients.length-1){
        participants = participants + io.sockets.sockets[clients[i]].name;
      }else{
        participants = participants + io.sockets.sockets[clients[i]].name +", ";
      }

    }

    io.sockets.in(msg).emit('createroom', {"roomNo":msg, "participants":participants } );

  });

  socket.on('joinroom', function (msg) {
    //TODO check room availabilty and room exists or not
    //for(var i in availableRooms){}
    socket.join(msg);
    socket.room = msg

    var clients = Object.keys(io.sockets.adapter.rooms[socket.room].sockets);
    let participants ="";
    for(let i=0; i<clients.length; i++){

      if(i == clients.length-1){
        participants = participants + io.sockets.sockets[clients[i]].name;
      }else{
        participants = participants + io.sockets.sockets[clients[i]].name +", ";
      }

    }

    io.sockets.in(msg).emit('joinroom', {"roomNo":msg, "participants":participants });

  });


  socket.on('input message', function (msg) {
    io.sockets.in(socket.room).emit('input message', socket.name+": "+msg);
  });

  socket.on('username', function (msg) {
    socket.name = msg;
  });

});

http.listen(process.env.PORT || 5000, function () {
  console.log('Application stared');
});
