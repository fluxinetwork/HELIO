function governance() {
	$('.js-show-txt').on('click', function(){
		$('.governance .is-active').removeClass('is-active');
		$(this).parent().toggleClass('is-active');
	});

	$('.governance .js-init').click().removeClass('.js-init');
}