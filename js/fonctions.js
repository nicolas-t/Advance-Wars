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
function afficherUnites(){
	var container = document.getElementById("body");
	for(j=0; j < units.length; j++)
	{	
		var position = $('#'+units[j].x+'_'+units[j].y).position();
		var u = document.createElement("div");
		container.appendChild(u);
		$(u).attr('id', 'unit_'+j).addClass('units unit_'+units[j].x+'_'+units[j].y).css({'background': 'url(images/units/'+units[j].team.color+'/'+units[j].type+'.gif)', 'left': position.left, 'top' : position.top});
	} 
	
}
function selectionUnite(id){
	selectedUnitID = id;
}

$(document).ready(function(){

	afficherCarte();
	afficherUnites();
	var deplacement = '';
	$('#cursorSelect').click(function(){
		if(choixChemin)
		{
			coord = getXY(caseSurvolee);
			if(map[nom_map][coord[0]+'_'+coord[1]]['c_avancement'][units[selectedUnitID].type])
			{
				deplacement.deplacementVisuel();
				choixChemin = false;
			}
		}
	});
	$('.units').click(function(){
		id = getID(caseSurvolee);

		selectionUnite(id);
		deplacement = new Deplacement(units[id]);
		deplacement.getPortee();
		choixChemin = true;

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

});