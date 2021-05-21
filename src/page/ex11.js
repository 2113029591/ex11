const MESSAGE=[
    "对不起，您的浏览器不支持 web 存储",
    "我也要吐槽下",
    "吐槽完毕，提交",
    "添加完成"
]
count=0
isLogin=0
userName=""


function getJson(){
    $.getJSON("src/server/getMessageList.php",function(resp){
        let str=""
        $.each(resp,function(index,obj){
            count++
            str="<span class='title'>"+obj.user+"</span>"+"<br>"+
            "<span class='text'>"+obj.text+"</span>"
            $(".list ul").append("<li class='border shadow'>"+str+"</li>")
            $(".list ul>li").hide()
            $(".list ul>li").delay(100*index).fadeIn()
        })
    })
}

function addText() {
    str=$("textarea").val()
    if(str!=""){
        $(".list ul").append
        ("<li class='border shadow'>"+"<span class='title'>"+userName+"</span>"+"<br>"+
        "<span class='text'>"+str+"</span>"+"</li>")
        $("textarea").val("")

        $.post('src/server/saveMessage.php',
        {'name':userName,'text':str},function(data){
            alert(MESSAGE[3])
        })    
    }
    
}


getJson();

// $(function(){
//     $(".login").click(function(){
//       $("#mymodal").modal("toggle");
//     });
//   });

$(".welcome").hide()
$("#input-text").hide()

$(".btn-speak").click(function (){
    if(isLogin==0){
        alert("请先登录")
        $("#myModal").modal("show")
    }
})

$(".btn-login").click(function () {
    var userN=$(".input-name").val()
    var userP=$(".input-pwd").val()
    $.getJSON("src/server/login.php",{userName:userN,userPwd:userP},function(data){
        console.log(data)
        if(data[0].code==1){
            isLogin=1
            console.log("login");
            $(".input-name").val("")
            $(".input-pwd").val("")
            userName=data[0].data
            $(".btn-speak .title").text(userName)
            $("#myModal").modal("hide")
            $(".login").hide()
            alert("登录成功")
            $(".welcome").show()
            $(".welcome a").text("欢迎你："+userName)
            $(".btn-speak .text").hide()
            $("#input-text").show()
        }
        else{
            alert("登录失败")
        }

    })
})

$("textarea").blur(function () {
    addText()
})