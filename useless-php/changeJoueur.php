<?php
include('config.php');
// utiliser requetes préparées à l'avenir
//$bdd->exec("UPDATE parties SET id_joueur = '".$bdd->quote($_POST["j"])."' WHERE id = 0");
$bdd->exec("UPDATE parties SET id_joueur = '".$_POST["j"]."' WHERE id = 0");
?>