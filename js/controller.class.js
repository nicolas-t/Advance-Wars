// fichier à ranger ... vraiment

function Controller(map, team) {
	this.map                  = map;
	this.team                 = team;
	this.caseSurvolee         = [];
	this.selectedUnit         = '';
	this.clickedTransportUnit = false;
	this.choixChemin          = false;
	this.choixCible           = false;
	this.choixDepot           = false;
	
	this.tir       = false;
	this.transport = [];
	
	this.whosPlaying = 0;
	this.canvasSave  = '';
	this.canvas      = document.getElementById("canvasMap");
	this.image       = document.getElementById("canvasSource");
	this.context     = this.canvas.getContext("2d");
	this.warfog      = '';
	var that         = this;

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
				if(that.isUnit() && that.isAllie() && units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].spec.canTransport !== undefined && units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].spec.canTransport[that.selectedUnit.type] == true){
					that.clickedTransportUnit = unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]];
					
					deplacement.deplacementVisuel();
					that.choixChemin = false;
				}
				else if(!that.isUnit()){//empeche déplacement visuel sur une unité...
					deplacement.deplacementVisuel();
					that.choixChemin = false;
				}
				that.gestionMenu();
			}
		}
		else if(that.choixCible){

			if(that.tir.isCible(that.caseSurvolee))
			{
				that.tir.faireFeu(units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]]);
				that.choixCible = false;
			}
		}
		else if(that.choixDepot){

			if(that.transport[that.selectedUnit.id].isDepot(that.caseSurvolee))
			{
				that.transport[that.selectedUnit.id].deposerVoyageur(that.caseSurvolee);
				that.choixDepot = false;
			}
		}
		else{
			if(that.isUnit() && that.isAllie() && that.isActive() && $(document.getElementById('menuBox')).is(':hidden'))
			{
				$(document.getElementById('menuBox')).css('display', 'block');
				that.selectedUnit = units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]];
				that.selectedUnit.updateCapture(false);
				deplacement = new Deplacement(that.selectedUnit);
				deplacement.getPortee();
				that.choixChemin = true;
				that.gestionMenu();
			}
			else if(that.isBat([that.caseSurvolee[0],that.caseSurvolee[1]]) && !that.isUnit() && that.isBatAllie([that.caseSurvolee[0],that.caseSurvolee[1]])){
				$(document.getElementById('menuBox')).html('');
				id = batsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]];
				for(key in BDD.Unites){
					if(bats[id].type == BDD.Unites[key].fabrication)
					{
						$(document.getElementById('shopBox')).append('<img src="images/units/'+that.team.color+'/'+key.toLowerCase()+'.gif" /><a id="shop_'+key+'" href="#"> '+key+'</a> :<span> '+BDD.Unites[key].cout+'</span><br />');
						$(document.getElementById('shop_'+key)).on('click', { a: key }, function(event){
							c = units.push(new Unit(that.team, event.data.a, bats[id].x, bats[id].y, false, $.extend(true, {}, BDD.Unites[event.data.a])));
							$(units[c-1].elem).css('display','block');
							$(document.getElementById('shopBox')).html('');
							that.warfog.recalcul();
						});
					}
				}
			}
		}
	});
	
	$(document.getElementById('finJour')).click(function(){
		/* mode sync : */
		if(modeSync){
			if(that.whosPlaying == myTeam){
				teams[myTeam].finJour();
			}
		}
		else{
		/* mode dev : */
			teams[myTeam].finJour();
			teams[myTeam].debutJour();
		}
	});
	
	//MENU 
	$(document.getElementById('wait')).on('click',function(){
		$('#deplacement_layer td').css('background','');
		$('#trace_layer td').attr('class','');	
		$(document.getElementById('menuBox')).css('display', 'none');
		deplacement.confirme();
		
		that.warfog.recalcul();
		that.choixCible           = false;
		that.choixChemin          = false;
		that.clickedTransportUnit = false;

	});
	$(document.getElementById('capture')).on('click',function(){
		that.selectedUnit.updateCapture(true);
		var bat = bats[batsMap[that.selectedUnit.x+'_'+that.selectedUnit.y]]
		bat.updateCapture(Math.floor(that.selectedUnit.spec.vie/10));
		$(document.getElementById('wait')).trigger('click');
	});
	$(document.getElementById('attack')).on('click',function(){
		$('#deplacement_layer td').css('background','');
		that.choixCible = true;	
		that.choixChemin = false;
		that.tir.afficherCibles();
	});
	$(document.getElementById('decharge')).on('click',function(){
		that.choixDepot = true;
		that.choixChemin = false;
		that.transport[that.selectedUnit.id].getDepot();
	});
	$(document.getElementById('charge')).on('click',function(){
		that.choixChemin = false;
		that.transport[that.clickedTransportUnit].ajouterVoyageur();
		$('#menuBox #wait').trigger('click');
	});

	$(document.getElementById('cancel')).on('click',function(){
		$(document.getElementById('menuBox')).css('display', 'none');
		deplacement.cancel();
		that.choixCible = false;
		that.choixChemin = false;
		that.clickedTransportUnit = false;
		controller.loadLastCanvas();

	});

	if ( typeof Controller.initialized == "undefined" ) {
		Controller.prototype.afficherCarte = function() {
			this.context.drawImage(this.image, 0, 0);
			var imgd = this.context.getImageData(0, 0, 256, 176);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]-100; 
				pix[i+1] = pix[i+1]-90; 	
				pix[i+2] = pix[i+2]-50; 	
			}
			this.context.putImageData(imgd, 0, 0);
			this.warfog = new Warfog(this.team);
			this.warfog.warfogTotal =  this.context.getImageData(0, 0, 256, 176);
			this.warfog.afficherVue();
		}
		Controller.prototype.debrouilleWarfog = function(coord) {
			var imgd = this.context.getImageData(16*coord[0], 16*coord[1], 16, 16);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]+100; 
				pix[i+1] = pix[i+1]+90; 	
				pix[i+2] = pix[i+2]+50; 	
			}
			this.context.putImageData(imgd, 16*coord[0], 16*coord[1]);
		}
		
		Controller.prototype.saveCanvas = function() {
			this.canvasSave = this.context.getImageData(0, 0, 256, 176);
		}
		Controller.prototype.loadLastCanvas = function() {
			this.context.putImageData(this.canvasSave, 0, 0);
		}
		Controller.prototype.porteeDeplacementVisu = function(x,y) {

			var imgd = this.context.getImageData(16*x, 16*y, 16, 16);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]+40; 
				pix[i+1] = pix[i+1]+60; 	
				pix[i+2] = pix[i+2]+60; 	
			}
			this.context.putImageData(imgd, 16*x, 16*y);
		}
		Controller.prototype.gestionMenu = function() {
			
			/*générer un menu adapté aux actions possibles*/
			/*en fonction de l'unit, et de sa position*/
			
			$('#menuBox a').not('#cancel, #wait').hide();
			unitCoord = [that.selectedUnit.x,that.selectedUnit.y];
			//capture
			if(that.isBat(unitCoord) && !that.isBatAllie(unitCoord) && that.selectedUnit.spec.canCapture !== undefined  && that.selectedUnit.spec.canCapture == true){
				$(document.getElementById('capture')).show();
				$(document.getElementById('wait')).show();
			}
			//tir
			that.tir = new Tir(that.selectedUnit);
			that.tir.getPortee();
			that.tir.getCibles();
			if(that.tir.cibles.length){
				$(document.getElementById('attack')).show();
				$(document.getElementById('wait')).show();		
			}
			//charge
			if(that.clickedTransportUnit){
				that.transport[that.clickedTransportUnit] = new Transport(units[that.clickedTransportUnit],that.selectedUnit);
				$(document.getElementById('charge')).show();
				$(document.getElementById('wait')).hide();
			}
			//decharge; affiné en vérifiant la présence de points de dépot ?
			if(that.selectedUnit.isTransporting){
				$(document.getElementById('decharge')).show();
				$(document.getElementById('wait')).show();	
			}
		}
		Controller.prototype.placementCurseur = function(e) {
			position = $(e).position();
			$(document.getElementById('cursor')).css({'left': position.left, 'top': position.top});
		}
		Controller.prototype.choixCurseur = function(e) {
			if($(e).hasClass('cible')){
				$(document.getElementById('cursor')).attr('class', 'cursorFire');
				$(document.getElementById('degatsBox')).html('<img src="images/pictos/degats.gif" /> Dégâts : '+Math.round(that.tir.degats[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]])+'%');
			}
			else{
				$(document.getElementById('cursor')).attr('class', 'cursorSelect');
			}
		}
		Controller.prototype.isAllie = function() {
			if((units[unitsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]]].team.id == that.team.id)){
				return true;
			}
			else{
				return false;
			}
		}
		Controller.prototype.isBat = function(coord) {
			if(batsMap[coord[0]+'_'+coord[1]] !== undefined){
				return true;
			}
			else{
				return false;
			}
		}
		Controller.prototype.isBatAllie = function(coord) {
			if((bats[batsMap[coord[0]+'_'+coord[1]]].team.id == that.team.id)){
				return true;
			}
			else{
				return false;
			}
		}
		Controller.prototype.isUnit = function() {
			if(unitsMap[this.caseSurvolee[0]+'_'+this.caseSurvolee[1]] !== undefined){
				return true;
			}
			else{
				return false;
			}
		}
		Controller.prototype.isActive = function() {
			return units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]].active;
		}
	
		Controller.initialized = true;
	}
}
