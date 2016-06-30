function showImg(tabid, pid){
  var src = "http://ww2.sinaimg.cn/large/" + pid + ".jpg";
  chrome.tabs.sendRequest(tabid, {data: src, code:100000}, function(response) {
    console.log("finish");
  });
}

function showErr(tabid, msg){
  chrome.tabs.sendRequest(tabid, {data: msg, code:100001}, function(response) {
    console.log("finish");
  });
}

function uploadImg2Weibo(info, tab) {
  var srcUrl = info.srcUrl;
  var xhr = new XMLHttpRequest();
  //为了保护公司内部接口安全，隐藏了接口
  xhr.open("GET", "http://**?srcUrl="+encodeURIComponent(srcUrl));

  xhr.onload = function() {
    // var resp = xhr.response;
    try{
      var resp = JSON.parse(xhr.response);
      if(resp.code===100000){
        showImg(tab.id, resp.data);
      }else{
        showErr(tab.id, resp.msg);
      }
    }catch(e){
      console.log(xhr.response);
      showErr(tab.id, xhr.response);
    }
  };
  xhr.onerror = function() {
    showErr(tab.id, 'Network error.');
  };
  xhr.send();
}

// Create  item for each context type.
var id = chrome.contextMenus.create({
    "title": "upload image to weibo",
    "contexts": ['image'],
    "onclick": uploadImg2Weibo
}, function() {
    if (chrome.extension.lastError) {
        console.log("Got expected error: " + chrome.extension.lastError.message);
    }
});



/*// 监控Cookie的变更
chrome.cookies.onChanged.addListener(function( changeInfo ){ console.log( changeInfo ); });

*/
