$(document).ready(
function()
{
	$('li img').on('click',function()
	{
		var src = $(this).attr('alt');
		
		var img = '<img src="' + src + '" class="img-fluid" style="max-height: 85vh; width: auto;"/>';
		var modalEl = document.getElementById('myModal');
		if (!modalEl)
			return;
		
		var bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
		bsModal.show();
		
		$(modalEl).off('shown.bs.modal').on('shown.bs.modal', function()
		{
			var $dialog = $(this).find('.modal-dialog');
			$dialog.css({
                'max-width': '90%', 
                'width': 'auto', 
                'display': 'inline-block'
            });
			
			$dialog.parent().css({
                'display': 'flex',
                'justify-content-center': 'center',
                'align-items': 'center'
            });
			
			$('#myModal .modal-body').html(img);
		});

		$(modalEl).off('hidden.bs.modal').on('hidden.bs.modal', function()
		{
			$('#myModal .modal-body').html('');
		});
	});
})