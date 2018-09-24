const app = require('express')();
const logger = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const approveApplication = require('./utils/approve-application');

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Listening On port: ${port}`)
});
app.use(logger('dev'));

// Route handling
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/api/run-application/:applicationName', function (req, res) {
  const SOCKETS = Object.keys(io.sockets.sockets);
  const {
    applicationName
  } = req.params;

  if(SOCKETS.length === 0) {
    res.send('No socket connections found');
  } else if(!approveApplication(applicationName)){
    res.send(`${applicationName} is not an approved application.`)
  } else {
    const SOCKET_ID = SOCKETS[0];
    io.to(SOCKET_ID).emit('RunApplication', applicationName);
    res.send(`Sending message to local to start ${applicationName}`)
  }
})

io.on('connection', function(socket){
  console.log(`${socket.id} connected`);
})
