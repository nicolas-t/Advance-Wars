/*not used anymore*/
/*prefered socket and node js*/
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
		Refresh.prototype.update = function(retour){ 
			for(i = 0; i<retour.length; i++)
			{
				/* Units */ 
				/* Aucune gestion des unites detruites */

				for(j = 0; j < retour[i].units.length; j++)
				{	
					id = retour[i].units[j].id;
					if(units[id] !== undefined){
						delete unitsMap[units[id].x+'_'+units[id].y];
						$.extend(true, units[id], retour[i].units[j]);
						units[id].updatePosition([retour[i].units[j].x, retour[i].units[j].y]);
						units[id].updatePositionVisuelle([retour[i].units[j].x, retour[i].units[j].y]);
						units[id].updateVie(0);
					}
					else{// c'est une nouvelle unité, il faut la créer
						units.push(new Unit(teams[retour[i].id], retour[i].units[j].type, retour[i].units[j].x, retour[i].units[j].y, true, $.extend(true, {}, BDD.Unites[capitaliseFirstLetter(retour[i].units[j].type)])));
					}					
				}	
				
				/* Bats */
				for(h = 0; h<retour[i].bats.length; h++)
				{	
					id = retour[i].bats[h].id;
					bats[id].changeTeam(retour[i]);
				}
			}
	
			controller.warfog.getAdversairesVisibles();


		}
		Refresh.initialized = true;
	}
}