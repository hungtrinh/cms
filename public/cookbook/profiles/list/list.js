steal( 'jquery/controller',
	   'jquery/view/ejs',
	   'jquery/controller/view',
	   'cookbook/models' )
.then( './views/init.ejs', 
       './views/profiles.ejs', 
       function($){

/**
 * @class Cookbook.Profiles.List
 * @parent index
 * @inherits jQuery.Controller
 * Lists profiles and lets you destroy them.
 */
$.Controller('Cookbook.Profiles.List',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html(this.view('init',Cookbook.Models.Profiles.findAll()) )
	},
	'.destroy click': function( el ){
		if(confirm("Are you sure you want to destroy?")){
			el.closest('.profiles').model().destroy();
		}
	},
	"{Cookbook.Models.Profiles} destroyed" : function(Profiles, ev, profiles) {
		profiles.elements(this.element).remove();
	},
	"{Cookbook.Models.Profiles} created" : function(Profiles, ev, profiles){
		this.element.append(this.view('init', [profiles]))
	},
	"{Cookbook.Models.Profiles} updated" : function(Profiles, ev, profiles){
		profiles.elements(this.element)
		      .html(this.view('profiles', profiles) );
	}
});

});