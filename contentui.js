$(function(){
    var chatui =
    '<div id="chatui">'+
        '<div class="msg" id="msgui">'+
            '<span>发送消息</span>'+
            '<input name="msg" type="text">'+
        '</div>'+
        '<div class="todo">'+
            '<div>'+
            '<span>add todo</span>'+
            '<input name="todo" type="text">'+
            '</div>'+

            '<div>'+
            '<span>开始时间</span>'+
            '<input name="btime" type="text">'+
            '</div>'+

            '<div>'+
            '<span>完成时间</span>'+
            '<input name="ftime" type="text">'+
            '</div>'+

        '</div>'+
    '</div>';

    $("body").append($(chatui).addClass("h="));
    var setmsg = false;
    $("#chatui").mousedown(function(ev){
        var cur = $(ev.target);
        if(cur.is("#msgui")){
            cur = cur.clone();
            cur.removeAttr('id');
            cur.addClass('setmsg');
            cur.appendTo('body');
            opos = $("#msgui").offset();
            cur.css({top:opos.top+20-$(window).scrollTop(), left:opos.left-$(window).scrollLeft()});

            $("*").addClass("nos");
            setmsg = true;

        }else if(!cur.is("#chatui")){
            return 0;
        }
        var curpos = cur.offset();
        var curm = {x:ev.pageX, y:ev.pageY};
        $(document).mousemove(function(evm){
            cur.css({top:(curpos.top+evm.pageY-curm.y-$(window).scrollTop()), left:(curpos.left+evm.pageX-curm.x-$(window).scrollLeft())});
            //if(cur.hasClass('setmsg')){
        });

        if(cur.hasClass('setmsg')){
            $("body").mouseup(function(ev){
                //cur.addClass('fixpos');
                //cur.removeAttr("style");
                var foc = $(".foc");
                var msgpos = foc.find(".msgpos");
                if(msgpos.length===0){
                    $(".foc").prepend($("<div>").addClass("msgpos"));
                    msgpos = foc.find(".msgpos");
                }
                //cur.css()  //准确位置
                var fpos = {top:(ev.pageY-msgpos.offset().top), left:(ev.pageX -msgpos.offset().left )};
                msgpos.append($("<div>").addClass("fixpos").css(fpos).append($("<span>").append("msg")).append($("<span>").append(cur.find("input").val())));
                $(".foc").removeClass("foc");
                cur.remove();
                setmsg = false;
                $("body").unbind('mouseup');
                $(document).unbind('mousemove');
                $(".nos").removeClass('nos');
            });
        }else{
            cur.mouseup(function(){
                $(document).unbind('mousemove');
            });
        }
    });

    $("*").mouseenter(function(){
        if(setmsg){
            $(".foc").removeClass("foc");
            $(this).addClass("foc");
        }
    });

    $("*").mouseleave(function(){
        if(setmsg){
            $(this).removeClass("foc");
        }
    });

}());
