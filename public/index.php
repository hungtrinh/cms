<?php

// Define path to application directory
defined('APPLICATION_PATH')
        || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../application'));

// Define application environment
defined('APPLICATION_ENV')
        || define('APPLICATION_ENV', (getenv('APPLICATION_ENV') ? getenv('APPLICATION_ENV') : 'production'));

// Ensure library/ is on include_path
set_include_path(implode(PATH_SEPARATOR, array(
            realpath(APPLICATION_PATH . '/../library'),
           // realpath(APPLICATION_PATH . '/../library/oauth2-php'),
            '/usr/share/php/libzend-framework-php',
            get_include_path()
        )));

/** Zend_Application */
require_once 'Zend/Application.php';

$host = isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : (isset($_SERVER['SERVER_NAME']) ? $_SERVER['SERVER_NAME'] : null);
switch ($host) {
    case 'apps.cms.local':
    	$applicationPath = APPLICATION_PATH . '/configs/apps.cms.local.ini';
    	defined('DEFAULT_MODULE_NAME')
        || define('DEFAULT_MODULE_NAME', (getenv('DEFAULT_MODULE_NAME') ? getenv('DEFAULT_MODULE_NAME') : 'default'));
		defined('DEFAULT_CONTROLLER_NAME')
        || define('DEFAULT_CONTROLLER_NAME', (getenv('DEFAULT_CONTROLLER_NAME') ? getenv('DEFAULT_CONTROLLER_NAME') : 'index'));
        defined('DEFAULT_ACTION_NAME')
        || define('DEFAULT_ACTION_NAME', (getenv('DEFAULT_ACTION_NAME') ? getenv('DEFAULT_ACTION_NAME') : 'index'));
        break;
    case 'cms.local': 
	default:
		defined('DEFAULT_MODULE_NAME')
        || define('DEFAULT_MODULE_NAME', (getenv('DEFAULT_MODULE_NAME') ? getenv('DEFAULT_MODULE_NAME') : 'default'));
		defined('DEFAULT_CONTROLLER_NAME')
        || define('DEFAULT_CONTROLLER_NAME', (getenv('DEFAULT_CONTROLLER_NAME') ? getenv('DEFAULT_CONTROLLER_NAME') : 'index'));
        defined('DEFAULT_ACTION_NAME')
        || define('DEFAULT_ACTION_NAME', (getenv('DEFAULT_ACTION_NAME') ? getenv('DEFAULT_ACTION_NAME') : 'index'));
        	
        $applicationPath = APPLICATION_PATH . '/configs/application.ini';
        break;
	case 'acms.local':
		defined('DEFAULT_MODULE_NAME')
        || define('DEFAULT_MODULE_NAME', (getenv('DEFAULT_MODULE_NAME') ? getenv('DEFAULT_MODULE_NAME') : 'default'));
		defined('DEFAULT_CONTROLLER_NAME')
        || define('DEFAULT_CONTROLLER_NAME', (getenv('DEFAULT_CONTROLLER_NAME') ? getenv('DEFAULT_CONTROLLER_NAME') : 'index'));
        defined('DEFAULT_ACTION_NAME')
        || define('DEFAULT_ACTION_NAME', (getenv('DEFAULT_ACTION_NAME') ? getenv('DEFAULT_ACTION_NAME') : 'facebook-app'));
        $applicationPath = APPLICATION_PATH . '/configs/application.ini';
        break;
}
// Create application, bootstrap, and run
$application = new Zend_Application(
	APPLICATION_ENV,
	$applicationPath
);
$application->bootstrap()
        ->run();