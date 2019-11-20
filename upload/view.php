<?php
// Start the session
session_start();
if(isset($_SESSION['files_array']))
	unset($_SESSION['files_array']);
if(isset($_SESSION['correct_order']))
	unset($_SESSION['correct_order']);
?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DarkroomJS</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="jquery-ui.min.css">
  <link rel="stylesheet" href="build/darkroom.css">
  <link rel="stylesheet" href="css/page.css">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>



    <div class="col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-12">
	<?php
	
			require('conn.php');
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

	
	
	$sql = "SELECT * FROM image_details where id = ".$_GET['id'];
	$result = $conn->query($sql);

	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc())
		{
			$title = $row['name'];
			$temp = explode('|',$row['images']);
			$i = 1;
			foreach($temp as $t)
			{
				$t = explode(',',$t);
			?>
				<h2>Image No. <?php echo $i;?></h2>
				<img src="<?php echo substr($t[3], 7);?>" style="max-width:1024px;max-height:1024px"/>
				<img src="<?php echo substr($t[2], 6);?>" style="display:inline;max-width:550px;max-height:600px"/>
				<img src="<?php echo substr($t[1], 7);?>" style="display:inline;max-width:170px;max-height:250px"/>
				<img src="<?php echo substr($t[0], 6);?>" style="display:inline;max-width:60px;max-height:60px"/>
			<?php
			$i++;
			}
		}
	}
	?>
	</div>


  <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  <script src="jquery-ui.min.js"></script>
  <script src="jquery-ui-punch.js"></script>
  <script src="./vendor/fabric.js"></script>
  <script src="build/darkroom.js"></script>
</body>
</html>
