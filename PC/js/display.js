'use strict'

window.onload = function(){

	//穿墙
	;(function(){
		var oList1 = document.getElementById('list1');
		var aLi1 = oList1.children;
		for(var i=0;i<aLi1.length;i++){
			(function(index){
				aLi1[i].onclick = function(){
					for(var i=0;i<aLi1.length;i++){
						window.open('demo/js/'+index+'.html','_black');
					}
				};			
			})(i);
		}
		function getDir(obj,ev){
			var x = obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
			var y = obj.offsetTop+obj.offsetHeight/2-ev.clientY;
			return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
		};
		function through(obj){
			var oSpan = obj.children[0];
			obj.onmouseover = function(ev){
				var oEvent = ev||event;
				var oFrom = oEvent.fromElement||oEvent.relatedTarget;
				if(this.contains(oFrom))return;
				var dir = getDir(this,oEvent);
				switch(dir){
					case 0:
						oSpan.style.top = 0;
						oSpan.style.left = '200px';
						break;
					case 1:
						oSpan.style.top = '200px';
						oSpan.style.left = 0;
						break;
					case 2:
						oSpan.style.top = 0;
						oSpan.style.left = '-200px';
						break;
					case 3:
						oSpan.style.top = '-200px';
						oSpan.style.left = 0;
						break;
				}
				startMove(oSpan,{left:0,top:0},{duration:300,easing:'ease-out'});
			};
			obj.onmouseout = function(ev){
				var oEvent = ev||event;
				var oTo = oEvent.toElement||oEvent.relatedTarget;
				if(this.contains(oTo))return;
				var dir = getDir(this,oEvent);
				switch(dir){
					case 0:
						startMove(oSpan,{left:200,top:0},{duration:300,easing:'ease-out'});
						break;
					case 1:
						startMove(oSpan,{left:0,top:200},{duration:300,easing:'ease-out'});
						break;
					case 2:
						startMove(oSpan,{left:-200,top:0},{duration:300,easing:'ease-out'});
						break;
					case 3:
						startMove(oSpan,{left:0,top:-200},{duration:300,easing:'ease-out'});
						break;
				}
			};
		}
		for(var i=0;i<aLi1.length;i++){
			through(aLi1[i]);
		}		
	})();

	//分步
	;(function(){
		var oStep = document.getElementById('step');
		var str = '深刻理解Web标准,掌握原生JavaScript语言,掌握html5&css3新标签样式和移动端rem布局. TEL:18611535261';
		for(var i=0;i<str.length;i++){
			var oS = document.createElement('span');
			oS.innerHTML = str.charAt(i);
			oStep.appendChild(oS);
		}
		var aS = oStep.children;
		for(var i=0;i<aS.length;i++){
			(function(index){
				setTimeout(function(){
					startMove(aS[index],{opacity:1});
				},160*i);
			})(i);
		}
	})();

	//h5c3展示
	;(function(){
		var oExample = document.getElementById('example');
		var oLeft = document.getElementById('icon-l');
		var oRight = document.getElementById('icon-r');
		var aLi = oExample.children;
		var aClass = [];
		for(var i=0;i<aLi.length;i++){
			aClass[i] = aLi[i].className;
		}
		function tab(){
			for(var i=0;i<aLi.length;i++){
				aLi[i].className = aClass[i];
			}
		}
		oLeft.onclick = function(){
			aClass.unshift(aClass.pop());
			tab();
		};
		oRight.onclick = function(){
			aClass.push(aClass.shift());
			tab();
		};
		for(var i=0;i<aLi.length-1;i++){
			(function(index){
				aLi[i].onclick = function(){
					for(var i=0;i<aLi.length;i++){
						window.open('demo/h5c3/'+index+'.html','_black');
					}
				};
			})(i);
		}
		aLi[aLi.length-1].onclick = function(){
			window.open('demo/h5c3/聚划算/index.html','_black');
		};
	})();

	// 返回顶部
	(function(){
		var oRocket = document.getElementById('rocket');
		var iSpeedX = 0;
		var iSpeedY = 0;
		var lastX = 0;
		var lastY = 0;
		var timer = null;
		var bOk = false;
		window.onscroll = function(){
			if(bOk){
				clearInterval(oRocket.timer);
			}
			bOk = true;
			var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
			if(scrollT>500){
				oRocket.className = 'rocket show';
				oRocket.onmouseover = function(){
					oRocket.style.backgroundPosition = '-149px 0';
				};				
				oRocket.onmouseout = function(){
					oRocket.style.backgroundPosition = '0 0';
				};
			}
		};

		function move(){
			timer = setInterval(function(){
				iSpeedY += 2;
				var l = oRocket.offsetLeft + iSpeedX;
				var t = oRocket.offsetTop + iSpeedY;
				if (l>=document.documentElement.clientWidth - oRocket.offsetWidth) {
					l = document.documentElement.clientWidth - oRocket.offsetWidth;
					iSpeedX *= -0.85;
					iSpeedY *= 0.85;
				};
				if (t>=document.documentElement.clientHeight - oRocket.offsetHeight) {
					t = document.documentElement.clientHeight - oRocket.offsetHeight;
					iSpeedX *= 0.85;
					iSpeedY *= -0.85;
				};
				if(l <= 0){
					l = 0;
					iSpeedX *= 0.85;
					iSpeedY *= -0.85;
				};
				if (t <= 0) {
					t = 0;
					iSpeedX *= 0.85;
					iSpeedY *= -0.85;
				};
				if(Math.abs(iSpeedX)<1)iSpeedX = 0;
				if (Math.abs(iSpeedY)<1)iSpeedY = 0;
				oRocket.style.left = l +'px';
				oRocket.style.top = t +'px';
				if(Math.round(iSpeedX)==0&&Math.round(iSpeedY)==0&&t==document.documentElement.clientHeight-oRocket.offsetHeight)clearInterval(timer);
			},16);
		}

		oRocket.onmousedown = function(ev){
			var oEvent = ev||event;
			clearInterval(timer);
			var disX = oEvent.clientX - oRocket.offsetLeft;
			var disY = oEvent.clientY - oRocket.offsetTop;
			document.onmousemove = function(ev){
				var oEvent = ev||event;
				var l = oEvent.clientX - disX;
				var t = oEvent.clientY - disY;
				if(l<0){
					l = 0;
				}else if(l>document.documentElement.clientWidth - oRocket.offsetWidth){
					l = document.documentElement.clientWidth - oRocket.offsetWidth;
				};
				if (t<0) {
					t = 0;
				} else if (t>document.documentElement.clientHeight - oRocket.offsetHeight) {
					t = document.documentElement.clientHeight - oRocket.offsetHeight;				
				};
				oRocket.style.left = l +'px';
				oRocket.style.top = t +'px';
				iSpeedX = oEvent.clientX - lastX;
				iSpeedY = oEvent.clientY - lastY;
				lastX = oEvent.clientX;
				lastY = oEvent.clientY;
			};
			document.onmouseup = function(){
				move();
				document.onmousemove = null;
				document.onmouseup = null;
				oRocket.releaseCapture&&oRocket.releaseCapture();
			};
			oRocket.setCapture&&oRocket.setCapture();
			return false;
		};

		oRocket.onclick = function(){
			oRocket.style.backgroundPosition = '-596px 0';
			var start = document.documentElement.scrollTop||document.body.scrollTop;
			var dis = 0 - start;
			var count = Math.floor(2000/16);
			var n = 0;
			clearInterval(oRocket.timer);
			oRocket.timer = setInterval(function(){
				bOk = false;
				n++;
				var a = 1-n/count;
				var cur = start+dis*(1-Math.pow(a,3));
				document.documentElement.scrollTop = document.body.scrollTop = cur;
				if(n==count){
					clearInterval(oRocket.timer);
					oRocket.className = 'rocket hide';
				}
			},16);

		};
	})();
};