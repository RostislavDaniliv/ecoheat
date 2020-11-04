(function($) {
  "use strict"; // Start of use strict
  $(window).load(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
      $('body').addClass('ios');
    };
    $('body').removeClass('loaded');
  });

  // Old browser notification
  $(function() {
    $.reject({
      reject: {
        msie: 9
      },
      imagePath: 'img/icons/jReject/',
      display: [ 'chrome','firefox','safari','opera' ],
      closeCookie: true,
      cookieSettings: {
        expires: 60*60*24*365
      },
      header: 'Ваш браузер устарел!',
      paragraph1: 'Вы пользуетесь устаревшим браузером, который не поддерживает современные веб-стандарты и представляет угрозу вашей безопасности.',
      paragraph2: 'Пожалуйста, установите современный браузер:',
      closeMessage: 'Закрывая это уведомление вы соглашаетесь с тем, что сайт в вашем браузере может отображаться некорректно.',
      closeLink: 'Закрыть это уведомление',
    });
  });


  // click to variant
  $('.radio-btn__control').on('click, change', function() {
    // enable/disable input
	$(this).parents('.question').find('.question__radio-group>div>input').prop('disabled', true);
	$(this).siblings('div').find('input').prop('disabled', false);
	//$(this).parents('.question').find('.question__radio-group>div>textarea').prop('disabled', true);
	//$(this).siblings('div').find('textarea').prop('disabled', false);
	// show buttons
	$(this).parents('.question')
      .find('.test__btn')
      .removeClass('test__btn--hidden');
  });

  // enter in text input --- OLD
  $('.question .text_input').on('keyup', function() {
    if($(this).val().length>1){$(this).parents('.question')
          .find('.test__btn')
          .removeClass('test__btn--hidden');}
  });
 /*
  // xz maybe dont working
  $('.question__radio-group .radio-btn__control').on('click, change', function() {
    var $node   = $(this).parents(".form-group"),
        $value  = $node.find('.payment__value');
    $node.find("[name^=\"payment\"]:checked").each(function() {
      if ($(this).prop("checked")) {
        var radioText = $(this).siblings(".radio-btn__box").find(".radio-btn__text").text();
        $value.val(radioText);
      }
    });
  });
 */
  // click to add room button
  $('.add-btn.icon-plus').on('click', function(e) {
    //alert("!!");
	e.preventDefault();
	var orig_row = $(this).parent().siblings('.row:first');
	var row_to_copy = $(orig_row).clone();
	$(row_to_copy).find('[id^="js-rangeslider"]').remove();
	var room_number = $(this).parent().siblings('.row').length;
	room_number++;
	$(row_to_copy).find('.room-number').text(room_number+'.');

	$(orig_row).parent().find('.row:last').after($(row_to_copy));
	var new_slider = $(row_to_copy).find('input[type="range"]').removeAttr('style');
	$(new_slider).rangeslider(rangeslider_options);
  });

  // click to remove room button
  $('.add-btn.icon-minus').on('click', function(e) {
	e.preventDefault();
	var rows = $(this).parent().siblings('.row');
	if(rows.length > 1){
	  $(rows).last().remove();
	}
  });


  $(function() {
    // click to button Next
	$('.test__btn[data-target]').on('click', function(e) {
      //$(this).prop('disabled', true);

      var $contentItem    = $('.tabs__item'),
          itemPosition    = $(this).data('target'),
          //$question       = $('.question'),
          $node           = $(this).parents(".question"),
          questionHeding  = $node.find(".question__heading").text(),
          //currQuestion    = $node.find(".question__current").text(),
          currQuestion    = $node.attr('id').replace('question',''),
          $value          = $node.find('.test__value'),
          //$value_question = $node.find('.test__value__question'),
          $value_answer   = $node.find('.test__value__answer');

      $contentItem.filter(itemPosition)
      .addClass('tabs__item--active')
      .siblings()
      .removeClass('tabs__item--active');

      //$value.val();

      // get radiobox answers
	  $node.find("[name^=\"question\"]:checked").each(function() {
        if ($(this).prop("checked")) {
          var radioText       = $(this).siblings(".radio-btn__box").find(".radio-btn__text").text();
		  var textArea = $(this).siblings("div").find('input[type="textarea"], textarea');
		  if(textArea.length>0){
			radioText += " (" + textArea.val() + ")";
		  }
          $value.val("Вопрос " + $.trim(currQuestion) + ". " + $.trim(questionHeding) + "\n" + "Ответ: " + $.trim(radioText));

		  var id = $(this).attr("id").replace('question-','');
		  $value_answer.val(id);
        }
      });
	  // get text_input answers
      if ($node.find('.text_input').length>0) {
        var radioText       = $node.find('.text_input').val();
        $value.val("Вопрос " + $.trim(currQuestion) + ". " + $.trim(questionHeding) + "\n" + "Ответ: " + $.trim(radioText));
      }
	  // get slider output answers
      //if ($node.find('output').length>0) {
      //  var radioText = $node.find('output').val();
      //  $value.val("Вопрос " + $.trim(currQuestion) + ". " + $.trim(questionHeding) + "\n" + "Ответ: " + $.trim(radioText));
		//
		//var id = $(this).attr("id").replace('question-','');
		//$value_answer.val(id);
      //}
	  // get sliders answers
      if ($node.find('.rangeslider__handle').length>0) {
        var output = [];
		$node.find('.rangeslider__handle>span').each(function(i, el){
			output.push($(this).text());
		})
		var radioText = output.join(',');
        $value.val("Вопрос " + $.trim(currQuestion) + ". " + $.trim(questionHeding) + "\n" + "Ответ: " + $.trim(radioText));
		var id = $contentItem.has($(this)).attr("id").replace('question','');
		id = id + "-" + radioText.replace(/\м2/g,'').replace(/\грн/g,'').replace(/\ /g,'')
		$value_answer.val(id);
      }


	  // progress bar
	  var questions = $('.tabs>.tabs__item.question');
	  var curr_quest_index = $('.tabs__item--active').index('.tabs>.tabs__item.question');
	  var progr_percent = 100*(curr_quest_index+0.95)/questions.length;
	  //alert(progr_percent);
	  var progr = $('ol.progress_b>li');
	  progr.each(function(i){
		var item = $(this);
		item.removeClass();
		if(i<curr_quest_index){
			item.addClass('done');
		}
		else if(i==curr_quest_index){
			item.addClass('active');
		}
	  });
	  $(".meter > span").css("width",progr_percent+"%");
	  $(".meter-description>span").text(curr_quest_index+1);
	  if(curr_quest_index+1 == questions.length){
		$(".meter > span").parent().removeClass("yellow nostripes");
		$(".meter-description").hide();
	  }
	  else{
		$(".meter-description").show();
	  }
	  //alert(curr_quest_index);

      e.preventDefault();
    });
  });

  // Slider
  //var $handle;
  function updateHandle(el, val) {
	var unit = "";
	var parent_id = $(el).parents(".question").attr("id");
	switch (parent_id) {
		case "question11":
			unit = "м2";
			break;
		case "question14":
			unit = "грн";
			break;
	}
	$(el).find("span, .rangeslider__handle__value").text(" " + val + " " + unit + " ");
  }

  var rangeslider_options = {
  // Feature detection the default is `true`.
    // Set this to `false` if you want to use
    // the polyfill also in Browsers which support
    // the native <input type="range"> element.
    polyfill: false,

    // Default CSS classes
    rangeClass: 'rangeslider',
    disabledClass: 'rangeslider--disabled',
    horizontalClass: 'rangeslider--horizontal',
    fillClass: 'rangeslider__fill',
    handleClass: 'rangeslider__handle',

    // Callback function
    onInit: function() {

	  var handleValue = '<div class="rangeslider__handle__value"></div><span></span>';
      $(this.$handle).append(handleValue);

      updateHandle(this.$handle[0], this.value);
    },

    // Callback function
    onSlide: function(position, value) {

      updateHandle(this.$handle[0], this.value);
    },

    // Callback function
    onSlideEnd: function(position, value) {
		var output = $(this.$element).siblings('output');
		$(output).val(value);
	}
  };

  $('input[type="range"]').rangeslider(rangeslider_options);

