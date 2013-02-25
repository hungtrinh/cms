<?php
class Admin_Model_Category
{
    private $_categoryTableClassName = 'Admin_Model_DbTable_Category';
    private $_categoryFormClassName = 'Admin_Form_Category';

    /**
     * @var Admin_Form_Category
     */
    private $_categoryForm;
    /**
     * @var Admin_Model_DbTable_Category
     */
    private $_categoryTable;
    public function __construct ()
    {
        $this->_categoryForm = new $this->_categoryFormClassName();
        $this->_categoryTable = new $this->_categoryTableClassName();
    }
    /**
     * @return Admin_Form_Category $_categoryForm
     */
    public function getCategoryForm ()
    {
        return $this->_categoryForm;
    }
    /**
     * @return Admin_Model_DbTable_Category $_categoryTable
     */
    public function getCategoryTable ()
    {
        return $this->_categoryTable;
    }
    /**
     * @param Admin_Form_Category $_categoryForm
     */
    public function setCategoryForm ($_categoryForm)
    {
        $this->_categoryForm = $_categoryForm;
    }
    /**
     * @param Admin_Model_DbTable_Category $_categoryTable
     */
    public function setCategoryTable ($_categoryTable)
    {
        $this->_categoryTable = $_categoryTable;
    }
}

