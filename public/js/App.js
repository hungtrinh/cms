/*
 `* @class FqlExample
 * 
 * @using UrlQuery @link{UrlQuery.js}
 * @using Oauth2 @link{Oauth2.js}
 * 
 * @using FapiExample @link{FapiExample.js}
 * @using FqlExample @link{FqlExample.js}
 * @using FuiExample @link{FuiExample.js}
 */

var App = new Object();
App.Env = 'local'; // live or fb

/**
 * @using FapiExample
 * @link{FapiExample.js}
 */
App.run = function(){
    if(!this.init()) {
    	return false;
    }
	FapiExample.run();
	FqlExample.run();
//	FuiExample.run();
}

/**
 * get appId by App.Env config
 */
App.getAppId = function () {
    if ('live' == this.Env) {
        return 315; // local
    }
    if ('fb' == this.Env) {
    	return "132319556870048";
    }
    
    return 315;
    return 308; // live 310 | 315
}

/**
 * get test userid by App.Env config
 */
App.getTestUserId = function() {
    if ('local' == this.Env) {
        return 12000010871; // thuynb
    }
    if ('fb' == this.Env) {
    	return "100000997475175"; //cyworldbeauty
    }
    return 12000161842; // thuynb
//    live
//    return 12000010061; // thangtran
//    return 12000155542; // thangnguyen
}

/**
 * get test friend userid by App.Env config
 */
App.getFriendUserId = function() {
    if ('local' == this.Env) {
        return 12000010087; // thangtran
    }
 
    //live
    return 12000010061; // thangtran
//    return 12000155542; // thangnguyen
}

/**
 * get test username by App.Env config
 */
App.getTestUserName = function() {
    if ('local' == this.Env) {
        return 'thuynb';
    }
    if ('fb' == this.Env) {
    	return "cyworldbeauty"; //
    }
    return 'thuynb';
}

/**
 * @using FB
 * @link{all.js}
 */
App.init = function(){
	function _initQnit()
	{
		QUnit.log = function(result, message)
		{
			if (window.console && window.console.log)
		    {
				window.console.log(result);
			}	
		}
	};
//	_initQnit();
	if (this.Env != 'fb') {
	    var accessToken = Oauth2.getAccessToken();
	    
	    if(!accessToken || accessToken.length==0) {
	        Oauth2.redirectToGetTokenPage();
	        return false;
	    }
	} 
    
    FB.init({
        appId: this.getAppId(),
        status: true,
        cookie: true,
        xbml: true
//        ,oauth  : true
        //,channelUrl:'http://cms.local/index/proxy'
    });
    
    FB.Canvas.setAutoResize();
    
    return true;
}

