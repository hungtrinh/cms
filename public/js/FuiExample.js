/*
 * @class FuiExample
 * 
 * @using UrlQuery @link{UrlQuery.js}
 */

var FuiExample = new Object();

/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.run = function() {
//	this.showRequetGameDiaglog();
	
//	this.showRequetGameDiaglogSendToOnePerson();
//	this.showFeedDialog();
//	this.showFacebookDialog();
	this.showPayDialog();
//	this.login();
//	this.getLoginStatus();
}

FuiExample.init = function() {

}
/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.showFeedDialog = function() {
//	FB.login(function(){
		FB.ui({
			method : 'feed',
			display : 'iframe',
			name : 'Facebook Dialogs',
			link : 'http://developers.facebook.com/docs/reference/dialogs/',
			picture : 'http://fbrell.com/f8.jpg',
			caption : 'Reference Documentation',
			description : 'Dialogs provide a simple, consistent interface for applications to interface with users.',
			message : 'Facebook Dialogs are easy!'
			,access_token : Oauth2.getAccessToken()
		}, function(response) {
			console.log(response);
			if (response && response.post_id) {
				alert('Post was published.');
			} else {
				alert('Post was not published.');
			}
		});
//	});	
};

/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.testWsShowFeedDialog = function() {
	FB.ui({
		method : 'feed',
		display : 'iframe',
		name : 'Facebook Dialogs',
		link : 'http://developers.facebook.com/docs/reference/dialogs/',
		picture : 'http://fbrell.com/f8.jpg',
		caption : 'Reference Documentation',
		description : 'Dialogs provide a simple, consistent interface for applications to interface with users.',
		message : 'Facebook Dialogs are easy!'
//		access_token : Oauth2.getAccessToken()
	}, function(response) {
		console.log(response);
		if (response && response.post_id) {
			alert('Post was published.');
		} else {
			alert('Post was not published.');
		}
	});
}


/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.showPayDialog = function() {
	var order_info = {"title":"40 Honeys","description":"40 Honeys","price":"50.0","currency":"FBCredits","user_id":"15","locale_id":"1","item_id":"FB02b","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png"};
	var obj = {
			method: 'pay.prompt',
			display: 'iframe',
			order_info: order_info,
			purchase_type: 'item'
   };
	FB.ui(obj, function(response) {
		console.log(response);
	});
		
};

/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.showRequetGameDiaglog = function() {
	
	FB.ui({
		method : 'apprequests',
		display : 'iframe',
		//to: '12000010871',
		name : 'Facebook Dialogs',
		link : 'http://developers.facebook.com/docs/reference/dialogs/',
		picture : 'http://fbrell.com/f8.jpg',
		caption : 'Reference Documentation',
		description : "Lest's be 1.",
		message :  "Lest's be.",
		access_token : Oauth2.getAccessToken()
	}, function(response) {
		console.log(response);
	});
};


/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.showRequetGameDiaglogSendToOnePerson = function() {
	FB.ui({
		method : 'apprequests',
		display : 'iframe',
		to:  App.getFriendUserId(),
		name : 'Facebook Dialogs',
		link : 'http://developers.facebook.com/docs/reference/dialogs/',
		picture : 'http://fbrell.com/f8.jpg',
		caption : 'Reference Documentation',
		description : "Lest's be 1.",
		message :  "Lest's be."
//		access_token : Oauth2.getAccessToken()
	}, function(response) {
		console.log(response);
	});
};
/**
 * @using UrlQuery
 * @link{UrlQuery.js}
 */
FuiExample.showFacebookDialog = function() {
	FB.ui({
		method : 'feedface',
		display : 'iframe',
		name : 'Facebook Dialogs',
		link : 'http://developers.facebook.com/docs/reference/dialogs/',
		picture : 'http://fbrell.com/f8.jpg',
		caption : 'Reference Documentation',
		description : 'Dialogs provide a simple, consistent interface for applications to interface with users.',
		message : 'Facebook Dialogs are easy!'
//		access_token : Oauth2.getAccessToken()
	}, function(response) {
		console.log(response);
		if (response && response.post_id) {
			
			alert('Post was published.');
			console.log(response);
		} else {
			alert('Post was not published.');
		}
	});
};

FuiExample.login = function() {
	FB.login(function(res) {
		console.log(res);
		console.trace();
	}, { perms: 'publish_stream,email' });
}	
		

FuiExample.getLoginStatus = function() {
	FB.getLoginStatus(function(res) {
		console.log(res);
		console.trace();
	});
}