<?php

class Oauth2Controller extends Zend_Controller_Action {

    public function init() {
        /* Initialize action controller here */
    }

    public function indexAction() {
        Zend_Debug::dump(new PDOOAuth2);

        die(__METHOD__ . __LINE__);
        exit;
    }

    public function addclientAction() {
        $form = new Application_Form_Oauth2Client();

        if (!$this->getRequest()->isPost() || $form->isValid($this->getRequest()->getPost())) {
            return $this->view->form = $form;
        }

        $client_id = $form->getValue('client_id');
        $client_secret = $form->getValue('client_secret');
        $redirect_uri = $form->getValue('redirect_uri');

        $oauth2 = new PDOOAuth2();
        $oauth2->addClient($client_id, $client_secret, $redirect_uri);
        $this->view->success = true;
    }

    public function tokenAction() {
        $this->_helper->layout()->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
//        Zend_Debug::dump($this->getRequest()->getPost());
        $oauth2 = new PDOOAuth2();
        $oauth2->grantAccessToken();
        exit;
    }

    public function authAction() {
//        $this->_helper->layout()->disableLayout();
//        $this->_helper->viewRenderer->setNoRender(true);

        $oauth2 = new PDOOAuth2();
        $oauth2->finishClientAuthorization(true, $this->getRequest()->getPost());
        exit;
    }

}

