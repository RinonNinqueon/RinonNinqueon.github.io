$(document).ready(
function()
{
	$('li img').on('click',function(){
	var src = $(this).attr('alt');
    var img = '<img src="' + src + '" class="img-responsive"/>';
    $('#myModal').modal('hide');
    $('#myModal').on('shown.bs.modal',
		function()
		{
			$('#myModal .modal-body').html(img);
		});
	$('#myModal').on('hidden.bs.modal',
		function()
		{
			$('#myModal .modal-body').html('');
		});
	});  
})