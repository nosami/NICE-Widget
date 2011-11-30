entitiesForPage("http://publications.nice.org.uk/infection-control-cg2/guidance",
  function(entities) 
  {
     var filtered = filterEntitiesForHealthcare(entities);
     console.log(filtered);
	 buildPopupStuff(filtered);
  }
);

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


if (typeof jQuery == 'undefined') {
	var jQ = document.createElement('script');
	jQ.type = 'text/javascript';
	jQ.onload=runthis;
	jQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
	document.body.appendChild(jQ);
} else {
	runthis();
}

function runthis() {
   entitiesForPage(window.location,filterEntitiesForHealthcare)
}
}



