<?php

class Application_Form_Oauth2Client extends Zend_Form {

    public function init() {
        /* Form Elements & Other Definitions Here ... */
        $this->setName("Oauth2Client");
        $this->setMethod('post');

        $this->addElement('text', 'client_id', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 50)),
            ),
            'required' => true,
            'label' => 'Client ID:',
        ));

        $this->addElement('password', 'client_secret', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 50)),
            ),
            'required' => true,
            'label' => 'Client secret:',
        ));

        $this->addElement('text', 'redirect_uri', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', false, array(0, 1000)),
            ),
            'required' => true,
            'label' => 'redirect uri:',
        ));
        
        $this->addElement('submit', 'loginButton', array(
            'required' => false,
            'ignore' => true,
            'label' => 'Add Client',
        ));

        //$this->addElement(new Zend_Form_Element_Hash('hash'));
    }

}

