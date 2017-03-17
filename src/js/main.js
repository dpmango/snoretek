// set dalay on scroll event to prevent memory leaks
(function($) {
  var uniqueCntr = 0;
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === "function") {
        fn = waitTime;
        waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.scroll(function () {
        var self = $(this);
        var timer = self.data(tag);
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            self.removeData(tag);
            fn.call(self[0]);
        }, waitTime);
        self.data(tag, timer);
    });
  }
})(jQuery);


// READY FUNCTION
$(document).ready(function(){

 	// Prevent # behavior
	$('[href="#"]').click(function (e) {
		e.preventDefault();
	});

	// smoth scroll
	$('a[href^="#section"]').click(function(){
        var el = $(this).attr('href');
        $('body, html').animate({
            scrollTop: $(el).offset().top - 80}, 800);
        return false;
	});

  // FIXED HEADER
  $(window).scroll(function(){
    var wPos = $(window).scrollTop();
    var shopHeight = $('.shop').height() + 20;

    if (wPos > 200 ) {
      $('.header').addClass('header--transformed');
    } else {
      $('.header').removeClass('header--transformed');
    }

    if (wPos > shopHeight ) {
      $('.header').addClass('header--sticky');
    } else {
      $('.header').removeClass('header--sticky');
    }
  });

  // hamburger
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $('.mobile-menu').toggleClass('is-active');
    $('.page').toggleClass('is-active');
  });

  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($('.mobile-menu'));

    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
          $('.hamburger').removeClass('is-active');
          $('.mobile-menu').removeClass('is-active');
          $('.page').removeClass('is-active');
        }
    });
  });

  // PRODUCT TABS
  $('.shop__product__tabs-nav__tab').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var selectedTab = $(this).data('product');

    $('.shop__product__tab').each(function(i, val){
      if (selectedTab == $(this).data('product')){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
      }
    })
  });


  // FAQ SECTION
  $('.faq__item__title').on('click', function(e){
    $(this).parent().find('.faq__item__answer').slideToggle();
    $(this).parent().toggleClass('active');
  });

  // UI
  $('.ui-select').on('click', function(e){
    $(this).toggleClass('active');
  });

  $('.ui-select__drop span').on('click', function(e){
    var currentValue = $(this).data('select');
    $(this).closest('.ui-select').find('label').text(currentValue);
    $(this).closest('.ui-select').find('label').addClass('selected');
    $('.ui-select').removeClass('ui-select--error');

    // paste  value
    $(this).closest('.ui-select').find('input[type="hidden"]').val(currentValue);
  });

  $(document).mouseup(function (e) {
    var container = new Array();
    container.push($('.ui-select'));
    $.each(container, function(key, value) {
        if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
            $(value).removeClass('active');
        }
    });
  });

  // Carousel
  $('#owlTestimonials').owlCarousel({
    loop: true,
    nav: true,
    dots: true,
    margin: 0,
    responsive: {
      0:{
        items: 1,
      },
      768:{
        items: 2,
      }
    }
  });

  // Magnific Popup
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });

  $('.popup-gallery').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});

  // Masked input
  $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
  $("input[name='phone']").mask("9 (999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  $('input[name="cvc"]').mask("999");
  $('input[name="credit-card"]').mask("9999 9999 9999 9999");

});