<?php
class Admin_Model_Mapper_Category extends ZFExt_Model_Mapper
{
    protected $_tableName = 'categories';

    protected $_entityClass = 'Admin_Model_Entity_Category';

    public function save(Admin_Model_Entity_Category $category)
    {
        if (!$category->id) {
            $data = array(
                'status' => $category->status,
                'title' => $category->title,
                'urlKey' => $category->urlKey
            );
            
            $category->id = $this->_getGateway()->insert($data);
            $this->_setIdentity($category->id, $category);
        } else {
            $data = array(
                'id' => $category->id,
            	'status' => $category->status,
                'title' => $category->title,
                'urlKey' => $category->urlKey
            );
            $where = $this->_getGateway()->getAdapter()
                ->quoteInto('id = ?', $category->id);
            $this->_getGateway()->update($data, $where);
        }
    }

    public function find($id)
    {
        if ($this->_getIdentity($id)) {
            return $this->_getIdentity($id);
        }
        
        $result = $this->_getGateway()->find($id)->current();
        $category = new $this->_entityClass(array(
			'id' => $result->id,
            'status' => $result->status,
            'title' => $result->title,
            'urlKey' => $result->urlKey
        ));
        $this->_setIdentity($id, $category);
        return $category;
    }

    public function delete($category)
    {
        if ($category instanceof Admin_Model_Entity_Category) {
            $where = $this->_getGateway()->getAdapter()
                ->quoteInto('id = ?', $category->id);
        } else {
            $where = $this->_getGateway()->getAdapter()
                ->quoteInto('id = ?', $category);
        }
        $this->_getGateway()->delete($where);
    }
}
