function  Ajax(param) {
   console.log(param)
//    实例化 XHR
    var xhr = new XMLHttpRequest()
//    检测 readyState 状态
    xhr.onreadystatechange = function (ev) {
          if(xhr.readyState == 4 && xhr.status == 200){
          //    将服务器返回的json字符串转为js对象
              var json_obj = JSON.parse(xhr.responseText)
          //    调用success方法
              param.success(json_obj)
          }
    }
//    拼接url
    var url_param =""
    for (var k in param.data){
        url_param += k + "=" + param.data[k] +"&"

    }
    //打开链接 open
    xhr.open(param.method,param.url+"?"+url_param)
    //    发送请求
    xhr.send()
}