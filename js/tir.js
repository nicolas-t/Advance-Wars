function Tir(unit) {
	this.unit=unit;
	this.cases=[];
	this.cases['max']=[];
	this.cases['min']=[];
	this.portee = [];
	this.cibles = [];
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
					this.cibles.push(this.portee[i][i]);
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
		Tir.initialized = true;
	}
}
