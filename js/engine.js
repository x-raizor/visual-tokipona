$(document).ready(
	function() {
		$.get('templates/main.mst', function(template) {
		var rendered = Mustache.render(template, data);
		$('#canvas').html(rendered);
			});
	});
