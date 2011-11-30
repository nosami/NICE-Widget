
function informationTypesFor(entity,callback)
{
   $.ajax({url: "https://api.nice.org.uk/services/search/results/filterby/Types of information?q=" + entity.replace(" ","+"),
           headers: 
           {
                    "Accept": "application/json",
                    "API-Key": "4b9eae0d-a570-43d8-929f-308bf20991de"
           },
                success: function (data, textStatus, jqXhr) {
                    if (textStatus !== "success") {
                        alert("Resource request failed");
                    }
                    else {
                        callback(data);
                    }
                }
            }); 
}

function markupFor(entity,callback)
{
   informationTypesFor(entity,function(informationTypes) {
       var markup = "<ul>";
	   for(i = 0; i != informationTypes.length;i++)
	   {
	     markup += '<li><a href="' + informationTypes[i].Uri + '">' + informationTypes[i].Title + '</a></li>';  
	   }
	   markup += "</ul>";
	   callback(markup);
   });
}

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
       filtered.push({
            text = entities[i].text,
			markup = function(callback) {markupFor(entities[i],callback)}
	   );
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
			  area.eq(l).highlight(hnst_query[i].text, 1, 'trigger');
			}
		}
			break;
		  }
		}
	}
	
	$('.trigger').CreateBubblePopup({
			selectable: true,

			position : 'top',
			align	 : 'center',

			innerHtml: 'Loading..',

			innerHtmlStyle: {
								color:'#FFFFFF', 
								'text-align':'center'
							},

			themeName: 	'all-black',
			themePath: 	'http://www.vegabit.com/examples/images/jquerybubblepopup-theme'

	});
    
	$('.trigger').mouseover(function(){
				//get a reference object for "this" target element
				var button = $(this);
				
				var entityToLoadSearchFor;
				for(int i = 0;i != hnst_query.length;i++)
				{ 
				   if(hnst_query[i].text == button.innerText)
				   {
				      entityToLoadSearchFor = hnst_query[i];
				   }
				}
				
				entityToLoadSearchFor.markup(function(markup) {button.SetBubblePopupInnerHtml(markup,true);});
		}); //end mouseover event
	

}
}));

