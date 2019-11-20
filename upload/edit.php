<!DOCTYPE HTML>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<title>My Site</title>
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<link href="css/core.css" rel="stylesheet" type="text/css" />
	<link href="css/jquery-ui-1.8.14.custom.css" rel="stylesheet" type="text/css" />
	<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
	<link href="css/dropzone.css" rel="stylesheet"/>


	<link rel="stylesheet" href="css/cropper.css"/>
	<!--[if lt IE 9]>
	<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="http://code.jquery.com/jquery-1.12.4.min.js"></script>
	<script type="text/javascript" src="js/pre.js"></script>
</head>
<body style='background: #ededed;'>

<form id="form" method="post" class="col-md-10 offset-md-1 col-sm-8 offset-sm-2 col-10 offset-1" action='index.php'>
<div id="alert" class="alert alert-danger alert-dismissable col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1" style="display:none;margin-bottom:-2px;border-width:2px 2px 2px 2px;border-color: #666666;margin-top:10px;">
	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
	Only <script>document.write(allowed);</script> files are allowed to upload at max
</div>
<div class="col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1" style="padding:0px;margin-top:10px;">
	<div id="my-awesome-dropzone" class="dropzone col-md-12" style="font-size:18px; border-color:#666666; background-color:#cccccc">
		<div class="fallback">
		   <input id="files" multiple="true" name="files" type="file"/>
		</div>
	</div>
</div>

<div class="row text-center">
	  <input type="hidden" name="all-processed-files" value="" id="processed-files"/>
</div>
<section id="wrapper" class="row" style="margin-top:20px;">

	<script>
	document.write('<ul id="images" class="row col-md-10 offset-md-1 col-sm-10 offset-sm-1 col-10 offset-1" style="padding:0;">');
	
	
	featured_color = '#000';
	hover_color = '#000';
	regular = '#ccc';
	page_back = '#ededed';
	
	image_array = ['uploads/aloso.jpg','uploads/azpi.jpg','uploads/conte.jpg'];
	if(typeof image_array != 'undefined' &&  image_array instanceof Array)
	{
		for( i = 0 ; i < image_array.length; i++)	
		{
			noFiles++;
				j = i+1;

				
				if(i == 0)
				{
					feature = 'block';
					hover = 'none';
					color = featured_color;
					border = '';
				}
				else if(i == 1)
				{
					hover = 'block';
					feature = 'none';
					color = hover_color;
					border = '';
				}
				else
				{
					hover = 'none';
					feature = 'none';
					color = regular;
					border = 'border-top-left-radius:8px;';
				}

				document.write('<li class="col-md-4 col-sm-6 col-xs-12" style="max-width:250px;text-align: center;padding:5px;background:rgba(0,0,0,0.0);" id="image'+j+'"><div class="kuchv" style="position:relative;background-color:rgba(0,0,0,0.0);height:100%;width:100%;border-radius:8px;">');

				temp = getCookie_images('files');
				var arr = JSON.parse(temp);
				if(arr == undefined)
					arr = [image_array[i]]
				else
					arr.push(image_array[i]);
				setCookie_images('files',JSON.stringify(arr));
				$('#processed-files').attr('value',arr.join('|'));
				
				document.write('<div class="loader" style="display:none;z-index:10000;vertical-align:middle;position:absolute;top:60px;right:30px;left:30px;"><img src="loader.gif" style=""/></div><div style="width:100%;height:20px;background:rgba(0,0,0,0.0);"><p class="feature handle" style="position:absolute;left:0px;top:0px;background-color:'+color+';color:white;height:20px;font-size:12px;padding: 2px 15px 2px 15px; display:'+feature+';border-top-left-radius:8px;border-top-right-radius:8px;">Featured Image</p><p class="hover handle" style="position:absolute;left:0px;top:0px;background-color:'+color+';color:white;height:20px;font-size:12px;padding: 2px 15px 2px 15px;display:'+hover+';border-top-left-radius:8px;border-top-right-radius:8px;">Hover Image</p></div><div class="br" style="height:210px;width:100%;background:'+color+';'+border+'border-top-right-radius:8px; border-bottom-right-radius:8px; border-bottom-left-radius:8px;padding:8px;"><img src="'+image_array[i]+'" id="main-image'+j+'" class="img handle" style="max-height:164px;max-width:100%;"   data-target="#big-modal'+j+'" data-toggle="modal"/><div class="zone handle"><div class="btn-group" style="position:absolute;top:200px;left:10px;"><a class="btn rotate" style="background-color: rgba(0,0,0,0.8);border-radius:4px;padding:0px ;"><i class="fa fa-rotate-right" style="color:white;padding:2px ;"></i></a><a class="btn crop" style="background-color: rgba(0,0,0,0.8);margin-left:10px;border-radius:4px;padding:0px ;"  data-target="#modal'+j+'" data-toggle="modal"><i class="fa fa-crop" style="color:white;padding:2px ;"></i></a></div><a class="btn remove" style="position:absolute;right:5px;top:200px;background-color: rgba(150,0,0,0.8);padding:0px ;"><i class="fa fa-close" style="color:white;padding:2px ;"></i></a></div></div></div></li>');
		}
	}
	document.write('</ul>');
		</script>
</section>
<br/>
	  <input type="submit" name="submit" value="submit"/>
	</form>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
	<script src="js/jquery-ui.min.js" type="text/javascript"></script>
	<script src="js/rotate.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
	<script src="js/cropper.js"></script>
	<script type="text/javascript" src="js/dropzone.js"></script>
	<script type="text/javascript" src="js/jquery.dragsort.js"></script>
	<script type="text/javascript" src="js/edit.js"></script>
	<script>
	</script>

</body>
</html>