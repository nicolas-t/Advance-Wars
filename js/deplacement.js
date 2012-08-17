function Deplacement(unit) {
	this.unit = unit;
	route = [];
	portee = [];
	cheminChoisi = [this.unit.x+'_'+this.unit.y];
	positionAvantConfirme = [];
	
	if ( typeof Deplacement.initialized == "undefined" ) {
		//function privées
		Deplacement.prototype.calculPorteeDeplacement = function(oldX, oldY, newX,newY,k,cheminparcouru) {
			if(this.unit.spec.c_avancement[map[nom_map][newX+'_'+newY]]){
				if($.inArray(newX+'_'+newY, cheminparcouru) == -1){
					var v = unitsMap[newX+'_'+newY];
					if((v == undefined) || (v !== undefined && (units[v].team.id == this.unit.team.id))){
						var arr = $.extend(true, [], cheminparcouru);
						portee[newX+'_'+newY] = [newX, newY];
						arr.push(newX+'_'+newY);
						this.deplacementQuatreDirection(newX, newY, k+this.unit.spec.c_avancement[map[nom_map][newX+'_'+newY]], arr);
					}
				}
			}
			else{
				route.push(cheminparcouru);
			}
		}
		Deplacement.prototype.afficherPorteeDeplacement = function() {
			game.saveCanvas();
			for(i in portee)
			{
				game.porteeDeplacementVisu(portee[i][0], portee[i][1]);
				//$('#deplacement_'+newX+'_'+newY).css('background','white');
			}
		}
		Deplacement.prototype.deplacementQuatreDirection = function(x,y,k,cheminparcouru) {
			if((k<this.unit.spec.deplacement) && (cheminparcouru.length <= this.unit.spec.essence))
			{
				var xp = x + 1;
				var xm = x - 1;
				var yp = y + 1;
				var ym = y - 1;
				
				if(xm >= 0 ){
					this.calculPorteeDeplacement(x,y,xm,y,k,cheminparcouru);
				}
				if(ym >= 0 ){
					this.calculPorteeDeplacement(x,y,x,ym,k,cheminparcouru);
				}
				if(xp <= maxX ){
					this.calculPorteeDeplacement(x,y,xp,y,k,cheminparcouru);
				}
				if(yp <= maxY ){
					this.calculPorteeDeplacement(x,y,x,yp,k,cheminparcouru);

				}
			}
			else{
				route.push(cheminparcouru);
			}
		}
		Deplacement.prototype.trajetCommencantPar = function(trajet,trajets,destination) {
			var retour = new Array();
			var keys = new Array();

			for(i=0;i<trajets.length;i++)
			{	
				var condition = 1;
				for(j=0;j<trajet.length;j++)
				{
					if(condition){
						if(trajets[i][j]==trajet[j]){
							if(j==(trajet.length - 1)){
								v = $.inArray(destination,trajets[i]);
								if(v>=0){
									retour[v] = trajets[i];
									keys.push(v);
								}
							}
						}
						else{
							condition = 0;
						}
					}
				}
			}
			index = keys.sort(tri_nombres).shift();
			return retour[index];
		}
		Deplacement.prototype.pointValide = function(x,y) {
			if($.inArray(x+'_'+y , cheminChoisi)>=0){
				return true;
			}
			else{
				return false;
			}
		}		
		Deplacement.prototype.routeLaPlusCourte = function(destX,destY)
		{
			var retour = new Array();
			var keys = new Array();
			
			for(var i= 0; i < route.length; i++)
			{	
				vdest = $.inArray(destX+'_'+destY,route[i]);
				if(vdest>=0){
					retour[vdest]=route[i];
					keys.push(vdest);			
				}
			}

			index = keys.sort(tri_nombres).shift();

			return retour[index];
		}	
		Deplacement.prototype.tracerChemin = function(destX,destY,w) {
			var sensB = false;
			var sensA = false;
			for(var i= 0; i<w-1; i++){
				
				coord1 = getXY( cheminChoisi[i]);
				coord2 = getXY( cheminChoisi[i+1]);
				coord3 = getXY( cheminChoisi[i+2]);
				elem = $('#trace_layer #trace_'+coord2[0]+'_'+coord2[1]);
				if(coord1[0] == coord2[0]){// x constant : vertical
				
					if(coord1[1]>coord2[1]){sensA="h";}
					else{sensA="b";}
					
					if(coord2[0] == coord3[0]){
						elem.css('background','url(images/trace_layer/ligne_v.gif)');
					}
					else if(coord2[1] == coord3[1]){
						if(coord2[0]>coord3[0]){sensB="d";}
						else{sensB="g";}
						elem.css('background','url(images/trace_layer/virage_'+sensA+'_'+sensB+'.gif)');
					}
				}
				else if(coord1[1] == coord2[1]){// y constant : horizontal
				
					if(coord1[0]>coord2[0]){sensA="g";}
					else{sensA="d";	}
					
					if(coord2[1] == coord3[1]){
							elem.css('background','url(images/trace_layer/ligne_h.gif)');
					}
					else if(coord2[0] == coord3[0]){
						if(coord2[1]>coord3[1]){sensB="b";}
						else{sensB="h";}
						elem.css('background','url(images/trace_layer/virage_'+sensB+'_'+sensA+'.gif)');
					}
				}
			}
			
			//la fleche
			lastElem = $('#trace_layer #trace_'+destX+'_'+destY);
			var inverse = [];
			inverse['h'] = 'b';
			inverse['b'] = 'h';
			inverse['g'] = 'd';
			inverse['d'] = 'g';
			if(sensB) {
				lastElem.css('background','url(images/trace_layer/fleche_'+inverse[sensB]+'.gif)');
			}
			else if(sensA){
				lastElem.css('background','url(images/trace_layer/fleche_'+sensA+'.gif)');
			}
			else{// trajet d'une case...
				origX = this.unit.x;
				origY = this.unit.y;

				if((destX == origX) && (destY > origY)){
					lastElem.css('background','url(images/trace_layer/fleche_b.gif)');
				}
				else if((destX == origX) && (destY < origY)){
					lastElem.css('background','url(images/trace_layer/fleche_h.gif)');
				}
				else if((destY == origY) && (destX > origX)){
					lastElem.css('background','url(images/trace_layer/fleche_d.gif)');
				}
				else if((destY == origY) && (destX < origX)){
					lastElem.css('background','url(images/trace_layer/fleche_g.gif)');
				}
			}

		}		
		//functions publiques
		Deplacement.prototype.getPortee = function() {
			$('#deplacement_layer td').css('background','');
			this.deplacementQuatreDirection(this.unit.x,this.unit.y,0,[this.unit.x+'_'+this.unit.y]);
			this.afficherPorteeDeplacement();
		}
		Deplacement.prototype.findChemin = function(destX,destY) {
			$('#trace_layer td').css('background', '');
			var trajetPassantPar = this.trajetCommencantPar(cheminChoisi,route,destX+'_'+destY);
			if( trajetPassantPar !== undefined ) {
				var w = $.inArray(destX+'_'+destY, trajetPassantPar );
				cheminChoisi = trajetPassantPar.slice(0,w+1);
				this.tracerChemin(destX,destY,w);
			}
			else{
				var routeCourte = this.routeLaPlusCourte(destX,destY);
				if( routeCourte !== undefined ) {
					var w = $.inArray(destX+'_'+destY, routeCourte);
					cheminChoisi = routeCourte.slice(0,w+1);
					this.tracerChemin(destX,destY,w);
				}
			}
		}
			
		Deplacement.prototype.deplacementVisuel = function() {
			var e = $(this.unit.elem);
			var cheminChoisi_length = cheminChoisi.length;
			for(j=0;j<=cheminChoisi_length;j++)
			{
				if(j == cheminChoisi_length){
					$('#trace_layer td').css('background', '');
					this.positionAvantConfirme = [this.unit.x, this.unit.y];
					this.unit.updatePosition(getXY(cheminChoisi[j-1]));
					this.unit.updateEssence(j-1);
				}
				else{
					position = $('#over_'+cheminChoisi[j]).position();
					 e.animate({
						"top" : position.top,
						"left": position.left
					  },
					  { queue: true, duration: 60, complete : /*efface le tracé rouge*/
						  (function(z){
								return function() {
									$('#trace_'+z).css('background', '');
								}
						  })(cheminChoisi[j])
					  }
					);
				}
			}
		}
		Deplacement.prototype.confirme = function() {
			this.unit.updateActive(false);
		}
		Deplacement.prototype.cancel = function() {
			this.unit.updatePosition(this.positionAvantConfirme);
			var position = $('#over_'+this.positionAvantConfirme[0]+'_'+this.positionAvantConfirme[1]).position();
			$('#deplacement_layer td').css('background','');
			$("#unit_"+this.unit.id).css({'top' : position.top,'left':position.left});
		}
		Deplacement.initialized = true;
	}
}