function Ajax(parametObject) {
 
	var xhr, responseType, defineParam, method, url, data;
	defineParam = {
		method : "GET",
		type : "json"
	}
	url = parametObject.url;
	data = parametObject.data;
	responseType = parametObject.type || defineParam.type;
	method = parametObject.method || defineParam.method;
 
	if(navigator.userAgent.toUpperCase().indexOf('MSIE') >= 0){
	    try{
	        xhr=new ActiveXObject('microsoft.xmlhttp');
	    }catch(e){
	        xhr=new ActiveXObject('msxml2.xmlhttp');
	    }
    }else{
        xhr=new XMLHttpRequest();
   	};
   	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
 
			if(responseType == "json") {
				responseType = xhr.responseText;
			}else {
				responseType = xhr.responseXML;
			}
 
			if(xhr.status== 200 && typeof(parametObject.success) == 'function') {
				parametObject.success(responseType);
			}else if(xhr.status != 200 && typeof(parametObject.error) == 'function') {
				parametObject.error(responseType);
			}
			
		}
	}
	if(method.toUpperCase() == "GET") {
		if(data) {
			url = url + '?' + data + '&random=' +Math.random();
		}
		xhr.open('GET', url, true);
		xhr.send(null);
	}
	if(method.toUpperCase() == "POST") {
		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xhr.send(data);
	}
 
}