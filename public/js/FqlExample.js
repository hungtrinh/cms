/*
 * @class FqlExample
 * 
 * @using Oauth2 @link{Oauth2.js}
 */
var FqlExample = new Object();


FqlExample.run = function()
{
    this.init();
    this.getPublicProfileDataNoNeedLogin();
    this.getUserData();
    this.meFriendsProfileQuery();
    this.meProfile();
    this.getMeFriendIdList();
//    this.getDummyData();
    this.friendsPlayingSameGameWithMe();
    this.friendsArentPlayingSameGameWithMe();
}

FqlExample.init = function() {
    module('CyFql-Test'); 
}

/**
 * @using Oauth2 @link {Oauth2.js}
 * @using App @link {App.js}
 */
FqlExample.getPublicProfileDataNoNeedLogin = function(){
    asyncTest('public profile data of user have id '+App.getTestUserId(),function(){
       FB.api({
            method:'fql.query',
            format: 'json',
            query:'SELECT uid,name,first_name,last_name,birthday,pic,pic_small,pic_square,pic_big,profile_url FROM user WHERE uid='+App.getTestUserId()
        },
        function(res){
            ////console.log(res);
            ok((null != res) && (res.length>0),'cross-domain Ajax pass');
            if(res.length>0) {
	            ok(null != res[0].uid,'have "uid" property');
	            ok(null != res[0].name,'have "name" property');
	            ok(null != res[0].first_name,'have "first_name" property');
	            ok(null != res[0].last_name,'have "last_name" property');
	            ok(null != res[0].birthday,'have "birthday" property');
	            ok(null != res[0].pic,'have "pic" property');
	            ok(null != res[0].pic_small,'have "pic_small" property');
	            ok(null != res[0].pic_square,'have "pic_square" property');
	            ok(null != res[0].pic_big,'have "pic_big" property');
	            ok(null != res[0].profile_url,'have "profile_url" property');
            }
            start();
        });
    });
};

/**
 * @using Oauth2 @link {Oauth2.js}
 * @using App @link {App.js}
 */
FqlExample.getUserData = function(){
    asyncTest('profile data of user have id '+App.getTestUserId(),function(){
       FB.api({
            access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
            query:'SELECT uid,name,first_name,last_name,birthday,pic,pic_small,pic_square,pic_big,profile_url FROM user WHERE uid=me()'
        },
        function(res){
            //console.log(res);
            ok((null != res) && (res.length>0),'cross-domain Ajax pass');
            if(res.length>0) {
	            ok(null != res[0].uid,'have "uid" property');
	            ok(null != res[0].name,'have "name" property');
	            ok(null != res[0].first_name,'have "first_name" property');
	            ok(null != res[0].last_name,'have "last_name" property');
	            ok(null != res[0].birthday,'have "birthday" property');
	            ok(null != res[0].pic,'have "pic" property');
	            ok(null != res[0].pic_small,'have "pic_small" property');
	            ok(null != res[0].pic_square,'have "pic_square" property');
	            ok(null != res[0].pic_big,'have "pic_big" property');
	            ok(null != res[0].profile_url,'have "profile_url" property');
            }
            start();
        });
    });
};


FqlExample.meFriendsProfileQuery = function(){
    asyncTest('me() friend profile data',function(){
       FB.api({
    	   access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
            query:'SELECT uid, name FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
//            query:'SELECT uid, name, pic_square FROM user WHERE uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
        },
        function(res){
            //console.log(res);
            
            ok(null != res,'cross-domain Ajax pass');
            if (res == null) {
            	start();
            	return;
            }
            if (res.data == null) {
            	start();
            	return;
            }
            ok(null != res[0].uid,'have "uid" property');
            ok(null != res[0].name,'have "name" property');
//            ok(null != res[0].pic_square,'have "pic_square" property');
            start();
        });
    });
};

/**
 * @using Oauth2 @link {Oauth2.js}
 * @using App @link {App.js}
 */
FqlExample.meProfile = function(){
    asyncTest('me() profile',function(){
       FB.api({
    	   access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
            query:'SELECT name FROM user WHERE uid=me()'
        },
        function(res){
            //console.log(res);
            ok(null != res,'cross-domain Ajax pass');
            if (res == null) {
            	start();
            	return;
            }
            if (res.data == null) {
            	start();
            	return;
            }
            ok(null != res[0].name,'have "name" property');
            start();
        });
    });
};

/**
 * @using Oauth2 @link {Oauth2.js}
 */
FqlExample.getDummyData = function() {
    FB.api({
    	access_token: Oauth2.getAccessToken(),
        method: 'fql.query',
        query: 'SELECT id,name,age,address,description,job FROM dummy WHERE id = 1'
    },
    function(res) {
        //console.log(res);
    });
}

/**
 * @using Oauth2 @link {Oauth2.js}
 * @using App @link {App.js}
 */
FqlExample.getMeFriendIdList = function(){
    asyncTest('my friends id',function(){
       FB.api({
    	   access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
            query:'SELECT uid1,uid2 FROM friend WHERE uid1=me()'
        },
        function(res){
            //console.log(res);
            ok((null != res) && (res.length>0),'cross-domain Ajax pass');
            if ((null != res) && (res.length>0)) {
            	ok((null != res) && (res.length>0),'i have '+res.length+ ' friend ');
	            ok(null != res[0].uid1,'have "uid1" property');
	            ok(null != res[0].uid2,'have "uid2" property');
            }
            start();
        });
    });
};


FqlExample.friendsPlayingSameGameWithMe = function(){
    asyncTest('all friend play same game with me',function(){
       FB.api({
    	   access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
//            query: 'SELECT uid,name,pic_square FROM user WHERE is_app_user="1" AND uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
            query: 'SELECT uid,name FROM user WHERE is_app_user="1" AND uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
        },
        function(res){
            //console.log(res);
            ok((null != res) && (res.length>0),'there are some friend playing this games');
            if ((null != res) && (res.length>0)) {
            	ok((null != res) && (res.length>0),'there are '+res.length+ ' friend play this game');
	            ok(null != res,'cross-domain Ajax pass');
	            ok(null != res[0].uid,'have "uid" property');
	            ok(null != res[0].name,'have "name" property');
//	            ok(null != res[0].pic_square,'have "pic_square" property');
            }
            start();
        });
    });
};

FqlExample.friendsArentPlayingSameGameWithMe = function(){
    asyncTest('all friend no play this game',function(){
       FB.api({
    	   access_token:Oauth2.getAccessToken(),
            method:'fql.query',
            format: 'json',
            //query: 'SELECT uid,name,pic_square FROM user WHERE is_app_user="0" AND uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
            query: 'SELECT uid,name FROM user WHERE is_app_user="0" AND uid IN (SELECT uid2 FROM friend WHERE uid1=me())'
        },
        function(res){
            //console.log(res);
            ok((null != res) && (res.length>0),'there are some friend no playing this games');
            if ((null != res) && res.length>0) {
            	ok(res.length>0,'there are '+res.length+ ' friend no play this game');
	            ok(null != res[0].uid,'have "uid" property');
	            ok(null != res[0].name,'have "name" property');
//	            ok(null != res[0].pic_square,'have "pic_square" property');
            }
            start();
        });
    });
};

