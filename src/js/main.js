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
  var selectedTab, price;
  $('.shop__product__tabs-nav__tab').on('click', function(){
    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    var productName = $(this).find('span').text();
    $('.shop__form__title__product').text(productName);

    selectedTab = $(this).data('product');

    if (selectedTab == 1){
      price = 28.95
    } else if(selectedTab == 2) {
      price = 39.95
    } else if(selectedTab == 3){
      price = 63.95
    }
    $('.shop__form__title span').text('$ ' + price + ' ');

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

    // Trigger form change
    $('.shop__form').trigger('change');
  });

  $(document).click(function (e) {
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

  ////////////
  // FORM LOGIC
  ////////////
  var form,
      firstName,
      lastName,
      phone,
      email,
      state,
      city,
      zip,
      street,
      creditCard,
      month,
      year,
      cvc,
      agreed,
      firstNameValid,
      lastNameValid,
      phoneValid,
      emailValid,
      stateValid,
      cityValid,
      zipValid,
      streetValid,
      creditCardValid,
      monthValid,
      yearValid,
      cvcValid,
      agreedValid
  var activeStage = 1;

  function collectVars(){
    form = $('.shop__form');
    firstName = form.find('input[name=first-name]');
    lastName = form.find('input[name=last-name]');
    phone = form.find('input[name=phone]');
    email = form.find('input[name=email]');

    state = form.find('input[name=state]');
    city = form.find('input[name=city]');
    zip = form.find('input[name=zip]');
    street = form.find('input[name=street]');

    creditCard = form.find('input[name=credit-card]');
    month = form.find('input[name=month]');
    year = form.find('input[name=year]');
    cvc = form.find('input[name=cvc]');

    agreed = form.find('input[name=agree]:checked');
  }

  function validateForm(){
    // email validation
    var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var emailIsValid = false;
    var emailIsNotValid = true;
    if(emailRegex.test(email.val())){
      emailIsValid = true;
      emailIsNotValid = false;
    } else {
      emailIsValid = false;
      emailIsNotValid = true;
    }

    if(firstName.val() == '' || firstName.val().length <= 3){
        firstName.addClass('ui-input--error');
        firstNameValid = false;
        return false;
    } else {
        firstNameValid = true;
        firstName.removeClass('ui-input--error');
    }
    if(lastName.val() == '' || lastName.val().length <= 3){
        lastName.addClass('ui-input--error');
        lastNameValid = false;
        return false;
    } else {
        lastNameValid = true;
        lastName.removeClass('ui-input--error');
    }
    if(emailIsNotValid){
        email.addClass('ui-input--error');
        emailValid = false;
        return false;
    } else {
        emailValid = true;
        email.removeClass('ui-input--error');
    }
    if(phone.val() == '' || phone.val().length <= 10){
        phone.addClass('ui-input--error');
        phoneValid = false;
        return false;
    } else {
        phoneValid = true;
        phone.removeClass('ui-input--error');
    }

    if (activeStage >= 2) {
      if(state.val() == ''){
          state.parent().addClass('ui-select--error');
          stateValid = false;
          return false;
      } else {
          stateValid = true;
          state.parent().removeClass('ui-select--error');
      }
      if(city.val() == '' || city.val().length <= 3){
          city.addClass('ui-input--error');
          cityValid = false;
          return false;
      } else {
          cityValid = true;
          city.removeClass('ui-input--error');
      }
      if(zip.val() == '' || zip.val().length <= 3){
          zip.addClass('ui-input--error');
          zipValid = false;
          return false;
      } else {
          zipValid = true;
          zip.removeClass('ui-input--error');
      }
      if(street.val() == '' || street.val().length <= 3){
          street.addClass('ui-input--error');
          streetValid = false;
          return false;
      } else {
          streetValid = true;
          street.removeClass('ui-input--error');
      }
    }
    if (activeStage >= 3) {
      if(creditCard.val().length < 12){
          creditCard.addClass('ui-input--error');
          creditCardValid = false;
          return false;
      } else {
          creditCardValid = true;
          creditCard.removeClass('ui-input--error');
      }
      if(month.val().length == ''){
          month.parent().addClass('ui-select--error');
          monthValid = false;
          return false;
      } else {
          monthValid = true;
          month.parent().removeClass('ui-select--error');
      }
      if(year.val().length == ''){
          year.parent().addClass('ui-select--error');
          yearValid = false;
          return false;
      } else {
          yearValid = true;
          year.parent().removeClass('ui-select--error');
      }
      if(cvc.val().length < 3){
          cvc.addClass('ui-input--error');
          cvcValid = false;
          return false;
      } else {
          cvcValid = true;
          cvc.removeClass('ui-input--error');
      }

      if(agreed.val() != 'yes'){
          agreed.addClass('ui-checkbox--error');
          agreedValid = false;
          return false;
      } else {
          agreedValid = true;
          agreed.removeClass('ui-checkbox--error');
      }
    }
    return true;
  }

  function showStages(){
    if ( firstNameValid && firstNameValid && (emailValid || phoneValid) ){
      activeStage = 2;
      $('#formShipping').addClass('show');
      $('#formShipping').fadeIn();

    }
    if (stateValid && cityValid && zipValid && streetValid ){
      activeStage = 3;
      $('#formPayment').addClass('show');
      $('#formPayment').fadeIn();
    }
  }
  // event listeners
  $('.shop__form').on('change', function(){
    collectVars();
    validateForm();
    showStages();

  });

  $('.shop__form__cta .btn').on('click', function(e){
    collectVars();

    if( !validateForm() ) {
      return false;
      e.stopPropagation();
    } else {
      //build message data
      var formData = {
        'firstName' : firstName,
        'lastName' : lastName,
        'phone' : phone,
        'email' : email,
        'state' : state,
        'city' : city,
        'zip' : zip,
        'street' : street,
        'creditCard' : creditCard,
        'month' : month,
        'year' : year,
        'cvc' : cvc
      };

      // and make ajax call to phpmail
      $.ajax({
        type        : 'POST',
        url         : 'php/contact.php',
        data        : formData,
        dataType    : 'json',
        encode      : true
      }).done(function(data) {
        if ( data.success) {
          form.find('.form__title').fadeOut();
          form.find('.form__wrapper').fadeOut();
          form.find('.form__thanks').fadeIn();
        }
      }).fail(function(data) {
        // remove
        console.log(data);
      });
    }

    e.preventDefault();

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

  $('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
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
  $("input[name='phone']").mask("(999) 999-9999");
  $("#tin").mask("99-9999999");
  $("#ssn").mask("999-99-9999");

  $('input[name="cvc"]').mask("999");
  $('input[name="credit-card"]').mask("9999 9999 9999 9999");

});
