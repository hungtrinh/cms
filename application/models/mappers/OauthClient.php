<?php

/**
 * @author Office
 * 
 * 
 */
class Application_Model_Mapper_OauthCLient extends ZFExt_Model_Mapper {

    protected $_tableName = 'clients';
    protected $_entityClass = 'Application_Model_Entity_OauthClient';

    /**
     *
     * @param int $id
     * @return Application_Model_Entity_OauthClient || null 
     */
    public function find($id) {
        if ($this->_getIdentity($id)) {
            return $this->_getIdentity($id);
        }

        $result = $this->_getGateway()->find($id)->current();
        
        if (empty($result)) {
            return null;
        }
        
        $oauthClient = new $this->_entityClass(array(
                    'clientId' => $result->client_id,
                    'clientSecret' => $result->client_secret,
                    'redirectUri' => $result->redirect_uri
                ));
        
        $this->_setIdentity($id, $oauthClient);
        
        return $oauthClient;
    }

}
