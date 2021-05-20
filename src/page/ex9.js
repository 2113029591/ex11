const MESSAGE=[
    "对不起，您的浏览器不支持 web 存储",
    "我也要吐槽下",
    "吐槽完毕，提交",
    "添加完成"
]

var isShow=false
var count=0

var userName

$(".login").hide()
function getJson(){
    $.getJSON("src/server/getMessageList.php",function(resp){
        let str=""
        $(".list").append("<ul></ul>")
        $.each(resp,function(index,obj){
            count++
            str="<span class='title'>"+obj.user+"</span>"+"<br>"+
            "<span class='text'>"+obj.text+"</span>"
            $(".list ul").append
            ("<li class='border shadow'>"+str+"</li>")
            $(".list ul>li").hide()
            $(".list ul>li").delay(100*index).fadeIn()
        })
        btnFun(count);
    })
}

var isLogin=false
function btnFun(count){
    $(".btn").append("<button class='btn-add'></button>")
    $(".btn-add").hide()
    $(".btn-add").delay(100*(count)).fadeIn()
    // $(".btn-add").before("<button class='back'>退出登录</button>")

    $(".btn-add").text(MESSAGE[1])
    $(".btn-add").click(function(){
        if(!isLogin){
            alert("请先登录")
            // $(".container").hide()
            $(".login").show()
            return 0;
        }
        if(!isShow){
            // $(".from").css('display','block')
            $("textarea").show()
            $(".btn-add").text(MESSAGE[2])
            isShow=!isShow
        }
        else{ 
            str=$("textarea").val()
            $(".list ul").append
                ("<li class='border shadow'>"+"<span class='title'>"+userName+"</span>"+"<br>"+
                "<span class='text'>"+str+"</span>"+"</li>")
            $(".btn-add").text(MESSAGE[2])
            // $(".from").css('display','none')
            $("textarea").val("")
    
            $.post('src/server/saveMessage.php',
            {'name':userName,'text':str},function(data){
                alert(MESSAGE[3])
            })
            isShow=!isShow
        }
    })
}



getJson();

$(".sign-in").click(function(){
    var userN=$(".input-name").val()
    var userP=$(".input-pwd").val()
    $.getJSON("src/server/login.php",{userName:userN,userPwd:userP},function(data){
        console.log(data)
        if(data[0].code==1){
            isLogin=true
            $(".login").hide()
            $(".container").show()
            $(".input-name").val("")
            $(".input-pwd").val("")
            $(".from").css('display','block')
            $("textarea").show()
            $(".btn-add").text(MESSAGE[2])
            isShow=true
            userName=data[0].data
            $(".btn-add").before("<button class='back'>退出登录</button>")
            $(".back").click(function(){
                
                // console.log("backaa")
                isLogin=false
                $(".back").hide()
                // console.log("test2")
                $("textarea").hide()
                $(".btn-add").text(MESSAGE[1])
                isShow=!isShow
                alert("退出成功")
            })
            alert("登录成功")

        }
        else{
            alert("登录失败")
        }

    })
})







