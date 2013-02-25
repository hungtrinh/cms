<?php

class Application_Form_Oauth2GetCode extends Zend_Form {

    public function init() {
        /* Form Elements & Other Definitions Here ... */
        $this->setName(__CLASS__);
        $this->setMethod('post');

        $this->addElement('text', 'client_id', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 50)),
            ),
            'required' => true,
            'label' => 'Client ID:',
        ));

//        $this->addElement('password', 'client_secret', array(
//            'filters' => array('StringTrim'),
//            'validators' => array(
//                array('StringLength', false, array(0, 50)),
//            ),
//            'required' => true,
//            'label' => 'Client secret:',
//        ));

        $this->addElement('text', 'scope', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 1000)),
            ),
            'required' => true,
            'label' => 'scope:',
        ));


        $this->addElement('text', 'redirect_uri', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 1000)),
            ),
            'required' => true,
            'label' => 'redirect uri:',
        ));


        $this->addElement('text', 'response_type', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 1000)),
            ),
            'required' => true,
            'label' => 'response type:',
        ));

        $this->addElement('submit', 'loginButton', array(
            'required' => false,
            'ignore' => true,
            'label' => 'Get Access Token',
        ));

        //$this->addElement(new Zend_Form_Element_Hash('hash'));
    }

}

