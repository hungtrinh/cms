steal("funcunit/qunit", "cookbook/fixtures", "cookbook/models/profiles.js", function(){
	module("Model: Cookbook.Models.Profiles")
	
	test("findAll", function(){
		expect(4);
		stop();
		Cookbook.Models.Profiles.findAll({}, function(profiles){
			ok(profiles)
	        ok(profiles.length)
	        ok(profiles[0].name)
	        ok(profiles[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Cookbook.Models.Profiles({name: "dry cleaning", description: "take to street corner"}).save(function(profiles){
			ok(profiles);
	        ok(profiles.id);
	        equals(profiles.name,"dry cleaning")
	        profiles.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Cookbook.Models.Profiles({name: "cook dinner", description: "chicken"}).
	            save(function(profiles){
	            	equals(profiles.description,"chicken");
	        		profiles.update({description: "steak"},function(profiles){
	        			equals(profiles.description,"steak");
	        			profiles.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Cookbook.Models.Profiles({name: "mow grass", description: "use riding mower"}).
	            destroy(function(profiles){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})