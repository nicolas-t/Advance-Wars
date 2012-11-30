function tri_nombres(a,b){
	return a-b;
}
function genererHTMLcarte(){
	for (y=0; y<=maxY; y++)
	{
		$('#deplacement_layer').append('<tr id="deplacement_ligne_'+y+'"></tr>');
		$('#trace_layer').append('<tr id="trace_ligne_'+y+'"></tr>');
		$('#over_layer').append('<tr id="over_ligne_'+y+'"></tr>');
		for (x=0; x<=maxX; x++) {
			$('#deplacement_layer #deplacement_ligne_'+y+'').append('<td id="deplacement_'+x+'_'+y+'"></td>');
			$('#trace_layer #trace_ligne_'+y+'').append('<td id="trace_'+x+'_'+y+'"></td>');
			$('#over_layer #over_ligne_'+y+'').append('<td id="over_'+x+'_'+y+'"></td>');
		}
	}
}
function debug_map(arr){
	$('#deplacement_layer td').css('background','');
	for (a in arr)
	{
		$('#deplacement_'+a).css('background','blue');
	}
}
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
function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

