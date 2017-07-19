(function( $ ) {
    jQuery(document).ready( function() {

    $('.search_filters_title h1').replaceWith(function() {
         return $('<span>', {
            html: $(this).html()
        })
    });
    $.widget( "custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function( ul, items ) {
            var that = this,
                currentCategory = "";
            $.each( items, function( index, item ) {
                if ( item.category != currentCategory ) {
                    ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
                    currentCategory = item.category;
                }
                that._renderItemData( ul, item );
            });
        }
    });
    $(function() {
        function split( val ) {
            return val.split( /,\s*/ );
        }
        function extractLast( term ) {
            return split( term ).pop();
        }
        var data = function( request, response ) {
            $.getJSON( "solr_autosuggest", {
                term: request.term
            }, response );
        };

        $( "#edit-search-block-form--2" ).catcomplete({
            delay: 0,
            source: function( request, response ) {
                $.getJSON( "/solr_autosuggest", {
                    term: extractLast( request.term )
                }, response );
            }
        });
    });

    });
}( jQuery ) );