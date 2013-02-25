<?php

/**
 * Clone code Rexus_Controller_Plugin_RequestedModuleLayoutLoader 
 * Rename class "ZFExt_Controller_Plugin_ModuleLayoutLoader"
 *
 *
 * @author Matthijs van den Bos
 * @link http://blog.vandenbos.org/2009/07/19/zend-framework-module-specific-layout/
 */
class ZFExt_Controller_Plugin_ModuleLayoutLoader extends Zend_Controller_plugin_Abstract {

    public function preDispatch(Zend_Controller_Request_Abstract $request) {
        $config = Zend_Controller_Front::getInstance()
                        ->getParam('bootstrap')->getOptions();
        $moduleName = $request->getModuleName();

        if (isset($config[$moduleName]['resources']['layout']['layout'])) {
            $layoutScript = $config[$moduleName]['resources']['layout']['layout'];
            Zend_Layout::getMvcInstance()->setLayout($layoutScript);
        }

        if (isset($config[$moduleName]['resources']['layout']['layoutPath'])) {
            $layoutPath = $config[$moduleName]['resources']['layout']['layoutPath'];
            $moduleDir = Zend_Controller_Front::getInstance()->getModuleDirectory();
            Zend_Layout::getMvcInstance()->setLayoutPath(
                    $moduleDir . DIRECTORY_SEPARATOR . $layoutPath
            );
        }
    }

}

?>
