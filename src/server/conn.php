<?php 

$user = 'root';
$pwd = '';
$db = 'bbs';
$host = 'localhost';
$port = 3306;

$conn = mysqli_init();
$success = mysqli_real_connect(
   $conn, 
   $host, 
   $user, 
   $pwd, 
   $db,
   $port
);
if($success!=1){
	die("数据库连接失败");
}
// mysqli_set_charset($conn,"utf8");
$sql="set names utf8";
	mysqli_query($conn,$sql);
 ?>