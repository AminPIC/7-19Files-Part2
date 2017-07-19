(function( $ ) {
    jQuery(document).ready( function() {
        var windowWidth = $(window).width();

        //only fire on mobile
        if (windowWidth <= 767){
            var mobileMenu = function(){
                $('#search-box').removeClass('clearfix');
                //Mobile menu code http://mmenu.frebsite.nl/tutorial.php

                //displays submenus in order to grab them
                $('#site-menu li > ul').css({
                    display:'block',
                    visibility:'visible'
                });
                //Storing the right menu to use later
                var secondMenu = $('.menu-right-main-nav').children('ul').html();

                //erase all html in second menu
                $('.region-main-nav').siblings().html('');
                //group the menus
                $('#site-menu > div > div > div > ul').append(secondMenu);

                //adding back the content class to make thing easier
                $('site-menu > div > div > div').addClass('content');
                //not too sure if this is needed but styles ul like an app-menu
                $('#site-menu ul').addClass('list');
                //adding so I can target in mobile view
                $('#site-menu .content').attr('id', 'mobile-menu');
                //finishing up removing nice menu junk
                $('#mobile-menu *').removeAttr('id');
                $('#mobile-menu *').removeAttr('class');

                //setting target for close menu
                $('body').attr('id','mobile-body');
                //Allows you to see menu when clicking menu button after its been opened and closed
                $('#mobile-menu-block > a').click(function(){
                    $('#list').addClass('mm-opened');
                });

                //Mobile Menu settings
                $("#mobile-menu").mmenu({
                    header   : true,
                    isMenu   : true,
                    classes  : "mm-slide mm-fullscreen mm-light",
                    labels   : {
                        fixed: true
                    }
                });
                $('.mm-header').prepend('<h1 id="site-name"><a href="/" rel="home" title="Home" class="active">gprma.reisys.com</a></h1>');
                //Adds close menu button
                $('.mm-header').append('<a id="close-menu" href="#content">Close the menu</a>');
                //uses built in functionality to close menu smoothly and painlessly
                $('#close-menu').bind('click', function() { $('#mobile-menu').trigger('close'); });
            }
            mobileMenu();

        }//done with mobile menu

        //tooltip
        /*trying to do this with hoverIntent unsuccessfully*/
        /*$('.agency-overview').hoverIntent(function(){
         $(this).tooltip({
         position: {
         my: "center bottom-20",
         at: "center top",
         using: function( position, feedback ) {
         $( this ).css( position );
         $( "<div>" )
         .addClass( "arrow" )
         .addClass( feedback.vertical )
         .addClass( feedback.horizontal )
         .appendTo( this );
         }
         },
         content: function(callback) {
         callback($(this).prop('title').replace('|', '<br />'));
         },
         show: {
         delay: 1050
         }
         });
         });*/
        /*working tool tip*/
        $('.agency-overview').tooltip({
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function( position, feedback ) {
                    $( this ).css( position );
                    $( "<div>" )
                        .addClass( "arrow" )
                        .addClass( feedback.vertical )
                        .addClass( feedback.horizontal )
                        .appendTo( this );
                }
            },
            content: function(callback) {
                callback($(this).prop('title').replace('|', '<br />'));
            },
            show: {
                delay: 1050
            }
        });
        // Checkbox styling solution for search results page
        $(function() {

            $('.page-search .block-facetapi input[type=checkbox]').each(function() {
                var span = $('<span class="' + $(this).attr('type') + ' ' + $(this).attr('class') + '"></span>').click(doCheck);
                if ($(this).is(':checked')) {
                    span.addClass('checked');
                }
                $(this).wrap(span).addClass('hide_it');
            });

            function doCheck() {
                if ($(this).hasClass('checked')) {
                    $(this).removeClass('checked');
                    $(this).children().prop("checked", false);
                } else {
                    $(this).addClass('checked');
                    $(this).children().prop("checked", true);
                }
            }

        });

        if (windowWidth <= 767){
            //Search Result - Filter Results
            //var searchFilters = $('.page-search .sidebar-right');
            $('.page-search #sidebar-right .block-facetapi:last').after('<a href="#" class="applyFilterButton">Close</a>');
            $('.page-search #sidebar-right').insertAfter($('#skip-link'));
            var bodyHeight = $('body').height(),
                rightSide = "-" + windowWidth + "px";
            $('.page-search #sidebar-right').height(bodyHeight);

            $('.page-search .refine_mobile, .applyFilterButton').click(function(e){
                e.preventDefault();
                $('.page-search #sidebar-right').toggle('slide', 'right', 500);
            });
        }
        if($('body').hasClass('federalprograminventory')){
            $('#block-views-programs-page-block-block, #block-views-programs-slider-public-block, #block-views-clear-goals-slider-block').wrapAll('<div class="program-top-wrapper"></div>');
            //Added for aria landmark roles
            $('#block-views-programs-page-block-block').attr('role', 'main');
            $('#block-views-programs-slider-public-block').attr('role', 'complementary');
            $('#block-views-programs-page-agencies-block-1').attr('role', 'complementary');
            $('#block-views-programs-resources-block').attr('role', 'complementary');
        }

        $( "#faq-tabs" ).tabs();
        $( "#developer-api-accordion" ).accordion({active:false, collapsible: true, heightStyle: 'content'});

        // public pages
        $( "div.wide-container div#tabs" ).find( "a" ).attr( "tabindex", "0" );
        $( "div.wide-container div#tabs" ).find( "li.blue_tab_item" ).attr( "tabindex", "0" );
        $( "div.wide-container div#tabs" ).find( "div.blue_tab" ).attr( "tabindex", "0" );
        $( "div.wide-container div#tabs div.blue_tab" ).find( "img" ).attr( "tabindex", "0" );
        $( "div.wide-container div#tabs" ).find( "div.expanding_triangle" ).attr( "tabindex", "0" );

        //Adding aria landmark roles
        $('.page-search #main-content').attr('role', 'main');
        $('.page-search #sidebar-right').attr('role', 'complementary');
        $('.cap-goals-list .view-header').attr('role', 'main');
        $('.agencies .view-content').attr('role', 'main');
        $('.agencies .view-additional-agencies').attr('role', 'complementary');

    });
}( jQuery ) );
