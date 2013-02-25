<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
class Zend_View_Helper_UsingYahooBaseGridCss {
    public $view;
    
    public function setView(Zend_View_Interface $view) {
        $this->view= $view;
    }
    
    public function usingYahooBaseGridCss() {
//        $this->view->headLink()->prependStylesheet('http://yui.yahooapis.com/2.8.2r1/build/base/base-min.css');
//        $this->view->headLink()->prependStylesheet('http://yui.yahooapis.com/2.8.2r1/build/reset-fonts-grids/reset-fonts-grids.css');
		$this->view->headLink()->prependStylesheet($this->view->baseUrl('lib/yahoo/reset-fonts-grids/reset-fonts-grids.css'));
		$this->view->headLink()->prependStylesheet($this->view->baseUrl('lib/yahoo/reset-fonts-grids/base-min.css'));
    	
        return $this;
    }
}