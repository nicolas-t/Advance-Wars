// fichier à ranger ... vraiment

function Controller(map, team) {
	this.map = map;
	this.team = team;
	this.caseSurvolee = [];
	this.selectedUnit = '';
	this.clickedTransportUnit = false;
	this.choixChemin = false;
	this.choixCible = false;
	this.choixDepot = false;
	
	this.tir = false;
	this.transport =[];
	
	this.whosPlaying = 0;
	this.canvasSave = '';
	this.canvas = document.getElementById("canvasMap");
	this.image = document.getElementById("canvasSource");
	this.context = this.canvas.getContext("2d");
	this.warfog = '';
	var that = this;

	// mode sync : on initialise le rafraichissement :
	//this.refresh = new Refresh(1000);


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
			if(that.isUnit() && that.isAllie() && that.isActive() && $('#menuBox').is(':hidden'))
			{
				$('#menuBox').css('display', 'block');
				that.selectedUnit = units[unitsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]]];
				that.selectedUnit.updateCapture(false);
				deplacement = new Deplacement(that.selectedUnit);
				deplacement.getPortee();
				that.choixChemin = true;
				that.gestionMenu();
			}
			else if(that.isBat([that.caseSurvolee[0],that.caseSurvolee[1]]) && !that.isUnit() && that.isBatAllie([that.caseSurvolee[0],that.caseSurvolee[1]])){
				$('#shopBox').html('');
				id = batsMap[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]];
				for(key in BDD.Unites){
					if(bats[id].type == BDD.Unites[key].fabrication)
					{
						$('#shopBox').append('<img src="images/units/'+that.team.color+'/'+key.toLowerCase()+'.gif" /><a id="shop_'+key+'" href="#"> '+key+'</a> :<span> '+BDD.Unites[key].cout+'</span><br />');
						$('#shop_'+key).on('click', { a: key }, function(event){
							c = units.push(new Unit(that.team, event.data.a, bats[id].x, bats[id].y, false, $.extend(true, {}, BDD.Unites[event.data.a])));
							$(units[c-1].elem).css('display','block');
							$('#shopBox').html('');
							that.warfog.recalcul();
						});
					}
				}
			}
		}
	});
	
	$('#jourBox	#finJour').click(function(){
		/* mode sync :
		if(that.whosPlaying == myTeam){
			teams[myTeam].finJour();
		}
		*/
		/* mode dev : */
		teams[myTeam].finJour();
		teams[myTeam].debutJour();
	});
	
	//MENU 
	$('#menuBox #wait').on('click',function(){
		$('#deplacement_layer td').css('background','');
		$('#trace_layer td').attr('class','');	
		$('#menuBox').css('display', 'none');
		deplacement.confirme();
		that.choixCible = false;
		that.choixChemin = false;
		that.clickedTransportUnit = false;
		that.warfog.recalcul();

	});
	$('#menuBox #capture').on('click',function(){
		that.selectedUnit.updateCapture(true);
		var bat = bats[batsMap[that.selectedUnit.x+'_'+that.selectedUnit.y]]
		bat.updateCapture(Math.floor(that.selectedUnit.spec.vie/10));
		$('#menuBox #wait').trigger('click');
	});
	$('#menuBox #attack').on('click',function(){
		$('#deplacement_layer td').css('background','');
		that.choixCible = true;	
		that.choixChemin = false;
		that.tir.afficherCibles();
	});
	$('#menuBox #decharge').on('click',function(){
		that.choixDepot = true;
		that.choixChemin = false;
		that.transport[that.selectedUnit.id].getDepot();
	});
	$('#menuBox #charge').on('click',function(){
		that.choixChemin = false;
		that.transport[that.clickedTransportUnit].ajouterVoyageur();
		$('#menuBox #wait').trigger('click');
	});

	$('#menuBox #cancel').on('click',function(){
		$('#menuBox').css('display', 'none');
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
				$('#menuBox #capture').show();
				$('#menuBox #wait').show();
			}
			//tir
			that.tir = new Tir(that.selectedUnit);
			that.tir.getPortee();
			that.tir.getCibles();
			if(that.tir.cibles.length){
				$('#menuBox #attack').show();
				$('#menuBox #wait').show();		
			}
			//charge
			if(that.clickedTransportUnit){
				that.transport[that.clickedTransportUnit] = new Transport(units[that.clickedTransportUnit],that.selectedUnit);
				$('#menuBox #charge').show();
				$('#menuBox #wait').hide();
			}
			//decharge; affiné en vérifiant la présence de points de dépot ?
			if(that.selectedUnit.isTransporting){
				$('#menuBox #decharge').show();
				$('#menuBox #wait').show();	
			}
		}
		Controller.prototype.placementCurseur = function(e) {
			position = $(e).position();
			$('#cursor').css({'left': position.left, 'top': position.top});
		}
		Controller.prototype.choixCurseur = function(e) {
			if($(e).hasClass('cible')){
				$('#cursor').attr('class', 'cursorFire');
				$('#degatsBox').html('<img src="images/pictos/degats.gif" /> Dégâts : '+Math.round(that.tir.degats[that.caseSurvolee[0]+'_'+that.caseSurvolee[1]])+'%');
			}
			else{
				$('#cursor').attr('class', 'cursorSelect');
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
