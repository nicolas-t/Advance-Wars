<?php
include('config.php');

$bdd->exec("UPDATE parties SET json = '".$_POST["json"]."' WHERE id = 0");
?>