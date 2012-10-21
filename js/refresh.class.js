function Refresh(duree) {
	this.duree = duree;
	var that = this;

	setInterval(function (){
		if(myTeam == controller.whosPlaying){
			that.push();
		}
		else{
			that.get();
		} 
	}, this.duree);
	
	if ( typeof Refresh.initialized == "undefined" ) {
		Refresh.prototype.changeJoueur = function(joueur) {
			$.ajax({
				type: "POST",
				url: "php/changeJoueur.php",
				data: { 'j': joueur },
			});
			this.push();
			controller.whosPlaying = myTeamInverse[myTeam];
		}
	
		Refresh.prototype.push = function() {
			var seen = [];
			var lol = JSON.stringify(teams, function(key, val) {
				if(key == "elem" || key == "attaque" || key == "c_avancement" || (key == "color" && val == "gray")){
					return undefined;
				}
			   if (typeof val == "object") {
					if (seen.indexOf(val) >= 0){ // doesn't work with chrome ?
						return undefined}
					seen.push(val);
				}
				return val;
			});
			
			$.ajax({
				type: "POST",
				url: "php/push.php",
				data: { 'json': lol }
			});
		}

		Refresh.prototype.get = function() {
			$.ajax({
				type: "POST",
				url: "php/get.php",
				dataType: "json"
			}).done(function(r) { 
				if(r){
					that.update($.parseJSON(r.json));
					if(r.id_joueur == myTeam){
						teams[myTeam].debutJour();
						controller.whosPlaying = myTeam;
					}
				}
			});
		}
		// aucune gestion des unites mortes.
		Refresh.prototype.update = function(retour) {
			for(i = 0; i<retour.length; i++)
			{
				/* Units */ 
				for(j = 0; j<retour[i].units.length; j++)
				{	
					id = retour[i].units[j].id;
					if(units[id] != 'undefined'){
						delete unitsMap[units[id].x+'_'+units[id].y];
						$.extend(true, units[id], retour[i].units[j]);
						controller.warfog.getAdversairesVisibles();
						units[id].updatePosition([retour[i].units[j].x, retour[i].units[j].y]);
						units[id].updatePositionVisuelle([retour[i].units[j].x, retour[i].units[j].y]);
						units[id].updateVie(0);
					}
					else{// c'est une nouvelle unité, il faut la créer
						
					}					
				}
				
				/* Bats */
				for(h = 0; h<retour[i].bats.length; h++)
				{	
					id = retour[i].bats[h].id;
					if(retour[i].color != undefined){
						$('#bat_'+id).attr('class', 'bats '+retour[i].color).css({
							'background': 'url(images/bats/'+retour[i].color+'/'+retour[i].bats[h].type+'.png)'
						});
					}
					$.extend(true, bats[id], retour[i].bats[h]);
				}
			}

		}
		Refresh.initialized = true;
	}
}