<?php
namespace pzavoli71\widgets;

use yii\helpers\Json;

class AutocompleteDropdown extends \yii\widgets\InputWidget
{
    /**
     * Source for autocomplete. It must be url to get autocomlete items.
     * @var string
     */
    public $source = '';
    /**
     * Additional autocomplete options.
     * @var array
     */
    public $autocompleteOptions = [];
    /**
     * Initial autocomplete value.
     * @var string
     */
    public $textValue = '';
    /**
     * Value of 'global' property of jquery ajax request.
     * @var boolean
     */
    public $ajaxGlobal = false;

    public $callbackBeforeSend = 'undefined';

    public $callAfterSelect = 'undefined';

    public $callRenderItem = 'undefined';
    
    function run()
    {
        AutocompleteDropdownAsset::register($this->view);
        $this->options['id'] .= '-wrapper';
        $this->view->registerJs("autocomleteDropdownInit('{$this->options['id']}',
            ".Json::encode($this->autocompleteOptions).",
            '$this->source',
            ".($this->ajaxGlobal?'true':'false').",
            '".$this->attribute."',
            ".$this->callbackBeforeSend.",
            ".$this->callAfterSelect.",            
            ".$this->callRenderItem."
        )");
        return $this->render('widget', [
            'widget' => $this,
            'hasModel' => $this->hasModel(),
        ]);
    }
}
