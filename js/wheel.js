'use strict'

function addEvent(obj,sEv,fn){
	if(obj.addEventListener){
		obj.addEventListener(sEv,fn,false);
	}else{
		obj.attachEvent('on'+sEv,fn);
	}
}

function addWheel(obj,fn){
	function fnDir(ev){
		var bDir = true;
		var oEvent = ev||event;
		if(oEvent.wheelDelta){
			if(oEvent.wheelDelta<0){
				bDir = true;
			}else{
				bDir = false;
			}
		}else{
			if(oEvent.wheelDelta>0){
				bDir = true;
			}else{
				bDir = false;
			}
		}
		fn&&fn(bDir);
		oEvent.preventDefault&&oEvent.preventDefault();
		return false;
	}
	if(window.navigator.userAgent.indexOf('Firefox')!=-1){
		addEventListener(obj,'DOMMouseScroll',fnDir);
	}else{
		addEvent(obj,'mousewheel',fnDir);
	}
}