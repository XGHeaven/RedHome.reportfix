/*
 *  global variable define
 */
require=null;
list=null;
inform=null;
listcon=null;
detailcon=null;
applycon=null;
/*
 *  End
 */

/*
 *  when document loaded running
 *  init
 */
$(function (){
    listcon=$("#listcon");
    detailcon=$("#detailcon");
    applycon=$("#applycon");
    bottoml=$("#bottoml");
    bottomr=$("#bottomr");
    content=[listcon,detailcon,applycon];
    //showApply();
    /*require=null;
    if (XMLHttpRequest){
        require=new XMLHttpRequest();
    }else{
        require=new ActiveXObject("Microsoft.XMLHTTP");
    }*/

    //if (XMLHttpRequest){
    //require=new XMLHttpRequest()
    //}else if (window.ActiveXObject){
    //    require=new ActiveXObject("Microsoft.XMLHTTP")
    //}
    /*require.onreadystatechange=function(){
        if (require.status==4)
        forms=eval("("+require.responseText+")");
    };
    require.open("GET","localhost:70/test/repair.php",false);
    require.send(null);*/
    //console.log(xml);


    listcon.click(function(e){
        var ele= e.srcElement|| e.target;
        while(!ele.id && ele.id!="listcon")  ele=ele.parentNode;
        if (ele.id!="listcon" && ele.id[1]!="l") {
            showDetail(true);
        }
    });

    $("#fixlist").click(function(){
        bottomr.css("visibility","hidden");
        bottoml.css("visibility","visible");
        showList(true);
    });

    $("#fixapply").click(function(){
        bottoml.css("visibility","hidden");
        bottomr.css("visibility","visible");
        showApply();
    });

    template.helper("getStatus",function(data){
        return getStatus(data);
    });

    showList();
});

function loadListInfo(){
    list=[
        {
            "title": "墙有洞",
            "status": "ok",//ok unok denied running
            "id":123,
            "req": {
                "requester": "杨文高",
                "time": "09-29 12:44"
            }
        }
    ];
}

function loadDetailInfo(){
    inform={
        "title": "墙有洞",
        "status": "unok",
        "id":123321,
        "req": {
            "requester": "杨文高",
            "time": "09-29 12:44",
            "content": "4个灯管坏了",
            "sorts": "公共区域//可能是数字也可能是文字",
            "type": "电工",
            "location": "下沙校区",
            "where": "第三教学校验楼六楼",
            "tel": "15151515151"
        },
        "res": {
            "receiver": "王一",
            "rec_time": "04-30 10:15",
            "dealer": "潘",
            "deal_time": "05-01 10:00"
        }
    };
}

function showList(){
    var isfresh=arguments[0]?arguments[0]:false;
    if (list && !isfresh){
        showContent(listcon);
        listcon.html(template("t_list",{list:list}));
    }else{
        loadListInfo();
        arguments.callee();
    }

}

function showDetail(id){
    loadDetailInfo(id);
    showContent(detailcon);
    detailcon.html(template("t_detail",{info:inform}));
}

function showApply(){
    showContent(applycon);
    applycon.html(template("t_apply",{}));
}

function showContent(e){
    for (var i in content){
        content[i].hide();
    }
    e.show();
}

function checkForm(f,b){
    console.log(f);
    k=f;
    //var title= f;
}

function getStatus(s){
    switch(s){
        case "ok": return "已受理";
        case "unok": return "未受理";
        case "denied": return "已驳回";
        case "running": return "已派出";
    }
}