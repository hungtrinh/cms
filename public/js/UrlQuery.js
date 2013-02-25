/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var UrlQuery = new Object();

/**
 * @return hash
 */
UrlQuery.getUrlVars = function(href)
{
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

UrlQuery.getToken = function () {
    return this.getUrlVars(location.hash)['access_token'];
}