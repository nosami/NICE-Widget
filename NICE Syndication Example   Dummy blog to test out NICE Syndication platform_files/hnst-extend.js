jQuery.fn.extend({
  highlight: function(term, insensitive, span_class){
    var regex = new RegExp('(<[^>]*>)|(\\b'+ term.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +')', insensitive ? 'ig' : 'g');
    return this.html(this.html().replace(regex, function(a, b, c){
      return (a.charAt(0) == '<') ? a : '<span class="'+ span_class +'">' + c + '</span>';
    }));
  }
});

function entitiesForPage(uri,entityHandler) 
{
  jQuery.ajax({
    url:"http://access.alchemyapi.com/calls/url/URLGetRankedNamedEntities?apikey=630ef77c0328ba4cf99c94c7474dd44f8e79f4f4&url=" + uri + "&outputMode=json",
    crossDomain:true,
    dataType: 'jsonp',
    jsonp: 'jsonp',
    success: function(d,s,x) {entityHandler(d.entities);}
  });
};

function filterEntitiesForHealthcare(entities)
{
   console.log(entities);
   var filtered = [];
   
   for(i = 0;i != entities.length; i++)
   {
     if(entities[i].type === 'HealthCondition' || entities[i].type === 'Drug')
     {
       filtered.push(entities[i].text);
     }
   } 

   return filtered;
}
function buildPopupStuff(entities)
{
  var hnst_query = entities;
	
	if(typeof(hnst_query) != 'undefined'){
    var area; var i; var s;
    for (s in hnst_areas){
      area = jQuery(hnst_areas[s]);
      if (area.length != 0){
        for (var l = 0; l<area.length; l++) {
		for (i in hnst_query){
		  area.eq(l).highlight(hnst_query[i], 1, 'trigger');
		}
	}
      	break;
      }
    }
	}

	function connectBubble()
	{
		jQuery('.bubbleInfo').each(function () {
	            var distance = 10;
	            var time = 250;
	            var hideDelay = 500;

	            var hideDelayTimer = null;

	            var beingShown = false;
	            var shown = false;
	            var trigger = $('.trigger');
	            var info = $('.popup', this).css('opacity', 0);

	            jQuery('.trigger').mouseover(function () {
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
	}

	connectBubble();
}

entitiesForPage("http://briansamson.info/nice/",
  function(entities) 
  {
     var filtered = filterEntitiesForHealthcare(entities);
     console.log(filtered);
	 buildPopupStuff(filtered);
  }
);


