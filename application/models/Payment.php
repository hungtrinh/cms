<?php

class Application_Model_Payment
{
	/**
	 * payments get items from external resource
	 * 
	 * @link http://developers.facebook.com/docs/creditsapi/#callback
	 * @param string $cyworldOderId
	 * @param string $weddingStreetOrderIndentify
	 * @param boolean $testMode default false
	 * @param boolean $turnOnDebug print out query and response default false
	 * @return array  (or return false if get items info corruption or failed)
	 */
	public function paymentsGetItems($cyworldOderId,$weddingStreetOrderIndentify,$turnOnDebug=false)
	{
		$appCreditsCallback = 'http://sveiss.user.tptdg.com:8080/fbcredits/notify'; //TODO: get internal object field, add code here
		$testMode=0;  //TODO: get internal object field, add code here 
		$postData = array(
			'method'=>'payments_get_items',
			'order_info' => $weddingStreetOrderIndentify,
			'order_id' => $cyworldOderId
		);
		if ($testMode) {
			$postData['test_mode'] = 1;
		}
		
		$result = cwCURL_Backend($appCreditsCallback,$postData,$isPostRequest=true);
		
		$debugTrace = '';
		
		if (empty($result) || $turnOnDebug) {
			$debugTrace .= "\nCurl Request: $appCreditsCallback";
			$debugTrace .= "\ncurl post fields:\n";
			$debugTrace .= print_r($postData,true);
			$debugTrace .= "\nCurl Response:";
			$debugTrace .= $result;
			
			if ($turnOnDebug) {
				print_r($debugTrace);	
			} else {
				error_log($debugTrace);
				return false;
			}
		}
		
		
		
		//$result = '{"method":"payments_get_items","content":[{"title":"24 Honeys","price":"30.0","image_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","item_id":"FB01b","description":"24 Honeys","user_id":"15","locale_id":"1","product_url":"http://sveiss.user.tptdg.com:8080//images/icons/honeys_icon.png","currency":"FBCredits"}]}'; 
		$stdResult = json_decode($result);
		$items = $stdResult->content;
		return $items;			
	}
	
	/**
	 * payments status updates confirm with external resource 
	 * 
	 * @link http://developers.facebook.com/docs/creditsapi/#callback
	 * @param string $cyworldOderId
	 * @param string $cyworldOrderStatus
	 * @param stdClass $order_details
	 * @param boolean $turnOnDebug
	 * @return string (or return false if get items info corruption or failed) status name
	 */
	public function paymentsStatusUpdate($cyworldOderId, $cyworldOrderStatus, $order_details, $turnOnDebug=false) {
		$appCreditsCallback = 'http://sveiss.user.tptdg.com:8080/fbcredits/notify'; //TODO: get internal object field, add code here 
		$testMode = 0; //TODO: get internal object field, add code here
		
		$postData = array(
			'method'=>'payments_status_update',
			'order_id' => $cyworldOderId,
			'status' => $cyworldOrderStatus,
			'order_details' => $order_details
		);
		
		if ($testMode) {
			$postData['test_mode'] = 1;
		}
		
		$result = cwCURL_Backend($appCreditsCallback,$postData,$isPostRequest=true);
		
		$debugTrace = '';
		if (empty($result) || $turnOnDebug) {
			$debugTrace .= "\nCurl Request: $appCreditsCallback";
			$debugTrace .= "\ncurl post fields:\n";
			$debugTrace .= print_r($postData,true);
			$debugTrace .= "\nCurl Response:";
			$debugTrace .= $result;
			
			if ($turnOnDebug) {
				print_r($debugTrace);	
			} else {
				error_log($debugTrace);
				return false;
			}
		}
		
		//$resultExample = '{"content":{"order_id":"123456","status":"settled"},"method":"payments_status_update"}';
		$stdResult = json_decode($result);
		$AppOrderStatus = $stdResult->content->status;
		return $AppOrderStatus;
	}
}

