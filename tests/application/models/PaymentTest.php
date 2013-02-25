<?php
class Application_Model_PaymentTest extends PHPUnit_Framework_TestCase
{
	protected $orderId=123456;
	
	protected $orderInfo='{"title":"24 Honeys","description":"24 Honeys","price":"30.0","currency":"FBCredits","user_id":"15","locale_id":"1","item_id":"FB01b","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png"}';
	
	
    /**
     * Prepares the environment before running a test.
     */
    protected function setUp ()
    {
        parent::setUp();
         //TODO Auto-generated Application_Model_Mapper_PaymentTest::setUp()
    }
    /**
     * Cleans up the environment after running a test.
     */
    protected function tearDown ()
    {
        // TODO Auto-generated Application_Model_Mapper_PaymentTest::tearDown()
        parent::tearDown();
    }
    /**
     * Constructs the test case.
     */
    public function __construct ()
    {
        // TODO Auto-generated constructor
    }
    protected function _getCleanMock ($className)
    {
        $class = new ReflectionClass($className);
        $methods = $class->getMethods();
        $stubMethods = array();
        foreach ($methods as $method) {
            if ($method->isPublic() ||
             ($method->isProtected() && $method->isAbstract())) {
                $stubMethods[] = $method->getName();
            }
        }
        $mocked = $this->getMock($className, $stubMethods, array(), 
        $className . '_CategoryMapperTestMock_' . uniqid(), false);
        return $mocked;
    }
    
  
    
    /**
     * @group first
     */
    public function testFirstPing ()
    {
        $orderInfo = $this->orderInfo;
        $orderId = $this->orderId;
        
        $signed_object = array();
		$signed_object['credits'] = $credits = array(
			'order_info' => $orderInfo,
			'order_id' => $orderId,
			'test_mode' => 1, 
		); 
		
		$sign_request = generated_sign($signed_object,'d4ed1caad13a1116438cbe16c4f6c0d8');
		
        $postFields = array(
			'method'=>'payments_get_items',
			'order_info' => $orderInfo, 
			'order_id' => $orderId,
        	'test_mode' => 1, 
//			'status' => 'placed'
		);
		
		
		$result = cwCURL_Backend ('http://sveiss.user.tptdg.com:8080/fbcredits/notify',$postFields, true);
		$expected = ('{"method":"payments_get_items","content":[{"title":"24 Honeys","price":"30.0","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","item_id":"FB01b","description":"24 Honeys","user_id":"15","locale_id":"1","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","currency":"FBCredits"}]}');
		$this->assertEquals($expected,$result);
        return $result;
    }
    
    /**
     * @group placed
     */
    public function testPlaceOrderPing() {
		$resultGetItemInfo = $this->testFirstPing();
		$firstPingJson = json_decode($resultGetItemInfo);
		$items = $firstPingJson->content;
		$amout = $firstPingJson->content[0]->price;
		
		$orderId = $this->orderId;
		$userId = "12000010871";
		
		$order_details = new stdClass();
		$order_details->items =  $items;
		$order_details->status =  "placed";
		//$order_details->order_id = $orderId;
		//$order_details->buyer = $order_details->receiver = $userId;
		//$order_details->app = 315;
		//$order_details->amout = $amout;
		//$order_details->update_time = $order_details->time_placed = time();
		//$order_details->data = '';
		
		$order_details = stripcslashes(json_encode($order_details)) ;
		//print_r($order_details);
		$signed_object = array();
		$signed_object['credits'] = array(
			'order_details' => $order_details,
			'status' => 'placed', 
			'order_id' => $orderId,
			//'test_mode' => 1, 
		); 
		$sign_request = generated_sign($signed_object,'d4ed1caad13a1116438cbe16c4f6c0d8');
		
        $postFields = array(
//        	'signed_request' => $sign_request,
			'order_details' => $order_details,
        	'status' => 'placed', 
			'order_id' => $orderId,
        	'test_mode' => 1, 
        	'method'=>'payments_status_update'
		);
		
		$result = cwCURL_Backend ('http://sveiss.user.tptdg.com:8080/fbcredits/notify',$postFields, true);

		$expected = '{"content":{"order_id":"123456","status":"settled"},"method":"payments_status_update"}';
		$this->assertEquals($expected, $result);
		
		return $result;
    }
    
 	/**
     * @group settled
     * 
     */
    public function testSettledOrderPing() {
		$placedOrderJsonEncoded = $this->testPlaceOrderPing();
		$placedOrder = json_decode($placedOrderJsonEncoded);
		
		$status = $placedOrder->content->status;
		$method = $placedOrder->method;
		$orderId = $placedOrder->content->order_id;
		
		$resultGetItemInfo = $this->testFirstPing();
		$firstPingJson = json_decode($resultGetItemInfo);
		$items = $firstPingJson->content;
		
		$orderId = $this->orderId;
		$userId = "12000010871";
		
		$order_details = new stdClass();
		$order_details->items =  $items;
		$order_details->status =  $status;
		
		$postFields = array(
			'order_id' => $orderId,
			'order_details' => $order_details,
			'method' => $method,
			'status' => $status
		);
		print_r($postFields);
		$result = cwCURL_Backend ('http://sveiss.user.tptdg.com:8080/fbcredits/notify',$postFields, true);
		print_r($result);

//		$expected = '{"content":{"order_id":"123456","status":"settled"},"method":"payments_status_update"}';
//		$this->assertEquals($expected, $result);
		
		return $result;
    }
    
  	
    protected $_bo;
    
