var maxX = 15;
var maxY = 10;
var myTeam = 1;

function getXY(s){
	l=s.split('_').reverse();
	if(l[1] == 'unit'){g = new Array(units[parseInt(l[0])].x, units[parseInt(l[0])].y);}
	else{g = new Array(parseInt(l[1]),parseInt(l[0]));}
	return g;
}
function getID(s){
	l=s.split('_').reverse();
	g = parseInt(l[0]);
	return g;
}

$(document).ready(function(){

	game = new Game(map[nom_map], myTeam);
	game.afficherCarte();
	
	warfog = new Warfog(teams[myTeam]);
	warfog.complet();
	warfog.afficherVue();
});