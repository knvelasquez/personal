maximumfilesize = 15;

function saveImages_1() {
	$.ajax({
	  type: "POST",
	  data: {'files':getCookie('files')},
	  url: "submit.php"
	}).done(function(o) {
		console.log('boom');
		$('#processed-files').attr('value',o);

		temp_pos = getCookie('position');
		var arr_pos = temp_pos;

		for(i = 0; i < arr_pos.length; i++)
		{
			console.log('pos '+arr_pos[i]);
			arr_pos[i] = arr_pos[i].substr(5);
		}


		arr = o.split('|');
		for(i = 0; i < arr.length; i++)
		{
			console.log('check');
			arr_1 = arr[i].split(',');
			temp = arr_1[3];
			temp = temp.split('=');
			temp = temp[1];

			temp1 = getCookie('files');
			var arr_2 = temp1;
			arr_2[i] = temp;

			setCookie('files',JSON.stringify(arr_2));

			if(arr_pos[i])
				j = arr_pos[i];
			else
				j = i+1;

			console.log();

			$('#image'+j).find('#image'+j).attr('src',temp);
			$('#main-image'+j).attr('src',temp);
		}
	});
}


function saveImages() {
	var b = getCookie('files');
	if(b instanceof Array)
	{
		$('#processed-files').attr('value',b.join('|'));
	}
	else
	{
		b = b.replace(/"/g, '');
		b = b.replace(/]/g, '');
		b = b.substring(1);
		b = b.split(',');
		console.log(b);
		$('#processed-files').attr('value',b.join('|'));
	}
}

