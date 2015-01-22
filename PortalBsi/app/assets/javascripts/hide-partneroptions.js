$(document).ready(function() {
     $('.partnership').hide();	
	 $('#oportunidade_type').change(function() {
	 	 dropdown = $('#oportunidade_type').val();

	 	 if (dropdown == 'estágio')
	 	 {
	 	 	$('.partnership').show();
	 	 } 
	 	 else
	 	 {
	 	 	$('.partnership').hide();
	 	 }	
	 });
});