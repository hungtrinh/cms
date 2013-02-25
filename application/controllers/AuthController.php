<?php

class AuthController extends Zend_Controller_Action {

    public function init() {
        
    }

    public function indexAction() {
        if (Zend_Auth::getInstance()->hasIdentity()) {
            $this->_helper->redirector('index', 'index');
            return;
        }

        $form = new Application_Form_Login();
        $form->setAction(empty($_GET) ? $this->view->url() : $this->view->url() . "?" . http_build_query($_GET, '', '&'));
        $request = $this->getRequest();

        if (!$request->isPost() || !$form->isValid($request->getPost())) {
            $this->view->form = $form;
        }

        $dbAdapter = Zend_Db_Table::getDefaultAdapter();
        $authAdapter = new Zend_Auth_Adapter_DbTable($dbAdapter);
        $authAdapter->setTableName('users')
                ->setIdentityColumn('username')
                ->setCredentialColumn('password')
                ->setCredentialTreatment('MD5(?)')
                ->setIdentity($form->getValue('username'))
                ->setCredential($form->getValue('password'));

        $auth = Zend_Auth::getInstance();
        $result = $auth->authenticate($authAdapter);
        $isLoginValid = $result->isValid();
        if (!$isLoginValid) {
            $this->view->form = $form;
            return;
        }

        $user = $authAdapter->getResultRowObject();
        $auth->getStorage()->write($user);


        if ($url = $this->_getParam('continue')) {
            $this->_redirect($url);
            return;
        }

        $this->_helper->redirector('index', 'index');
    }

    public function logoutAction() {
        Zend_Auth::getInstance()->clearIdentity();

        if ($url = $this->_getParam('continue')) {
            $this->_redirect($url);
            return;
        }

        $this->_helper->redirector('index'); // back to login page
    }

}

