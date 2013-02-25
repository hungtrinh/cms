<?php

class Admin_CategoryController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $categoryModel = new Admin_Model_Category();
        echo $this->view->categoryForm = $categoryModel->getCategoryForm();
    }


}

