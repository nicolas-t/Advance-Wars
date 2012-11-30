<?php
include('config.php');

$bdd->exec("UPDATE aw_parties SET id_joueur = '".$bdd->quote($_POST["j"])."' WHERE id = 0");
?>