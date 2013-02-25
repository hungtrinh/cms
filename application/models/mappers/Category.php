<?php
/** 
 * @author Office
 * 
 * 
 */
class Application_Model_Mapper_Category extends ZFExt_Model_Mapper
{
    protected $_tableName = 'categories';
    protected $_entityClass = 'Admin_Model_Entity_Category';
    
    public function getAllActive() {
        $rows = $this->_getGateway()->fetchAll();
        if (empty($rows)) {
            return null;
        }
        
    }
}
