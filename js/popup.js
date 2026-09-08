$(document).ready(
function()
{
	$('li img').on('click',function()
	{
		var src = $(this).attr('alt');
		
		var img = '<img src="' + src + '" class="img-fluid"/>';
		var modalEl = document.getElementById('myModal');
		if (!modalEl)
			return;
		
		var bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
		bsModal.show();
		
		$(modalEl).off('shown.bs.modal').on('shown.bs.modal', function()
		{
			$(this).find('.modal-dialog').css({ width: 'auto', height: 'auto', 'max-height': '100%' });
			$('#myModal .modal-body').html(img);
		});

		$(modalEl).off('hidden.bs.modal').on('hidden.bs.modal', function()
		{
			$('#myModal .modal-body').html('');
		});
	});
})