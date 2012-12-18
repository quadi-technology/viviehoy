/* 16.56 */

function callTheJsonp(fecha) {
	var url = "http://166.78.5.173/vivehoy/getByDate.php?fecha="
			+ fecha + "&callback=parseRequest";
	/*var url = "http://www.advantedigital.com/pepsicolombia/storify/getByDate.php?fecha="
		+ fecha + "&callback=parseRequest";*/
	// console.log(url);
	var script = document.createElement('script');
	script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(script);
}

function parseRequest(response) {
	// datos disponibles:
	// response.contenido[i].id
	// response.contenido[i].type
	// response.contenido[i].permalink
	// response.contenido[i].fecha
	// response.contenido[i].hora
	// response.contenido[i].text
	// response.contenido[i].source
	// response.contenido[i].userid
	// return response.contenido;
	// Limpiar todo

	html = "";

	$("#dummy").empty();

	restartArray();


	// El for es por cada hora
	for ( var i in response.contenido) {

		// Hora es la clave del array
		var horareloj = i;

		// Contenidos es un array de contenido por cada hora
		var contenidos = response.contenido[i];

		var fecha = new Array();
		fecha = horareloj.split(":");
		var hora = fecha[0];
		var min = fecha[1];
		var clusterActive = false;
		
		if (hora < 12) {
			var xxclass = 'xxam';
		} else {
			var xxclass = 'xxpm';
		}
		//console.log("" + contenidos[0].image);
		// Si el contenidos.length > 1, entonces es cluster
		if (contenidos.length > 1) {
			
			clusterActive = true;
			
			var liid = 'pt' + contenidos[0].id;
			// TODO Clase para cluster
			var clas = 'cluster';
			/*
			 * TODO Leer los mensajes de este cluster. Estan en el array
			 * "contenidos". Hacer un for como el de abajo -- for ( var j in
			 * contenidos) para obtener todos los mensajes
			 *
			 * if (contenidos[j].source == 'twitter'){ var clas = 'pta'; }else{
			 * var clas = 'ptr'; }
			 */
			var htm = '<li id="' + liid + '" class="pto ' + xxclass
					+ '"><div class="' + clas + '" onclick="verMensaje(\''
					+ 'd' + liid + '\',\'\')" ></div></li>';
			$("#dummy").append(htm);

			var htmc = '<div class="cluster_' + liid + '"></div>';
			$("#dummy").append(htmc);

			var degree = posicion(hora, min, '#' + liid);
			posicionFija(hora, min, liid, "");

			degree = degree - 90;
			var radius = 203;
			var newTop = 10 + radius * Math.sin(degree * Math.PI / 180);
			var newLeft = 130 + radius * Math.cos(degree * Math.PI / 180);

			var points = "";
			var colorContentBlock = "clusterContentBlockBlue";
			var textTest = "";
			// COMENTAR TODO AQUI
			// var textTest = "ESTO ES UN TEST";
			var leftPos = 0;
			for ( var u = 0; u < contenidos.length; u++) {

				if(contenidos[u].username == "PepsiColombia"){
					colorContentBlock = "clusterContentBlockRed";
				}else{
					colorContentBlock = "clusterContentBlockBlue";
				}
				points += "<div style='float:left;cursor: pointer;'><div id='pto_"+contenidos[u].id+"' "
						+ "onmouseover=\"verMensajeCluster(this, '"
						+ u
						+ "_"
						+ contenidos[u].id
						+ "')\" onmouseout=\"limpiarMensajeCluster(this,'"
						+ u
						+ "_"
						+ contenidos[u].id
						+ "')\" onclick=\"verMensaje('"
						+ liid + "','" + contenidos[u].image + "')\" ><img src='img/punto_celeste.png' /></div></div>";
							
				var mensaje = '<div id="'
						+ u
						+ "_"
						+ contenidos[u].id
						+ '" style="display: block; position:absolute;  top: '
						+ (newTop + 95)
						+ 'px; left: '
						+ (newLeft - 60)
						+ 'px;" class="clusterContentBlock '
						+ colorContentBlock
						+ '" ><div class="punteroTroll" ></div><br>'
						+ '<span clas="username">@'
						+ contenidos[u].username
						+ '</span><br><span class="publishedDate">'
						+ contenidos[u].fecha
						+ '</span><br><div class="contentFeed">'
						+ contenidos[u].text + '</div></div>';
				$("#entrada").prepend(mensaje);
				
			}
			var mensaje = '<div id="d'
					+ liid
					+ '" class="clstrCont" style="display:none; cursor: pointer;position: relative; top: '
					+ (newTop - 3) + 'px; left:' + (newLeft) + 'px; ">'
					+ points + '</div>';
			$("#clusterexpand").prepend(mensaje);
			/*
			 * html += "<div style='border: 1px solid black; margin-top: 10px;
			 * padding: 3px;'>"; html += "Este es un cxczluster"; html += "</div>";
			 */
		}else{
			clusterActive = false;
			/*
			 * Cambio de funcionalidad, se generan TODOS los mensajes para que puedan ser llamados también
			 * por los clusters, eliminando la excepción que existía en un principio.-
			 */ 
		}
		
		
			for ( var j in contenidos) {
				var liid = 'pt' + contenidos[j].id;
				if (contenidos[j].username == 'PepsiColombia') {
					var clas = 'pta';
				} else {
					var clas = 'ptr';
				}
				
				if(!clusterActive){
					var htm = '<li id="' + liid + '" class="pto ' + xxclass
							+ '">'
							+ '<div id="myPto_'+ liid +'" class="' + clas + '" onmouseover="relojPuntoOver(\''
							+ liid + '\',\''+contenidos[j].username+'\')" onmouseout="relojPuntoOut()" onclick="verMensaje(\''
							+ liid + '\',\''+contenidos[j].image+'\')"'
							+ '  ></div></li>';
					$("#dummy").append(htm);
				}

				posicion(hora, min, '#' + liid);
				posicionFija(hora, min, liid, contenidos[j].image);

				var mensaje = '<div id="'
						+ liid
						+ '" style="display: none; " ><br><span class="publishedDate">'
						+ contenidos[j].fecha
						+ '</span><br /><span class="username" style="display: block;">@'
						+ contenidos[j].username
						+ '</span><br /><div class="contentFeed">'
						+ contenidos[j].text
						+ '</div><div class="social"><a class="FB" onclick="compartirF(\''
						+ contenidos[j].text
						+ '\');" target="_blank"></a><a class="TW" onclick="compartirT(\''
						+ contenidos[j].text
						+ '\');" target="_blank"></a></div></div>';
				$("#entrada").append(mensaje);

				html += "<div style='border: 1px solid black; margin-top: 10px; padding: 3px;'>";
				html += "Id: " + contenidos[j].id + "<br/>";
				html += "Fecha: " + contenidos[j].fecha + "<br/>";
				html += "Hora: " + contenidos[j].hora + "<br/>";
				html += "Origen: " + contenidos[j].source + "<br/>";
				html += "Texto: " + contenidos[j].text;
				html += "</div>";
			}
		if (am == 'am') {

			$(".xxam").css('display', 'block');
			$(".xxpm").css('display', 'none');
		}

		else {
			$(".xxam").css('display', 'none');
			$(".xxpm").css('display', 'block');

		}

	}

}

