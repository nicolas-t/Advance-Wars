var maxX = 15;
var maxY = 10;
var caseSurvolee = '';
var selectedUnitID = '';
var choixChemin = false;

function getXY(s){
	l=s.split('_').reverse();
	if(l[1] == 'unit'){g = new Array(units[parseInt(l[0])].x, units[parseInt(l[0])].y);}
	else{g = new Array(parseInt(l[1]),parseInt(l[0]));}
	return g;
}
function getID(s){
	l=s.split('_').reverse();
	g = parseInt(l[0]);
	return g;
}
function afficherCarte(){
	$('#map_layer td').each(function(index) {
	   $(this).css('background-image','url("images/'+map[nom_map][$(this).attr('id')]["sprite"]+'")'); 
	});
}

function selectionUnite(id){
	selectedUnitID = id;
}

$(document).ready(function(){

	afficherCarte();
	var deplacement = '';
	$('#cursorSelect').click(function(){
		if(choixChemin)
		{
			coord = getXY(caseSurvolee);
			if(map[nom_map][coord[0]+'_'+coord[1]]['c_avancement'][units[selectedUnitID].type])
			{
					if(deplacement.pointValide(coord[0],coord[1])){
						deplacement.deplacementVisuel();
						choixChemin = false;
					}
			}
		}
	});
	$('.units').click(function(){
		if($('#menuBox').is(':hidden')){
			id = getID(caseSurvolee);
			selectionUnite(id);
			console.log(units[id].active);
			if(units[id].active){
				deplacement = new Deplacement(units[id]);
				$('#menuBox').css('display', 'block');
				deplacement.getPortee();
				choixChemin = true;
			}
		}
	});
	$('#trace_layer td, .units').mouseenter(function(){
		caseSurvolee = $(this).attr('id');
		var coord = getXY(caseSurvolee);
		var position = $(this).position();
		$('#cursorSelect').css({'left': position.left, 'top': position.top}); 
		
		if(choixChemin){
			deplacement.findChemin(coord[0],coord[1]);
			return false;
		}
	});
	// menu, en pagaille pour l'instant
	$('#menuBox a').click(function(){
		if($(this).attr('id') == 'attack'){
			$('#deplacement_layer td').css('background','');
			deplacement.confirme();		
		}
		else if($(this).attr('id') == 'wait'){
			$('#deplacement_layer td').css('background','');
			deplacement.confirme();

		}
		else if($(this).attr('id') == 'cancel'){
			deplacement.cancel();
		}
		$('#menuBox').css('display', 'none');

	});
	
	$('#jourBox	#nouveauJourRouge').click(function(){
		teams[0].nouveauJour();
	});
	$('#jourBox	#nouveauJourBleu').click(function(){
		teams[1].nouveauJour();
	});
});