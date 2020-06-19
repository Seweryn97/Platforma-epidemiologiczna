<?php
	include_once 'server.php';
	
	$sql = "SELECT POTWIERDZONE, WYZDROWIENIA, ZGONY FROM `dane` GROUP BY ID_WOJEW";
	$result = mysqli_query($conn,$sql);
	$resultCheck = mysqli_num_rows($result);
	$i=0;
	
	if($resultCheck >0){
	while($row = mysqli_fetch_assoc($result)){
		$potwierdzone[$i] = $row['POTWIERDZONE'];
		$wyzdrowienia[$i] = $row['WYZDROWIENIA'];
		$zgony[$i] = $row['ZGONY'];
		$i++;
		}
	}
?>
	
				