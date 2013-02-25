<?php

class Application_Form_Oauth2GetAccessToken extends Zend_Form {

    public function init() {
        /* Form Elements & Other Definitions Here ... */
        $this->setName(__CLASS__);
        $this->setMethod('post');

        $this->addElement('text', 'code', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 150)),
            ),
            'required' => true,
            'label' => 'code',
            'value' => $_GET['code'] ? $_GET['code'] : ''
        ));
        $this->addElement('text', 'client_id', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 50)),
            ),
            'required' => true,
            'label' => 'Client ID:',
            'value' => 'hungtd'
        ));
        $this->addElement('text', 'client_secret', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 50)),
            ),
            'required' => true,
            'label' => 'Client Secret:',
            'value' => '123456'
        ));
   

        $this->addElement('text', 'redirect_uri', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 1050)),
            ),
            'required' => true,
            'label' => 'redirect uri:',
        ));

        $this->addElement('text', 'grant_type', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 20000)),
            ),
            'required' => true,
            'label' => 'grant_type:',
            'value' => 'authorization_code'
        ));

        $this->addElement('submit', 'loginButton', array(
            'required' => false,
            'ignore' => true,
            'label' => 'Get Access Token',
        ));

        //$this->addElement(new Zend_Form_Element_Hash('hash'));
    }

}

