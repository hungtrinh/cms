<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    protected function _initJqueryViewHelper() {
        $this->bootstrap(array('view', 'layout', 'frontController'));
        $layout = $this->getResource('layout');
        $view = $layout->getView();
        $view->addHelperPath("ZendX/JQuery/View/Helper", "ZendX_JQuery_View_Helper");
    }

    protected function _initAutoload() {

        $loader = Zend_Loader_Autoloader::getInstance();
        $loader->setFallbackAutoloader(true);
        $loader->suppressNotFoundWarnings(false);
        
        $oauth2Autoload = new OAuth2Autoload();
        $loader->pushAutoloader($oauth2Autoload);
        
    }

    protected function _initStoreAllDbConnectInfoToRegistry()
    {
        $this->bootstrap(array('multidb'));
        
        $resource = $this->getResource('multidb');
        $dbOauth2 = $resource->getDb('dbOauth2');
        $dbCms = $resource->getDb('dbCms');
        
        $registry = Zend_Registry::getInstance();
        $registry->dbOauth2 = $dbOauth2;
        $registry->dbCms = $dbCms;
    }
}

