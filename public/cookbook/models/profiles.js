steal('jquery/model', function() {

	/**
	 * @class Cookbook.Models.Profiles
	 * @parent index
	 * @inherits jQuery.Model Wraps backend profiles services.
	 */
	$.Model('Cookbook.Models.Profiles',
	/* @Static */
	{
		findOne : function(params, success, error) {
			var self = this;
			var id = params.id;
			delete params.id;
			return $.get("http://graph.cyworld.vn/" + id + "?callback=?",
					params, success, "json");
		},
		findAll : "/profiles.json",
		// findOne : "/profiles/{id}.json",
		create : "/profiles.json",
		update : "/profiles/{id}.json",
		destroy : "/profiles/{id}.json"
	},
	/* @Prototype */
	{});

});