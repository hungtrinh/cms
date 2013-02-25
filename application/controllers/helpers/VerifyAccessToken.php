<?php
/**
 *
 * @author HungTD
 * @version 
 */
//require_once 'Zend/Loader/PluginLoader.php';
//require_once 'Zend/Controller/Action/Helper/Abstract.php';
/**
 * VerifyAccessToken Action Helper 
 * 
 * @uses actionHelper Zend_Controller_Action_Helper
 */
class Default_Controller_Action_Helper_VerifyAccessToken extends Zend_Controller_Action_Helper_Abstract
{
    /**
     * @var Zend_Loader_PluginLoader
     */
    public $pluginLoader;
    /**0
     * Constructor: initialize plugin loader
     * 
     * @return void
     */
    public function __construct ()
    {
        // TODO Auto-generated Constructor
        $this->pluginLoader = new Zend_Loader_PluginLoader();
    }
    /**
     * Strategy pattern: call helper as broker method
     */
    public function direct ()
    {
    	$request = $this->getRequest();
    	
    	$access_token = $request->getParam('access_token');
    	
		if (null !== $access_token) {
    		$_GET['oauth_token']=  $access_token;
    	}
        // TODO Auto-generated 'direct' method
        $oauth = new CyOAuth2();
        $oauth->verifyAccessToken($scope = NULL, $exit_not_present = TRUE, $exit_invalid = TRUE, $exit_expired = TRUE, $exit_scope = TRUE, $realm = NULL);
    }
}

