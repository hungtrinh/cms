<?php

/**
 * @property int $id
 * @property string $title
 * @property string $status
 * @property string $urlKey
 */
class Admin_Model_Entity_Category extends ZFExt_Model_Entity
{
	protected $_data = array(
		'id' => null,
		'title' => '',
		'status' => '', 
    	'urlKey' => '',
 	);
}