    /**
     * 
     * @return Application_Model_Payment
     */
    protected function _getPaymentRepository()
    {
    	if (!$this->_bo) {
    		$this->_bo = new Application_Model_Payment();
    	}
    	return $this->_bo;
    }

    /**
     * @group paymentsGetItems 
     */
	public function testPaymentsGetItems() {
		$cyworldOderId = $this->orderId;
		$weddingStreetOrderIndentify = $this->orderInfo;
		$items = $this->_getPaymentRepository()->paymentsGetItems($cyworldOderId, $weddingStreetOrderIndentify);
		
//		$expected = '{"method":"payments_get_items","content":[{"title":"24 Honeys","price":"30.0","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","item_id":"FB01b","description":"24 Honeys","user_id":"15","locale_id":"1","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","currency":"FBCredits"}]}';
		$expected = '[{"title":"24 Honeys","price":"30.0","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","item_id":"FB01b","description":"24 Honeys","user_id":"15","locale_id":"1","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","currency":"FBCredits"}]';
		$expected = json_decode($expected);
		$this->assertEquals($expected,$items);
		return $items;
	}
	
	/**
     * @group paymentsStatusUpdate 
     * @depends testPaymentsGetItems
     */
	public function testPaymentsStatusUpdate($items) {
//		$items = $this->testPaymentsGetItems();
		$cyworldOderId = $this->orderId;
		$cyworldOrderStatusPlaced = "placed";
		
		$order_details = new stdClass();
		$order_details->items =  $items;
		$order_details->status =  $cyworldOrderStatusPlaced;
		$order_details = json_encode($order_details);
		
		$result = $this->_getPaymentRepository()->paymentsStatusUpdate($cyworldOderId, $cyworldOrderStatusPlaced, $order_details);
		$expected = 'settled';
		$this->assertEquals($expected,$result);
		
		
		$cyworldOrderStatusSettled = 'settled';
		$order_details = new stdClass();
		$order_details->items =  $items;
		$order_details->status =  $cyworldOrderStatusSettled;
		$order_details = json_encode($order_details);
		
		$result = $this->_getPaymentRepository()->paymentsStatusUpdate($cyworldOderId, $cyworldOrderStatusSettled, $order_details);
		$expected = 'settled';
		$this->assertEquals($expected,$result);
	}
	
	public function testInitNewOrderOnCyworld($orderItemsIdentifyFromExternalSystem) {
		$order = $this->_getPaymentRepository()->InitNewOrderOnCyworld($orderItemsIdentifyFromExternalSystem);
		$this->assertEquals($orderItemsIdentifyFromExternalSystem, $order->DATA);
		$this->assertRegExp('/^\d$/', $order->ORDERID);
		return $order;
	}
	
	/**
	 * 
	 * @param unknown_type $orderId
	 * @param unknown_type $buyerCyId
	 * @param unknown_type $recieverCyId
	 * @param unknown_type $orderPlacedStatus
	 */
	public function testPlacedOrderOnCyworld() {
		$order = $this->_getPaymentRepository()->placedOrderOnCyworld($orderId,$buyerCyId,$recieverCyId,$orderPlacedStatus);
		$this->assertEquals($orderPlacedStatus, $order->STATUS);
		$this->assertEquals($buyerCyId, $order->BUYER);
		$this->assertEquals($recieverCyId, $order->RECIEVER);
	}
	
	public function testSettledOrderOnCyworld($orderId,$orderSettledStatus) {
		$order = $this->_getPaymentRepository()->settledOrderOnCyworld($orderId,$orderSettledStatus);
		$this->assertEquals($orderSettledStatus, $order->STATUS);
	}
	
	public function testBuyerConfirmBuyItems($confirm,$orderId) {
		
	}
}



	/*	$order_details ='{
			"order_id":298245326853778,
			"buyer":12000161842,
			"app":315,
			"receiver":12000161842,
			"amount":500,
			"update_time":1319567233,
			"time_placed":1319567184,
			"data":"",
			"items":[{
				"item_id":"FB05",
				"title":"570 Honeys",
				"description":"570 Honeys",
				"image_url":"https:\/\/dyn.stage.tptdg.com\/images\/icons\/honeys_icon.png",
				"product_url":"https:\/\/dyn.stage.tptdg.com\/images\/icons\/honeys_icon.png",
				"price":500,
				"data":""
			}],
			"status":"placed"
		}';*/