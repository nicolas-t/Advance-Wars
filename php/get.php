<?php
include('config.php');
$reponse = $bdd->query('SELECT json, id_joueur FROM parties where id = 0');
$lol = json_encode($reponse->fetch());
echo $lol;
?>