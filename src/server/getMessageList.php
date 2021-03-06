<?php
	//注意：本作业完成过程中根据提示，可参考php.net（官方帮助文档）和菜鸟教程的php部分
	/*
		module：读取数据库中的用户留言信息，并以json形式返回
		author：
		date：2021-4-23
		version：v0.0
	*/

	//输出页头
	header("content-type:text/json;charset=utf-8");
	//1、连接数据库
	include("conn.php");
	//2、编写sql语句（两表连接查询出用户名和发言内容）
	$sql="select user_name ,message_content from messages left join users on messages.user_id=users.user_id;";
	//3、利用mysqli_prepare(),创建statement对象$stmt
	$stmt=mysqli_prepare($conn,$sql);
	//4、利用mysqli_stmt_execute(),执行sql语句
   	mysqli_stmt_execute($stmt);
	//5、利用mysqli_stmt_bind_result(),绑定记录集字段的访问变量
	mysqli_stmt_bind_result($stmt,$name,$content);
	//6、新建数组$arrs，利用循环结构和mysqli_stmt_fetch()方法逐行读取查询出来的记录集，并且存入数组
	$arrs=[];
	$i=0;
	//   存入时可采用二维数组，数组元素可以设置key名，key名和json的key同，取出的记录集字段的value值赋值
	//   给对应的数组元素。
	while(mysqli_stmt_fetch($stmt)){
		$arrs[$i]["user"]=$name;
		$arrs[$i]["text"]=$content;
		$i++;
	}
	//7、利用mysqli_stmt_close(),关闭statement对象$stmt（销毁）
    mysqli_stmt_close($stmt);

	//8、利用mysqli_close(),关闭数据库连接对象$conn（销毁）
	mysqli_close($conn);

	//9、利用json_encode()方法将数组转换为json，并利用echo方法输出json
	echo json_encode($arrs);
	// ,JSON_UNESCAPED_UNICODE
?>