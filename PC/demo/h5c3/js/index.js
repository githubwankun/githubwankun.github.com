'use strict'

;(function(win,doc){
	function change(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth/320*20 +'px';
	}
	doc.addEventListener('DOMContentLoaded',change,false);
	win.addEventListener('resize',change,false);

})(window,document);

document.addEventListener('DOMContentLoaded',function(){
    var oBanner = document.getElementById('banner');
    var oUl = oBanner.getElementsByTagName('ul');
    var aLi = oUl.children;
    oUl.style.width = aLi.length*aLi[0].offsetWidth/20+'rem';
},false);