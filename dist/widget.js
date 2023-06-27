var autocomleteDropdownInit = function(elId, options, source, ajaxGlobal, NomeAttr, callbackBeforeSend, callAfterSelect, callRenderItem){
    var el = jQuery('#'+elId);
    var hiddenInput = el.find('input[type="hidden"]');
    var autocompleteInput = el.find('.autocomplete');
    var selectedItemLabel;
    var NomeAttributo = NomeAttr;
    autocompleteInput.attr('placeholder','Cerca...');
    if (options != null && options.placeholder)
        autocompleteInput.attr('placeholder',options.placeholder);
    options.select = function(e, ui){
        selectedItemLabel = ui.item.label;
        hiddenInput.val(ui.item.id);
        if (typeof callAfterSelect !== 'undefined') 
            return callAfterSelect(e,ui);                        
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
            //select: typeof callAfterSelect !== 'undefined'?function(event,ui) {return callAfterSelect(event, ui);}:null,
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
    };
    //if (typeof callAfterSelect !== 'undefined') {
    //    autocompleteInput.autocomplete('instance')._select = function(event, ui) {
    //        return callAfterSelect(event, ui);
    //    };
    //}
    autocompleteInput.change(function(){
        if ( selectedItemLabel !== jQuery(this).val() ) {
            hiddenInput.val(null);
        }
    });
};
