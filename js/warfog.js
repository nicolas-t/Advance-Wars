function Warfog(team) {
	this.team = team;
	this.vue = [];
	this.warfogTotal = '';
	if (typeof Warfog.initialized == "undefined" ) {

		
		Warfog.prototype.complet = function() {
			var imgd = game.context.getImageData(0, 0, 256, 176);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]-110; 
				pix[i+1] = pix[i+1]-100; 	
				pix[i+2] = pix[i+2]-60; 	
			}
			game.context.putImageData(imgd, 0, 0);
			this.warfogTotal = $.extend(true, {}, game.context.getImageData(0, 0, 256, 176));
		}
		Warfog.prototype.debrouille = function(coord) {
			var imgd = game.context.getImageData(16*coord[0], 16*coord[1], 16, 16);
			var pix = imgd.data;
			for (var i = 0, n = pix.length; i < n; i += 4) {
				pix[i ] = pix[i]+110; 
				pix[i+1] = pix[i+1]+100; 	
				pix[i+2] = pix[i+2]+60; 	
			}
			game.context.putImageData(imgd, 16*coord[0], 16*coord[1]);
		}
		Warfog.prototype.adversairesVisibles = function() {
			for(var i=0; i < teams.length; i++){
				if(i != this.team.id){
					for(var j=0; j < teams[i].units.length; j++){
						console.log(teams[i].units[j]);
					}
				}
			}
		}
		Warfog.prototype.recalcul = function() {
			game.context.putImageData(this.warfogTotal, 0, 0);
			this.afficherVue();
		}
		Warfog.prototype.afficherVue = function() {
			this.getVue();
			for(var i=0; i < this.vue.length; i++){
				if(unitsMap[this.vue[i]] !== undefined){
					$(units[unitsMap[this.vue[i]]].elem).css('display', 'block');
				}
				this.debrouille(getXY(this.vue[i]));
			}
		}	
		Warfog.prototype.calculPorteeVue = function(oldX, oldY, newX, newY, k, lim) {
			if((map['hip'][newX+'_'+newY] != 'foret') || ((map['hip'][newX+'_'+newY] == 'foret') && (k==0) ) || ((units[unitsMap[newX+'_'+newY]] !== undefined) && (units[unitsMap[newX+'_'+newY]].team.id == this.team.id)))
			{
				if($.inArray(newX+'_'+newY, this.vue) == -1){
					this.vue.push(newX+'_'+newY);
				}
		
			}

			this.vueQuatresDirections(newX, newY, k+1, lim);
		}		
		Warfog.prototype.vueQuatresDirections = function(x, y, k, lim) {
			if(k<lim)
			{
				var xp = x + 1;
				var xm = x - 1;
				var yp = y + 1;
				var ym = y - 1;

				if(xm >= 0 ){
					this.calculPorteeVue(x,y,xm,y,k,lim);
				}
				if(ym >= 0 ){
					this.calculPorteeVue(x,y,x,ym,k,lim);
				}
				if(xp <= maxX ){
					this.calculPorteeVue(x,y,xp,y,k,lim);
				}
				if(yp <= maxY ){
					this.calculPorteeVue(x,y,x,yp,k,lim);
				}
			}
		}
		Warfog.prototype.getVue = function() {
			this.vue = [];
			for(var i=0; i < this.team.units.length; i++){
			
				var x_y = units[this.team.units[i]].x+'_'+units[this.team.units[i]].y;
				if(map['hip'][x_y] == 'montagne'){vue = 5;}
				else {vue = units[this.team.units[i]].spec.vue;}
				
				this.vueQuatresDirections(units[this.team.units[i]].x, units[this.team.units[i]].y, 0, vue);
			}
		}
		Warfog.initialized = true;
	}
}
