function Tir(unit) {
	this.unit=unit;
	this.cases=[];
	this.cases['max']=[];
	this.cases['min']=[];
	this.portee = [];
	this.cibles = [];
	this.degats = [];
	$('.cible').removeClass('cible');

	if ( typeof Tir.initialized == "undefined" ) {
		Tir.prototype.getPortee = function() {
			this.porteeQuatresDirections(this.unit.x,this.unit.y, 0, this.unit.spec.porteeTir.max,'max');	
			this.porteeQuatresDirections(this.unit.x,this.unit.y, 0, this.unit.spec.porteeTir.min,'min');
			for(var i =0; i < this.cases['max'].length; i++){
				if(($.inArray(this.cases['max'][i], this.cases['min']) == -1) && ($.inArray(this.cases['max'][i], this.portee) == -1)){
					this.portee.push(this.cases['max'][i]);
				}
			}
			
			return this.portee;
		}
		Tir.prototype.getCibles = function() {
			for(var i =0; i < this.portee.length; i++){
				var v = unitsMap[this.portee[i]];
				if((v !== undefined) && (units[v].team.id != this.unit.team.id ) ){
					this.cibles.push(this.portee[i]);
					this.degats[this.cases['max'][i]] = this.calculerDegats(this.unit, units[v]);

					$('#deplacement_'+this.portee[i]).css('background','blue');
					$('#over_'+this.portee[i]).addClass('cible');
				}
			}
			return this.portee;
		}
		Tir.prototype.calculPorteeTir = function(oldX, oldY, newX, newY, k, lim, arr) {
			if($.inArray(newX+'_'+newY, arr) == -1){
				this.cases[arr].push(newX+'_'+newY);
			}
			this.porteeQuatresDirections(newX, newY, k+1, lim, arr);
		}

		Tir.prototype.porteeQuatresDirections = function(x, y, k, lim, arr) {
			if(k<lim)
			{
				var xp = x + 1;
				var xm = x - 1;
				var yp = y + 1;
				var ym = y - 1;

				if(xm >= 0 ){
					this.calculPorteeTir(x,y,xm,y,k,lim,arr);
				}
				if(ym >= 0 ){
					this.calculPorteeTir(x,y,x,ym,k,lim,arr);
				}
				if(xp <= maxX ){
					this.calculPorteeTir(x,y,xp,y,k,lim,arr);
				}
				if(yp <= maxY ){
					this.calculPorteeTir(x,y,x,yp,k,lim,arr);

				}
			}
		}
		Tir.prototype.calculerDegats = function(attaquant, defendant) {

			if(attaquant.spec.munition.primAmmo>0 || attaquant.spec.munition.primAmmo == 'inf'){
				var i = this.unit.spec.attaque.primAmmo[defendant.type];
			}
			else if(this.unit.spec.munition.secAmmo>0 || attaquant.spec.munition.secAmmo == 'inf'){
				var i = attaquant.spec.attaque.secAmmo[defendant.type];
			}
			else{
				// plus de munition
				var i = 0;
			}
			
			var b = 100; // CO attaquant bonus attaque
			var d = 100; // CO defendant bonus defense
			var a = Math.floor(attaquant.spec.vie/10);
			var h = 10 - Math.floor(defendant.spec.vie/10);
			var r = decors[map['hip'][defendant.x+'_'+defendant.y]]['c_defense'];
			var c = (i * b / d) * a * 0.1;
			var d = c - (r * ((c * 0.1) - (c * 0.1 * h)));
			if(d<0){d=0;}
			return d;

		}
		Tir.prototype.faireFeu = function(adversaire) {
			// l'attaquant attaque
			adversaire.updateVie(this.degats[adversaire.x+'_'+adversaire.y]);
			this.unit.updateAmmo();
			// le défenseur replique
			this.unit.updateVie(this.calculerDegats(adversaire, this.unit));
			adversaire.updateAmmo();
			$('#wait').trigger('click');
			$('#cursor').attr('class', 'cursorSelect');
		}
		Tir.prototype.isCible = function(caseSurvolee) {
			if($.inArray(caseSurvolee[0]+'_'+caseSurvolee[1], this.cibles)>=0){
				return true;
			}
			else{
				return false;
			}
		}
		Tir.initialized = true;
	}
}
