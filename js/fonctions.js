﻿var maxX = 15;
var maxY = 10;
var myTeam = 0;
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
window.onload = function() {
	controller = new Controller(map[nom_map], teams[myTeam]);
	controller.afficherCarte();
}
