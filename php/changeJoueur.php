<?php
include('config.php');

$bdd->exec("UPDATE parties SET id_joueur = '".$_POST["j"]."' WHERE id = 0");
?>