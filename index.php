<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
		<link rel="stylesheet" href="css/reset.css" />
		<link rel="stylesheet" href="css/style.css" />
        <title>Advance Wars, le plus court chemin</title>
    </head>

    <body>
	<script src="http://code.jquery.com/jquery-1.8.0.min.js"></script>
	<script src="js/bdd.js"></script>
	<script src="maps/hip.js"></script>
	<script src="js/fonctions.js"></script>
	<script src="js/units.class.js"></script>
	<script src="js/deplacement.class.js"></script>
	<script src="js/tir.class.js"></script>
	<script src="js/controller.class.js"></script>
	<script src="js/warfog.class.js"></script>
	<script src="js/transport.class.js"></script>
	<script src="js/refresh.class.js"></script>
	<script>
	
	//def constante
	var myTeam = 0;
	var myTeamInverse = [1,0];
	var partieId = 0;
	var modeSync = false;
	
	var units = new Array();
	var teams = new Array();
	var bats = new Array();
	var unitsMap = new Array();		
	var batsMap = new Array();
	
	$(document).ready(function() 
	{
		//def HTML map
		genererHTMLcarte();
		//def Teams :
		teams[0] = new Team(0, 'blue', 'Max');
		teams[1] = new Team(1, 'red', 'Jeanne');
		teams[2] = new Team(2, 'gray', '');// batiments neutres
		
		//def Bats
		bats[0] = new Bat(0, teams[1], 'ville', 3, 6);
		bats[1] = new Bat(1, teams[0], 'usine', 1, 7);	
		
		//def Units	
		units.push(new Unit( teams[1], 'recon', 2, 8, true, $.extend(true, {}, BDD.Unites.Recon)));
		units.push(new Unit( teams[1], 'infantry', 4,6, true, $.extend(true, {}, BDD.Unites.Infantry)));
		units.push(new Unit( teams[0], 'vtb', 3,8, true, $.extend(true, {}, BDD.Unites.Vtb)));
		units.push(new Unit( teams[0], 'neotank', 4, 7, true, $.extend(true, {}, BDD.Unites.Neotank)));
		units.push(new Unit( teams[0], 'infantry', 3,7, true, $.extend(true, {}, BDD.Unites.Infantry)));
	});
	
	$(window).load(function() {
		controller = new Controller(map[nom_map], teams[myTeam]);
		controller.afficherCarte();
	});
	
	</script>
		<img id="canvasSource" src="maps/hip.gif" style="position:absolute;top:-300px;" />
		<canvas id="canvasMap" width="256" height="176" style="position:absolute;">Votre navigateur ne supporte pas les Canvas.</canvas>

		<table id="deplacement_layer" style="position:absolute;opacity:0.6;" border="0" cellspacing="0" cellpadding="0">
		</table>
		<table id="trace_layer" style="position:absolute;;" border="0" cellspacing="0" cellpadding="0">
		</table>
		<table id="over_layer" style="position:absolute;opacity:0;z-index:100;" border="0" cellspacing="0" cellpadding="0">
		</table>
		<div id="cursor" class="cursorSelect"></div>
		<div id="units_container"></div>
		<div id="bats_container"></div>

		<div id="menuBox" class="box">
			 <a href="#" id="capture"><img src="images/pictos/capturer.gif" /> Capturer</a>
			 <a href="#" id="decharge"><img src="images/pictos/charger.gif" /> Decharger</a>
			 <a href="#" id="charge"><img src="images/pictos/charger.gif" /> Charger</a>
			 <a href="#" id="attack"><img src="images/pictos/degats.gif" /> Attaquer</a>
			<a href="#" id="wait"><img src="images/pictos/attendre.gif" /> Attendre</a>
			<a href="#" id="cancel">Annuler</a>
		
		</div>
		<div id="jourBox" style="font-size:12px;position:absolute; left:260px;top:100px;width:135px;padding:10px; height:15px; border:1px solid silver;">
			<a href="#" id="finJour">Fin de la journée</a><br />
		</div>
		<div id="degatsBox" style="font-size:12px;position:absolute; left:260px;top:135px;width:135px;padding:10px; height:20px; border:1px solid silver;">
		</div>
		<div id="shopBox" style="font-size:12px;position:absolute; left:0px;top:180px;width:235px;padding:10px; border:1px solid silver;">
		</div>
		<div id="debugBox" style="font-size:12px;position:absolute; left:0px;top:200px;width:235px;padding:10px; border:1px solid silver;">
		</div>
    </body>
</html>

