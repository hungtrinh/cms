<?php

class Admin_Model_Entity_CategoryTest extends PHPUnit_Framework_TestCase
{

    public function testSetsAllowedDomainObjectProperty()
    {
        $category = new Admin_Model_Entity_Category;
        $category->title = 'My Title';
        $this->assertEquals('My Title', $category->title);
    }

    public function testConstructorInjectionOfProperties()
    {
        $data = array(
            'title' => 'My Title',
            'urlKey' => 'My Content',
            'status' => 1,
        );
        $category = new Admin_Model_Entity_Category($data);
        $expected = $data;
        $expected['id'] = null;
        $this->assertEquals($expected, $category->toArray());
    }

    public function testReturnsIssetStatusOfProperties()
    {
        $category = new Admin_Model_Entity_Category;
        $category->title = 'My Title';
        $this->assertTrue(isset($category->title));
    }

    public function testCanUnsetAnyProperties()
    {
        $category = new Admin_Model_Entity_Category;
        $category->title = 'My Title';
        unset($category->title);
        $this->assertFalse(isset($category->title));
    }

    public function testCannotSetNewPropertiesUnlessDefinedForDomainObject()
    {
        $category = new Admin_Model_Entity_Category;
        try {
            $category->notdefined = 1;
            $this->fail('Setting new property not defined in class should'
            . ' have raised an Exception');
        } catch (ZFExt_Model_Exception $e) {
        }
    }
}
