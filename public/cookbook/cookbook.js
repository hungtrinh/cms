steal(
<<<<<<< HEAD
    './cookbook.css', 			// application CSS file
    './models/models.js',		// steals all your models
    './fixtures/fixtures.js',	// sets up fixtures for your models
    'cookbook/recipe/create',
    'cookbook/recipe/list',
    'cookbook/profiles/create',
    'cookbook/profiles/list',
    'cookbook/profiles/create',
    'cookbook/profiles/list',
    function(){					// configure your application
        $('#recipes').cookbook_recipe_list();
        $('#create').cookbook_recipe_create();
        $('#profiles').cookbook_profiles_list();
        $('#profiles-create').cookbook_profiles_create();
        Cookbook.Models.Profiles.findOne({
            id : 'thuynb'
        },function(profiles){
            console.log(profiles);		
        });
    }
);
=======
	'./cookbook.css', 			// application CSS file
	'./models/models.js',		// steals all your models
	'./fixtures/fixtures.js',	// sets up fixtures for your models
	'cookbook/recipe/create',
	'cookbook/recipe/list',
	'cookbook/profiles/create',
	'cookbook/profiles/list',
	'cookbook/profiles/create',
	'cookbook/profiles/list',
	function(){					// configure your application
		/*
		 * @page index Cookbook
		 * @tag home
		 *
		 * ###Little Cookbook
		 *  
		 * Our little Cookbook only has two classes:
		 *  
		 * * Recipe 
		 * * Profiles 
		 */
		 
		$('#recipes').cookbook_recipe_list();
		$('#create').cookbook_recipe_create();
		$('#profiles').cookbook_profiles_list();
		$('#profiles-create').cookbook_profiles_create();
		var deferredProfile = Cookbook.Models.Profiles.findOne({id : 'thuynb'});
		
		deferredProfile.then(function(profile){
			console.log(profile);
		});
})
>>>>>>> 10b1dfc80f84046f3488b1ed840cb73a3c927215
