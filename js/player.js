	$(document).ready(function()
	{
		console.log("ready");
		var audio = audiojs.createAll()[0];
		console.log("created");
        $('div.gruppa-media-url').click(function(e)
		{
          e.preventDefault();
		  $('div.gruppa-media-url').removeClass('playing');
          $(this).addClass('playing');
          audio.load($(this).attr('data-src'));
          audio.play();
		  var cur = "Сейчас играет: \"" + $(this).attr("alt") + "\"";
		  $("#current-song-id").html(cur);
        });
	});