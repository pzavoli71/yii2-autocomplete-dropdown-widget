var autocomleteDropdownInit = function(elId, options, source, ajaxGlobal, NomeAttr, callbackBeforeSend, callAfterSelect, callRenderItem){
    var el = jQuery('#'+elId);
    var hiddenInput = el.find('input[type="hidden"]');
    var autocompleteInput = el.find('.autocomplete');
    var selectedItemLabel;
    var NomeAttributo = NomeAttr;
    options.select = function(e, ui){
        selectedItemLabel = ui.item.label;
        hiddenInput.val(ui.item.id);
    };
    options.source = function ( request, response ) {
        dati = {};
        dati.term = request.term;
        dati.NomeCombo = NomeAttr;
        if (typeof callbackBeforeSend !== 'undefined') {
            callbackBeforeSend(dati, request.term);
        }
        $.ajax({
            data: dati,
            global: ajaxGlobal,
            type: 'GET',
            url: source,
            source: callAfterSelect,
            success: function ( items ) {
                return response(items);
            }
        });
    };
    autocompleteInput.autocomplete(options);
    if (typeof callRenderItem !== 'undefined') {
        autocompleteInput.autocomplete('instance')._renderItem = function(ul, item) {
            return callRenderItem(ul, item);
        };
    }
    autocompleteInput.change(function(){
        if ( selectedItemLabel !== jQuery(this).val() ) {
            hiddenInput.val(null);
        }
    });
};
