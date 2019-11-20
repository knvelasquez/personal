<!Doctype html>
<html>
<head>
  <meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>List</title>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>TITLE</th>
        <th>ACTION</th>
      </tr>
    </thead>
    <tbody>
	<?php
			require('conn.php');


	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

$sql = "SELECT * FROM image_details";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
	?>
      <tr>
        <td><?php echo $row['id'];?></td>
        <td><?php echo $row['name'];?></td>
        <td><a  href="view.php?id=<?php echo $row['id'];?>"><button class="button primary">VIEW</button></a><a  href="edit.php?id=<?php echo $row['id'];?>"><button class="button primary">EDIT</button></a></td>
      </tr>
	  <?php
	}	
}
	?>
    </tbody>
  </table>
</body>
</html>