<?php

/**
 * @property int $clientId 
 * @property string $clientSecret 	
 * @property string $redirectUri 
 */
class Application_Model_Entity_OauthClient extends ZFExt_Model_Entity {

    protected $_data = array(
        'clientId' => null,
        'clientSecret' => '',
        'redirectUri' => ''
    );
}