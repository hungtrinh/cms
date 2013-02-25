<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

class OAuth2Autoload implements Zend_Loader_Autoloader_Interface {
    /**
     * Autoload a class
     *
     * @abstract
     * @param   string $class
     * @return  mixed
     *          False [if unable to load $class]
     *          get_class($class) [if $class is successfully loaded]
     */
    public function autoload($class) {
//        die($class);
        $oauth2PhpFolderPath = realpath(dirname(__FILE__));
        $map = array(
            'OAuth2' => $oauth2PhpFolderPath . '/OAuth2.inc',
            'OAuth2Client' => $oauth2PhpFolderPath . '/OAuth2Client.inc',
            'OAuth2Exception' => $oauth2PhpFolderPath . '/OAuth2Exception.inc',
            'PDOOAuth2' => $oauth2PhpFolderPath . '/PDOOAuth2.inc',
        );
        
        if (array_key_exists($class, $map)) {
            require_once $map[$class];
        }
    }
}