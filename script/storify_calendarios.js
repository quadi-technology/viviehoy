function calendar_callTheJsonp(fecha){
	var url = "http://www.advantedigital.com/pepsicolombia/storify/get.php?fecha="+fecha+"&callback=calendar_parseRequest";		
	var script = document.createElement('script');
	script.setAttribute('src', url);
	document.getElementsByTagName('head')[0].appendChild(script);
	
	
}

function calendar_parseRequest(response){
	
	var tw = 0;
	var fb = 0;
	for (i=0; i<response.contenido.length; i++){
		if(response.contenido[i].source == 'twitter')
			tw++
		else
			fb++;
	}
	$("#tweets").html(tw);
	$("#publicaciones").html(fb);
	
	//respuesta += cantidad_feeds[i]["fecha"] + ":" + cantidad_feeds[i]["fb"] + ":" + cantidad_feeds[i]["tw"] + "|";
	//console.log(respuesta);
	
}
function obtieneNumeroFeeds(dia){
	calendar_callTheJsonp(dia + "/11/2012");
}