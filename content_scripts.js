function createDom(){
  var node = document.createElement('div');
  var urlEl = document.createElement('input');
  var imgEl = document.createElement('img');
  var errEl = document.createElement('p');
  urlEl.className = 'distUrl';
  imgEl.className = 'distImg';
  errEl.className = 'err';
  node.id = 'imgUpload2Weibo';
  node.appendChild(errEl);
  node.appendChild(urlEl);
  node.appendChild(imgEl);
  document.body.appendChild(node);
  return node;
}

function renderData(data, type){
  var wrapper = document.getElementById('imgUpload2Weibo') || createDom();
  var distImg = document.querySelector("#imgUpload2Weibo .distImg");
  var distUrl = document.querySelector("#imgUpload2Weibo .distUrl");
  var errEl = document.querySelector("#imgUpload2Weibo .err");
  if(type=='success'){
    errEl.style.display = 'none';
    distImg.style.display = '';
    distUrl.style.display = '';
    distImg.src = data;
    distUrl.value = data;
    distUrl.select();
  }else{
    errEl.innerText = data;
    errEl.style.display = '';
    distImg.style.display = 'none';
    distUrl.style.display = 'none';
  }
}


chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.code == 100000){
      renderData(request.data, 'success');
      sendResponse({});
    }
    else{
      renderData(request.data,'err');
      sendResponse({}); // snub them.
    }
  }
);
