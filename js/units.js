// class Team
function Team(id, color, heros) {
	this.id = id;
	this.color = color;
	this.heros = heros;
	this.units = [];
	this.jours = 0;
	if ( typeof Team.initialized == "undefined" ) {
		Team.prototype.nouveauJour = function() {
			for(i = 0; i<this.units.length; i++){
				units[this.units[i]].updateActive(true);
			}
			this.jours++;
		}

		Team.initialized = true;
	}
}

// class Unit
function Unit(id, team, type, x, y, active, spec) {
	this.id = id;
	this.team = team;
	this.team.units.push(this.id);
	this.type = type;
	this.x = x;
	this.y = y;
	this.active = active;
	this.spec = spec;
	
	this.pictoEssence = false;
	this.pictoVie = false;
	
	this.elem = document.createElement("div");
	
	//on créé l'element DOM dans l'objet
	document.getElementById("body").appendChild(this.elem);
	var position = $('#over_'+this.x+'_'+this.y).position();
	$(this.elem).attr('id', 'unit_'+id).addClass('units').css({
		'background': 'url(images/units/'+this.team.color+'/'+this.type+'.gif)',
		'left': position.left,
		'top' : position.top
	});

	
	if ( typeof Unit.initialized == "undefined" ) {
	
		Unit.prototype.detruireUnite = function() {
			$(this.elem).remove();
			delete unitsMap[this.x+'_'+this.y];
			delete units[this.id];
		}
		Unit.prototype.updatePosition = function(newCoord) {
			// on supprime l'ancienne position
			delete unitsMap[this.x+'_'+this.y];

			// on ajoute la nouvelle position
			this.x = newCoord[0];
			this.y = newCoord[1];
			unitsMap[newCoord[0]+'_'+newCoord[1]] = this.id;
		}
 		Unit.prototype.updateEssence = function(value) {
			this.spec.essence = this.spec.essence - value;
			if(this.spec.essence<=0){
				this.updateActive(false);
			}
			if(this.spec.essence<=10 && !this.pictoEssence){
				$(this.elem).append('<img src="images/pictos/essence.gif"/>');
				this.pictoEssence = true;

			}
		}
 		Unit.prototype.updateAmmo = function(value) {
			// a faire
		}
	
 		Unit.prototype.updateVie = function(value) {
			this.spec.vie = this.spec.vie - value;
			if(this.spec.vie<=0){
				this.detruireUnite();
			}
			if(this.spec.vie<10 && !this.pictoVie){

				$(this.elem).append('<div class="petitsChiffres n_'+this.spec.vie+'"></div>');
				this.pictoVie = true;
			}
		}
		Unit.prototype.updateActive = function(newValue) {
			this.active = newValue;
			if(newValue && (this.spec.essence>0)){
				$(this.elem).css({'background': 'url(images/units/'+this.team.color+'/'+this.type+'.gif)'});
				this.active = true;
			}
			else{
				$(this.elem).css({'background': 'url(images/units/'+this.team.color+'/'+this.type+'_down.gif)'});
				this.active = false;
			}
		}
		Unit.initialized = true;
	}
}	

var units = new Array();
var teams = new Array();
var unitsMap = new Array();		
var batsMap = new Array();		

$(document).ready(function(){
	//def Teams :
	teams[0] = new Team(0, 'blue', 'Max');
	teams[1] = new Team(1, 'red', 'Jeanne');
	//def Units
						
	units[0] = new Unit(0, teams[1], 'tank', 7, 4, true, $.extend(true, {}, BDD.Unites.Tank));
	units[1] = new Unit(1, teams[1], 'infantry', 6, 5, true, $.extend(true, {}, BDD.Unites.Infantry));
	units[2] = new Unit(2, teams[1], 'bazooka', 8, 5, true, $.extend(true, {}, BDD.Unites.Bazooka));
	units[3] = new Unit(3, teams[0], 'infantry', 7, 5, true, $.extend(true, {}, BDD.Unites.Infantry));

	for(j=0;j<units.length;j++)
	{
		unitsMap[units[j].x+'_'+units[j].y] = j;
	}

});