// claster aqui deberian comparar el actual con el anterior para ver si
// estan en el mismo minuto, deben tener conciencia ke hay ke acumular
/*
 * var fecha = new Array(); fecha = response.contenido[i].hora.split(":");
 *
 * var acumula_fechas = new Array(); var cant_fechas_iguales = 0;
 * console.log("Publicacion a las: " + fecha);
 *
 *
 * var hora = fecha[0]; var min = fecha[1]; var liid =
 * 'pt'+response.contenido[i].id;
 *
 *
 *
 * //if(fecha == response.contenido[i+1].hora.split(":")){ // VALIDAMOS SI LAS
 * FECHAS COINCIDEN Y NOS DEBERÍAMOS SALTAR EL PASO QUE SIGUE Y ACUMULAR LOS
 * PUNTOS EN UN CONTENEDOR DINÁMICO //console.log("Encontré un cluster");
 * //var cluster = '<li id="clstr_'+liid+'" class="cluster" ><div
 * id="clusters" > </li>'; // DENTRO DEL <LI> DEL CLUSTER CONCENTRAR LOS PUNTOS
 * EN UN CONTENDOR QUE AL MOMENTO DE PASAR ENCIMA EL MOUSE (HOVER) SE DESPLIEGA
 * EL MENU //("#clock").append(cluster); // AGREGAR EL CLUSTER AL RELOJ //} }
 * //$("body").append(html); } // callTheJsonp("14/11/2012");
 */