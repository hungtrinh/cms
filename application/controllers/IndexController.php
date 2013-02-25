<?php

class IndexController extends Zend_Controller_Action {

    public function init() {
        
    }

    public function indexAction() {

        //$this->view->addFilter('tidy');
    }

    public function facebookAppAction() {
        $this->renderScript('news/index.phtml');
    }

    public function proxyAction() {
        // action body
        $this->_helper->layout()->disableLayout();
    }

    public function uploadAction() {
        // Show photo upload form to user and post to the Graph URL
        $graph_url = "http://graph.cyworld.vn/me/photos?"
                . "access_token=315|12000010871|d4ac65b805ce606fe60108860870feee";

        echo '<html><body>';
        echo '<form enctype="multipart/form-data" action="'
        . $graph_url . '" method="POST">';
        echo 'Please choose a photo: ';
        echo '<input name="source1" type="file"><br/><br/>';
        echo 'Say something about this photo: ';
        //echo '<input name="message"  type="text" value=""><br/><br/>';
        echo '<input type="submit" value="Upload"/><br/>';
        echo '</form>';
        echo '</body></html>';
        exit;
    }

    public function testAction() {
        $restaurant = new Tmi_Spider_Urbanspoon_Restaurant();
        Zend_Debug::dump($restaurant->storeHtmlRawData(), 'Urbanspoon Restaurant=');
        exit;
    }
    
    public function varnishAction() {
        $this->view->addFilter('tidy');
    }

}

