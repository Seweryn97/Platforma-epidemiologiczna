<?php
	include_once 'server.php';
	
	$sql = "SELECT *FROM dane;";
	$result = mysqli_query($conn,$sql);
	$resultCheck = mysqli_num_rows($result);
	$i=0;
	
	if($resultCheck >0){
	while($row = mysqli_fetch_assoc($result)){
		$potwierdzone[$i] = $row['potwierdzone'];
		$wyzdrowienia[$i] = $row['wyzdrowienia'];
		$zgony[$i] = $row['zgony'];
		$i++;
		}
	}
?>
	
				