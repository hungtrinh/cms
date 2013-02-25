<?php
require_once ('Tmi/Spider/ICollection.php');

/**
 *
 * @author hungtd
 *        
 */
class Tmi_Spider_Yahoo_ServiceLocal implements Tmi_Spider_ICollection
{
    protected $_url = "http://local.search.yahoo.com/search";
	protected $_category = null;
	protected $_location = "CA";
    
    public function __construct ($category="Restaurants",$location="CA")
    {
        $this->_category = $category;
        $this->_location = $location;
    }
    
    /**
	 * @return the $_category
	 */
	public function getCategory() {
		return $this->_category;
	}

	/**
	 * @return the $_location
	 */
	public function getLocation() {
		return $this->_location;
	}

	/**
     *
     * @see Tmi_Spider_ICollection::downloadRawHtml()
     *
     */
    public function downloadRawHtml ()
    {
        if  (!in_array  ('curl', get_loaded_extensions())) {
        	throw new Tmi_Spider_Yahoo_Exception('Please install php curl lib, And comment this line in production code to improve performance');
        }
        
        // TODO - Insert your code here
        $options = array(
			CURLOPT_SSL_VERIFYHOST => 0,
			CURLOPT_SSL_VERIFYPEER => 0
        );
        
        $params = array (
        	'p' => $this->getCategory(),
        	'addr' => $this->getLocation()		
        );
        
        $url = "http://local.search.yahoo.com/search?" . http_build_query($params); //$url = $url. (strpos($url, '?') === FALSE ? '?' : ''). http_build_query($params);
        
        $defaults = array(
			CURLOPT_URL => $url ,
    		CURLOPT_HEADER => 0,
        	CURLOPT_RETURNTRANSFER => TRUE,
        	CURLOPT_TIMEOUT => 6
        );
        
        $ch = curl_init();
        curl_setopt_array($ch, ($options + $defaults));
        
        if( ! $result = curl_exec($ch))
        {
//         	trigger_error(curl_error($ch));
        	throw new Tmi_Spider_Yahoo_Exception(curl_error($ch));
        }
        
        curl_close($ch);
        return $result;
    }
   
    /**
     *
     * @see Tmi_Spider_ICollection::storeHtmlRawData()
     *
     */
    public function storeHtmlRawData()
    {
        return null;
    }
    
}
