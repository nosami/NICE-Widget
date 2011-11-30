jQuery.fn.extend({
  highlight: function(term, insensitive, span_class){
    var regex = new RegExp('(<[^>]*>)|(\\b'+ term.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +')', insensitive ? 'ig' : 'g');
    return this.html(this.html().replace(regex, function(a, b, c){
      return (a.charAt(0) == '<') ? a : '<span class="'+ span_class +'">' + c + '</span>';
    }));
  }
});



jQuery(document).ready((function($)
{
  var hnst_query = new Array('catheter','infection','patient');
	
  if(typeof(hnst_query) != 'undefined'){
    var area; var i; var s;
    for (s in hnst_areas){
      area = $(hnst_areas[s]);
      if (area.length != 0){
        for (var l = 0; l<area.length; l++) {
		for (i in hnst_query){
		  area.eq(l).highlight(hnst_query[i], 1, 'trigger');
		}
	}
      	break;
      }
    }


	function connectBubble()
	{
		
/*		
	$('.bubbleInfo').each(function () {
	            var distance = 10;
	            var time = 250;
	            var hideDelay = 500;

	            var hideDelayTimer = null;

	            var beingShown = false;
	            var shown = false;
	            var trigger = $('.trigger');
	            var info = $('.popup', this).css('opacity', 0);

	            $('.trigger').mouseover(function () {
	                if (hideDelayTimer) clearTimeout(hideDelayTimer);
	                if (beingShown || shown) {
	                    // don't trigger the animation again
	                    return;
	                } else {
	                    // reset position of info box
	                    beingShown = true;

	                    info.css({
	                        top: -90,
	                        left: -33,
	                        display: 'block'
	                    }).animate({
	                        top: '-=' + distance + 'px',
	                        opacity: 1
	                    }, time, 'swing', function() {
	                        beingShown = false;
	                        shown = true;
	                    });
	                }

	                return false;
	            }).mouseout(function () {
	                if (hideDelayTimer) clearTimeout(hideDelayTimer);
	                hideDelayTimer = setTimeout(function () {
	                    hideDelayTimer = null;
	                    info.animate({
	                        top: '-=' + distance + 'px',
	                        opacity: 0
	                    }, time, 'swing', function () {
	                        shown = false;
	                        info.css('display', 'none');
	                    });

	                }, hideDelay);

	                return false;
	            });
	        });
	*/
	}


	connectBubble();





  }
}));