setPhoneMask();
// set Phone Number mask in Form
function setPhoneMask(){
	$.jMaskGlobals = {
	  translation: {
		  'Z': {pattern: /[0-9]/}
		}
	};

	var options = {
		placeholder: "+38(0__) ___-__-__",
		onChange: function(val, e, el, opt){
			var inp = el[0];
			//checkInputValidity(inp);
			//console.log('cep changed! ', cep);
		},
	};

	$('.form__input[name="phone"]').mask("+38(0ZZ) ZZZ-ZZ-ZZ", options);
}


})(jQuery); // End of use strict

$('#url').click(function(){
  var _Seconds = $('.seconds').text(),int;
    int = setInterval(function() { // запускаем интервал
      if (_Seconds > 0) {
        _Seconds--; // вычитаем 1
      $('.seconds').text(_Seconds); // выводим получившееся значение в блок
      } else {
        clearInterval(int); // очищаем интервал, чтобы он не продолжал работу при _Seconds = 0
      }
    }, 1000);
});

$(document).on('keydown, keyup', function(e) {
  if(e.keyCode == 13) {
    e.preventDefault();
    return false;
}});

var timetomain = $('#timetomain').text();

function success (responseData, textStatus, jqXHR){
//  setTimeout(function () {
    window.location.href = location.protocol+'//'+location.host+location.pathname+"thankyou/";
  //return;
  // setInterval(function(){
    // if ($('#timetomain').text()>0) {
    // $('#timetomain').text($('#timetomain').text()-1);
    // }
    // else {window.location = "https://termoplaza.net"}
  // },1000);
//}, 5000);
}

function error (jqXHR, textStatus, errorThrown){
  console.log(textStatus, errorThrown);
  $('#ty2').show();
  $('#ty3').hide();
  $('#success, .success-wrapper').delay(4000).fadeOut(500);
  $("#url").prop('disabled', false);
  $('form').delay(4000).animate({"opacity":"1"},500);
}

$(function() {
$('form').submit(function(e) {
e.preventDefault();
var $form = $(this);
var msg   = $form.serialize();

$.ajax({
  type: 'POST',
  url: 'send.php',
  data: msg,
  beforeSend: function() {
	  // dataLayer.push({'event': 'form_test_end'});
      $("#url").prop('disabled', true);
      $('#ty2').hide();
      $('#ty3').show();
	  $('#success, .success-wrapper').fadeIn(500);
      $('form').animate({"opacity":"0"},800);
      $('#success').animate({"margin-top":"50px"},600);
	  if(typeof ga != 'undefined') {
  	    ga('send', 'event', 'Za9vka', 'opros');
      }
    },
  success: success,
  error: error,
});
return false;
})
});