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
		Warfog.prototype.getAdversairesVisibles = function() {
			for(var i=0; i < teams.length; i++){
					for(var j=0; j < teams[i].units.length; j++){
						if(($.inArray(teams[i].units[j].x+'_'+teams[i].units[j].y, this.vue) >= 0) || i == this.team.id){
							$(teams[i].units[j].elem).css('display', 'block');
						}
						else{
							$(teams[i].units[j].elem).css('display', 'none');
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
			this.getAdversairesVisibles();
			for(var i=0; i < this.vue.length; i++){
				this.debrouille(getXY(this.vue[i]));
			}
		}	
		Warfog.prototype.calculPorteeVue = function(newX, newY, k, lim) {
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
					this.calculPorteeVue(xm,y,k,lim);
				}
				if(ym >= 0 ){
					this.calculPorteeVue(x,ym,k,lim);
				}
				if(xp <= maxX ){
					this.calculPorteeVue(xp,y,k,lim);
				}
				if(yp <= maxY ){
					this.calculPorteeVue(x,yp,k,lim);
				}
			}
		}
		Warfog.prototype.getVue = function() {
			this.vue = [];
			for(var i=0; i < this.team.units.length; i++){
			
				if($.inArray(this.team.units[i].x+'_'+this.team.units[i].y, this.vue) ==-1){
						this.vue.push(this.team.units[i].x+'_'+this.team.units[i].y);
				}
				
				var x_y = this.team.units[i].x+'_'+this.team.units[i].y;
				if(map['hip'][x_y] == 'montagne'){vue = 5;}
				else {vue = this.team.units[i].spec.vue;}
				
				this.vueQuatresDirections(this.team.units[i].x, this.team.units[i].y, 0, vue);
			}
		}
		Warfog.initialized = true;
	}
}
