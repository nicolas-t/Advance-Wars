<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
		<link rel="stylesheet" href="css/reset.css" />
		<link rel="stylesheet" href="css/style.css" />
        <title>Advance Wars, le plus court chemin</title>
    </head>

    <body>
	<!--<script src="http://code.jquery.com/jquery-1.8.0.js"></script> -->
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
	function tri_nombres(a,b){return a-b;}
	function debug_map(arr){
			$('#deplacement_layer td').css('background','');

		for (a in arr)
		{
			$('#deplacement_'+a).css('background','blue');
		}
	}
	var maxX = 15;
	var maxY = 10;
	var myTeam = <?php echo (int)$_GET['team']; ?>;
	var myTeamInverse = [];
	myTeamInverse[0] = 1;
	myTeamInverse[1] = 0;
	var partieId = <?php echo (int)$_GET['id']; ?>;
	</script>


			<?php 
			$maxY = 10;
			$maxX = 15;
			$deplacement_layer = $trace_layer = $over_layer = "";
			for ($y=0; $y<=$maxY; $y++){
				$deplacement_layer.= '<tr>';
				$trace_layer.= '<tr>';
				$over_layer.= '<tr>';
					for ($x=0; $x<=$maxX; $x++){
						$deplacement_layer.= '<td id="deplacement_'.$x.'_'.$y.'"></td>';
						$trace_layer.= '<td id="trace_'.$x.'_'.$y.'"></td>';
						$over_layer.= '<td id="over_'.$x.'_'.$y.'"></td>';
					}
					$deplacement_layer.= '</tr>';
					$trace_layer.= '</tr>';
					$over_layer.= '</tr>';
					
				}
			?>
		<img id="canvasSource" src="maps/hip.gif" style="position:absolute;top:-300px;" />
		<canvas id="canvasMap" width="256" height="176" style="position:absolute;">Votre navigateur ne supporte pas les Canvas.</canvas>

		<table id="deplacement_layer" style="position:absolute;opacity:0.6;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $deplacement_layer; ?>
		</table>
		<table id="trace_layer" style="position:absolute;;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $trace_layer; ?>
		</table>
		<table id="over_layer" style="position:absolute;opacity:0;z-index:100;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $over_layer; ?>
		</table>
		<div id="cursor" class="cursorSelect"></div>
		<div id="units_container"></div>
		<div id="bats_container"></div>

		<div id="menuBox" style="display:none;font-size:12px;position:absolute; left:260px;width:135px;padding:10px;height:80px; border:1px solid silver;">
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

