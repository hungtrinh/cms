<?php
/*******************************************************************************
 * List of CYID which allows access to management page
 * *********************************************************
 * Mindjolt partner
 * *********************************************************
 * 12001000180: nguyenvanthang.cyworld.vn -> local
 * 12000155542: nguyenvanthang.cyworld.vn 
 * 12000072850: funman
 * 12000010061: thang.cyworld.vn
 * 12000790793: rmind.cyworld.vn
 * 12000870421: stevbov.cyworld.vn
 * 12000931853: jhmaddox 
 * 12000931847: jg_junk 
 * 12000931854: mk_spam 
 * 12000931855: spammy_junk 
 * *********************************************************
 * 12000933859: pthzp
 * *********************************************************
 * 12000010871: thuynb -> local
 * *********************************************************
 * 12001037752: phuoclhb
 * 12001056784: marc_adams
 * 12001059546: stephenv.cyworld.vn
 * ******************************************************************************/
class Cyworld_FBOpen_Admin {
	public static $cyid_admin = array('12000010871', '12001000180', '12000155542', '12000010061', '12000790793', '12000870421', '12000931853', '12000931847', '12000931854', '12000931855', '12000933859', '12001037752', '12000072850', '12001056784', '12001059546');
}

class Cyworld_FBOpen_Policy{
	public static $user_info_fields_no_access_token = array('id', 'name', 'first_name', 'middle_name', 'last_name', 'gender', 'locale', 'link', 'username');
	public static $user_info_fields_access_token = array('third_party_id', 'updated_time', 'verified', 'video_upload_limits');
	public static $user_info_fields_access_token_with_permission = array('bio', 'birthday', 'education', 'email', 'hometown', 'interested_in', 'location', 'political', 'favorite_athletes', 'favorite_teams', 'quotes', 'relationship_status', 'religion', 'significant_other', 'website', 'work');
}

function checkSameDomain($subdomain, $domain){
	$domain = str_replace("http://www.", "", $domain);
	$domain = str_replace("https://www.", "", $domain);
	$domain = str_replace("www.", "", $domain);
	if(isset($subdomain) && strpos($subdomain,$domain) !== false)
	{
		return true;
	}
	else 
	{
		return false;
	}
}

/**
 * CURL to cyworld form Cyworld Backend
 * @param string $url
 * @param array $params
 * @param bool $methodPost
 */
function cwCURL_Backend($url, $params = null, $methodPost = true){
	$useragent = 'cyworld.vn';
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_POST, $methodPost);
	if(isset($params) && $methodPost)
	{
		curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
	}
	//ThangNV added
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	$result = curl_exec($ch);
//	$ch1_info=curl_getinfo($ch);
//    Zend_Debug::dump($ch1_info,'ch1_info=');
	curl_close($ch);
	return $result;
}

/**
 * Parse signed request to validate and extract all information about object which cyworld send to
 * @param string $signed_request
 * @param string $secret
 * 
 * @return object which sent by cyworld via canvas
 */
function parse_signed_request($signed_request, $secret) {
	list($encoded_sig, $payload) = explode('.', $signed_request, 2);
	
	// decode the data
	$sig = base64UrlDecode($encoded_sig);
	$data = json_decode(base64UrlDecode($payload), true);
	
	if(strtoupper($data ['algorithm']) !== 'HMAC-SHA256'){
		error_log('Unknown algorithm. Expected HMAC-SHA256');
		return null;
	}
	
	// check sig
	$expected_sig = hash_hmac('sha256', $payload, $secret, $raw = true);
	if($sig !== $expected_sig){
		error_log('Bad Signed JSON signature!');
		return null;
	}
	
	return $data;
}

/**********************************************************************************************
 * generated signed request for parse and verified signed request within canvas
 * @Author ThangNguyen
 * ********************************************************************************************
 * @params $login_id
 * @params $oauth_token
 * @params $expires = 0
 * @params $issued_at =1
 * 
 * @return
 * $sign_request = array();
 * $sign_request['algorithm'] = 'HMAC-SHA256';
 * $sign_request['expires'] = 0;
 * $sign_request['issued_at'] = 1;
 * $sign_request['oauth_token'] = '220205265055|cc5528fc5d3025c715d8f3a9.1-1191099677|Lx39ROLtkZFWL1yXaj98auVRTFs';
 * $sign_request['user'] = array('country' => 'vn', 'locale' => 'vi_VN', 'age' => array('min' => 21));
 * $sign_request['user_id'] = 1; 
 **********************************************************************************************/
function build_signed_object($login_id, $oauth_token, $expires = 0, $issued_at = 1){
	$signed_object = array();
	$signed_object['algorithm'] = 'HMAC-SHA256';
	$signed_object['user_id'] = $login_id;
	$signed_object['oauth_token'] = "$oauth_token";
	$signed_object['expires'] = $expires;
	$signed_object['issued_at'] = time() + (24 * 60 * 60);//$issued_at;
	$signed_object['user'] = array('country' => 'vn', 'locale' => 'vi_VN', 'age' => array('min' => 18));
	$signed_object['credits'] = array('status' => '', 'order_id' => '', 'purchase_type' => 'item', 'order_info' => '');
	return $signed_object;
}

/**********************************************************************************************
 * generated signed request for parse and verified signed request within canvas
 * @Author ThangNguyen
 * ********************************************************************************************
 * Input:
 * $sign_request = array();
 * $sign_request['algorithm'] = 'HMAC-SHA256';
 * $sign_request['expires'] = 0;
 * $sign_request['issued_at'] = 1;
 * $sign_request['oauth_token'] = '220205265055|cc5528fc5d3025c715d8f3a9.1-1191099677|Lx39ROLtkZFWL1yXaj98auVRTFs';
 * $sign_request['user'] = array('country' => 'vn', 'locale' => 'vi_VN', 'age' => array('min' => 21));
 * $sign_request['user_id'] = 1; 
 * Output:
 * WDk263MSSoNxIf1kmyrkekNIT-QC1zTHtDNgZ6o9YAo.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImV4cGlyZXMiOjAsImlzc3VlZF9hdCI6MTMwNzMzMTgxOCwib2F1dGhfdG9rZW4iOiIyMjAyMDUyNjUwNTV8Y2M1NTI4ZmM1ZDMwMjVjNzE1ZDhmM2E5LjEtMTE5MTA5OTY3N3xMeDM5Uk9MdGtaRldMMXlYYWo5OGF1VlJURnMiLCJ1c2VyIjp7ImNvdW50cnkiOiJ1cyIsImxvY2FsZSI6ImVuX1VTIiwiYWdlIjp7Im1pbiI6MjF9fSwidXNlcl9pZCI6IjExOTEwOTk2NzcifQ
 **********************************************************************************************/
function generated_sign($sign_request, $secret) {
	//1. Build signed_request
	$payload = base64UrlEncode(json_encode($sign_request));
	$expected_sig = hash_hmac('sha256', $payload, $secret, true);
	$expected_sig = base64UrlEncode($expected_sig);
	$result = "$expected_sig.$payload";
	return $result;
}

function base64UrlDecode($input) {
	$input = str_replace('-', '+', $input);
	$input = str_replace('_', '/', $input);
	return base64_decode($input);
	//return base64_decode(strtr($input, '-_', '+/'));
}

function base64UrlEncode($input) {
	$input = base64_encode($input);
	$input = str_replace('+', '-', $input);
	$input = str_replace('/', '_', $input);
	//strtr($input, '+', '-');
	//strtr($input, '/', '_');
	return $input;
}
?>