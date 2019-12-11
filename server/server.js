const path=require('path');
var express=require('express');
const http =require('http');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname, '../public');
const port=process.env.PORT || 3000;

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  // socket.emit('newEmail',{
  //   from:'ratnambar123gupta@gmail.com',
  //   text: 'hey what is going on ?',
  //   creatAt:123
  // });

  // socket.emit('newMsg',{
  //   from:'ambarkr321@gmail.com',
  //   text:'hey where are you?'
  // });

  socket.on('createEmail',(check)=>{
    console.log('createEmail',check);
    // io.emit('newMsg',{
    //   from:check.from,
    //   text:check.text
    // });
    socket.broadcast.emit('newMsg',{
      from:check.from,
      text:check.text
    });
  });


  socket.on('disconnect',()=>{
    console.log('user is dosconnected');
  });
});

server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
});
