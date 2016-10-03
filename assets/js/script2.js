$(document).ready(function(){
	$('#myMenuButton').menu({
		content: $('#myContent').html(),		
		maxHeight: 180,
		positionOpts: { offsetX: 10, offsetY: 20 },
		showSpeed: 300
	});
});