$(".remove").bind("click",function(e){

	var img = $(this).parent().parent().find('.img').attr('src');
	var elem = $(this).parent().parent().parent().parent();
	console.log(img);

	$.ajax({
	  type: "POST",
	  url: "remove.php",
	  data: {'path':img},
	  beforeSend: function()
	  {
		$(this).parent().parent().find('.loader').show();

	  },
	  success: function()
	  {
		$('#alert').hide();
		noFiles--;

		bu = getCookie('files');
		if(!(bu instanceof Array))
		{
			bu = bu.replace(/"/g, '');
			bu = bu.replace(/]/g, '');
			bu = bu.substring(1);
			bu = bu.split(',');
		}

		var arr = bu;
		for (var i = 0; i < arr.length; i++)
		{
			if(arr[i] == img)
			{
				arr.splice(i,1);
				break;
			}
		}

		setCookie('files',arr);
		elem.fadeOut(500,function(){
		elem.remove();
		console.log('start');
		i = 0;
		$('ul').children().each(function(){
			if($(this).attr('id') != undefined)
			{
				if(i == 0)
				{
						$(this).find('.feature').show();
						$(this).find('.feature').css({'background':featured_color});
						$(this).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
				}
				else
				{
						$(this).find('.feature').hide();
						$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
				console.log($(this).attr('id'));
				i++;
			}
		});

		i = 0;
		$('ul').children().each(function(){
			if($(this).attr('id') != undefined)
			{
				if(i == 0)
				{
					$(this).find('.hover').hide();
				}
				else
				{
					$(this).find('.hover').hide();
					$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
				console.log($(this).attr('id'));
				i++;
			}
		});

		console.log('end');

		});
		$(this).parent().parent().find('.loader').hide();


		saveImages();

	  },
	  error: function()
	  {
		$(this).parent().parent().find('.loader').hide();

	  }
	});
});

$("#save-images").bind("click",function(e){
	e.preventDefault();
	$.ajax({
	  type: "POST",
	  data: {'files':getCookie('files')},
	  url: "submit.php"
	})
	.done(function(o) {
		console.log('boom');
		$('#processed-files').attr('value',o);

		temp_pos = getCookie('position');
		var arr_pos = temp_pos;

		for(i = 0; i < arr_pos.length; i++)
		{
			arr_pos[i] = arr_pos[i].substr(5);
		}


		arr = o.split('|');
		for(i = 0; i < arr.length; i++)
		{
			console.log('check');
			arr_1 = arr[i].split(',');
			temp = arr_1[3];
			temp = temp.split('=');
			temp = temp[1];

			temp1 = getCookie('files');
			var arr_2 = temp1;
			arr_2[i] = temp;

			setCookie('files',arr_2);

			console.log(arr_pos[i]);

			$('#image'+arr_pos[i]).find('#image'+arr_pos[i]).attr('src',temp);
			$('#main-image'+arr_pos[i]).attr('src',temp);
		}
	});
});

value=0;

rotate = false;
function base64encode(binary) {
	return btoa(unescape(encodeURIComponent(binary)));
}
$(".rotate").bind('click',function(e){	
	if(rotate == false)
	{
	b  = $(this);	
	file_orig = $(this).parent().parent().parent().find('.img').attr('src');
	$.ajax({
		type: "POST",
		url: "rotate.php",
		data: {
		 'file' : $(this).parent().parent().parent().find('.img').attr('src').replace("uploads/","")
		},
		beforeSend: function()
		{
			b.parent().parent().parent().find('.img').removeAttr("src");
			b.parent().parent().parent().parent().find('.loader').show();
			rotate = true;
		},
		success: function(o)
		{
			if(o !== 'sos')
			{
				bu = getCookie('files');
				if(!(bu instanceof Array))
				{
					console.log('wabbaaaaaaaaaa');
					bu = bu.replace(/"/g, '');
					bu = bu.replace(/]/g, '');
					bu = bu.substring(1);
					bu = bu.split(',');
				}

				var arr = bu;
				var newarr = [];

				for (var i = 0; i < arr.length; i++) {
					if(arr[i] == file_orig)
					{
						arr[i] = o;
						console.log("aaya tha");
					}
					else
					{
						console.log(arr[i]+" !== "+file_orig);
					}
				}				
				setCookie('files',arr);
				//console.log(JSON.stringify(arr));
				//b.parent().parent().parent().find('.img').removeAttr("src");				
				setTimeout(function(){ 
					$.ajax({
						url: "uploads/"+file_orig.replace("uploads/",""),
						type: 'GET',
						success: function(data, status) {													
							b.parent().parent().parent().find('.img').attr('src', "uploads/"+file_orig.replace("uploads/",""));														
							b.parent().parent().parent().parent().find('.modal-img').attr('src',o);
							b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
							$(this).parent().parent().parent().parent().find('.modal-img').cropper('replace',o);
							saveImages();
							b.parent().parent().parent().parent().find('.loader').hide();
							rotate = false;							
						} 
					});					
				}, 3000);																												
			}						
		},
		error: function()
		{
			b.parent().parent().parent().parent().find('.loader').hide();
			rotate = false;
		}
	});
	}
});

  var $image = $('.modal-img');

  $('.modal').bind('shown.bs.modal', function () {
	$(this).find('.modal-img').cropper('destroy');
	$(this).find('.modal-img').cropper({
	  autoCropArea: 0.5,
	  background:false,
	  ready: function () {
	  }
	});
  });

	$('.btn-save').bind('click',function(){
		b = $(this);
		canva = $(this).parent().parent().parent().parent().parent().find('.modal-img').cropper('getCroppedCanvas');
		or = $(this).parent().parent().parent().parent().parent().find('.modal-img').attr('src');
		var url = canva.toDataURL();
		$.ajax({
		  type: "POST",
		  url: "crop.php",
		  data: {
			 imgBase64: url,
			 origenal: or
		  },
			beforeSend: function()
			{
				b.parent().parent().parent().parent().parent().find('.loader').show();

				$(".remove").unbind("click");
				$(".rotate").unbind("click");

				$(".modal").unbind("shown.bs.modal");

				$('.crop').each(function(i){
					$(this).css({'pointer-events':'none'});
				});
			},
		   success: function(o)
			{
				bu = getCookie('files');
				if(!(bu instanceof Array))
				{
					bu = bu.replace(/"/g, '');
					bu = bu.replace(/]/g, '');
					bu = bu.substring(1);
					bu = bu.split(',');
				}

				var arr = bu;
				var newarr = [];

				for (var i = 0; i < arr.length; i++) {
					if(arr[i] == or)
					{
						arr[i] = o;
					}
				}
				setCookie('files',arr);
				console.log(JSON.stringify(arr));
				console.log(o);
				b.parent().parent().parent().parent().parent().find('.img').attr('src',o);
				b.parent().parent().find('.modal-img').attr('src',o);
				b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
				console.log(b.parent().parent().parent().parent().parent().find('.img'));
				b.parent().parent().parent().parent().parent().find('.loader').hide();
				saveImages();

				$('.modal').bind('shown.bs.modal', function () {
					$(this).find('.modal-img').cropper('destroy');
					$(this).find('.modal-img').cropper({
					  autoCropArea: 0.5,
					  background:false,
					  ready: function () {
					  }
					});
				});

				$(".remove").bind("click",function(e){

					var img = $(this).parent().parent().find('.img').attr('src');
					var elem = $(this).parent().parent().parent().parent();
					console.log(img);

					$.ajax({
					  type: "POST",
					  url: "remove.php",
					  data: {'path':img},
					  beforeSend: function()
					  {
						$(this).parent().parent().find('.loader').show();

					  },
					  success: function()
					  {
						$('#alert').hide();
						noFiles--;

						bu = getCookie('files');
						if(!(bu instanceof Array))
						{
							bu = bu.replace(/"/g, '');
							bu = bu.replace(/]/g, '');
							bu = bu.substring(1);
							bu = bu.split(',');
						}

						var arr = bu;
						for (var i = 0; i < arr.length; i++) {
							if(arr[i] == img)
							{
								arr.splice(i,1);
								break;
							}
						}

						setCookie('files',arr);
						elem.fadeOut(500,function(){
							elem.remove();
							console.log('start');
							i = 0;
							$('ul').children().each(function(){
								if($(this).attr('id') != undefined)
								{
									if(i == 0)
									{
											$(this).find('.feature').show();
											$(this).find('.feature').css({'background':featured_color});
											$(this).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
									}
									else
									{
											$(this).find('.feature').hide();
											$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
									}
									console.log($(this).attr('id'));
									i++;
								}
							});

							i = 0;
							$('ul').children().each(function(){
								if($(this).attr('id') != undefined)
								{
									if(i == 0)
									{
										$(this).find('.hover').hide();
									}
									else
									{
										$(this).find('.hover').hide();
										$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
									}
									console.log($(this).attr('id'));
									i++;
								}
							});

							console.log('end');

						});
						$(this).parent().parent().find('.loader').hide();
						saveImages();

					  },
					  error: function()
					  {
						$(this).parent().parent().find('.loader').hide();

					  }
					});
				});

				$(".rotate").bind('click',function(e){
					if(rotate == false)
					{
					b  = $(this);
					file_orig = $(this).parent().parent().parent().find('.img').attr('src');
					$.ajax({
						type: "POST",
						url: "rotate.php",
						data: {
						 'file' : $(this).parent().parent().parent().find('.img').attr('src')
						},
						beforeSend: function()
						{
							b.parent().parent().parent().parent().find('.loader').show();
							rotate = true;
						},
						success: function(o)
						{
							if(o !== 'sos')
							{
								bu = getCookie('files');
								if(!(bu instanceof Array))
								{
									bu = bu.replace(/"/g, '');
									bu = bu.replace(/]/g, '');
									bu = bu.substring(1);
									bu = bu.split(',');
								}

								var arr = bu;
								var newarr = [];

								for (var i = 0; i < arr.length; i++) {
									if(arr[i] == file_orig)
									{
										arr[i] = o;
										console.log("aaya tha");
									}
									else
									{
										console.log(arr[i]+" !== "+file_orig);
									}
								}
								setCookie('files',arr);
								console.log(JSON.stringify(arr));
								b.parent().parent().parent().find('.img').attr('src',o);
								b.parent().parent().parent().parent().find('.modal-img').attr('src',o);
								b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
								$(this).parent().parent().parent().parent().find('.modal-img').cropper('replace',o);
								saveImages();
								rotate = false;
							}
								b.parent().parent().parent().parent().find('.loader').hide();
						},
						error: function()
						{
							b.parent().parent().parent().parent().find('.loader').hide();
							rotate = false;
						}
					});
					}
				});

				$('.crop').each(function(i){
					$(this).css({'pointer-events':'auto'});
				});

			},
			error: function()
			{
				$('.crop').each(function(i){
					$(this).css({'pointer-events':'auto'});
				});

				b.parent().parent().parent().parent().parent().find('.loader').hide();
			}
		});
	});

Dropzone.options.myAwesomeDropzone = {
	url: "upload-file.php",
	maxFilesize: maximumfilesize ,
	maxFiles: allowed ,
	addRemoveLinks: true ,
	acceptedFiles: '.jpg,.jpeg,.png',
	dictRemoveFile: 'Cancel Upload',
	dictRemoveFileConfirmation: null,
	dictCancelUploadConfirmation:null,
	parallelUploads:1,
	sending: function(file){
		if(noFiles >= allowed)
		{
			$('#alert').show();
			this.removeFile(file);
			console.log('Oops');
		}
		else
		{
			console.log('booom');
		}
	  },
	success: function(file, response) {
		noFiles++;
		console.log('No of files : '+noFiles);
		res = response;

		bu = getCookie('files');
		if(!(bu instanceof Array))
		{
			bu = bu.replace(/"/g, '');
			bu = bu.replace(/]/g, '');
			bu = bu.substring(1);
			bu = bu.split(',');
		}

		var arr = bu;
		arr.push(res);
		no = arr.length;
		setCookie('files',arr);

				if(no == 1)
				{
					feature = 'block';
					hover = 'none';
					color = featured_color;
					border = '';
				}
				else
				{
					hover = 'none';
					feature = 'none';
					color = regular;
					border = 'border-top-left-radius:8px;';
				}

		$('#images').append('<li class="col-md-4 col-sm-6 col-xs-12" style="max-width:250px;text-align: center;padding:5px;background:rgba(0,0,0,0.0);" id="image'+no+'"><div class="kuchv" style="position:relative;background-color:rgba(0,0,0,0.0);height:100%;width:100%;border-radius:8px;"><div class="loader" style="display:none;z-index:10000;vertical-align:middle;position:absolute;top:60px;right:30px;left:30px;"><img src="loader.gif" style=""/></div><div class="modal fade " id="modal'+no+'" aria-labelledby="modalLabel" role="dialog" tabindex="-1"><div class="modal-dialog modal-my" role="document"><div class="modal-content"><div class="modal-body"><div><img  id="image'+no+'" class="modal-img" src="'+res+'" alt="Picture"/></div></div><div class="modal-footer text-center"><button type="button" class="btn btn-default btn-save" id="save'+no+'" data-dismiss="modal">Crop</button><button type="button" style="margin-left:50px;" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div></div><div class="modal fade " id="big-modal'+no+'" aria-labelledby="modalLabel" role="dialog" tabindex="-1"><div class="modal-dialog modal-my" role="document"><div class="modal-content"><div class="modal-body"><div><img id="big-img'+no+'" class="big-img" style="max-width:100%;max-height:65vh;" src="'+res+'" alt="Picture"/></div></div><div class="modal-footer text-center"><button type="button" style="margin-left:50px;" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div><div style="width:100%;height:20px;background:rgba(0,0,0,0.0);"><p class="feature handle" style="position:absolute;left:0px;top:0px;background-color:'+color+';color:white;height:20px;font-size:12px;padding: 2px 15px 2px 15px; display:'+feature+';border-top-left-radius:8px;border-top-right-radius:8px;">Featured Image</p><p class="hover handle" style="position:absolute;left:0px;top:0px;background-color:'+color+';color:white;height:20px;font-size:12px;padding: 2px 15px 2px 15px;display:'+hover+';border-top-left-radius:8px;border-top-right-radius:8px;">Hover Image</p></div><div class="br" style="height:210px;width:100%;background:'+color+';'+border+'border-top-right-radius:8px; border-bottom-right-radius:8px; border-bottom-left-radius:8px;padding:8px;"><img src="'+res+'" id="main-image'+no+'" class="img handle" style="max-height:164px;max-width:100%;"   data-target="#big-modal'+no+'" data-toggle="modal"/><div class="zone handle"><div class="btn-group" style="position:absolute;top:200px;left:10px;"><a class="btn rotate" style="background-color: rgba(0,0,0,0.8);border-radius:4px;padding:0px ;"><i class="fa fa-rotate-right" style="color:white;padding:2px ;"></i></a><a class="btn crop" style="background-color: rgba(0,0,0,0.8);margin-left:10px;border-radius:4px;padding:0px ;"  data-target="#modal'+no+'" data-toggle="modal"><i class="fa fa-crop" style="color:white;padding:2px ;"></i></a></div><a class="btn remove" style="position:absolute;right:5px;top:200px;background-color: rgba(150,0,0,0.8);padding:0px ;"><i class="fa fa-close" style="color:white;padding:2px ;"></i></a></div></div></div></li>');



		var $image = $('.modal-img');

		$(".modal").unbind("shown.bs.modal");
		$('.modal').bind('shown.bs.modal', function () {
		$(this).find('.modal-img').cropper('destroy');
		$(this).find('.modal-img').cropper({
		  autoCropArea: 0.5,
		  background:false,
		  ready: function () {
		  }
		});
		});


		$(".remove").unbind("click");
		$(".rotate").unbind("click");
		$(".btn-save").unbind("click");

		$(".remove").bind("click",function(e){

			var img = $(this).parent().parent().find('.img').attr('src');
			var elem = $(this).parent().parent().parent().parent();
			console.log(img);

			$.ajax({
			  type: "POST",
			  url: "remove.php",
			  data: {'path':img},
			  beforeSend: function()
			  {
				$(this).parent().parent().find('.loader').show();

			  },
			  success: function()
			  {
				$('#alert').hide();
				noFiles--;

				bu = getCookie('files');
				if(!(bu instanceof Array))
				{
					bu = bu.replace(/"/g, '');
					bu = bu.replace(/]/g, '');
					bu = bu.substring(1);
					bu = bu.split(',');
				}

				var arr = bu;
				for (var i = 0; i < arr.length; i++) {
					if(arr[i] == img)
					{
						arr.splice(i,1);
						break;
					}
				}

				setCookie('files',arr);
				elem.fadeOut(500,function(){
					elem.remove();
					console.log('start');
					i = 0;
					$('ul').children().each(function(){
						if($(this).attr('id') != undefined)
						{
							if(i == 0)
							{
									$(this).find('.feature').show();
									$(this).find('.feature').css({'background':featured_color});
									$(this).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
							}
							else
							{
									$(this).find('.feature').hide();
									$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
							}
							console.log($(this).attr('id'));
							i++;
						}
					});

					i = 0;
					$('ul').children().each(function(){
						if($(this).attr('id') != undefined)
						{
							if(i == 0)
							{
								$(this).find('.hover').hide();
							}
							else
							{
								$(this).find('.hover').hide();
								$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
							}
							console.log($(this).attr('id'));
							i++;
						}
					});

					console.log('end');
				});
				$(this).parent().parent().find('.loader').hide();
				saveImages();

			  },
			  error: function()
			  {
				$(this).parent().parent().find('.loader').hide();

			  }
			});
		});

		$(".rotate").bind('click',function(e){
			if(rotate == false)
			{
			b  = $(this);
			file_orig = $(this).parent().parent().parent().find('.img').attr('src');
			$.ajax({
				type: "POST",
				url: "rotate.php",
				data: {
				 'file' : $(this).parent().parent().parent().find('.img').attr('src')
				},
				beforeSend: function()
				{
					b.parent().parent().parent().parent().find('.loader').show();
					rotate = true;
				},
				success: function(o)
				{
					if(o !== 'sos')
					{
						bu = getCookie('files');
						if(!(bu instanceof Array))
						{
							bu = bu.replace(/"/g, '');
							bu = bu.replace(/]/g, '');
							bu = bu.substring(1);
							bu = bu.split(',');
						}

						var arr = bu;
						var newarr = [];

						for (var i = 0; i < arr.length; i++) {
							if(arr[i] == file_orig)
							{
								arr[i] = o;
								console.log("aaya tha");
							}
							else
							{
								console.log(arr[i]+" !== "+file_orig);
							}
						}
						setCookie('files',arr);
						console.log(JSON.stringify(arr));
						b.parent().parent().parent().find('.img').attr('src',o);
						b.parent().parent().parent().parent().find('.modal-img').attr('src',o);
						b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
						$(this).parent().parent().parent().parent().find('.modal-img').cropper('replace',o);
						saveImages();
						rotate = false;
					}
						b.parent().parent().parent().parent().find('.loader').hide();
				},
				error: function()
				{
					b.parent().parent().parent().parent().find('.loader').hide();
					rotate = false;
				}
			});
			}
		});


	$('.btn-save').bind('click',function(){
		b = $(this);
		canva = $(this).parent().parent().parent().parent().parent().find('.modal-img').cropper('getCroppedCanvas');
		or = $(this).parent().parent().parent().parent().parent().find('.modal-img').attr('src');
		var url = canva.toDataURL();
		$.ajax({
		  type: "POST",
		  url: "crop.php",
		  data: {
			 imgBase64: url,
			 origenal: or
		  },
			beforeSend: function()
			{
				b.parent().parent().parent().parent().parent().find('.loader').show();

				$(".remove").unbind("click");
				$(".rotate").unbind("click");

				$(".modal").unbind("shown.bs.modal");

				$('.crop').each(function(i){
					$(this).css({'pointer-events':'none'});
				});

			},
		   success: function(o)
			{
				bu = getCookie('files');
				if(!(bu instanceof Array))
				{
					bu = bu.replace(/"/g, '');
					bu = bu.replace(/]/g, '');
					bu = bu.substring(1);
					bu = bu.split(',');
				}

				var arr = bu;
				var newarr = [];

				for (var i = 0; i < arr.length; i++) {
					if(arr[i] == or)
					{
						arr[i] = o;
					}
				}
				setCookie('files',arr);
				console.log(JSON.stringify(arr));
				console.log(o);
				b.parent().parent().parent().parent().parent().find('.img').attr('src',o);
				b.parent().parent().find('.modal-img').attr('src',o);
				b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
				console.log(b.parent().parent().parent().parent().parent().find('.img'));
				b.parent().parent().parent().parent().parent().find('.loader').hide();
				saveImages();

				$('.modal').bind('shown.bs.modal', function () {
					$(this).find('.modal-img').cropper('destroy');
					$(this).find('.modal-img').cropper({
					  autoCropArea: 0.5,
					  background:false,
					  ready: function () {
					  }
					});
				});

				$(".remove").bind("click",function(e){

					var img = $(this).parent().parent().find('.img').attr('src');
					var elem = $(this).parent().parent().parent().parent();
					console.log(img);

					$.ajax({
					  type: "POST",
					  url: "remove.php",
					  data: {'path':img},
					  beforeSend: function()
					  {
						$(this).parent().parent().find('.loader').show();

					  },
					  success: function()
					  {
						$('#alert').hide();
						noFiles--;

						bu = getCookie('files');
						if(!(bu instanceof Array))
						{
							bu = bu.replace(/"/g, '');
							bu = bu.replace(/]/g, '');
							bu = bu.substring(1);
							bu = bu.split(',');
						}

						var arr = bu;
						for (var i = 0; i < arr.length; i++) {
							if(arr[i] == img)
							{
								arr.splice(i,1);
								break;
							}
						}

						setCookie('files',arr);
						elem.fadeOut(500,function(){
							elem.remove();
							console.log('start');
							i = 0;
							$('ul').children().each(function(){
								if($(this).attr('id') != undefined)
								{
									if(i == 0)
									{
											$(this).find('.feature').show();
											$(this).find('.feature').css({'background':featured_color});
											$(this).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
									}
									else
									{
											$(this).find('.feature').hide();
											$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
									}
									console.log($(this).attr('id'));
									i++;
								}
							});

							i = 0;
							$('ul').children().each(function(){
								if($(this).attr('id') != undefined)
								{
									if(i == 0)
									{
										$(this).find('.hover').hide();
									}
									else
									{
										$(this).find('.hover').hide();
										$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
									}
									console.log($(this).attr('id'));
									i++;
								}
							});

							console.log('end');
						});
						$(this).parent().parent().find('.loader').hide();
						saveImages();

					  },
					  error: function()
					  {
						$(this).parent().parent().find('.loader').hide();

					  }
					});
				});

				$(".rotate").bind('click',function(e){
					if(rotate == false)
					{
					b  = $(this);
					file_orig = $(this).parent().parent().parent().find('.img').attr('src');
					$.ajax({
						type: "POST",
						url: "rotate.php",
						data: {
						 'file' : $(this).parent().parent().parent().find('.img').attr('src')
						},
						beforeSend: function()
						{
							b.parent().parent().parent().parent().find('.loader').show();
							rotate = true;
						},
						success: function(o)
						{
							if(o !== 'sos')
							{
								bu = getCookie('files');
								if(!(bu instanceof Array))
								{
									bu = bu.replace(/"/g, '');
									bu = bu.replace(/]/g, '');
									bu = bu.substring(1);
									bu = bu.split(',');
								}

								var arr = bu;
								var newarr = [];

								for (var i = 0; i < arr.length; i++) {
									if(arr[i] == file_orig)
									{
										arr[i] = o;
										console.log("aaya tha");
									}
									else
									{
										console.log(arr[i]+" !== "+file_orig);
									}
								}
								setCookie('files',arr);
								console.log(JSON.stringify(arr));
								b.parent().parent().parent().find('.img').attr('src',o);
								b.parent().parent().parent().parent().find('.modal-img').attr('src',o);
								b.parent().parent().parent().parent().parent().find('.big-img').attr('src',o);
								$(this).parent().parent().parent().parent().find('.modal-img').cropper('replace',o);
								saveImages();
								rotate = false;
							}
								b.parent().parent().parent().parent().find('.loader').hide();
						},
						error: function()
						{
							b.parent().parent().parent().parent().find('.loader').hide();
							rotate = false;
						}
					});
					}
				});


				$('.crop').each(function(i){
					$(this).css({'pointer-events':'auto'});
				});

			},
			error: function()
			{
				b.parent().parent().parent().parent().parent().parent().find('.loader').hide();

				$('.crop').each(function(i){
					$(this).css({'pointer-events':'auto'});
				});

			}
		});
	});



		saveImages();

		this.removeFile(file);
	  },
	maxfilesexceeded: function(file) {
			$('#alert').show();
			this.removeFile(file);
			console.log('Oops');
	  }
	};

/*
*/

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
$(function() {

	$('#images').sortable({

		handle:'.handle',
		start: function(event, ui) {
			ui.item.addClass('active');
			console.log('olalalallla');
        // puts the old positions into array before sorting
        var old_position = $(this).sortable('toArray');
		console.log('old_position : '+JSON.stringify(old_position));

		var index;
		for (index = 0; index < old_position.length; ++index) {
				if(index == 0)
				{
					$('#'+old_position[index]).find('.feature').show();
					$('#'+old_position[index]).find('.feature').css({'background':featured_color});
					$('#'+old_position[index]).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
				}
				else
				{
					$('#'+old_position[index]).find('.feature').hide();
					$('#'+old_position[index]).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
		}

		var index;
		for (index = 0; index < old_position.length; ++index) {
				if(index == 0)
				{
					$('#'+old_position[index]).find('.hover').hide();
				}
				else
				{
					$('#'+old_position[index]).find('.hover').hide();
					$('#'+old_position[index]).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
		}

		bu = getCookie('files');
		if(!(bu instanceof Array))
		{
			bu = bu.replace(/"/g, '');
			bu = bu.replace(/]/g, '');
			bu = bu.substring(1);
			bu = bu.split(',');
		}

		var arr = bu;
		var newarr = [];

		for (var i = 0; i < old_position.length; i++) {
			v = old_position[i].substr(5);
			console.log('v = '+v+'  i = '+i+'    +     ');
			newarr.push(arr[v-1]);
		}
		setCookie('files',JSON.stringify(newarr));
		console.log(JSON.stringify(newarr));

		},
		update: function(event, ui) {
			// grabs the new positions now that we've finished sorting
			var new_position = $(this).sortable('toArray');
			console.log('new_position : '+JSON.stringify(new_position));

			setCookie('position',new_position);
			var index;
			for (index = 0; index < new_position.length; ++index) {
				if(index == 0)
				{
					$('#'+new_position[index]).find('.feature').show();
					$('#'+new_position[index]).find('.feature').css({'background':featured_color});
					$('#'+new_position[index]).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
				}
				else
				{
					$('#'+new_position[index]).find('.feature').hide();
					$('#'+new_position[index]).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
			}


			var index;
			for (index = 0; index < new_position.length; ++index) {
				if(index == 0)
				{
					$('#'+new_position[index]).find('.hover').hide();
				}
				else
				{
					$('#'+new_position[index]).find('.hover').hide();
					$('#'+new_position[index]).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
				}
			}

			bu = getCookie('files');
			if(!(bu instanceof Array))
			{
				bu = bu.replace(/"/g, '');
				bu = bu.replace(/]/g, '');
				bu = bu.substring(1);
				bu = bu.split(',');
			}

			var arr = bu;
			var newarr = [];

			for (var i = 0; i < new_position.length; i++) {
				v = new_position[i].substr(5);
				console.log('v = '+v+'  i = '+i+' value = '+JSON.stringify(arr));
				newarr.push(arr[v-1]);
			}
			setCookie('files',JSON.stringify(newarr));
			console.log(JSON.stringify(newarr));
			saveImages();
			saveOrder();

		},

		stop: function(event, ui) {
			ui.item.removeClass('active').effect(
				'highlight',
				{ color : 'rgba(255,255,255,0.0)' }, 1000, function() {
				$.each($('#images li'), function(index, event) {
					$(this).children('span').html(parseInt(index, 10)+1);
				});
			});
		}

	});
	$('#images').disableSelection();
});

}
else{
		$("ul").dragsort({ dragSelector: ".handle", dragBetween: true, dragEnd: saveOrder,dragSelectorExclude: '.rotate, .crop, .remove', placeHolderTemplate: "<li class='placeHolder'></li>" });

}

function saveOrder() {
i = 0;
var newarr = [];
$('ul').children().each(function(){
	if($(this).attr('id') != undefined)
	{
	newarr.push($(this).find('.br').find('.handle').attr('src'));
		if(i == 0)
		{
				$(this).find('.feature').show();
				$(this).find('.feature').css({'background':featured_color});
				$(this).find('.kuchv').find('.br').css({'background':featured_color,'border-top-left-radius':'0px'});
		}
		else
		{
				$(this).find('.feature').hide();
				$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
		}
		console.log($(this).attr('id'));
		i++;
	}
});
setCookie('files',JSON.stringify(newarr));
console.log('FinalFiles:'+JSON.stringify(newarr));
saveImages();

i = 0;
$('ul').children().each(function(){
	if($(this).attr('id') != undefined)
	{
		if(i == 0)
		{
			$(this).find('.hover').hide();
		}
		else
		{
			$(this).find('.hover').hide();
			$(this).find('.kuchv').find('.br').css({'background':regular,'border-top-left-radius':'8px'});
		}
		console.log($(this).attr('id'));
		i++;
	}
});

};
