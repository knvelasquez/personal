$(function() {
	
	$('#images').sortable({
		
		start: function(event, ui) {
			ui.item.addClass('active');

        // puts the old positions into array before sorting
        var old_position = $(this).sortable('toArray');
		console.log('old_position : '+JSON.stringify(old_position));
		
		var index;
		for (index = 0; index < old_position.length; ++index) {
			if(index == 0)
				$('#'+old_position[index]).find('.feature').show();
			else
				$('#'+old_position[index]).find('.feature').hide();
		}

		var index;
		for (index = 0; index < old_position.length; ++index) {
			if(index == 1)
				$('#'+old_position[index]).find('.hover').show();
			else
				$('#'+old_position[index]).find('.hover').hide();
		}
		
		$.ajax({
		  type: "POST",
		  url: "changeOrder.php",
		  data: {
			 'order': old_position
		  }
		}).done(function(o) {
			console.log('boom');
		});
			
		},
		update: function(event, ui) {
			// grabs the new positions now that we've finished sorting
			var new_position = $(this).sortable('toArray');
			console.log('new_position : '+JSON.stringify(new_position));
			
			var index;
			for (index = 0; index < new_position.length; ++index) {
				if(index == 0)
					$('#'+new_position[index]).find('.feature').show();
				else
					$('#'+new_position[index]).find('.feature').hide();
			}
			

			var index;
			for (index = 0; index < new_position.length; ++index) {
				if(index == 1)
					$('#'+new_position[index]).find('.hover').show();
				else
					$('#'+new_position[index]).find('.hover').hide();
			}
			
			$.ajax({
			  type: "POST",
			  url: "changeOrder.php",
			  data: {
				 'order': new_position
			  }
			}).done(function(o) {
				console.log('boom');
			});
		},
		
		stop: function(event, ui) {
			ui.item.removeClass('active').effect(
				'highlight', 
				{ color : '#000' }, 1000, function() {
				$.each($('#images li'), function(index, event) {
					$(this).children('span').html(parseInt(index, 10)+1);
				});
			});
		}
		
	});
	$('#images').disableSelection();
	
});







