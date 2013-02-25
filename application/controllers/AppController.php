<?php

/**
 * Application controller
 */
class AppController extends Zend_Controller_Action {

    public function indexAction() {
        $this->view->form = new Application_Form_Oauth2GetAccessToken();
        $this->view->form->setAction($this->view->url(array('controller' => 'Oauth2', 'action' => 'token')));
    }

    public function gettokenAction() {
        $this->view->form = new Application_Form_Oauth2GetCode();
    }

    public function detailAction() {
        $appId = $this->_getParam('app_id');

        $clientTable = new Admin_Model_DbTable_OauthClient($this->_getDbOauth2());
        $clientBo = new Application_Model_Mapper_OauthCLient($clientTable);

        $this->view->client = $clientBo->find($appId);
        exit;
    }

    protected function _getDbOauth2() {
//        $resource = $this->getInvokeArg('bootstrap')->getPluginResource('multidb');
//        $dbOauth2 = $resource->getDb('dbOauth2');
        $dbOauth2 = Zend_Registry::getInstance()->dbOauth2;
        return $dbOauth2;
    }

}

