/*------------------------------*\

    #CONFIG

\*------------------------------*/

// Activate resize events
var resizeEvent = true;
var resizeDebouncer = true;

// Store window sizes
var windowH; 
var windowW; 
calc_window();
var docH;

// Breakpoint
var bpSmall;
var bpMedium;
var bpLarge;
var bpXlarge;




/*------------------------------*\

    #LOAD

\*------------------------------*/


$(window).load(function() {

});


$(document).ready(function(){
	map();
	governance();
});





/*------------------------------*\

    #RESIZE

    Is activated by vars in config.js

\*------------------------------*/

/**
 * Get window sizes
 * Store results in windowW and windowH vars
 */

// Get width and height
function calc_window() {
    calc_windowW();
    calc_windowH();
}
// Get width
function calc_windowW() {
    windowW = $(window).width();
}
// Get height
function calc_windowH() {
    windowH = $(window).height();
    docH = $(document).height();
}


/**
 * MAIN RESIZE EVENT
 *
 */

function resize_handler() {
    calc_windowH();
}
if ( resizeEvent ) { $( window ).bind( "resize", resize_handler() ); }


/**
 * DEBOUNCER
 * Fire event when stop resizing
 */

function debouncer( func , timeout ) {
    var timeoutID;
    var timeoutVAR;

    if (timeout) {
        timeoutVAR = timeout;
    } else {
        timeoutVAR = 200;
    }

    return function() {
        var scope = this , args = arguments;
        clearTimeout( timeoutID );
        timeoutID = setTimeout( function () {
            func.apply( scope , Array.prototype.slice.call( args ) );
        }, timeoutVAR );
    };

}

function debouncer_handler() {
}
if ( resizeDebouncer ) { $( window ).bind( "resize", debouncer(debouncer_handler) ); }





/*------------------------------*\

    #DISABLE

\*------------------------------*/

function disable_links() {
	$('.js-disabled').click(function(e){
		e.preventDefault();
	});
}

function disable_titles() {
	$('.js-disable-title').hover(
		function(){
			var cible = $(this);
			cible.data( 'title', cible.attr('title') ).attr('title','');
		},
		function() {
			var cible = $(this);
			cible.attr( 'title', cible.data('title') );
		}		
	);
}

/*------------------------------*\

    #IMAG-LOADING

    Using Images Loaded : http://imagesloaded.desandro.com

\*------------------------------*/

function loading_img(container, loader) {
	var nbImg = container.find('img').length-1;
	var hasLoadBar;
	var loadBar;
	var hasLoadNum;
	var loadNum;
	if (loader.find('.js-load-bar')) {
		hasLoadBar = true;
		loadBar = loader.find('.js-load-bar');
	}
	if (loader.find('.js-load-num')) {
		hasLoadNum = true;
		loadNum = loader.find('.js-load-num');
	}

	container.addClass('is-loading').imagesLoaded().progress(onProgress).always(onAlways);

	function onProgress(imgLoad, image) {
		var percent = Math.round(stepLoad*(100/nbImg));
		if (hasLoadBar) {
			loadBar.css('width', percent+'%');
		}
		if (hasLoadNum) {
			loadNum.html(percent+'%');
		}
	}

	function onAlways() {
		container.removeClass('is-loading');
		loader.remove();
	}
}


/*------------------------------*\

    #SCROLL-TO

\*------------------------------*/

function scroll_to(position, duration, relative) {
	var coef;
	var top;
	var bottom;

	if (position === 'top') {
		position = 0;
		top = true;
	} else if (position === 'bottom') {
		position = $(document).height()-$('.footer').height();
		bottom = true;
	} else {
		position = position.offset().top;
	}

	if (duration === 'fast') {
		coef = 0.1;
		duration = 200;
	} else if (duration === 'normal') {
		coef = 0.25;
		duration = 350;
	} else if (duration === 'slow') {
		coef = 0.4;
		duration = 500;
	} else {
		coef = duration/1000;
	}

	if (relative === true) {
		calc_windowH();
		if (top) {
			duration = $(document).height()*coef;
		} else if (bottom) {
			duration = ($(document).height()-$(document).scrollTop())*coef;
		}
	}

	$('html, body').animate({scrollTop: position}, duration);
}

/*------------------------------*\

    #SHARE

\*------------------------------*/

var popupCenter = function(url, title, width, height){
	var popupWidth = width || 640;
	var popupHeight = height || 320;
	var windowLeft = window.screenLeft || window.screenX;
	var windowTop = window.screenTop || window.screenY;
	var windowWidth = window.innerWidth || document.documentElement.clientWidth;
	var windowHeight = window.innerHeight || document.documentElement.clientHeight;
	var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2 ;
	var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
	var popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft);
	popup.focus();
	return true;
};

$('.js-share').on('click', function(e){
	e.preventDefault();

	var network = $(this).attr('data-network');
	var url = $(this).attr('data-url');
	var shareUrl;

	if (network == 'facebook') {
		shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Facebook");
	} if (network == 'twitter') {
		var origin = "energiepartagee";
		shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(document.title) +
            "&via=" + origin + "" +
            "&url=" + encodeURIComponent(url);
		popupCenter(shareUrl, "Partager sur Twitter");
	}
});


/*------------------------------*\

    #STRING

\*------------------------------*/

/**
 * Separate numbers
 */	

function formatNumber(number){
    var numberSplit = number.toFixed(0) + '';    
    var x = numberSplit.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? ' ' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1 + x2;
}

function governance() {
	$('.js-show-txt').on('click', function(){
		$('.governance .is-active').removeClass('is-active');
		$(this).parent().toggleClass('is-active');
	});

	$('.governance .js-init').click().removeClass('.js-init');
}
function map() {
	$('.js-expand-pastille').on('click', function(){
		$(this).toggleClass('is-expanded');
	});
}