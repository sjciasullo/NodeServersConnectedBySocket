const app = require('express')();
const logger = require('morgan');
const server = require('http').Server(app);
const socket = require('socket.io-client')('http://localhost:3000');
const { spawn } = require('child_process');
const port = process.env.PORT || 3001;
server.listen(port);
app.use(logger('dev'));

// Route handling
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

socket.on('connect', () => {
  console.log('Connected to socket server');
});

socket.on('connect_error', (error) => {
  console.log('connection error:')
  console.log(error);
});

socket.on('RunApplication', (applicationName) => {
  console.log(`Received request to start: ${applicationName}`);
  spawn('open', ['-a', applicationName]);
})