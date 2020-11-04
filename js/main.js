$(document).ready(function(){
  	$('#modal-purchase').on('show.bs.modal', function (e) {
		var button = $(e.relatedTarget);
		var modal = $(this);        
		modal.find('.modal-title').text(button.data('title'));
		modal.find(".modal-body input[name='formname']").val(button.data('formname'));
		modal.find(".modal-body button[type='submit']").text(button.data('button-text'));
	});
	$('#modal-lead').on('show.bs.modal', function (e) {
		var button = $(e.relatedTarget);
		var modal = $(this);        
		modal.find('.modal-title').text(button.data('title'));
		modal.find(".modal-body input[name='formname']").val(button.data('formname'));
		modal.find(".modal-body button[type='submit']").text(button.data('button-text'));
	});
	$('a.thumbnail').click(function(e) {
		e.preventDefault();
		$('#image-modal .modal-body img').attr('src', $(this).find('img').attr('value'));
		$("#image-modal").modal('show');
	});
	});
	$('#image-modal .modal-body img').on('click', function() {
		$("#image-modal").modal('hide')
	});

	$('.gallery-tt').click(function(e) {
		e.preventDefault();
		$('#image-modal .modal-body img').attr('src', $(this).find('img').attr('value'));
		$("#image-modal").modal('show');
	});
setGACookieFromUrl();

function setGACookieFromUrl(){
	var UTMs = ['utm_source', 'utm_medium', 'utm_term', 'utm_campaign', 'utm_content'];
	$.each(UTMs, function(i, el){
		var utm_value = getUtmFromUrl(el);
		// Set the cookies
		if($.cookie(el) == null || $.cookie(el) == "") {
			$.cookie(el, utm_value, {expires: 1});
		}
	});
}

// Parse the URL
function getUtmFromUrl(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}