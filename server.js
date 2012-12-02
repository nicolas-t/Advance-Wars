var http = require("http");
httpServer = http.createServer(function(req, res) {});
httpServer.listen(1337);
var io = require("socket.io").listen(httpServer);

io.sockets.on('connection', function(socket){
	/* je me connecte */
	io.sockets.emit('newusr');
	socket.emit('logged');
	
	/* je me deconnecte */
	socket.on('disconnect',function(){
		io.sockets.emit('disusr');
	})
});
