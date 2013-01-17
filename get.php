<?php
date_default_timezone_set("America/Bogota");

//$url = "http://190.3.169.20/pepsicolombia";
$url = "https://api.storify.com/v1/stories/vivehoy/pepsi-vivehoy/?page=1&per_page=50";
$data = file_get_contents($url);
$datos = json_decode($data);

if (isset($_GET['fecha']))
	$fecha = $_GET['fecha'];
else
	$fecha = date("d/m/Y");


// echo "<pre>".print_r($datos, true)."</pre>";
// exit;

$ret->contenido = array();


$a = $datos->content->elements;
// echo "total = ".count($a)."<br/>\n";
$k=0;


foreach ($a as $v){
	// si no es de la fecha indicada, saltarlo
	if (!isset($v->posted_at))
		continue;
	if (date("d/m/Y", strtotime($v->posted_at)) != $fecha)
		continue;
	
	// si no es facebook o twitter, saltarlo
	if (!isset($v->source->name))
		continue;
	if (($v->source->name != "facebook") && ($v->source->name != "twitter"))
		continue;
	
	// armar comentario
	$veces=1;
	for ($i=0; $i<$veces; $i++){
		if (isset($v->id)) $ret->contenido[$k]->id = $v->id; else $ret->contenido[$k]->id = "";
		if (isset($v->type)) $ret->contenido[$k]->type = $v->type; else $ret->contenido[$k]->type = "";
		if (isset($v->permalink)) $ret->contenido[$k]->permalink = $v->permalink; else $ret->contenido[$k]->permalink = "";
		if (isset($v->posted_at)) $ret->contenido[$k]->fecha = date("d/m/Y", strtotime($v->posted_at)); else $ret->contenido[$k]->fecha = "";
		if (isset($v->posted_at)) $ret->contenido[$k]->hora = date("H:i", strtotime($v->posted_at)); else $ret->contenido[$k]->hora = "";
		if (isset($v->data->quote->text)) $ret->contenido[$k]->text = $v->data->quote->text; else $ret->contenido[$k]->text = "";
		if (isset($v->source->name)) $ret->contenido[$k]->source = $v->source->name; else $ret->contenido[$k]->source = "";
		if (isset($v->source->userid)) $ret->contenido[$k]->userid = $v->source->userid; else $ret->contenido[$k]->userid = "";	
		$k++;
	}
}




header('Content-type: application/json');
$callback = '';
if (isset($_GET['callback']))
{
	$callback = filter_var($_GET['callback'], FILTER_SANITIZE_STRING);
}

echo $callback . '('.json_encode($ret).');';




?>





