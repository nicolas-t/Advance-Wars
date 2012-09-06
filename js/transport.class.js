function Transport(unit, voyageur) {
	this.unit = unit;
	this.voyageur = voyageur;
	this.voyageurSave = '';
	this.casesDepot = [];
	if ( typeof Transport.initialized == "undefined" ) {
		Transport.prototype.ajouterVoyageur = function() {
			if(!this.unit.isTransporting){
				this.voyageurSave = $.extend(true, {}, this.voyageur);
				this.unit.updateTransport(true);

				this.voyageur.detruireUnite();
				unitsMap[this.unit.x+'_'+this.unit.y] = this.unit.id;
				
			}
			else{
				// vehicule plein
			}
		}
		Transport.prototype.deposerVoyageur = function(coord) {
			if(this.unit.isTransporting){
				// en désordre
				units[this.voyageurSave.id] = this.voyageurSave;
				this.voyageur = this.voyageurSave;

				this.voyageur.x = coord[0];
				this.voyageur.y = coord[1];

				unitsMap[this.voyageur.x+'_'+this.voyageur.y] = this.voyageur.id;

				this.unit.team.units.push(units[this.voyageur.id]);
				this.voyageur.creerDOM();
				this.voyageur.pictoVie = false;
				this.voyageur.pictoEssence = false;
				this.voyageur.updateVie(0);
				this.voyageur.updateEssence(0);
				$('#menuBox #wait').trigger('click');
				this.unit.updateTransport(false);
			}
			else{
				// vehicule vide
			}
		}
		Transport.prototype.calculDepot = function(newX, newY, k, lim) {
			if(this.voyageur.spec.c_avancement[map['hip'][newX+'_'+newY]])
			{
				if($.inArray(newX+'_'+newY, this.casesDepot) == -1){
					this.casesDepot.push(newX+'_'+newY);
					$('#deplacement_'+newX+'_'+newY).css('background','red');
				}
			}
			this.depotQuatresDirections(newX, newY, k+1, lim);
		}		
		Transport.prototype.depotQuatresDirections = function(x, y, k, lim) {
			if(k<lim)
			{
				var xp = x + 1;
				var xm = x - 1;
				var yp = y + 1;
				var ym = y - 1;

				if(xm >= 0 ){
					this.calculDepot(xm,y,k,lim);
				}
				if(ym >= 0 ){
					this.calculDepot(x,ym,k,lim);
				}
				if(xp <= maxX ){
					this.calculDepot(xp,y,k,lim);
				}
				if(yp <= maxY ){
					this.calculDepot(x,yp,k,lim);
				}
			}
		}
		Transport.prototype.getDepot = function() {
			this.casesDepot = [];
			this.depotQuatresDirections(this.unit.x, this.unit.y, 0, 1);
		}
		Transport.prototype.isDepot = function(coord) {
			if($.inArray(coord[0]+'_'+coord[1], this.casesDepot) == -1 || unitsMap[coord[0]+'_'+coord[1]] !== undefined){
				return false;
			}
			else{
				return true;
			}

		}
		

		Transport.initialized = true;
	}
}