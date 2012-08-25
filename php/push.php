<?php
include('config.php');
// utiliser requetes préparées à l'avenir
$bdd->exec("UPDATE parties SET json = '".$bdd->quote($_POST["json"])."' WHERE id = 0");
?>