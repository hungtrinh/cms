<?php

class Admin_Model_Entity_NewsTest extends PHPUnit_Framework_TestCase
{
	public function testSetsAllowedDomainObjectProperty()
	{
		$news = new Admin_Model_Entity_News();
		
		$news->title = 'hot news';
		$this->assertEquals('hot news', $news->title);
	}

	public function testConstructorInjectionOfProperties()
	{
		$data = array(
			'title' => 'hot news',
			'urlKey' => 'hot-news',
			'content' => 'news content',
			'description' => 'news description',
			'status' => 1,
			'category' => new Admin_Model_Entity_Category()
			
		);	
		
		$news = new Admin_Model_Entity_News($data);
		$expected = $data;
		$expected['id'] = null;
		$this->assertEquals($expected, $news->toArray());
	}
	
	public function testIsSetStatusProperties()
	{
		$news = new Admin_Model_Entity_News();
		$news->title = 'hot news';
		$this->assertTrue(isset($news->title));
	}
	
	public function testIsUnsetStatusProperties()
	{
		$news = new Admin_Model_Entity_News();
		$news->title = 'hot news';
		unset($news->title);
		$this->assertFalse(isset($news->title));
	}
	
	public function testCannotSetNewPropertiesUnlestDefinedForDomainObject() {
		$news = new Admin_Model_Entity_News();
		try {
			$news->undefined = 1;
		    $this->fail('Setting new property not defined in class should have raised an Exception');
        } catch (ZFExt_Model_Exception $e) {
        }
	}
	
	public function testThrowExceptionIfCategoryNotAnCategoryEntityObject() {
		$news = new Admin_Model_Entity_News();
		try {
			$news->category = 1;
			$this->fail('Setting category should have raised an Exception since value was not an instance of Admin_Model_Entity_Category');
		} catch (Admin_Model_Entity_Exception $e) {
		} 
	}
	
	public function testAllowCateogryToBeStoreAsReference()
	{
		$news = new Admin_Model_Entity_News();
		$news->setReferenceId('category', 5);
		$this->assertEquals(5, $news->getReferenceId('category'));
	}
	
	public function testLazyLoadindgCategoryRetrievesCategoryDomainObject()
	{
		$category = new Admin_Model_Entity_Category();
		$category->status = 1;
		$category->title = 'new category';
		$category->urlKey = 'new-category';
		
		$categoryMapper = $this->_getCleanMock('Admin_Model_Mapper_Category');
		$categoryMapper
			->expects($this->once())
			->method('find')
			->with($this->equalTo(5))
			->will($this->returnValue($category));

		$news = new Admin_Model_Entity_News();
		$news->setReferenceId('category', 5);
		$news->setCategoryMapper($categoryMapper);
				
		$this->assertEquals('new category', $news->category->title);
	}
	
	public function testGetCategoryMapperObjectFromNewsDomainObject()
	{
		$news = new Admin_Model_Entity_News();
		$categoryMapper = $news->getCategoryMapper();
		$this->assertTrue(is_a($categoryMapper,'Admin_Model_Mapper_Category'));
	}
	
	public function testReGetCategoryMapperObjectFromNewsDomainObject()
	{
		$news = new Admin_Model_Entity_News();
		$news->setCategoryMapper(new Admin_Model_Mapper_Category());
		$this->assertTrue(is_a($news->getCategoryMapper(),'Admin_Model_Mapper_Category'));
	}
	
	/**
	 * @param string $className
	 * @return this
	 */
	protected function _getCleanMock($className) {
        $class = new ReflectionClass($className);
        $methods = $class->getMethods();
        $stubMethods = array();
        foreach ($methods as $method) {
            if ($method->isPublic() || ($method->isProtected()
            && $method->isAbstract())) {
                $stubMethods[] = $method->getName();
            }
        }
        $mocked = $this->getMock(
            $className,
            $stubMethods,
            array(),
            $className . '_NewsTestMock_' . uniqid(),
            false
        );
        return $mocked;
    }
}
