// class Team
function Team(id, color, heros) {
	this.id = id;
	this.color = color;
	this.heros = heros;
}

// class Unit
function Unit(id, team, type, x, y) {
	this.id = id;
	this.team = team;
	this.type = type;
	this.x = x;
	this.y = y;
	if ( typeof Unit.initialized == "undefined" ) {
		Unit.prototype.updatePosition = function(newCoord) {
			this.x = newCoord[0];
			this.y = newCoord[1];
			unitsMap[selectedUnitID] = newCoord[0]+'_'+newCoord[1];
		}
 
		Unit.prototype.getType = function() {
			return this.type;
		}
		Unit.initialized = true;
	}
}	
//def Teams :
var teams = new Array();
teams[0] = new Team(0, 'red', 'Max');
teams[1] = new Team(1, 'blue', 'Jeanne');

//def Units
var units = new Array();
units[0] = new Unit(0, teams[0], 'tank', 8, 8);
units[1] = new Unit(1, teams[1], 'tank', 7, 4);
units[2] = new Unit(2, teams[1], 'tank', 5, 4);

var unitsMap = new Array();		
for(j=0;j<units.length;j++)
{
	unitsMap[j] = units[j].x+'_'+units[j].y;
}
