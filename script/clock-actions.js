	var current = "inicio";
	var myTime;
	var alive = false;
	var btnCalAlive = false;
	var am = 'am';

	var myDate = new Date();
	mes = myDate.getMonth()+1;
	dia =  myDate.getDate();
	ano = myDate.getFullYear();
	myDate = (dia < 10 ? "0" : "") + dia +"/"+mes+"/"+ano;

	var fijaAnglesAM = new Array();
	var fijaIdsAM = new Array();
	var fijaImagenAM = new Array();

	var fijaAnglesPM = new Array();
	var fijaIdsPM = new Array();
	var fijaImagenPM = new Array();
	
	var myPositionsAngle = new Array();
	var myPositionsIds = new Array();

  	var cantPuntos = 0;

	var x = 0;
	var y = 0;

    $(document).ready(function() {
	  $("#fecha_actual").html(dia + " de " + getMes(mes) + " del " + ano);
      cargar("inicio");
    });
    function restartArray()
    {
    	fijaAnglesAM = new Array();
    	fijaIdsAM = new Array();
		fijaAnglesPM = new Array();
    	fijaIdsPM = new Array();
		fijaImagenPM = new Array();
    	fijaImagenAM = new Array();
		
		myPositionsAngle = new Array();
		myPositionsIds = new Array();

    }
    function cargar(pagina){
     $("#"+current).addClass("hide");
     $("#"+current).removeClass("show");


     $("#"+pagina).removeClass("hide");
     $("#"+pagina).addClass("show");
     current = pagina;
    }
	function continua(parametro){
	  switch(current){
		case "inicio":
			if(parametro == "next"){
				cargar("manifiesto");
			}else if(parametro == "prev"){
				cargar("reloj");
				$("#puntos").css("visibility","visible");
			}
		break;
		case "manifiesto":
			if(parametro == "next"){
				cargar("reloj");
				$("#puntos").css("visibility","visible");
			}else if(parametro == "prev"){
				cargar("inicio");
			}
     break;
		case "reloj":
			if(parametro == "next"){
				cargar("inicio");
				$("#puntos").css("visibility","visible");
			}else if(parametro == "prev"){
				cargar("manifiesto");
			}
     break;
    }
  }

function iniciaCalendario(){
  $('.calendar_mask').fadeIn('slow', function() {
	$('.calendar_mask').css("display","block");
	  var timeline = new Timeline("timeline", new Date());
	  $('#wrap').css("display","block");
  });
}

function calendarioOut(){
  $("#timeline").html(" ");
  $('#wrap').css("display","none");
  $('.calendar_mask').fadeOut('slow', function() {
    $('.calendar_mask').css("display","none");
  });
}

function changeDay(date){
  calendarioOut();
  //console.log("Recibo "+date);
  myDate = date;

  var showDate = Array();
  showDate = myDate.split("/");
  $("#fecha_actual").html(showDate[0] + " de " + getMes(showDate[1]) + " del " + showDate[2]);

  
  // **Limpian el Reloj** //
  $("#mfeed").hide();
  $("#entrada").children().hide();
  $("#clusterexpand").children().hide();
  
  restartArray();
  callTheJsonp(myDate);
  //document.getElementById('reloj_iframe').contentWindow.location.reload();
}

function calendarOver(e,date){

  var pos = $("#"+e.id).position();
  var diaCal = e.id.split("_");

  $("#btn_click_dia").attr('href','javascript: '+document.getElementById(e.id).getAttribute("onclick"));
  console.log("->->->" + date);
  calendar_callTheJsonp(date);

  while($("#tweets").html() == "0"){
	$("#tweets").html("<img src='img/loading_fb.gif' />");
  }
  while($("#publicaciones").html() == "0"){
	$("#publicaciones").html("<img src='img/loading_fb.gif' />");
  }


  $('#underCont').fadeIn('fast', function() {
    $("#underCont").css("display","block");
  });
  $("#underCont").css("top",pos.top+158);
  $("#underCont").css("left",pos.left-70);

  $("#underCont").mouseleave(function(){
    calendarOut();
  });

}
function calendarOut(){
  $("#tweets").html("0");
  $("#publicaciones").html("0");
  $('#underCont').fadeOut('fast', function() {
	$("#underCont").css("display","none");
  });
}
function getMes(mes){
	var parameter = (mes == 1) ? "Enero" : (mes == 2) ? "Febrero" : (mes == 3) ? "Marzo" : (mes == 4) ? "Abril" : (mes == 5) ? "Mayo" : (mes == 6) ? "Junio" : (mes == 7) ? "Julio" : (mes == 8) ? "Agosto" : (mes == 9) ? "Septiembre" : (mes == 10) ? "Octubre" : (mes == 11) ? "Noviembre" : "Diciembre";
	return parameter;
}

