<?php

class Admin_Model_DbTable_OauthClient extends Zend_Db_Table_Abstract {

    protected $_schema = 'oauth2';
    protected $_name = 'clients';
    protected $_primary = 'client_id';

}

