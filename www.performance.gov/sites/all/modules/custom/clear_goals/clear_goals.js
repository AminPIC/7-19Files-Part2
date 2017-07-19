$(document).ready(function(){


    // Fixes tab navigation for "Clear Goals" menu

    $('#nice-menu-2 li a , .menu-right-main-nav .nice-menu a').focus(function() {
        
        // Remove active class
        $(this).parent("li").prev().removeClass('over');
        $(this).parent("li").next().removeClass('over');    

        // Add active class
        $(this).parent().addClass('over');

        //Close second level navigation
        $(this).parent("li").prev().children("ul").css("display","none").css("visibility", "hidden");
        $(this).parent("li").next().children("ul").css("display","none").css("visibility", "hidden");

        // Open second level navigation
        $(this).next("ul").css("display","block").css("visibility", "visible");


    }).blur(function() {

        $(this).parent().removeClass('over');

        // If item its part of second level navigation keep parent active
        $(this).parent("li.menuparent").addClass('over');

    });

    $('#nice-menu-2 > li.menuparent').mouseover(function() {

        $(this).addClass('over');
        $(this).children("ul").css("display","block").css("visibility", "visible");

    }).mouseout(function() {

        $(this).removeClass('over');
        $(this).children("ul").css("display","none").css("visibility", "hidden"); 
    });






        $(".views-content-counter").attr("tabindex", "0");
        $(".views-content-counter").attr("role", "carousel-navigation");
        $(".views-content-counter").keypress(function(e){
        if(e.which === 13)
            $(this).click();
        });
          $(".slider-dots span").click(function() {
               var element = $(this).attr('id');
               $('.slider-dots').find('.active-class').removeClass('active-class');
               $(this).addClass('active-class');
               var i = $('.clear-slider').find('li.active').index();
               $('.clear-slider').find('li').eq(i).removeClass('active');
               $('.clear-slider').find('li').eq(i).fadeOut(2000);
               var j = $('.slider-dots').find('#'+element).index();
               $('.clear-slider').find('li').eq(j).fadeIn(2000);
           }); 
			/*Remove following line from here after switch back David Bruley*/
			$('.goal-name .arrow').before('<div class="triangle-clicky"></div>');
            $(".triangle-clicky").attr("tabindex", "0");
            $(".triangle-clicky").keypress(function(e){
                if(e.which === 13)
                    $(this).click();
            });
			/*Change back to commented out line below David Bruley*/
			/*$("div.goal-item:not(.clear_goals_open)").addClass("clear_goals_open").bind("click", function(){*/
           $('.triangle-clicky').not($('.goal-item.clear_goals_open .triangle-clicky')).click(function(){
               /*Remove this line below after switch David Bruley*/
			   $(this).parent().parent().parent().addClass("clear_goals_open");
               $fiscal_year = $('#edit-clear-goals-fiscal-year').val();
               if ($fiscal_year == ''){$fiscal_year = 'all';}
			   $.ajax({
                    type: 'GET',
                    /*url: "clear_goals/js/" + parseInt(this.id, 10) + '/' + parseInt(((this.id).substring((this.id).indexOf('_')+1)), 10),*/
                    url: "clear_goals/js/" + parseInt($(this).parent().parent().parent().attr('id'), 10) + '/' + parseInt((($(this).parent().parent().parent().attr('id')).substring(($(this).parent().parent().parent().attr('id')).indexOf('_')+1)), 10) + '/' + $fiscal_year,
                    dataType: "html",
                    success: getData,
                    error: function(xmlhttp) {
                        alert('An error occurred: ' + xmlhttp.status);
                    }
                })
                return false;
            });
        var getData = function(response) {
            result = jQuery.parseJSON(response).data;
            var temp_vid = "_" + result.vid;
            if(parseInt(result.nid) == parseInt(result.vid)){
                temp_vid = '';
            }
            if (result.body) {
                $("div#data_" + result.nid).html(result.body).slideToggle('fast', function(){}).toggleClass("");
                $("div #" + result.nid +""+ temp_vid + " span.arrow").toggleClass("collapse").toggleClass("expand");
                $("div #" + result.nid + "" + temp_vid).toggleClass("active-goal");
                //$("div #" + result.nid).toggleClass("active-goal");

				/*Remove the line directly below after switch David Bruley*/
				$('.objective-item.goal-name .arrow').before('<div class="triangle-clicky"></div>');
                /*Comment this back in and remove the other click function after the swtich David Bruley*/
				/*$("div.objective-item:not(.objective-item-open)").addClass("objective-item-open").bind("click", function(){*/
				$('.triangle-clicky').not('.objective-item.objective-item-open .triangle-clicky').click(function(){
					/*Remove the like directly below after switch David Bruley*/
					$(this).parent().addClass('objective-item-open');
                    /*Put this back in after sitch David Bruley*/
					/*$("div#objective_data_" + this.id).slideToggle("fast", function(){}).toggleClass("");*/
					$('div#objective_data_' + ($(this).parent().attr('id'))).slideToggle('fast', function(){}).toggleClass('');
                    /*Put this back in after switch David Bruley*/
					/*$("div #" + this.id + " span.arrow").toggleClass("collapse").toggleClass("expand");*/
					$('div #' + ($(this).parent().attr('id')) + ' span.arrow').toggleClass('collapse').toggleClass('expand');
                });

				/*Comment this back in after switch and remove altered code below it David Bruley*/
                /*$("div.sub-goal-item:not(.sub-item-open)").addClass("sub-item-open").bind("click", function(){
                    $("div#sub_data_" + this.id).slideToggle("fast", function(){}).toggleClass("");
                    $("div #" + this.id + " span.arrow").toggleClass("collapse").toggleClass("expand");
                });*/
				/*Remove following 2 blocks of code after switch David Bruley*/
				$('.sub-goal-item .arrow').before('<div class="triangle-clicky"></div>');
				$('.sub-goal-item .triangle-clicky').not('.sub-item-open .triangle-clicky').click(function(){
					$(this).parent().addClass('sub-item-open');
					$('div#sub_data_' + ($(this).parent().attr('id'))).slideToggle('fast', function(){}).toggleClass('');
					$('div #' + ($(this).parent().attr('id')) + ' span.arrow').toggleClass('collapse').toggleClass('expand');
				});
            }
        }
        //The next two lines are added to fix a problem with the drill-down expanding after two clicks. If we manipulate the id here,
        //say with a click, the problem will be fixed.
        //var div_id = $("#goals-list-wrapper:first-child").attr("id");
        //div_id.click();
        // settings
        var $transition_time = 2000; // 2 seconds
        var $time_between_slides = 4000; // 4 seconds

        var $dotter = $('.slider-dots');
        var $dot = 'span';
        function dots(){
            return $dotter.find($dot);
        }
        //dots().fadeout();
        dots().first().addClass('active-class');
        dots().first().fadeIn($transition_time);



        var $slider = $('.clear-slider'); // class or id of carousel slider
        var $slide = 'li'; // could also use 'img' if you're not using a ul

        function slides(){
            return $slider.find($slide);
        }

        slides().fadeOut();

        // set active classes
        slides().first().addClass('active');
        slides().first().fadeIn($transition_time);

        // auto scroll
        $interval = setInterval(
                function(){
                    var $i = $slider.find($slide + '.active').index();
                     dots().eq($i).removeClass('active-class');

                    slides().eq($i).removeClass('active');
                    slides().eq($i).fadeOut($transition_time/4);

                    if (slides().length == $i + 1) $i = -1; // loop to start

                    slides().eq($i + 1).fadeIn($transition_time);
                    slides().eq($i + 1).addClass('active');
                    dots().eq($i + 1).addClass('active-class');
                }
                , $transition_time +  $time_between_slides
        );

    });
