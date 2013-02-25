<?php
class Application_Model_Mapper_CategoryTest extends PHPUnit_Framework_TestCase
{
    protected $_tableGateway = null;
    protected $_adapter = null;
    protected $_rowset = null;
    protected $_mapper = null;
    /**
     * Prepares the environment before running a test.
     */
    protected function setUp ()
    {
        parent::setUp();
        //TODO Auto-generated Application_CategoryTest::setUp()
        $this->_adapter = $this->_getCleanMock('Zend_Db_Adapter_Abstract');
        $this->_tableGateway = $this->_getCleanMock('Zend_Db_Table_Abstract');
        $this->_rowset = $this->_getCleanMock('Zend_Db_Table_Rowset_Abstract');
        $this->_tableGateway->expects($this->any())
            ->method('getAdapter')
            ->will($this->returnValue($this->_adapter));
        $this->_mapper = new Application_Model_Mapper_Category(
        $this->_tableGateway);
    }
    /**
     * Cleans up the environment after running a test.
     */
    protected function tearDown ()
    {
        // TODO Auto-generated Application_CategoryTest::tearDown()
        parent::tearDown();
        $this->_tableGateway = null;
        $this->_adapter = null;
        $this->_rowset = null;
        $this->_mapper = null;
    }
    /**
     * Constructs the test case.
     */
    public function __construct ()
    {
        // TODO Auto-generated constructor
    }
    protected function _getCleanMock ($className)
    {
        $class = new ReflectionClass($className);
        $methods = $class->getMethods();
        $stubMethods = array();
        foreach ($methods as $method) {
            if ($method->isPublic() ||
             ($method->isProtected() && $method->isAbstract())) {
                $stubMethods[] = $method->getName();
            }
        }
        $mocked = $this->getMock($className, $stubMethods, array(), 
        $className . '_CategoryMapperTestMock_' . uniqid(), false);
        return $mocked;
    }
    public function testGetAllActiveCategory ()
    {}
}

