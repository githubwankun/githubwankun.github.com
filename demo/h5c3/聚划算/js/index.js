'use strict'

// ;(function(win,doc){
// 	function change(){
// 		document.documentElement.style.fontSize = document.documentElement.clientWidth/320*20 +'px';
// 	}
// 	doc.addEventListener('DOMContentLoaded',change,false);
// 	win.addEventListener('resize',change,false);
//
// })(window,document);

;(function(doc,win){
  var docEle = doc.documentElement,
      resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
      recalc = function(){
        docEle.style.fontSize = docEle.clientWidth/320*20 + 'px';
      };
  if(!doc.addEventListener) return;
  doc.addEventListener(resizeEvt, recalc, false);
	win.addEventListener('DOMContentLoaded', recalc, false);

})(document,window);

// ;(function (doc, win) {
//         var docEl = doc.documentElement,
//             resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize',
//             recalc = function () {
//                 var clientWidth = docEl.clientWidth;
//                 if (!clientWidth) return;
//
//                     docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
//
//             };
//
//         if (!doc.addEventListener) return;
//         win.addEventListener(resizeEvt, recalc, false);
//         doc.addEventListener('DOMContentLoaded', recalc, false);
//     })(document, window);


document.addEventListener('DOMContentLoaded',function(){
	;(function(){
		var oBox = document.querySelector('#banner');
		var oUl = document.querySelector('#banner ul');
		var oOl = document.querySelector('#banner ol');
		var aLi = oUl.children;
		var aBtn = document.querySelector('ol li');
		var x = 0;
		var iNow = 0;

		oBox.addEventListener('touchstart',function(ev){
			oUl.style.transition = 'none';
			oUl.style.WebkitTransition = 'none';
			var downX = ev.targetTouches[0].pageX;
			var disX = downX-x;
			function fnMove(ev){
				x = ev.targetTouches[0].pageX - disX;
				oUl.style.transform = 'translate3d('+x+'px,0,0)';
				ev.preventDefault();
			}
			function fnEnd(ev){
				oBox.removeEventListener('touchmove',fnMove,false);
				oBox.removeEventListener('touchend',fnEnd,false);
				var upX = ev.changedTouches[0].pageX;
				if (Math.abs(upX-downX)>88) {
					if (downX>upX) {
						iNow++;
						if (iNow>=aLi.length)iNow=aLi.length-1;
					} else{
						iNow--;
						if(iNow<=0)iNow = 0;
					};
				}
				x = -iNow*aLi[0].offsetWidth;
				oUl.style.transition = '0.4s all ease';
				oUl.style.WebkitTransition = '0.4s all ease';
				oUl.style.transform = 'translate3d('+x+'px,0,0)';
				oUl.style.WebkitTransform = 'translate3d('+x+'px,0,0)';
			}

			oBox.addEventListener('touchmove',fnMove,false);
			oBox.addEventListener('touchend',fnEnd,false);
		},false);
	})();
},false);
