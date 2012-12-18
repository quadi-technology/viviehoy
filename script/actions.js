'use strict';

$(document).ready(function(){

	//EASING
	jQuery.easing['jswing'] = jQuery.easing['swing'];
	jQuery.extend( jQuery.easing,
	{
		easeOutBack: function (x, t, b, c, d, s) {
			if (s === undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
	});

	//SLIDER
	function Slider( container, nav ) {
		this.container = container;
		this.nav = nav.show();

		this.items = this.container.find('.section');
		this.itemsWidth = $('.container').width();
		this.itemsLen = this.items.length;

		$(this.container).find('.section').width(this.itemsWidth);
		$(this.container).width(this.itemsWidth * this.items.length);

		this.current = 0;
	}

	Slider.prototype.transition = function( coords ) {
		this.container.animate({
			'margin-left': coords || -( this.current * this.itemsWidth )
		});
	};

	Slider.prototype.setCurrent = function( dir ) {
		var pos = this.current;

		pos += ( ~~( dir === 'next' ) || -1 );
		this.current = ( pos < 0 ) ? this.itemsLen - 1 : pos % this.itemsLen;

		return pos;
	};

	var
	player,
	videoView = false;

	//YOUTUBE VIDEO API
	var onYouTubePlayerAPIReady = function () {
		player = new YT.Player('video-pepsi', {
			height: '390',
			width: '640',
			videoId: 'QDwA3xFEcFU',
			events: {
				'onReady': onPlayerReady,
				'onStateChange': onPlayerStateChange
			}
		});
	};

	// autoplay video
	var onPlayerReady = function (event) {
		event.target.playVideo();
	};

	// when video ends
	var onPlayerStateChange = function (event) {
		if (event.data === 0) {
			videoView = true;
			videoActions();
		}
	};
	//END YOUTUBE VIDEO API

	var resetAnimation = function(){
		$('.intro-txt').removeAttr('style');
		$('.area-video').fadeOut('fast');
	};

	var videoActions = function(){

		var animManifest = function(){
			$('.area-video').fadeOut('fast', function () {
				$('.area-back').find('p').animate({
					top: 0
				}, 1000);
				$('.btnPlay').animate({
					opacity: 1
				}, 1000);
			});
		};

		if(videoView === false){
			$('.area-video').fadeIn('fast',function(){
				videoView = true;
			});
		}else{
			animManifest();
		}
	};


	$('.btnPlay').on('click', function(e){
		videoView = false;
		videoActions();
		e.preventDefault();
	});

	var insetAnimate = function(){
		if(slider.current === 0){
			var
			speed = 300,
			fadeSpeed = 500;

			$('.txt01').animate({
				top: 0
			}, speed, 'easeOutBack', function(){
				$('.txt02').animate({
					top: 5
				}, speed, 'easeOutBack', function(){
					$('.txt03').animate({
						top: 5
					}, speed, 'easeOutBack', function(){
						$('.logo').animate({
							top: -9
						}, speed, 'easeOutBack', function(){

							setTimeout(function(){
								$('.txt01').delay(100).animate({
									opacity: 0
								}, fadeSpeed);

								$('.txt02').delay(200).animate({
									opacity: 0
								}, fadeSpeed);

								$('.txt03').delay(300).animate({
									opacity: 0
								}, fadeSpeed);

								$('.logo').delay(400).animate({
									opacity: 0
								}, fadeSpeed, function(){
									if(slider.current === 0){
										resetAnimation();
										slider.setCurrent( 'next' );
										slider.transition();
										insetAnimate();
									}
								});

							}, 2000);
						});
					});
				});
			});
		} else if (slider.current === 1){

			if(player){
				player.stopVideo();
			}

			$('.area-convenciones').animate({
				top: '2%'
			}, 1000, function(){
				$(this).css('position', 'static');
				$('.area-reloj').animate({
					opacity: 1
				}, 1000);
			});

			$('.area-infodate').animate({
				left: 20
			}, 1000);

		} else if (slider.current === 2){
			if(player){
				videoActions();
			}else{
				onYouTubePlayerAPIReady();
				videoActions();
			}
		}
	};

	var
	container = $('div.slider').css('overflow', 'hidden').children('.reel'),
	slider = new Slider( container, $('.controls') );

	slider.nav.find('a').on('click', function(e) {

		slider.setCurrent( $(this).data('dir') );

		if(slider.current === 0){
			if($(this).data('dir') === 'next'){
				slider.current = 1;
			} else{
				slider.current = 2;
			}
		}

		slider.transition();
		resetAnimation();
		insetAnimate();
		e.preventDefault();
	});

	$('.btnManifiesto').on('click', function(e){
		slider.current = 2;
		slider.transition();
		insetAnimate();
		e.preventDefault();
	});

	insetAnimate();

	//Terminos y condiciones
	$('.legal').find('a').on('click', function(e){
		var win = $(this).attr('class');

		$('.window:visible').hide();

		if(win === 'about'){
			$('.acerca').show();
		}else{
			$('.terminos').show();
		}

		$('.modal').fadeIn('fast');
		e.preventDefault();
	});

	$('.btn-close-terms').on('click', function(e){
		$('.modal').fadeOut('fast');
		$('.window:visible').hide();
		e.preventDefault();
	});

	$('.lnk-terms').on('click', function(e){
		$('.acerca').fadeOut('fast', function(){
			$('.terminos').fadeIn('fast');
		});
		e.preventDefault();
	});


	//Traer terminos de nuestro server

	var data;

	$.ajax({
		url: 'http://166.78.5.173/vivehoy/terms.php',
		dataType: 'jsonp',
		data: data,
		success: function(data){
			$('.info-terms').html(data.mensaje);
		},
		error: function(){
			$('.info-terms').html('Al parecer hubo un error, verifica tu conexión, refresca tu navegador e intenta nuevamente.');
		}
	});
});