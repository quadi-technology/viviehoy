<?php
date_default_timezone_set("America/Bogota");

// TODO cambiando la variable historia pueden actualizar el contenido final de storify
// $url = "http://166.78.5.173/vivehoy/index.php?historia=pepsi-vivehoy";
$url = "http://190.3.169.20/pepsicolombia/index.php?historia=pepsi-vivehoy";
// $url = "http://190.3.169.20/pepsicolombia/index.php?historia=desde-el-lunes-vive-hoy";


$data = file_get_contents($url);
$datos = json_decode($data);


if (isset($_GET['fecha']))
	$fecha = $_GET['fecha'];
else
	$fecha = date("d/m/Y");

// TODO Eliminar esta fecha simulada  SI NO SE HARÁN PRUEBAS
//$fecha="18/11/2012";

// echo "<pre>".print_r($datos, true)."</pre>";
// exit;

$ret->contenido = array();


$a = $datos->content->elements;
// echo "total = ".count($a)."<br/>\n";
$k=0;




$test = 0;
foreach ($a as $v){
	/* COMENTAR DESDE ACÁ HASTA LA LÍNEA 88 - ÉSTAS LINEAS CLONAN COMENTARIOS PARA PROBAR CLUSTERS ||| SÓLO SE COMENTA EL FOR (L:30) Y EL CORCHETE (L:31)*/
	//for ($p = 0; $p < 10; $p++){

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
			//	echo $v->name;

			if ($v->type=="image") //Obtenemos la imagen
				$ret->contenido[$k]->image = $v->data->image->src;
			else	// Por defecto
				$ret->contenido[$k]->image = "";

			if (isset($v->id)) $ret->contenido[$k]->id = $v->id; else $ret->contenido[$k]->id = "";
			if (isset($v->attribution->name)) $ret->contenido[$k]->name = $v->attribution->name; else $ret->contenido[$k]->name = "";
			if (isset($v->attribution->username)) $ret->contenido[$k]->username = $v->attribution->username; else $ret->contenido[$k]->username = "";

			if (isset($v->type)) $ret->contenido[$k]->type = $v->type; else $ret->contenido[$k]->type = "";
			if (isset($v->permalink)) $ret->contenido[$k]->permalink = $v->permalink; else $ret->contenido[$k]->permalink = "";
			if (isset($v->posted_at)) $ret->contenido[$k]->fecha = date("d/m/Y", strtotime($v->posted_at)); else $ret->contenido[$k]->fecha = "";
			if (isset($v->posted_at))
			{

				// TODO Sacar desde aqui ----- PARA PRUEBAS COMENTAR DESDE AQUÍ HASTA LA LÍNEA 55
				/*$ret->contenido[$k]->id = rand(0,1000);
				if ($p < 1)
				{

					$ret->contenido[$k]->hora = "07:00";

				}
				else if ($p < 2)
				{
					$ret->contenido[$k]->hora = "03:00";

				}
				else
				{
					$ret->contenido[$k]->hora = "04:00";

					$ret->contenido[$k]->hora = date("H:i", strtotime($v->posted_at));
				}
				// TODO Hasta aqui ----- HASTA AQUÍ SE COMENTA PARA PRUEBAS
				*/
				// TODO Descomentar lo siguiente: --- PARA PROBAR CON DISTINTAS HORAS
				$ret->contenido[$k]->hora = date("H:i", strtotime($v->posted_at));

			}else {
				$ret->contenido[$k]->hora = "03:00";
			}



			if (isset($v->data->quote->text)) $ret->contenido[$k]->text = $v->data->quote->text; else $ret->contenido[$k]->text = "";
			if (isset($v->source->name)) $ret->contenido[$k]->source = $v->source->name; else $ret->contenido[$k]->source = "";
			if (isset($v->source->userid)) $ret->contenido[$k]->userid = $v->source->userid; else $ret->contenido[$k]->userid = "";
			$k++;
		}
	/*  COMENTAR HASTA ACÁ PARA PRUEBAS || COMENTAR ÚNICAMENTE EL CORCHETE (L:108)*/
	//}

}


// Agrupar por fechas


$output_ordered = array();
$output_ordered['contenido']=array();

foreach($ret->contenido as $c){
	if (!isset($output_ordered['contenido'][$c->hora])){
		$output_ordered['contenido'][$c->hora] = array();
	}

	array_push($output_ordered['contenido'][$c->hora], $c);
}


//echo prettyPrint(json_encode($ret));
//echo "\r\r";

header('Content-type: application/json');
$callback = '';
if (isset($_GET['callback']))
{
	$callback = filter_var($_GET['callback'], FILTER_SANITIZE_STRING);
}

echo $callback . '('.prettyPrint(json_encode($output_ordered)).');';
//echo $callback . '('.json_encode($ret).');';

function prettyPrint( $json )
{
	$result = '';
	$level = 0;
	$prev_char = '';
	$in_quotes = false;
	$ends_line_level = NULL;
	$json_length = strlen( $json );

	for( $i = 0; $i < $json_length; $i++ ) {
		$char = $json[$i];
		$new_line_level = NULL;
		$post = "";
		if( $ends_line_level !== NULL ) {
			$new_line_level = $ends_line_level;
			$ends_line_level = NULL;
		}
		if( $char === '"' && $prev_char != '\\' ) {
			$in_quotes = !$in_quotes;
		} else if( ! $in_quotes ) {
			switch( $char ) {
				case '}': case ']':
					$level--;
					$ends_line_level = NULL;
					$new_line_level = $level;
					break;

				case '{': case '[':
					$level++;
				case ',':
					$ends_line_level = $level;
					break;

				case ':':
					$post = " ";
					break;

				case " ": case "\t": case "\n": case "\r":
					$char = "";
					$ends_line_level = $new_line_level;
					$new_line_level = NULL;
					break;
			}
		}
		if( $new_line_level !== NULL ) {
			$result .= "\n".str_repeat( "\t", $new_line_level );
		}
		$result .= $char.$post;
		$prev_char = $char;
	}

	return $result;
}


?>





