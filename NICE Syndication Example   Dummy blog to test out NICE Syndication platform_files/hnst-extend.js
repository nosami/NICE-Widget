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
  entitiesForPage("http://publications.nice.org.uk/infection-control-cg2/guidance",
  function(entities) 
  {
     filtered = filterEntitiesForHealthcare(entities);
     console.log(filtered);
     inner(filtered);
  });

  function inner(hnst_query) {
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

	$('.trigger').CreateBubblePopup({
												selectable: true,

												position : 'top',
												align	 : 'center',

												innerHtml: 'Take a look to the HTML source of this page <br /> \
															to learn how the plugin works!',

												innerHtmlStyle: {
																	color:'#FFFFFF', 
																	'text-align':'center'
																},

												themeName: 	'all-black',
												themePath: 	'http://www.vegabit.com/examples/images/jquerybubblepopup-theme'

											});


  }
}
}));

