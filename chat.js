const tp = require('tidy-prompt')
const io = require('socket.io-client')

// change this line to the ip of the server you want to connect to
const socket = io('http://192.168.0.125:3000')

// start the prompt interface
tp.start({
  trapLine: true
})

socket.on('connect', () => tp.log('Connected to server!'))
socket.on('connect_error', () => tp.log('Error connecting to server!'))
socket.on('connect_timeout', () => tp.log('Connection timeout!'))
socket.on('reconnect_attempt', () => tp.log('Attempting reconnection.'))
socket.on('reconnect_failed', () => tp.log('Gave up trying to reconnect.'))
socket.on('disconnect', () => tp.log('Lost connection to server.'))

socket.on('chat message', message => {
  tp.log(message)
})

tp.on('input', (input) => {
  tp.log(input)
  socket.emit('chat message', input)
  tp.clearLine()
})

tp.on("SIGINT", () => {
  return process.exit(0);
})
