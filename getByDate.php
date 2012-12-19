<?php

require_once 'php/shared.php';


$date = isset($_GET['fecha']) ? $_GET['fecha'] : date('d/m/Y');
$date = explode('/', $date);
$date = array_reverse($date);
$date = implode('-', $date);
$date = mysql_real_escape_string($date);

$entries = ORM::for_table('entries')->where_raw("DATE(posted_at) = '$date'")->find_many();

$return = array(
  'contenido' => array(),
);

foreach ($entries as $entry) {
  $entry = $entry->as_array();
  $entry['fecha'] = date('d/m/Y', strtotime($entry['posted_at']));
  $entry['hora'] = date('H:i', strtotime($entry['posted_at']));
  $return['contenido'][$entry['hora']][] = $entry;
}

