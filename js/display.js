'use strict'

window.onload = function(){
	// 返回顶部
	(function(){
		var oRocket = document.getElementById('rocket');
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

	//js展示
	;(function(){
		var oJs = document.getElementById('js');
		var oJsbox = document.getElementById('jsbox');
		var aUl = oJsbox.getElementsByTagName('ul');
		var oOl = oJs.getElementsByTagName('ol')[0];
		var aLi = aUl.children;
		var aS = oOl.getElementsByTagName('span');
		oJsbox.style.width = aUl.length*aUl[0].offsetWidth +'px';
		var iNow = 0;
		function next(){
			startMove(aS[iNow],{width:80},{duration:3000,easing:'linear',complete:function(){
				iNow++;
				if(iNow==aS.length)iNow = 0;
				startMove(oJsbox,{left:-iNow*aUl[0].offsetWidth},{complete:function(){
					for(var i=0;i<aS.length;i++){
						aS[i].style.width = 0;
					}
					next();
				}});
			}});
		}
		next();

	})();

	//穿墙
	;(function(){
		var oList1 = document.getElementById('list1');
		var aLi1 = oList1.children;
		var oList2 = document.getElementById('list2');
		var aLi2 = oList2.children;
		var oList3 = document.getElementById('list3');
		var aLi3 = oList3.children;
		var oList4 = document.getElementById('list4');
		var aLi4 = oList4.children;
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
				startMove(oSpan,{left:0,top:0},{duration:200});
			};
			obj.onmouseout = function(ev){
				var oEvent = ev||event;
				var oTo = oEvent.toElement||oEvent.relatedTarget;
				if(this.contains(oTo))return;
				var dir = getDir(this,oEvent);
				switch(dir){
					case 0:
						startMove(oSpan,{left:200,top:0},{duration:200});
						break;
					case 1:
						startMove(oSpan,{left:0,top:200},{duration:200});
						break;
					case 2:
						startMove(oSpan,{left:-200,top:0},{duration:200});
						break;
					case 3:
						startMove(oSpan,{left:0,top:-200},{duration:200});
						break;
				}
			};
		}
		for(var i=0;i<aLi1.length;i++){
			through(aLi1[i]);
			through(aLi2[i]);
			through(aLi3[i]);
			through(aLi4[i]);
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
	})();
};