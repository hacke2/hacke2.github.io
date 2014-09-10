function startMove(obj, json, fnEnd) {
	if (obj.timer) {
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function() {
		doMove(obj, json, fnEnd);
	}, 10);

	var oDate = new Date();

	if (oDate.getTime() - obj.lastMove > 30) {
		doMove(obj, json, fnEnd);
	}
}

function getStyle(obj, attr){
	return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj, false)[attr];
}

function doMove(obj, json, speed, fnEnd) {
	var iCur = 0;
	var attr = '';
	var _speed = speed || 8;
	var bStop = true; //假设运动已经该停止了
	for (attr in json) {
		iCur = attr == 'opacity' ? parseInt(100 * parseFloat(getStyle(obj, 'opacity'))) : parseInt(getStyle(obj, attr));
		if (isNaN(iCur)) {
			iCur = 0;
		}
		var iSpeed = (json[attr] - iCur) / _speed;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		if (parseInt(json[attr]) != iCur) {
			bStop = false;
		}
		if (attr == 'opacity') {
			obj.style.filter = "alpha(opacity:" + (iCur + iSpeed) + ")";
			obj.style.opacity = (iCur + iSpeed) / 100;
		} else {
			obj.style[attr] = iCur + iSpeed + 'px';
		}
	}
	if (bStop) {
		clearInterval(obj.timer);
		obj.timer = null;

		if (fnEnd) {
			fnEnd();
		}
	}

	obj.lastMove = (new Date()).getTime();
}
