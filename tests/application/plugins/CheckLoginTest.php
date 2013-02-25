<?php
class Application_Plugin_CheckLoginTest extends PHPUnit_Framework_TestCase
{
    /**
     * Request object
     * @var Zend_Controller_Request_Http
     */
    public $request;

    /**
     * Response object
     * @var Zend_Controller_Response_Http
     */
    public $response;

    /**
     * Error handler plugin
     * @var Zend_Controller_Plugin_ErrorHandler
     */
    public $plugin;

    /**
     * Runs the test methods of this class.
     *
     * @access public
     * @static
     */
    public static function main()
    {

        $suite  = new PHPUnit_Framework_TestSuite("Application_Controller_Plugin_CheckLogin");
        $result = PHPUnit_TextUI_TestRunner::run($suite);
    }

    /**
     * Sets up the fixture, for example, open a network connection.
     * This method is called before a test is executed.
     *
     * @access protected
     */
    protected function setUp()
    {
        Zend_Controller_Front::getInstance()->resetInstance();
        $this->request  = new Zend_Controller_Request_Http();
        $this->response = new Zend_Controller_Response_Http();
        $this->plugin   = new Zend_Controller_Plugin_ErrorHandler();

        $this->plugin->setRequest($this->request);
        $this->plugin->setResponse($this->response);
    }
    
	/**
     * Unset all properties
     */
    public function tearDown()
    {
        unset($this->plugin);
        unset($this->request);
        unset($this->response);
    }
	
}
