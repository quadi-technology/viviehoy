<?php

require_once 'php/shared.php';

$date = isset($_GET['fecha']) ? $_GET['fecha'] : date('d/m/Y');
$date = explode('/', $date);
$date = array_reverse($date);
$date = implode('-', $date);
$date = mysql_real_escape_string($date);

$entries = ORM::for_table('entries')->where_raw("DATE(posted_at) = '$date'")->find_many();

