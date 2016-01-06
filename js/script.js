var adjective_array = new Array(0);
var form_array = new Array(0);
var object_array = new Array(0);

$(function(){
	
	load_xml();
});

function load_xml()
{
	$.ajax({
	    type: "GET",
	    url: "words.opml",
	    dataType: "xml",
	    success: parseXml
	});
}

function parseXml(xml)
{
	$(xml).find('body').find('outline').each(function()
	{
		var xml_text = $(this).attr('text');

		// Sort by type according to container parent
		if ($(this).closest('outline[text="Adjectives"]').length)
		{
			adjective_array.push(xml_text);
		} else if ($(this).closest('outline[text="Forms"]').length) {
			form_array.push(xml_text);
		} else if ($(this).closest('outline[text="Objects"]').length) {
			object_array.push(xml_text);
		}
	});
	
	show_random_combo();
}

function show_random_combo()
{
	var arrays_to_parse = [adjective_array, form_array, object_array];
	
	for (var i=0; i<arrays_to_parse.length; i++)
	{
		var rand_num = Math.floor(Math.random() * arrays_to_parse[i].length);
		
		$('h1 span').eq(i).html(arrays_to_parse[i][rand_num]);
	}
}