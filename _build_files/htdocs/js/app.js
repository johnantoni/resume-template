jQuery(document).ready(function () {

  jQuery('.jump-to').on('click', function(e) {
    e.preventDefault();
    var loc = jQuery(this).data("id");
    if (loc.length > 0) {
      jQuery(window).scrollTo($(loc), 800, {offset: -48});
    }
  });

  jQuery('.thumb').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: false,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
    image: {
      verticalFit: true,
      titleSrc: ""
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });


});