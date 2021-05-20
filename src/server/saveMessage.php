<?php
include "conn.php";
$name=isset($_POST['name'])? addslashes($_POST['name']):'';
$text=isset($_POST['text'])? addslashes($_POST['text']):'';
echo $name.$text;

$sql="select user_name from users where user_name='$name'";


$stmt=mysqli_prepare($conn,$sql);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt,$user);


if(!mysqli_stmt_fetch($stmt)){
    $sql="insert into users (`user_name`) values ('$name')";
    mysqli_stmt_close($stmt);
    $stmt=mysqli_prepare($conn,$sql);
    mysqli_stmt_execute($stmt);
}
mysqli_stmt_close($stmt);


$sql = "select `user_id` from users where user_name='$name'";
$stmt=mysqli_prepare($conn,$sql);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt,$id);


if(mysqli_stmt_fetch($stmt)){
    $sql="insert into messages (`user_id`,`message_content`) values ($id,'$text')";
    mysqli_stmt_close($stmt);
    $stmt=mysqli_prepare($conn,$sql);
    mysqli_stmt_execute($stmt);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
