var http = require("http");
httpServer = http.createServer(function(req, res) {});
httpServer.listen(1337);
var io = require("socket.io").listen(httpServer);
var users= [];

io.sockets.on('connection', function(socket){
	/* je me connecte */
	socket.on('newUser', function(){
		socket.userID = users.length;
		users.push(users.length);
		socket.emit('createTeam', socket.userID);

		/*log*/
		socket.emit('log', socket.userID + ' have connected');
		socket.broadcast.emit('log', socket.userID + ' has connected');
	});	
	/* je me deconnecte */
	socket.on('disconnect',function(){
		socket.broadcast.emit('log', socket.userID + ' has left');
	})
});

