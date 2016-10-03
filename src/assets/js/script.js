/* $(document).ready(function(){
	
	$('.pic a').lightBox({
		
		imageLoading: 'lightbox/images/loading.gif',
		imageBtnClose: 'lightbox/images/close.gif',
		imageBtnPrev: 'lightbox/images/prev.gif',
		imageBtnNext: 'lightbox/images/next.gif'

	});
	
}); */



$(document).ready(function(){
	
			$("a[rel^='prettyPhoto']").prettyPhoto({default_width: 800,
			default_height: 500
	});
});
	
$("a[rel^='prettyPhoto']").prettyPhoto({social_tools:false});