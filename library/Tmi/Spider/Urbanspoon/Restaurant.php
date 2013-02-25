<?php

require_once ('Tmi/Spider/ICollection.php');

/**
 *
 * @author hungtd
 *        
 */
class Tmi_Spider_Urbanspoon_Restaurant implements Tmi_Spider_ICollection {

    protected $_rootUrl = "http://www.urbanspoon.com/n/290/34610/Southern-California/California-City-restaurants";

    public function __construct() {
        if (!in_array('curl', get_loaded_extensions())) {
            throw new Tmi_Spider_Urbanspoon_Exception('Please install php curl lib, And comment this line in production code to improve performance');
        }
    }

    public function getUrl() {
        return $this->_rootUrl;
    }

    /**
     *
     * @see Tmi_Spider_ICollection::downloadRawHtml()
     *
     */
    public function downloadRawHtml() {
        $options = array(
            CURLOPT_SSL_VERIFYHOST => 0,
            CURLOPT_SSL_VERIFYPEER => 0
        );

        $params = array(
        );

        $url = $this->getUrl();
        if (!empty($params)) {
            $url = $url . (strpos($url, '?') === FALSE ? '?' : '') . http_build_query($params);
        }


        $defaults = array(
            CURLOPT_URL => $url,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => TRUE,
            CURLOPT_TIMEOUT => 10
        );

        $ch = curl_init();
        curl_setopt_array($ch, ($options + $defaults));

        if (!$result = curl_exec($ch)) {
//         	trigger_error(curl_error($ch));
            throw new Tmi_Spider_Urbanspoon_Exception(curl_error($ch));
        }

        curl_close($ch);
        return $result;
    }

    /**
     *
     * @see Tmi_Spider_ICollection::storeHtmlRawData()
     *
     */
    public function storeHtmlRawData() {
        $html = $this->downloadRawHtml();
        $dom = new Zend_Dom_Query($html);
        $results = $dom->query('ul');
        return $results;
        
    }

}
