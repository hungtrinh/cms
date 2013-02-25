/*
 * @class FqlExample
 * 
 * @using UrlQuery @link{UrlQuery.js}
 * @using jcookie
 * @using FapiExample @link{FapiExample.js}
 */

var Oauth2 = new Object();

Oauth2.redirectToGetTokenPage = function() {
    var path = 'http://www.cyworld.vn/v2/default/ui/oauth?';
    var queryParams = ['client_id='+App.getAppId(),'redirect_uri='+window.location,'response_type=token'];
    var query = queryParams.join('&');
    var url = path + query;
    window.location.href = url;
}

Oauth2.getAccessToken = function(){
//    if ($.cookie('access_token')) {
//        return $.cookie('access_token');
//    }
    var accessToken = UrlQuery.getToken();
//    $.cookie('access_token',accessToken);
    return accessToken;
}