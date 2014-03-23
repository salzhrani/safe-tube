export default Ember.Route.extend({
  model: function() {
    return new Promise(function(resolve,reject){
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/search',
			data:{q:'kitten',key:'AIzaSyDVX2dTat_Obls27HTvQx3Vja5Zzo7JMkI',part:'snippet,id'},
		})
		.then(function(data){
			if(data.error)
			{
				reject(data);
			}
			else
			{
				var models = [];
				data.items.forEach(function(item){
					models.push({
						id : item.id.videoId,
						title : item.snippet.title,
						desc : item.snippet.description,
						thumb : item.snippet.thumbnails.high.url
					});
				});
				resolve(models);
			}
		}, function(err){
			reject(err);
		});
    });
  }
});
