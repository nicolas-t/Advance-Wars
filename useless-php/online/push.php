<?php
include('config.php');

$bdd->exec("UPDATE aw_parties SET json = '".$bdd->quote($_POST["json"])."' WHERE id = 0");
?>