/*
 * @class FapiExample
 * 
 * @using Oauth2 @link{Oauth2.js}
 */

var FapiExample = new Object();
FapiExample.GRAPHDOMAIN = 'http://graph.cyworld.vn';

FapiExample.run = function(){
    this.init();
    this.getMyProfile();
    this.getProfileIndicateFields();
    this.getMyFriendsProfile();
    this.getMyFriendsProfileIndicateFields();
    this.getProfilePicture();
    this.getProfileFeed();
    this.getHomeFeed();
    this.getPermis();
    this.postNewFeed();
    this.getAccessToken();
    
}

FapiExample.init = function(){
    module('CyGraph-Test'); 
}

/**
 * /me
 * @using Oauth2 @link{Oauth2.js}
 */
FapiExample.getMyProfile = function(){
    asyncTest("me profile: 'http://graph.cyworld.vn/me'",function(){
        // The is automatically paused  
        FB.api('/me?access_token='+Oauth2.getAccessToken(),
            function(res){
                ok(res != null, 'cross-domain Ajax pass');
                ok(res.first_name != null, 'have "first_name" property');
                ok(res.gender != null, 'have "gender" property');
                ok(res.id != null, 'have "id" property');
                ok(res.last_name != null, 'have "last_name" property');
                ok(res.link != null, 'have "link" property');
                ok(res.locale != null, 'have "locale" property');
                ok(res.name != null, 'have "name" property');
                ok(res.username != null, 'have "username" property');
                // After the assertion has been called,  
                // continue the  
                start();
            }
            );
    });

};

/**
 * /me
 * @using Oauth2 @link{Oauth2.js}
 */
FapiExample.getProfileIndicateFields = function(){
	var userId = App.getTestUserId();

    asyncTest(" profile: 'http://graph.cyworld.vn/"+userId+"?fields=id,name,first_name,last_name,link,username,gender,picture,third_party_id'",function(){
        // The is automatically paused  
        FB.api('/'+userId+'?fields=id,name,first_name,last_name,link,username,gender,picture,third_party_id&access_token='+Oauth2.getAccessToken(),
            function(res){
                ok(res != null, 'cross-domain Ajax pass');
                ok(res.id != null, 'have "id" property');
                ok(res.name != null, 'have "name" property');
                ok(res.first_name != null, 'have "first_name" property');
                ok(res.last_name != null, 'have "last_name" property');
                ok(res.link != null, 'have "link" property');
                ok(res.username != null, 'have "username" property');
                ok(res.gender != null, 'have "gender" property');
                ok(res.picture != null,'have "picture" property');
                ok(res.third_party_id != null, 'have "third_party_id" property');
                
                // After the assertion has been called,  
                // continue the  
                start();
            }
            );
    });

};

/**
 * /me/friends
 * @using Oauth2 @link{Oauth2.js}
 */
FapiExample.getMyFriendsProfile = function(){
	
    asyncTest("me friends 'http://graph.cyworld.vn/me/friends'",function(){
        // The is automatically paused  
        FB.api('/me/friends?access_token='+Oauth2.getAccessToken(),
            function(res){
                ok(res != null, 'cross-domain Ajax pass');
                if (res == null) {
                	start();
                	return;
                }
                if (res.data == null) {
                	start();
                	return;
                }
                
                ok(res.data != null, 'i have a friend');
                ok(res.data.length > 0, 'i have '+res.data.length+ ' friends');
                ok(res.data[0].id != null,'friend have "id" property');
                ok(res.data[0].name != null,'friend have "name" property');
                
                // After the assertion has been called,  
                // continue the  
                start();
            }
            );
    });
};

/**
 * /me/friends?fields=id,name,picture
 * @using Oauth2 @link{Oauth2.js}
 */
FapiExample.getMyFriendsProfileIndicateFields = function(){
    asyncTest("me friends(id,name,picture) 'http://graph.cyworld.vn/me/friends?fields=id,name,picture'",function(){
        // The is automatically paused
        FB.api('/me/friends?fields=id,name,picture&access_token='+Oauth2.getAccessToken(),
            function(res){
//                console.log(res);
                ok(res != null, 'cross-domain Ajax pass');
                ok(res.data != null, 'i have a friend');
                if (res.data == null) {
                	start();
                	return;
                }
                ok(res.data.length > 0, 'i have '+res.data.length+ ' friends');
                ok(res.data[0].id != null,'friend have "id" property');
                ok(res.data[0].name != null,'friend have "name" property');
                ok(res.data[0].picture != null,'friend have "picture" property');
                // After the assertion has been called,  
                // continue the  
                start();
            }
        );
    });
};


