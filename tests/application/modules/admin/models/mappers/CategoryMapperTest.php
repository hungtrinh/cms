<?php

class Admin_Model_Mapper_CategoryMapperTest extends PHPUnit_Framework_TestCase
{

    protected $_tableGateway = null;

    protected $_adapter = null;

    protected $_rowset = null;

    protected $_mapper = null;

    public function setup()
    {
        $this->_tableGateway = $this->_getCleanMock(
            'Zend_Db_Table_Abstract'
        );
        $this->_adapter = $this->_getCleanMock(
            'Zend_Db_Adapter_Abstract'
        );
        $this->_rowset = $this->_getCleanMock(
            'Zend_Db_Table_Rowset_Abstract'
        );
        $this->_tableGateway->expects($this->any())
        					->method('getAdapter')
            				->will($this->returnValue($this->_adapter));
        $this->_mapper = new Admin_Model_Mapper_Category($this->_tableGateway);
    }

    public function testSavesNewCategoryAndSetsCategoryIdOnSave() {
        $category = new Admin_Model_Entity_Category(array(
            'title' => 'Tin the thao',
            'status' => 1,
            'urlKey' => 'tin-the-thao'
        ));

        // set mock expectation on calling Zend_Db_Table::insert()
        $insertionData = array(
            'title' => 'Tin the thao',
            'status' => 1,
            'urlKey' => 'tin-the-thao'
        );
        
        $this->_tableGateway
        	->expects($this->once())
            ->method('insert')
            ->with($this->equalTo($insertionData))
            ->will($this->returnValue(1));

        $this->_mapper->save($category);
        $this->assertEquals(1, $category->id);
    }

    public function testUpdatesExistingCategory() {
        $category = new Admin_Model_Entity_Category(array(
            'id' => 2,
            'title' => 'Tin the thao',
            'status' => 1,
            'urlKey' => 'tin-the-thao'
        ));

        // set mock expectation on calling Zend_Db_Table::update()
        $updateData = array(
            'id' => 2,
            'title' => 'Tin the thao',
            'status' => 1,
            'urlKey' => 'tin-the-thao'
        );
        $this->_adapter
        	->expects($this->once())
            ->method('quoteInto')
            ->will($this->returnValue('id = 2'));
        
        $this->_tableGateway
        	->expects($this->once())
            ->method('update')
            ->with($this->equalTo($updateData), $this->equalTo('id = 2'));

        $this->_mapper->save($category);
    }

    public function testFindsRecordByIdAndReturnsDomainObject()
    {
        $category = new Admin_Model_Entity_Category(array(
            'id' => 1,
            'title' => 'tin the thao',
            'status' => 1,
            'urlKey' => 'tin-the-thao'
        ));

        // expected rowset result for found entry
        $dbData = new stdClass;
        $dbData->id = 1;
        $dbData->title = 'tin the thao';
        $dbData->status = 1;
        $dbData->urlKey = 'tin-the-thao';

        // set mock expectation on calling Zend_Db_Table::find()
        $this->_rowset
        	->expects($this->once())
            ->method('current')
            ->will($this->returnValue($dbData));
        
        $this->_tableGateway
        	->expects($this->once())
            ->method('find')
            ->with($this->equalTo(1))
            ->will($this->returnValue($this->_rowset));
            
        $entryResult = $this->_mapper->find(1);
        $this->assertEquals($category, $entryResult);
    }

    public function testDeletesCategoryUsingCategoryId()
    {
        $this->_adapter
        	->expects($this->once())
            ->method('quoteInto')
            ->with($this->equalTo('id = ?'), $this->equalTo(1))
            ->will($this->returnValue('id = 1'));
        
        $this->_tableGateway
        	->expects($this->once())
            ->method('delete')
            ->with($this->equalTo('id = 1'));
        
        $this->_mapper->delete(1);
    }

    public function testDeletesCategoryUsingCategoryObject()
    {
        $category = new Admin_Model_Entity_Category(array(
            'id' => 1,
			'title' => 'tin the thao',
        	'status' => 1,
        	'urlKey' => 'tin-the-thao'
        ));

        $this->_adapter
        	->expects($this->once())
            ->method('quoteInto')
            ->with($this->equalTo('id = ?'), $this->equalTo(1))
            ->will($this->returnValue('id = 1'));

        $this->_tableGateway
        	->expects($this->once())
            ->method('delete')
            ->with($this->equalTo('id = 1'));
        $this->_mapper->delete($category);
    }
	
    public function testFindsRecordByIdAndReturnsMappedObjectIfExists()
    {
        $category = new Admin_Model_Entity_Category(array(
            'id' => 1,
        	'title' => 'tin the thao',
        	'urlKey' => 'tin-the-thao',
        	'status' => 1
        ));

        // expected rowset result for found entry
        $dbData = new stdClass;
        $dbData->id = 1;
        $dbData->title = 'tin the thao';
        $dbData->urlKey = 'tin-the-thao';
        $dbData->status = 1;

        // set mock expectation on calling Zend_Db_Table::find()
        $this->_rowset
        	->expects($this->once())
            ->method('current')
            ->will($this->returnValue($dbData));
        
        $this->_tableGateway
        	->expects($this->once())
            ->method('find')
            ->with($this->equalTo(1))
            ->will($this->returnValue($this->_rowset));

        $mapper = new Admin_Model_Mapper_Category($this->_tableGateway);
        
        $result = $mapper->find(1);
        $result2 = $mapper->find(1);

        $this->assertSame($result, $result2);
    }

    public function testSavingNewCategoryAddsItToIdentityMap() {
        $category = new Admin_Model_Entity_Category(array(
        	'title' => 'tin the thao',
        	'urlKey' => 'tin-the-thao',
        	'status' => 1
        ));

        // set mock expectation on calling Zend_Db_Table::insert()
        $insertionData = array(
        	'title' => 'tin the thao',
        	'urlKey' => 'tin-the-thao',
        	'status' => 1
        );
        $this->_tableGateway
        	->expects($this->once())
            ->method('insert')
            ->with($this->equalTo($insertionData))
            ->will($this->returnValue(123));

        $mapper = new Admin_Model_Mapper_Category($this->_tableGateway);
        $mapper->save($category);
        $result = $mapper->find(123);
        $this->assertSame($result, $category);
    }

    protected function _getCleanMock($className) {
        $class = new ReflectionClass($className);
        $methods = $class->getMethods();
        $stubMethods = array();
        foreach ($methods as $method) {
            if ($method->isPublic() || ($method->isProtected() && $method->isAbstract())) {
                $stubMethods[] = $method->getName();
            }
        }
        $mocked = $this->getMock(
            $className,
            $stubMethods,
            array(),
            $className . '_CategoryMapperTestMock_' . uniqid(),
            false
        );
        return $mocked;
    }

}
