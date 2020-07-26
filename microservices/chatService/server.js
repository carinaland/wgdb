var express = require('express')
    , http = require('http');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(cors())


// change to 8080 for docker
const PORT = 3333;
const HOST = '0.0.0.0';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // support json encoded bodies


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

// socket
io.on('connection', function(socket){
    socket.on('add-message', function (messages) {
        setTimeout(() => io.sockets.emit('new-message', messages), 250);
    });
});

server.listen(PORT);
console.log('Running on http://' + HOST + ':' + PORT);



