<?php

/**
 * @property int $id
 * @property string $title
 * @property string $status
 * @property string $urlKey
 * @property string $content
 * @property string $description
 * @property Admin_Model_Entity_Category $category
 */
class Admin_Model_Entity_News extends ZFExt_Model_Entity
{
	/**
	 * category mapper class name
	 * @var string
	 */
	protected $_categoryMapperClass = 'Admin_Model_Mapper_Category';
	
	/**
	 * category mapper object
	 * 
	 * @var Admin_Model_Mapper_Category | null
	 */
	protected $_categoryMapper = null;
	
	protected $_data = array(
		'id' => null,
		'title' => '',
		'status' => '', 
    	'urlKey' => '',
		'content' => '',
		'description' => '',
		'category' => null
 	);
 	
	/* (non-PHPdoc)
	 * @see ZFExt_Model_Entity::__get()
	 */
	public function __get($name) {
		// TODO Auto-generated method stub
		if ($name == 'category' && $this->getReferenceId('category') && !$this->_data['category'] instanceof Admin_Model_Entity_Category) {
            $this->_data['category'] = $this->getCategoryMapper()->find($this->getReferenceId('category'));
        }
        return parent::__get($name);
	}

	/* (non-PHPdoc)
	 * @see ZFExt_Model_Entity::__set()
	 */
	public function __set($name, $value) {
		// TODO Auto-generated method stub
		if ($name == 'category' && !$value instanceof Admin_Model_Entity_Category) {
            throw new Admin_Model_Entity_Exception('Category can only be set using an instance of Admin_Model_Entity_Category');
        }
        parent::__set($name, $value);
	}
	
	public function setCategoryMapper(Admin_Model_Mapper_Category $mapper) {
		$this->_categoryMapper = $mapper;
	}
	
	public function getCategoryMapper() {
		if (!$this->_categoryMapper) {
			$this->setCategoryMapper(new $this->_categoryMapperClass);
		}
		return $this->_categoryMapper;
	}
}