$(document).ready(function() {
			  // console.log("Variable en el padre: " + parent.myDate);
			  callTheJsonp(parent.myDate);

              setInterval( function() {
              var seconds = new Date().getSeconds();
              var sdegree = seconds * 6;
              var srotate = "rotate(" + sdegree + "deg)";

              $("#sec").css({"-moz-transform" : srotate, "-ms-transform" : srotate, "-webkit-transform" : srotate});

              }, 1000 );


              setInterval( function() {
              var hours = new Date().getHours();
              var mins = new Date().getMinutes();
              var hdegree = hours * 30 + (mins / 2);
              var hrotate = "rotate(" + hdegree + "deg)";

              $("#hour").css({"-moz-transform" : hrotate, "-ms-transform" : hrotate, "-webkit-transform" : hrotate});

              }, 1000 );


              setInterval( function() {
              var mins = new Date().getMinutes();
              var mdegree = mins * 6;
              var mrotate = "rotate(" + mdegree + "deg)";

              $("#min").css({"-moz-transform" : mrotate, "-ms-transform" : mrotate, "-webkit-transform" : mrotate});

              }, 1000 );

				$("#clock").mousemove(function(e){
		          x = e.pageX - this.offsetLeft;
				  y = e.pageY - this.offsetTop;
				});


				$('#switch1').click(function(){
					var ampm = $(this).attr('class');
					//console.log(ampm);
					if(ampm == 'am'){
						$(this).css('background-image','url(img/switch_PM.png)');
						$(this).removeClass();
						$(this).addClass('pm');
						$("#num12").html('24');
						$("#num3").html('15');
						$("#num6").html('18');
						$("#num9").html('21');
						$(".xxam").css('display', 'none');
						$(".xxpm").css('display', 'block');
						
						am = 'pm';
					}else{
						$(this).css('background-image','url(img/switch_AM.png)');
						$(this).removeClass();
						$(this).addClass('am');
						$("#num12").html('12');
						$("#num3").html('3');
						$("#num6").html('6');
						$("#num9").html('9');
						$(".xxam").css('display', 'block');
						$(".xxpm").css('display', 'none');
						
						am = 'am';
					}
				});

				$('#switch2').click(function(){
					$('#sec, #min, #hour').show();
					$('#sec2, #min2, #hour2').hide();
				});

				$('#switch3').click(function(){
					$('#sec, #min, #hour').hide();
					$('#sec2, #min2, #hour2').show();
				

				  	var angle;
					var id;
					
					if (am == 'am')
					{
					    var index = Math.floor((Math.random()*fijaAnglesAM.length)+0);
						angle = fijaAnglesAM[index];
						id = fijaIdsAM[index];
						imagen = fijaImagenAM[index];
					
					}
					else
					{
					    var index = Math.floor((Math.random()*fijaAnglesPM.length)+0);
						angle = fijaAnglesPM[index];
						id = fijaIdsPM[index];
						imagen = fijaImagenPM[index];
					
					}
					
					//console.log(angle);
					//console.log("imagen tiene: " + imagen);
					  
					var ptrrotate = "rotate(" + angle + "deg)";
					$('#sec2, #min2, #hour2').css({"-moz-transform" : ptrrotate, "-webkit-transform" : ptrrotate});
					verMensaje(id, imagen);
				
					
					//console.log(fijaIds[index]);
				});
});


		function getPosicion(id){
			alert("getP: " + id);
			var p = $(id).position().top;
			return "100";
		}
		
		function posicion(hrs, min, id){
			
			var hours = hrs;
			var mins = min;
			var hdegree = hours * 30 + (mins / 2);
			var ptrrotate = "rotate(" + hdegree + "deg)";
			
			/*
			myPositionsAngle.push(hdegree);
			myPositionsIds.push(id);
			cantPuntos++;
			*/
			
			$("#dummy " + id).css({"-moz-transform" : ptrrotate, "-ms-transform" : ptrrotate, "-webkit-transform" : ptrrotate});
			//$(id).css({"-moz-transform" : ptrrotate, "-webkit-transform" : ptrrotate});
			//console.log(ptrrotate);
			/*if ( $(id).find("div").attr("class") != "cluster"){
			  console.log("Pasando : " + id + " Clase: " + $(id).find("div").attr("class"));
			  if(cantPuntos > 1){
				if((myPositionsAngle[cantPuntos-2] - myPositionsAngle[cantPuntos-1]) < 3){
				  //console.log("Moviendo el Punto: " + myPositionsIds[cantPuntos-1]);
				  
					hdegree = hdegree - 5.8;
					ptrrotate = "rotate(" + hdegree + "deg)";
					$("#dummy " + id).css({"-moz-transform" : ptrrotate, "-ms-transform" : ptrrotate, "-webkit-transform" : ptrrotate});				  
				  
				}
			  }
			}*/
			return hdegree;
		}
		function posicionFija(hrs, min, id, imagen){
			var hours = hrs;
			var mins = min;
			var hdegree = hours * 30 + (mins / 2);
			

			
			if (hrs <= 11){
			  fijaAnglesAM.push(hdegree);
			  fijaIdsAM.push(id);
			  fijaImagenAM.push(imagen);
			}else{
	  		  fijaAnglesPM.push(hdegree);
			  fijaIdsPM.push(id);
			  fijaImagenPM.push(imagen);
			}
			//console.log(id);
			//posicionFija(hrs, min, id)
			//console.log(ptrrotate);
			//function posicionFija(hrs, min, id)
		}
		
		function arreglarHoras(){
		  /*for(k=0; k <= myPositionsAngle.length; k++){
			
			for(i=0; i <= myPositionsAngle.length; i++){
			  if((myPositionsAngle[k] - )){
			  
			  }
			  console.log("Id: " + myPositionsIds[i] + " -/- Angle: "  + myPositionsAngle[i]);
			  
			}
		  }*/
		}
		
		/*function verMensaje(id, src){
			if(src != "" || src != "undefined"){
			  $("#clock_wp").attr("src",src);
			}else{
			  $("#clock_wp").attr("src","img/foto_reloj4.png");
			}
			
			$("#mfeed").hide();
			$("#entrada").children().hide();
			$("#mfeed").show();
			$('#'+id).show();
		}*/
		function verMensajeCluster(e, id){
			//var lpos = $("#"+e.id).position();
			//console.log("Coordenadas" + lpos.top + "," + lpos.left);
			//$("#"+ID).css("top",lpos.top);
			//$("#"+ID).css("left",lpos.left);
			$("#mfeed").hide();
			$("#entrada").children().hide();
			$("#mfeed").show();
			$('#'+id).show();
			//console.log(id);
		}
		function limpiarMensajeCluster(e, id){
		  $('#'+id).hide();
		  /*var lpos = $("#"+e.id).position();
		  $("#"+id).css("top",lPosition.top);
			$("#"+id).css("left",lPosition.left);*/
		}
		function verMensaje(id, src)
		{
			/*console.log("Recibo: " + id + " \n" + src);
			if(src != ""){
			  $("#clock_wp").attr("src",src);
			}else{
			  $("#clock_wp").attr("src","img/foto_reloj4.png");
			}
			$("#mfeed").hide();
			$("#entrada").children().hide();
			$("#mfeed").show();
			$('#'+id).show();*/
			var currentVal = $('#'+id).css("display");
			if(src != ""){
			  $("#clock_wp").attr("src",src);
			}else{
			  $("#clock_wp").attr("src","img/foto_reloj4.png");
			}
			$("#mfeed").hide();
			$("#entrada").children().hide();
			$("#clusterexpand").children().hide();
			$("#mfeed").show();
			// console.log($('#'+id).css("display"));
			// console.log(id);
			/*
			if(currentVal == "none")
			{	
				$('#'+id).css("display","block");
			}
			else
			{	
				$('#'+id).css("display","none");
			}
			*/
			$('#'+id).show();
			
			$('#'+id).each(function() {
				var myWidth = 0;
				myWidth = 25 + (6*($('div', $(this)).length));
				$('#'+id).css("width",myWidth );
			});
		}
		// Variable de la clase source(ClusterContentBlock<Color>) del Feed Over
		var theClass;
		function relojPuntoOver(e, usr){
		  //console.log("ESTOY PASANDO POR EL PUNTO X:"+x+",Y:"+y);
		  $(document).ready(function() {

			if(usr == "PepsiColombia"){
			  theClass = "clusterContentBlockBlue";
			  $("#ptoOver").addClass(theClass);
			}else{
			  theClass = "clusterContentBlockRed";
			  $("#ptoOver").addClass(theClass);
			}

			// HAGO UNA COPIA DEL FEED EN EL DIV ABSOLUTO
			$("#ptoOver").show();
			$("#ptoOver").html($("#"+e).html()); // COPIO LO QUE HAY EN EL DIV SELECCIONADO EN MI DIV ABSOLUTO

			// ELIMINO LOS ESPACIOS INTERMEDIOS DE MÁS
			oldhtml = $('#ptoOver').html();
			var newhtml = oldhtml.replace(/<br>/g, "");
			$("#ptoOver").html(newhtml);


			// LO POSICIONO DEBAJO DE MI SELECTOR
			$("#ptoOver").css("left",x-90);
			$("#ptoOver").css("top",y-70);
			// Cambio tamaño de letra
			$("#ptoOver").css({'font-size': '10px','text-align': 'center', 'z-index': 9999});
		  });
		}
		function relojPuntoOut(){
		  $("#ptoOver").removeClass(theClass);
		  $("#ptoOver").hide();
		}

		function verCluster(id)
		{
			/*$("#mfeed").hide();
			$("#entrada").children().hide();
			$("#mfeed").show();
			$('#'+id).show();*/
			alert("cluster");
		}



		function compartirF(texto){
			t=encodeURIComponent('Pepsi');
			u=encodeURIComponent('http://www.facebook.com/pepsiColombia');
			i=encodeURComponent("img/logo.jpg");
			resumen=encodeURIComponent(unescape(texto));
			target_url='http://www.facebook.com/sharer.php?s=100&p[title]='+t+'&p[url]='+u+'&p[summary]='+resumen+'&t='+t+'&p[images][0]='+i;
			window.open(target_url,'share','toolbar=0,status=0,width=500,height=300');
		}
		function compartirT(texto){
			url="";
			window.open('http://twitter.com/share?url='+url+'&text='+texto,'share','toolbar=0,status=0,width=700,height=500');
		}