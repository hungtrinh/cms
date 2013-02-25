<?php
class Zend_View_Filter_Tidy implements Zend_Filter_Interface
{
    /**
     * @var tidy
     */
    protected $_tidy;

    /**
     * @var tidy
     */
    protected $_encoding = 'utf8';

    /**
     * @var array
     */
    protected $_config = array(
    	'indent' => true,
		'output-xhtml' => true,
		'wrap' => false,
    	'fix-bad-comments' => true,
    	'indent-cdata' => true
    );
    
    public function __construct(array $config = null) {
    	if (!empty($config)) {
    		$this->_config = $config;
    	}
    }

    /**
     * Filter the content with Tidy.
     *
     * @return string
     */
    public function filter($content)
    {
        $tidy = $this->getTidy($content);
        $tidy->cleanRepair();
        return (string) $tidy;
    }

    /**
     * Gets the Tidy object
     */
    public function getTidy($string)
    {
        if (!is_string($string)) {
            throw new InvalidArguementException('Expected string, got: ' . get_type($string));
        }

        if (null === $this->_tidy) {
            $this->_tidy = new tidy();
        }

        $this->_tidy->parseString($string, $this->_config, $this->_encoding);
        return $this->_tidy;
    }
}