/**
 * /{nickname}/picture?type=square
 * @using Oauth2 @link{Oauth2.js}
 */
FapiExample.getProfilePicture = function(){
	var nickname = App.getTestUserName();
    asyncTest(nickname+" square picture url: 'http://graph.cyworld.vn/"+nickname+"/picture?type=square'",function(){
        // The is automatically paused
        
        FB.api('/'+nickname+'/picture?type=square&access_token='+Oauth2.getAccessToken(),
        function(res){
//            console.log(res);
            ok(res != null, 'cross-domain Ajax pass');
            ok(/^((\w+):)?\/\/((\w|\.)+(:\d+)?)[^:]+\.(jpe?g|gif|png)$/.test(res),'return data is the picture link');
            start();
        }
    );
    });
    
};

/**
 * /{nickname}/feed
 * @using Oauth2 @link{Oauth2.js}
 * @using App @link{App.js}
 */
FapiExample.getProfileFeed = function(){
	var nickname = App.getTestUserName();
    asyncTest(nickname + " feed datastuct: 'http://graph.cyworld.vn/"+nickname+"/feed?since=-1&'",function(){
        // The is automatically paused
        FB.api('/'+nickname+'/feed?since=-1&limit=20&access_token='+Oauth2.getAccessToken(),
        function(res){
            ok(res != null, 'cross-domain Ajax pass');
            start();
        });
    });
}


FapiExample.getHomeFeed = function(){
	var nickname = App.getTestUserName();
    asyncTest(nickname + " home datastuct 'http://graph.cyworld.vn/"+nickname+"/home?since=-1&'",function(){
        // The is automatically paused
        FB.api('/'+nickname+'/hone?since=-1&limit=20&access_token='+Oauth2.getAccessToken(),
        function(res){
            ok(res != null, 'cross-domain Ajax pass');
            start();
        });
    });
}

FapiExample.getPermis = function(){
	var nickname = App.getTestUserName();
    asyncTest(nickname+ " app permissions: 'http://graph.cyworld.vn/"+nickname+"/permissions'",function(){
        // The is automatically paused
        FB.api('/'+nickname+'/permissions?access_token='+Oauth2.getAccessToken(),
        function(res){
        	var expected = {'data':[{'installed':1,'status_update':1,'photo_upload':1,'video_upload':1,'create_note':1,'share_item':1,'bookmarked':1,'publish_stream':1}]};
            ok(res != null, 'cross-domain Ajax pass');
            deepEqual(res,expected,'you have some permissions');
            start();
        });
    });


}

FapiExample.postNewFeed = function(){
	var nickname = App.getTestUserName();
    asyncTest("post new feed to myhome: 'http://graph.cyworld.vn/me/feed'",function(){
        // The is automatically paused
    	FB.api('/me/feed', 'post', { access_token: Oauth2.getAccessToken(), message:'tang em mon qua nay', name:'anh dep a nha', description : 'anh chup chuong chinh test', picture : 'http://www.wallpaperbase.com/wallpapers/animals/lions/lion_4.jpg'}, function(response) {
    		if (!response || response.error) {
    		  alert('Error occured'); 
    		} else { 
    			ok(response.id!=null,'post new feed success and return feed id = '+response.id);
    		}
    		start();
    	});
    });
}

FapiExample.getAccessToken = function() {
	switch (App.Env) {
	case 'live':
		var url = 'http://graph.cyworld.vn/oauth/access_token?client_id=315&client_secret=d4ed1caad13a1116438cbe16c4f6c0d8&grant_type=password&username=thuynb&password=123456&format=json&callback=?';
		break;
	case 'local':default:
		var url = 'http://graph.cyworld.vn/oauth/access_token?client_id=308&client_secret=0aa64941cd87b3d9eb16dff1b72fe99e&grant_type=password&username=thuynb&password=1111&format=json&callback=?';
		break;
	}
	
	asyncTest("get access token: " + url,function(){
        // The is automatically paused
    	$.getJSON(url,function(res){
    		ok(res != null, 'cross-domain Ajax pass');
    		ok(res.access_token != null,'response have "access_token" property');
    		ok(res.expires_in != null,'response have "expires_in" property');
    		ok(res.scope != null,'response have "scope" property');
    		start();
    	});
    });
}