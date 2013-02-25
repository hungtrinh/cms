<?php
class TestControllerTest extends Zend_Test_PHPUnit_ControllerTestCase
{

    private $_accessToken = null;

    public function setUp()
    {
        $this->bootstrap = new Zend_Application(APPLICATION_ENV, 
        APPLICATION_PATH . '/configs/application.ini');
        parent::setUp();
    }

    public function testIndexAction()
    {
        $params = array('action' => 'index', 'controller' => 'Test', 
        'module' => 'default');
        $url = $this->url($this->urlizeOptions($params));
        $this->dispatch($url);
        // assertions
        $this->assertModule($params['module']);
        $this->assertController($params['controller']);
        $this->assertAction($params['action']);
        $this->assertQueryContentContains('div#view-content p', 
        'View script for controller <b>' . $params['controller'] .
         '</b> and script/action name <b>' . $params['action'] . '</b>');
    }

    public function testOtherAction()
    {
        $params = array('action' => 'other', 'controller' => 'Test', 
        'module' => 'default');
        $url = $this->url($this->urlizeOptions($params));
        $this->dispatch($url);
        // assertions
        $this->assertModule($params['module']);
        $this->assertController($params['controller']);
        $this->assertAction($params['action']);
        $this->assertQueryContentContains('div#view-content p', 
        'View script for controller <b>' . $params['controller'] .
         '</b> and script/action name <b>' . $params['action'] . '</b>');
    }

    public function testTestall1Action()
    {
        $params = array('action' => 'testall1', 'controller' => 'Test', 
        'module' => 'default');
        $urlParams = $this->urlizeOptions($params);
        $url = $this->url($urlParams);
        $this->dispatch($url);
        // assertions
        $this->assertModule($urlParams['module']);
        $this->assertController($urlParams['controller']);
        $this->assertAction($urlParams['action']);
        $this->assertQueryContentContains('div#view-content p', 
        'View script for controller <b>' . $params['controller'] .
         '</b> and script/action name <b>' . $params['action'] . '</b>');
    }

    public function testTestallfbAction()
    {
        $params = array('action' => 'testallfb', 'controller' => 'Test', 
        'module' => 'default');
        $urlParams = $this->urlizeOptions($params);
        $url = $this->url($urlParams);
        $this->dispatch($url);
        // assertions
        $this->assertModule($urlParams['module']);
        $this->assertController($urlParams['controller']);
        $this->assertAction($urlParams['action']);
        $this->assertQueryContentContains('div#view-content p', 
        'View script for controller <b>' . $params['controller'] .
         '</b> and script/action name <b>' . $params['action'] . '</b>');
    }

    /**
     * @group upload
     *
     */
    public function testUploadPhoto()
    {
        //upload photo
        $file = 'd:\Bluehills.jpg';
        $args = array('message' => 'Photo from application', 
        'source' => '@' . realpath($file));
        //		$args[basename($file)] = '@' . realpath($file);
        $ch = curl_init();
        $url = 'http://graph.cyworld.vn/me/photos?access_token=' .$this->_getAccessToken();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
        $data = curl_exec($ch);
    	$error = curl_error($ch);
		if ($error) {
			Zend_Debug::dump($error,'error = ');
			throw new RuntimeException($error);
		} else {
//			$data = json_decode($data);
			Zend_Debug::dump($data,'data= ');	
		}
         //returns the photo id
    //print_r(json_decode($data,true));
    }

    private function _getAccessToken()
    {
        if ($this->_accessToken) {
            return $this->_accessToken;
        }
//        $uri = 'http://graph.cyworld.vn/oauth/access_token?client_id=308&client_secret=0aa64941cd87b3d9eb16dff1b72fe99e&grant_type=password&username=thuynb&password=1111&format=json'; //local
		$uri = 'http://graph.cyworld.vn/oauth/access_token?client_id=315&client_secret=d4ed1caad13a1116438cbe16c4f6c0d8&grant_type=password&username=thuynb&password=123456&format=json';//live
        $config = array(
        'adapter' => 'Zend_Http_Client_Adapter_Curl', 
        'curloptions' => array(CURLOPT_FOLLOWLOCATION => true));
        $client = new Zend_Http_Client($uri, $config);
        $response = $client->request();
        $token = Zend_Json::decode($response->getBody(), Zend_Json::TYPE_OBJECT);
        return $this->_accessToken = $access_token = $token->access_token;
    }

    /**
     * @group upload1
     *
     */
    public function testUploadService()
    {
		$file= 'd:\Bluehills.jpg';
		//$_FILES = ''
		$args = array(
			'elementFile' => 'myimg1',
			'myimg1' => '@' . realpath($file)
		);
		$ch = curl_init();
		
		$url = 'http://fs1.cyworld.vn/v2/apis/index/upload';
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $args);
		$data = curl_exec($ch);
		$error = curl_error($ch);
		Zend_Debug::dump(json_decode($data,true),'return data = ');
		Zend_Debug::dump($error,'curl error message = ');
		echo 123;
    }

    public function testYahooAction()
    {
        $params = array('action' => 'yahoo', 'controller' => 'Test', 'module' => 'default');
        $urlParams = $this->urlizeOptions($params);
        $url = $this->url($urlParams);
        $this->dispatch($url);
        
        // assertions
        $this->assertModule($urlParams['module']);
        $this->assertController($urlParams['controller']);
        $this->assertAction($urlParams['action']);
        $this->assertQueryContentContains(
            'div#view-content p',
            'View script for controller <b>' . $params['controller'] . '</b> and script/action name <b>' . $params['action'] . '</b>'
            );
    }


}











