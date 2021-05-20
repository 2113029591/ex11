<?php

$userName=$_REQUEST["userName"];
$userPwd=$_REQUEST["userPwd"];
include("conn.php");
include("functions.php");

$MESSAGE=["已经登录","登录成功","登录失败","测试"];

// $userName="test";
// $userPwd=123456;

// session_start();
$arrData=[];
$code=0;

$sql="select user_pwd from users where user_name=?";
$stmt=mysqli_prepare($conn,$sql);
mysqli_stmt_bind_param($stmt,"s",$userName);
mysqli_stmt_execute($stmt);
mysqli_stmt_bind_result($stmt,$truePwd);
if(mysqli_stmt_fetch($stmt)){
    if($truePwd==$userPwd){
        getApiresult(1,$MESSAGE[1],$userName);
    }
    else{
        getApiresult(0,$MESSAGE[2],$userName);
    }
}

mysqli_stmt_close($stmt);
mysqli_close($conn);

?>