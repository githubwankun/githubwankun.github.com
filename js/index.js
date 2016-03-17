'use strict'
window.onload = function(){
	;(function(){
		var oBanner = document.getElementById('banner');
		var oHd = document.getElementById('hd');
		var oUl = oBanner.getElementsByTagName('ul')[0];
		var oOl = oBanner.getElementsByTagName('ol')[0];
		var oNext = document.getElementById('next');
		var oPrev = document.getElementById('prev');
		var aLi = oUl.children;
		var aBtn = oOl.children;
		oUl.innerHTML += oUl.innerHTML;
		oUl.style.width = aLi.length*aLi[0].offsetWidth +'px';
		var iNow = 0;
		var timer = 0;
		var left = 0;
		var W = oUl.offsetWidth/2;
		//oBanner.style.height = document.documentElement.clientHeight +'px';

		oBanner.onmouseover = function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				startMove(oNext,{"opacity":1},{duration:300});
				startMove(oPrev,{"opacity":1},{duration:300});
				oOl.style.display = 'block';
			},300);
		};
		oBanner.onmouseout = function(){
			clearTimeout(timer);
			timer = setTimeout(function(){
				startMove(oNext,{"opacity":0},{duration:300});
				startMove(oPrev,{"opacity":0},{duration:300});
				oOl.style.display = 'none';
			},300);
		};

		for(var i=0;i<aBtn.length;i++){
			aLi[i].style.width = document.documentElement.clientWidth +'px';

			;(function(index){
				aBtn[i].onclick = function(){
					if((iNow%aBtn.length==aBtn.length-1||iNow%aBtn.length==-1)&&index==0){
						iNow++;
					}
					if(iNow%aBtn.length==0&&index==aBtn.length-1){
						iNow--;
					}
					iNow = Math.floor(iNow/aBtn.length)*aBtn.length+index;
					tab();
				};
			})(i);
		}
		function tab(){
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].className = '';
			}
			if(iNow>0){
				aBtn[iNow%aBtn.length].className='hover';
			}else{
				aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className = 'hover';
			}
			move(oUl,-iNow*aLi[0].offsetWidth,700);
		}
		function move(obj,iTarget,duration){
			var start = left;
			var dis = iTarget - start;
			var count = Math.floor(duration/16);
			var n = 0;
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				n++;
				var a = 1-n/count;
				left = start+dis*(1-Math.pow(a,3));
				if(left<0){
					obj.style.left = left%W +'px';
				}else{
					obj.style.left = (left%W-W)%W +'px';
				}
				if(n==count)clearInterval(obj.timer);
			},16);
		}
		oPrev.onclick = function(){
			iNow--;
			tab();
		};
		oNext.onclick = function(){
			iNow++;
			tab();
		};
	})();
	;(function(){
		var oTxt = document.getElementById('text');
		var oFace = document.getElementById('face');
		var oFaceBox = document.getElementById('face-box');
		var oIconL = document.getElementById('icon-l');
		var oIconR = document.getElementById('icon-r');
		var aLi = oTxt.children;
		oTxt.style.width = aLi.length*aLi[0].offsetWidth +'px';
		var iNow = 0;
		var x = 0;

		oFace.onmouseover = function(){
			oFace.style.transform = 'rotateY(180deg)';
		};
		oFace.onmouseout = function(){
			oFace.style.transform = '';
			oFace.style.borderRadius = '';
		};

		oTxt.onmousedown = function(ev){
			var oEvent = ev||event;
			var downX = oEvent.clientX;
			var disX = downX - x;
			oTxt.style.WebkitTransition='none';
			document.onmousemove = function(ev){
				var oEvent = ev||event;
				x = oEvent.clientX - disX;
				oTxt.style.WebkitTransform='translate3d('+x+'px,0,0)';
			};
			document.onmouseup = function(ev){
				var oEvent = ev||event;
				document.onmousemove = null;
				document.onmouseup = null;
				var upX = oEvent.clientX;
				if(Math.abs(upX-downX)>88){
					if(upX>downX){
						iNow--;
						if(iNow<=0)iNow=0;
					}else{
						iNow++;
						if(iNow>=aLi.length)iNow=aLi.length-1;
					}
				}
				x = -iNow*aLi[0].offsetWidth;
				oTxt.style.transition='.4s all ease';
				oTxt.style.transform='translate3d('+x+'px,0,0)';				
				oTxt.style.WebkitTransition='.4s all ease';
				oTxt.style.WebkitTransform='translate3d('+x+'px,0,0)';				
				oTxt.style.MozTransition='.4s all ease';
				oTxt.style.MozTransform='translate3d('+x+'px,0,0)';				
				oTxt.releaseCapture&&oTxt.releaseCapture();
			};
			oTxt.setCapture&&oTxt.setCapture();
			return false;
		};
	})();
	;(function(){
        var oContact = document.getElementById('contact');
		var oShadow = document.getElementById('shadow');
		//oContact.style.height = document.documentElement.clientHeight +'px';
			var scrollT = document.documentElement.scrollTop||document.body.scrollTop;
			var scrollB = document.documentElement.clientHeight+scrollT;
			var timer = 0;
			var iNum = 1;
			var iNum1 = 0.1;
			// if(oContact.offsetTop<scrollB){
		 //        oShadow.style.opacity = iNum-iNum1.toFixed(3);
		 //        console.log(1);
			// }else{
		 //        oShadow.style.opacity = '1';
		 //        console.log(0);

			// }
			clearInterval(timer);
			timer = setInterval(function(){
				document.onscroll = function(){
					// if(oContact.offsetTop<scrollB){
					// 	//iNum-=0.1;
				 //        //oShadow.style.opacity = Math.abs(iNum).toFixed(3);
				 //        console.log(1);
					// }else{
					// 	iNum-=0.1;
				 //        oShadow.style.opacity = Math.abs(iNum).toFixed(3);
				 //        console.log(0);

					// }
				};
				// addWheel(oContact,function(bDir){
				//     if(bDir){
				//         oShadow.style.opacity = '0';
				//     }else{
				//         oShadow.style.opacity = '1';

				//     }
				// });

			},16);

	})();
};
