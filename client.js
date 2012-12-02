$(document).ready(function() {
	var socket = io.connect('http://localhost:1337');
	socket.on('newusr', function(){
		c = new Date();
		d = c.getHours()+':'+c.getMinutes()+':'+c.getSeconds()+'';
		$('#debug-node').append('nouvel utilisateur : '+d+'<br />');
	});
	socket.on('logged', function(){
	});
	socket.on('disusr', function(){
		c = new Date();
		d = c.getHours()+':'+c.getMinutes()+':'+c.getSeconds()+'';
		$('#debug-node').append('un utilisateur est parti: '+d+'<br />');
	});
});