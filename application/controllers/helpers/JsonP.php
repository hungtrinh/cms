<?php

/**
 * jsonp response data (using to cross domain)
 * 
 * @author HungTD
 * JsonP Action Helper 
 * 
 * @uses actionHelper Zend_Controller_Action_Helper
 */
class Default_Controller_Action_Helper_JsonP extends Zend_Controller_Action_Helper_Abstract {

    /**
     * @var Zend_Loader_PluginLoader
     */
    public $pluginLoader;
    /*     * 0
     * Constructor: initialize plugin loader
     * 
     * @return void
     */

    public function __construct() {
        // TODO Auto-generated Constructor
        $this->pluginLoader = new Zend_Loader_PluginLoader();
    }

    /**
     * Strategy pattern: call helper as broker method
     */
    public function direct($data, $callback = null) {
        require_once 'Zend/Layout.php';
        $layout = Zend_Layout::getMvcInstance();
        if ($layout instanceof Zend_Layout) {
            $layout->disableLayout();
        }

        /**
         * @see Zend_Controller_Action_HelperBroker
         */
        require_once 'Zend/Controller/Action/HelperBroker.php';
        Zend_Controller_Action_HelperBroker::getStaticHelper('viewRenderer')->setNoRender(true);

        $callback = empty($callback) ? $this->getRequest()->getParam('callback') : $callback;
        $jsonData = json_encode($data);
        $jsonpCall = "$callback(" . $jsonData . ")";
        $response = $this->getResponse();
        $response->setBody($jsonpCall);
        $response->setHeader('Content-Type', 'application/javascript; charset=utf-8', true);
        $response->sendResponse();

        exit;
    }

}