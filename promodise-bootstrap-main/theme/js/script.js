(function ($) {
  'use strict';

  // Fixed header
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 70) {
      $('.site-navigation,.trans-navigation').addClass('header-white');
    } else {
      $('.site-navigation,.trans-navigation').removeClass('header-white');
    }
  });

  // Navbar dropdown for small screens
  if ($(window).width() < 992) {
    $('.navbar-collapse .dropdown-toggle').on('click', function () {
      $(this).siblings('.dropdown-menu').animate({
        height: 'toggle'
      }, 300);
    });
  }

  

  // Close navbar-collapse when a link is clicked
  $('.navbar-collapse .navbar-nav a').on('click', function () {
    $('.navbar-toggler:visible').click();
  });

})(jQuery);
