<?php

// Define path to application directory
defined('APPLICATION_PATH')
    || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
    || define('APPLICATION_ENV', 'testing');

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
    realpath(APPLICATION_PATH . '/../library'),
    get_include_path(),
)));

defined('DEFAULT_MODULE_NAME')
        || define('DEFAULT_MODULE_NAME', (getenv('DEFAULT_MODULE_NAME') ? getenv('DEFAULT_MODULE_NAME') : 'default'));
		defined('DEFAULT_CONTROLLER_NAME')
        || define('DEFAULT_CONTROLLER_NAME', (getenv('DEFAULT_CONTROLLER_NAME') ? getenv('DEFAULT_CONTROLLER_NAME') : 'index'));
        defined('DEFAULT_ACTION_NAME')
        || define('DEFAULT_ACTION_NAME', (getenv('DEFAULT_ACTION_NAME') ? getenv('DEFAULT_ACTION_NAME') : 'index'));
        	
        $applicationPath = APPLICATION_PATH . '/configs/application.ini';


/** Zend_Application */
require_once 'Zend/Application.php';

require_once 'utils.php';

// Create application, bootstrap, and run
$application = new Zend_Application(
    APPLICATION_ENV,
   $applicationPath
);
$application->bootstrap();
