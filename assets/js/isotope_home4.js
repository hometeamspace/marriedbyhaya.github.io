/*  - Isotop Items
---------------------------------------------------*/
jQuery(window).on("load resize",function(e){
  "use strict";

  var $container = $('#mmproductItems .isotope'),
  colWidth = function () {
	var w = $container.width(), 
	columnNum = 1,
	columnWidth = 0;
  //Select what will be your porjects columns according to container widht
  if (w > 768)     { columnNum  = 3; }  
  else if (w > 480) { columnNum  = 2; }
  columnWidth = Math.floor(w/columnNum);

  //Default item width and height
  $container.find('.item').each(function() {
	var $item = $(this), 
	width = columnWidth,
	height = columnWidth*0.71;
	$item.css({ width: width, height: height });
  }); 

  //2x height item width and height
  $container.find('.height2').each(function() {
	var $item = $(this), 
	width = columnWidth,
	height = columnWidth*2*0.71;
	$item.css({ width: width, height: height });
  });  
  return columnWidth;
  },
  isotope = function () {
	$container.isotope({
	  resizable: true,
	  itemSelector: '.item',
	  masonry: {
		columnWidth: colWidth(),
		gutterWidth: 10
	  }
	});
  };
  isotope(); 

  // bind filter button click
  $('.isotope-filters').on( 'click', 'button', function() {
	var filterValue = $( this ).attr('data-filter');
	$container.isotope({ filter: filterValue });
  });

  // change active class on buttons
  $('.isotope-filters').each( function( i, buttonGroup ) {
	var $buttonGroup = $( buttonGroup );
	$buttonGroup.on( 'click', 'button', function() {
	  $buttonGroup.find('.active').removeClass('active');
	  $( this ).addClass('active');
	});
  });
});
/*  - End Of Isotop Items
---------------------------------------------------*/ 