var adjectiveArray = new Array(0);
var formArray = new Array(0);
var objectArray = new Array(0);

$(function() {
  loadXml();

  // Refresh when the body is clicked
  $('body').click(refresh);
});

function refresh() {
  window.location.reload();
}

function loadXml() {
  $.ajax({
    type: "GET",
    url: "words.opml",
    dataType: "xml",
    success: parseXml
  });
}

function parseXml(xml) {
  $(xml).find('body').find('outline').each(function() {
    var xmlText = $(this).attr('text');

    // Sort by type according to container parent
    if ($(this).closest('outline[text="Adjectives"]').length) {
      adjectiveArray.push(xmlText);
    } else if ($(this).closest('outline[text="Forms"]').length) {
      formArray.push(xmlText);
    } else if ($(this).closest('outline[text="Objects"]').length) {
      objectArray.push(xmlText);
    }
  });
  
  showRandomCombo();
}

function showRandomCombo() {
  var arraysToParse = [adjectiveArray, formArray, objectArray];
  
  for (var i=0; i<arraysToParse.length; i++) {
    var randomNumber = Math.floor(Math.random() * arraysToParse[i].length);
    
    $('h1 span').eq(i).html(arraysToParse[i][randomNumber]);
  }
}