const color_api_endpoint = "http://api.creativehandles.com/getRandomColor";
const input_field = $('#input-quote');
var ajax_loading = false;

// hide loading screen when 
// document is ready
$(document).ready(function () {
  $('#cover-spin').hide();
  input_field.focus();
});

// Processes user submitted quote
function addQuote(quote) {
  toggleLoadingStatus();

  $.get(color_api_endpoint, function (data) {
    var bg_color = data.color;
    var text_color = invertHex(bg_color);
    createQuoteCard(quote, bg_color, text_color);
  },
    "json"
  ).fail(function () {
    createQuoteCard(quote, '#6d4298', '#FFFFFF');
  }).always(function () {
    document.title = quote;
    toggleLoadingStatus();
    input_field.val('');
    input_field.focus();
  });
}

// Adds a card to list
function createQuoteCard(quote, bg_color, text_color) {
  
  // To make app safe for HTMl inputs
  // We add unique id to each card
  // So then we can append safe text (html encoded)
  // to element
  var element_id = Date.now();

  var element = '<div id="'+element_id+'" class="quote-card" style="background-color:' + bg_color + '; color:' + text_color + '"></div>';

  $('#cards').append(element);
  $('#'+element_id).text('“ ' + quote + ' ”');
}

// Toggle ajax loading animation 
function toggleLoadingStatus() {

  if (!ajax_loading) {
    input_field.attr('disabled', 'disabled');
    $('#btn-submit').hide();
    $('#btn-loading').show();
    ajax_loading = true;
    return;
  }

  input_field.removeAttr('disabled');
  $('#btn-submit').show();
  $('#btn-loading').hide();
  ajax_loading = false;
}

// Shake input filed if tries 
// to submit a empty value
function shakeInputBox() {
  input_field.addClass('shake');

  setTimeout(() => {
    input_field.removeClass('shake');
  }, 1000);
}

// listen to form submit
$('#add-quote-form').submit(function (e) {
  e.preventDefault();
  var quote = input_field.val();

  if (quote === '') {
    shakeInputBox();
    return;
  }

  addQuote(quote);
});

