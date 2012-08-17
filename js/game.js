function Game(map, team) {
	this.map = map;
	this.team = team;
	this.caseSurvolee = [];
	this.selectedUnitID = '';
	this.choixChemin = false;
	this.choixCible = false;
	var that = this;
	
	$('#over_layer td').on('mouseenter',function(){
		that.caseSurvolee = getXY($(this).attr('id'));
		that.placementCurseur(this);
		
		if(that.choixCible){
			that.choixCurseur(this);
		}
		if(that.choixChemin){
			deplacement.findChemin(that.caseSurvolee[0],that.caseSurvolee[1]);
			return false;// ?
		}
	});
	$('#over_layer td').on('click',function(){
		if(that.isUnit()){
			// c'est une unité;
			if(that.choixCible && !that.isAllie()){
				console.log('a l\'attaque');
			}
			else{
				if($('#menuBox').is(':hidden')){
					that.selectedUnitID = unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]];
					if(units[that.selectedUnitID].active){
						that.team = units[that.selectedUnitID].team.id;
						deplacement = new Deplacement(units[that.selectedUnitID]);
						$('#menuBox').css('display', 'block');
						deplacement.getPortee();
						that.choixChemin = true;
					}
				}
			}
		}
		else if(that.isBat()){
			// c'est un batiment
		}
		else{
			// c'est la map
			if(that.choixChemin)
			{
				if(that.map[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]['c_avancement'][units[that.selectedUnitID].type])
				{
					if(deplacement.pointValide(that.caseSurvolee[0],that.caseSurvolee[1])){
						deplacement.deplacementVisuel();
						that.choixChemin = false;
					}
				}
			}
		}
	});

	$('#jourBox	#nouveauJourRouge').click(function(){
		teams[0].nouveauJour();
	});
	$('#jourBox	#nouveauJourBleu').click(function(){
		teams[1].nouveauJour();
	});
	
	//MENU 
		$('#menuBox a').click(function(){
		if($(this).attr('id') == 'attack'){
			$('#deplacement_layer td').css('background','');
			that.choixCible = true;	
			that.choixChemin = false;	
			tir = new Tir(units[that.selectedUnitID]);
			tir.getPortee();
			tir.getCibles();
		}
		else if($(this).attr('id') == 'wait'){
			$('#deplacement_layer td').css('background','');
			$('#menuBox').css('display', 'none');
			deplacement.confirme();
			that.choixCible = false;
		}
		else if($(this).attr('id') == 'cancel'){
			$('#menuBox').css('display', 'none');
			deplacement.cancel();
			that.choixCible = false;
		}

	});
	if ( typeof Game.initialized == "undefined" ) {
		Game.prototype.afficherCarte = function() {
			$('#map_layer td').each(function(index) {
			   $(this).css('background-image','url("images/'+that.map[$(this).attr('id')]["sprite"]+'")'); 
			});
		}
		Game.prototype.placementCurseur = function(e) {
			position = $(e).position();
			$('#cursor').css({'left': position.left, 'top': position.top});
		}
		Game.prototype.choixCurseur = function(e) {
			if($(e).hasClass('cible')){
				$('#cursor').attr('class', 'cursorFire');
			}
			else{
				$('#cursor').attr('class', 'cursorSelect');
			}
		}
		Game.prototype.isAllie = function() {
			if(units[unitsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]]].team.id == that.team){
				return true;
			}
			else{
				return false;
			}
		}
		Game.prototype.isUnit = function() {
			if(unitsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]] !== undefined){
				return true;
			}
			else{
				return false;
			}
		}
		Game.prototype.isBat = function() {
			if(batsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]] !== undefined){
				return true;
			}
			else{
				return false;
			}
		}		
		Game.initialized = true;
	}
}
