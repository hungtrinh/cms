<?php

/**
 * Setting special config per module automatic 
 * @author HungTD,AthorName
 * @see Zend_Controller_Plugin_Abstract
 */
require_once ('Zend/Controller/Plugin/Abstract.php');

class Application_Plugin_CheckLogin extends Zend_Controller_Plugin_Abstract {

    public function postDispatch(Zend_Controller_Request_Abstract $request) {
        $this->doCheckLogin();
    }

    public function doCheckLogin() {
        if ($this->_isRejectRedirectToLoginPage()) {
            return;
        }
        $redirector = Zend_Controller_Action_HelperBroker::getStaticHelper('redirector');  /* @var $redirector Zend_Controller_Action_Helper_Redirector */
        $redirector->gotoUrl($this->_getLoginUrlRedirect());
    }

    /**
     * create url login with callback param
     * 
     * @return string
     */
    protected function _getLoginUrlRedirect() {
        $urlHelper = Zend_Controller_Action_HelperBroker::getStaticHelper('url'); /* @var $urlHelper Zend_Controller_Action_Helper_Url */
        $url = $urlHelper->url(array(), 'login', true);
        return "$url?continue=" . $this->_getCallbackUrlForLoginPage();
    }

    /**
     * check if user is login or current page is login or logout page then reject is true else false
     * 
     * @return boolean
     */
    protected function _isRejectRedirectToLoginPage() {
        $request = $this->getRequest();
        $moduleName = strtolower($request->getModuleName());
        $controllerName = strtolower($request->getControllerName());
        if ('admin' != $moduleName || ($moduleName == 'default' && $controllerName == 'auth') || Zend_Auth::getInstance()->hasIdentity()) {
            return true;
        }
        return false;
    }

    /**
     * make callback url for login page
     *
     * @return string
     */
    protected function _getCallbackUrlForLoginPage() {
        $request = $this->getRequest();
        $callbackUrlDefault = $request->getScheme() . '://' . $request->getHttpHost() . $request->getRequestUri();
        $callbackUrl = $request->getParam('continue', $callbackUrlDefault);
        return $callbackUrl;
    }

}