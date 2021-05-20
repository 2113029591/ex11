
count=0


function getJson(){
    $.getJSON("src/server/getMessageList.php",function(resp){
        let str=""
        $(".list").append("<ul></ul>")
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
getJson();

$(function(){
    $(".login").click(function(){
      $("#mymodal").modal("toggle");
    });
  });