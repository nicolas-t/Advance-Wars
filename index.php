<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
		<link rel="stylesheet" href="css/reset.css" />
		<link rel="stylesheet" href="css/style.css" />
        <title>Advance Wars, le plus court chemin</title>
    </head>

    <body id="body">
	<!--<script src="http://code.jquery.com/jquery-1.8.0.js"></script> -->
	<script src="http://code.jquery.com/jquery-1.8.0.min.js"></script>
	<script src="js/bdd.js"></script>
	<script src="maps/hip.js"></script>
	<script src="js/units.js"></script>
	<script src="js/deplacement.js"></script>
	<script src="js/tir.js"></script>
	<script src="js/fonctions.js"></script>
	<script src="js/game.js"></script>
	<script>
	function tri_nombres(a,b){
	return a-b; 
}
	</script>


			<?php 
			$maxY = 10;
			$maxX = 15;
			$fog_layer="";
			$deplacement_layer = "";
			$trace_layer = "";
			$over_layer = "";
			for ($y=0; $y<=$maxY; $y++){
				$fog_layer.= '<tr>';
				$deplacement_layer.= '<tr>';
				$trace_layer.= '<tr>';
				$over_layer.= '<tr>';
					for ($x=0; $x<=$maxX; $x++){
						$fog_layer.= '<td id="fog_'.$x.'_'.$y.'"></td>';
						$deplacement_layer.= '<td id="deplacement_'.$x.'_'.$y.'"></td>';
						$trace_layer.= '<td id="trace_'.$x.'_'.$y.'"></td>';
						$over_layer.= '<td id="over_'.$x.'_'.$y.'"></td>';
					}
					$fog_layer.= '</tr>';
					$deplacement_layer.= '</tr>';
					$trace_layer.= '</tr>';
					$over_layer.= '</tr>';
					
				}
			?>
		<img id="canvasSource" src="maps/hip.gif" style="display:none;position:absolute;" />
		<canvas id="canvasMap" width="256" height="176" style="position:absolute;"></canvas>
		<table id="fog_layer" style="position:absolute;opacity:0.0;background:#22489d; " border="0" cellspacing="0" cellpadding="0">
			<?php echo $fog_layer; ?>
		</table>
		<table id="deplacement_layer" style="position:absolute;opacity:0.6;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $deplacement_layer; ?>
		</table>
		<table id="trace_layer" style="position:absolute;opacity:1;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $trace_layer; ?>
		</table>
		<table id="over_layer" style="position:absolute;opacity:0;z-index:100;" border="0" cellspacing="0" cellpadding="0">
			<?php echo $over_layer; ?>
		</table>
		<div id="cursor" class="cursorSelect"></div>
		<!--
		<div id="debugInfo" style="overflow:auto;font-size:11px;position:absolute; top:200px;width:235px;padding:10px; height:50px; border:1px solid silver;">yo</div>
		--->
		<div id="menuBox" style="display:none;font-size:12px;position:absolute; left:260px;width:135px;padding:10px; height:50px; border:1px solid silver;">
			<a href="#" id="attack">Attaquer</a><br />
			<a href="#" id="wait">Attendre</a><br />
			<a href="#" id="cancel">Annuler</a><br />
		
		</div>
		<div id="jourBox" style="font-size:12px;position:absolute; left:260px;top:70px;width:135px;padding:10px; height:50px; border:1px solid silver;">
			<a href="#" id="nouveauJourRouge">Nouveau jour rouge</a><br />
			<a href="#" id="nouveauJourBleu">Nouveau jour bleu</a><br />
		</div>

		
    </body>
</html>

