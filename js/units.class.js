// class Team
function Team(id, color, heros) {
	this.id = id;
	this.color = color;
	this.heros = heros;
	this.bats = [];
	this.units = [];
	this.jours = 0;
	this.argent = 1000;
	if ( typeof Team.initialized == "undefined" ) {
		Team.prototype.finJour = function() {
			for(i = 0; i<this.units.length; i++){
				this.units[i].updateActive(false);
			}
			//controller.refresh.changeJoueur(myTeamInverse[myTeam]);
			this.jours++;
		}
		Team.prototype.debutJour = function() {
			for(i = 0; i<this.units.length; i++){
				this.units[i].updateActive(true);

			}
			this.jours++;
		}
		Team.initialized = true;
	}
}
// class Bat
function Bat(id, team, type, x, y) {
	this.id = id;
	this.team = team;
	this.team.bats.push(this);
	
	this.type = type;
	this.x = x;
	this.y = y;
	this.elem = '';
	this.capture = 0;
	
	batsMap[this.x+'_'+this.y] = this.id;

	if ( typeof Bat.initialized == "undefined" ) {
		Bat.prototype.creerDOM = function() {
			this.elem = document.createElement("div");
			document.getElementById("bats_container").appendChild(this.elem);
			var position = $('#over_'+this.x+'_'+this.y).position();
			$(this.elem).attr('id', 'bat_'+this.id).addClass('bats '+this.team.color+'').css({
				'background': 'url(images/bats/'+this.team.color+'/'+this.type+'.png)',
				'left': position.left,
				'top' : position.top
			});
		}
		Bat.prototype.updateCapture = function(value) {
			this.capture = this.capture + value;
			if(this.capture >= 20){
				// on change la team le possedant
			}
		}
		Bat.prototype.resetCapture = function() {
			this.capture = 0;
		}
		Bat.initialized = true;
	}
	this.creerDOM();

}
// class Unit
function Unit(team, type, x, y, active, spec) {
	this.id = units.length;
	this.team = team;
	this.team.units.push(this);

	this.type = type.toLowerCase();
	this.x = x;
	this.y = y;
	this.active = active;
	this.isTransporting = false;
	this.spec = spec;
	
	this.pictoEssence = false;
	this.pictoTransport = false;
	
	this.elem = ''; // DOM créé en bas.
		
	unitsMap[this.x+'_'+this.y] = this.id;

	if ( typeof Unit.initialized == "undefined" ) 
	{
		Unit.prototype.creerDOM = function() {
			this.elem = document.createElement("div");
			document.getElementById("units_container").appendChild(this.elem);
			if(this.active){a=''}else{a='_down'}
			this.updatePositionVisuelle([this.x,this.y]);
			
			$(this.elem).attr('id', 'unit_'+this.id).addClass('units '+this.team.color+'').css({
				'background': 'url(images/units/'+this.team.color+'/'+this.type+''+a+'.gif)'
			});
		}
		Unit.prototype.detruireUnite = function() {
			$(this.elem).remove();
			delete unitsMap[this.x+'_'+this.y];
			for(j=0;j<this.team.units.length;j++)// pas super tout ça
			{
				if(this.team.units[j].id == this.id){
					var v = j;
				}
			}
			this.team.units.splice(v,1);
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
		Unit.prototype.updatePositionVisuelle = function(newCoord) {
			var position = $('#over_'+newCoord[0]+'_'+newCoord[1]).position();
			$(this.elem).css({
				'left': position.left,
				'top' : position.top
			});
		}
 		Unit.prototype.updateEssence = function(value) {
			this.spec.essence = this.spec.essence - value;
			if(this.spec.essence<=0){
				this.updateActive(false);
			}
			if(this.spec.essence<=10 && !this.pictoEssence){
				$(this.elem).append('<img class="pictoEssence" src="images/pictos/essence.gif"/>');
				this.pictoEssence = true;

			}
		}
 		Unit.prototype.updateAmmo = function(value) {
			// a faire
		}
	 	Unit.prototype.hasPictoVie = function() {
			if($('#pictoVie_'+this.id).length == 0){
				return false;
			}
			else{
				 return true;
			}

		}
 		Unit.prototype.updateVie = function(value) {
			ancienne_valeur = this.spec.vie;
			this.spec.vie = this.spec.vie - value;
			if(this.spec.vie<=10){
				//pour le test en ligne, on empeche la destruction de l'unite
				this.spec.vie = 20;
				$('#pictoVie_'+this.id).remove();
				this.updateVie(0);
				//this.detruireUnite();
			}
			else if(this.spec.vie<100 && !this.hasPictoVie()){
				//$(this.elem) ne marche pas ici... (firefox);  à retester
				$('#unit_'+this.id+'').append('<div id="pictoVie_'+this.id+'" class="pictoVie petitsChiffres n_'+Math.floor(this.spec.vie/10)+'"></div>');
			}
			else if(this.spec.vie<100 && this.hasPictoVie()){
				$('#pictoVie_'+this.id).attr('class', 'pictoVie petitsChiffres n_'+Math.floor(this.spec.vie/10));
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
		Unit.prototype.updateTransport = function(newValue) {
			this.isTransporting = newValue;
			if(this.pictoTransport && !newValue){
				$('#pictoTransport_'+this.id).remove();
				this.pictoTransport = false;
			}
			if(!this.pictoTransport && newValue){
				$(this.elem).append('<img id="pictoTransport_'+this.id+'" class="pictoTransport" src="images/pictos/transport.gif"/>');
				this.pictoTransport = true;
			}
		}
		Unit.initialized = true;
	}
	this.creerDOM();
}	

var units = new Array();
var teams = new Array();
var bats = new Array();
var unitsMap = new Array();		
var batsMap = new Array();		

$(document).ready(function(){
	//def Teams :
	teams[0] = new Team(0, 'blue', 'Max');
	teams[1] = new Team(1, 'red', 'Jeanne');
	teams[2] = new Team(2, 'gray', '');// batiments neutres
	
	//def Units	
	/*	
	units.push(new Unit( teams[1], 'recon', 10, 0, true, $.extend(true, {}, BDD.Unites.Recon)));
	units.push(new Unit( teams[1], 'tank', 10, 1, true, $.extend(true, {}, BDD.Unites.Tank)));
	units.push(new Unit( teams[1], 'lmiss', 11, 1, true, $.extend(true, {}, BDD.Unites.Lmiss)));
	units.push(new Unit( teams[1], 'bazooka', 10, 2, true, $.extend(true, {}, BDD.Unites.Bazooka)));
	units.push(new Unit( teams[1], 'infantry', 11, 2, true, $.extend(true, {}, BDD.Unites.Infantry)));
	units.push(new Unit( teams[1], 'vtb', 11, 3, true, $.extend(true, {}, BDD.Unites.Vtb)));
	*/
	units.push(new Unit( teams[0], 'recon', 1, 10, true, $.extend(true, {}, BDD.Unites.Recon)));
	units.push(new Unit( teams[0], 'tank', 1, 9, true, $.extend(true, {}, BDD.Unites.Tank)));
	units.push(new Unit( teams[0], 'lmiss', 2, 9, true, $.extend(true, {}, BDD.Unites.Lmiss)));
	units.push(new Unit( teams[0], 'bazooka', 2, 10, true, $.extend(true, {}, BDD.Unites.Bazooka)));
	units.push(new Unit( teams[0], 'infantry', 4, 6, true, $.extend(true, {}, BDD.Unites.Infantry)));
	units.push(new Unit( teams[0], 'vtb', 4, 10, true, $.extend(true, {}, BDD.Unites.Vtb)));
	
	//def Bats
	bats[0] = new Bat(0, teams[2], 'ville', 3, 6);
	//bats[1] = new Bat(1, teams[1], 'usine', 13, 2);

});