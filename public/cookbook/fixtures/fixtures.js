// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("recipe", 5, function(i, recipe){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "recipe "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})

	$.fixture.make("profiles", 5, function(i, profiles){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		var emails = ["a@yahoo.com","b@yahoo.com","c@yahoo.com"];
		return {
			id: i,
			name: "profiles "+i,
			email: $.fixture.rand( emails , 1)[0],
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})