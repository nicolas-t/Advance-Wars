// fichier à ranger ... vraiment

function Game(map, team) {
	this.map = map;
	this.team = team;
	this.caseSurvolee = [];
	this.selectedUnitID = '';
	this.choixChemin = false;
	this.choixCible = false;
	this.choixDepot = false;
	
	this.canvasSave = '';
	this.canvas = document.getElementById("canvasMap");
	this.image = document.getElementById("canvasSource");
	this.context = this.canvas.getContext("2d");
	this.warfogTotal = '';
	this.warfog = '';
	var that = this;


	$('#over_layer td')
	.on('mouseenter',function(){
		that.caseSurvolee = getXY($(this).attr('id'));
		that.placementCurseur(this);
		
		if(that.choixCible){
			that.choixCurseur(this);
		}
		if(that.choixChemin){
			deplacement.findChemin(that.caseSurvolee[0],that.caseSurvolee[1]);
		}
	})
	.on('click',function(){		
		if(that.choixChemin){
			if(deplacement.pointValide(that.caseSurvolee[0],that.caseSurvolee[1]))
			{
				if(that.isUnit() && that.isAllie()){					
					if(units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].spec.canTransport !== undefined && units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].spec.canTransport[units[that.selectedUnitID].type] == true){
						//array ?
						transport = new Transport(units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]],units[that.selectedUnitID]);
						transport.ajouterVoyageur();
						$('#menuBox #wait').trigger('click');
					}
				}
				else{
					deplacement.deplacementVisuel();
					that.choixChemin = false;
				}
			}
		}
		else if(that.choixCible){
			if(tir.isCible(that.caseSurvolee))
			{
				tir.faireFeu(units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]]);
				that.choixCible = false;
			}
		}
		else if(that.choixDepot){
			if(transport.isDepot(that.caseSurvolee))
			{
				transport.deposerVoyageur(that.caseSurvolee);
				that.choixDepot = false;
			}
		}
		else{
			if(that.isUnit() && that.isAllie() && that.isActive() && $('#menuBox').is(':hidden'))
			{
				$('#menuBox').css('display', 'block');
				
				that.selectedUnitID = unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]];
				deplacement = new Deplacement(units[that.selectedUnitID]);
				deplacement.getPortee();
				that.choixChemin = true;
			}
		}
	});
	
	$('#jourBox	#nouveauJourBleu').click(function(){
		teams[0].nouveauJour();
	});
	
	//MENU 
	$('#menuBox #wait').on('click',function(){
		$('#deplacement_layer td').css('background','');
		$('#menuBox').css('display', 'none');
		deplacement.confirme();
		that.choixCible = false;
		that.choixChemin = false;
		that.warfog.recalcul();

	});
	$('#menuBox #attack').on('click',function(){
		$('#deplacement_layer td').css('background','');
		that.choixCible = true;	
		that.choixChemin = false;	
		tir = new Tir(units[that.selectedUnitID]);
		tir.getPortee();
		tir.getCibles();

	});
	$('#menuBox #decharge').on('click',function(){
		that.choixDepot = true;
		transport.getDepot();
	});

	$('#menuBox #cancel').on('click',function(){
		$('#menuBox').css('display', 'none');
		deplacement.cancel();
		that.choixCible = false;
		that.choixChemin = false;
		game.loadLastCanvas();

	});

	if ( typeof Game.initialized == "undefined" ) {
		Game.prototype.afficherCarte = function() {
			this.context.drawImage(this.image, 0, 0);
			var imgd = this.context.getImageData(0, 0, 256, 176);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]-110; 
				pix[i+1] = pix[i+1]-100; 	
				pix[i+2] = pix[i+2]-60; 	
			}
			this.context.putImageData(imgd, 0, 0);
			this.warfogTotal = $.extend(true, {}, this.context.getImageData(0, 0, 256, 176));
			this.warfog = new Warfog(this.team);
			this.warfog.afficherVue();
			
		}
		Game.prototype.debrouilleWarfog = function(coord) {
			var imgd = this.context.getImageData(16*coord[0], 16*coord[1], 16, 16);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]+110; 
				pix[i+1] = pix[i+1]+100; 	
				pix[i+2] = pix[i+2]+60; 	
			}
			this.context.putImageData(imgd, 16*coord[0], 16*coord[1]);
		}
		
		Game.prototype.saveCanvas = function() {
			this.canvasSave = $.extend(true, {}, this.context.getImageData(0, 0, 256, 176));
		}
		Game.prototype.loadLastCanvas = function() {
			this.context.putImageData(this.canvasSave, 0, 0);
		}
		Game.prototype.porteeDeplacementVisu = function(x,y) {
			var imgd = this.context.getImageData(16*x, 16*y, 16, 16);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]+40; 
				pix[i+1] = pix[i+1]+60; 	
				pix[i+2] = pix[i+2]+60; 	
			}
			this.context.putImageData(imgd, 16*x, 16*y);
		}
		Game.prototype.placementCurseur = function(e) {
			position = $(e).position();
			$('#cursor').css({'left': position.left, 'top': position.top});
		}
		Game.prototype.choixCurseur = function(e) {
			if($(e).hasClass('cible')){
				$('#cursor').attr('class', 'cursorFire');
				$('#degatsBox').html('<img src="images/pictos/degats.gif" /> Dégâts : '+tir.degats[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]+'%');
			}
			else{
				$('#cursor').attr('class', 'cursorSelect');
			}
		}
		Game.prototype.isAllie = function() {
			if(units[unitsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]]].team.id == that.team.id){
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
		Game.prototype.isActive = function() {
			return units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].active;
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
