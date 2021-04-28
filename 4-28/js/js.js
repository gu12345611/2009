
function  ajax(obj){
    var type = obj.type || "get" ;
    var dataType = obj.dataType || "json"
    var url = obj.url
    var data = obj.data || {}
    var success = obj.success;
    //    把data拼接成字符串
    var dataStr = "";
    for (var key in data){
        dataStr+=key+"="+data[key]+"&"
    }
    dataStr = dataStr.slice(0,-1);
    if(dataType=="json"){
        var xhr  =  new XMLHttpRequest();
        if(type=="get"){
            xhr.open("get",url+"?"+dataStr)
            xhr.send(null)
        }else if(type=="post"){
            xhr.open("post",'url')
            //XMLHttpRequest.setRequestHeader() 是设置HTTP请求头部的方法。
            // 此方法必须在  open() 方法和 send()
            // 之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(dataStr)
        }
         //存储函数（或函数名），每当 readyState 属性改变时，就会调用该函数。
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                var json = xhr.responseText;
                success(json);
            }
        }
    }else if(dataType=="jsonp"){
        var data = new Data();
        var cbname = "myJsonp"+data.getTime()+Math.random().toString().slice(2)
        window[cbname] = function (data) {
            success(data)
        }
        // 生成一个script标签
        var newScript = document.createElement("script")
        if(dataStr==""){
            newScript.src = url+"&callback="+cbname
        }  else{
            newScript.src = url+"?"+dataStr+"&callback="+cbname
        }
        document.body.appendChild(newScript)
    }
}