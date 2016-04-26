'use strict';

$(window).scroll(function () {
  $('.right-block').scroll();
});

// $('.right-block').scroll(function() {
//
//   let scrollPos = $(this).scrollTop()
//
//   $('.name').css({
//     'transform': `translate(0px, ${(-scrollPos/3)%400}%)`
//   })
//   console.log($('.name').offset().top)
//
// })