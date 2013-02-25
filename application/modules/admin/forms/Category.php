<?php

class Admin_Form_Category extends Zend_Form
{
    public function init()
    {
        $this->addElements(array(
            new Zend_Form_Element_Text('title', array(
                'required'   => true,
                'label'      => 'Title:',
                'filters'    => array('StringTrim', 'StringToLower'),
                'validators' => array(
                    'Alnum',
                    array('Regex',
                          false,
                          array('/^[a-z][a-z0-9]{2,}$/'))
                )
            )),
 
            new Zend_Form_Element_Select('status', array(
                'required'   => true,
                'label'      => 'Status:',
                'filters'    => array('StringTrim', 'StringToLower'),
                'validators' => array(
                    'Alnum',
                    array('Regex',
                          false,
                          array('/^[a-z][a-z0-9]{2,}$/'))
                )
            )),
            
            new Zend_Form_Element_Submit(
	            'save',
	            array(
	                'label'    => 'Save and continue',
	                'required' => false,
	                'ignore'   => true,
	            )
        	)
        ));
    }

}

