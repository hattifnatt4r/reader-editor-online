//var mainstring = 'Strawberries cherries. and an angels kiss in spring My summer wine is really made from all these things'
var array=[]; 
var array2;
var mainstring;
var iter = 0;
var position = 0;
var zoom = 5;
var type = 1;
var startFontSize = 20;
//var wnd = document.documentElement.clientHeight;
var wnd = screen.width-40;


function select_magnification(){
	//alert("qwe")
	var objSel = document.getElementById("mySelectId");
	if ( objSel.selectedIndex != -1)
	{
  		//alert(objSel.options[objSel.selectedIndex].value);
  		zoom=objSel.options[objSel.selectedIndex].value;
	}
}
 
select_magnification()
function select_method(){
	var objSel = document.getElementById("mySelectId_2");
	if ( objSel.selectedIndex != -1)
	{
  		//alert(objSel.options[objSel.selectedIndex].value);
  		type=objSel.options[objSel.selectedIndex].value;
	}
}
/*
function loadtext(){
	var div = document.getElementById('reg');
	div.outerHTML = '<form id="reg" name="reg"> <input text="text" id="name" name="name" /> <input type="button" value="отправить на страницу" onClick="getName();" /> </form>'
}
*/
function clear(){
	for(j=0; j<array.length; j++){
		var elem = document.getElementById(j)
		elem.parentNode ? elem.parentNode.removeChild(elem) : elem;
		//document.removeChild(elem)
	}
}

function getName(){
	alert('get name');
	name = document.forms["reg"].elements["name"].value;
	mainstring = name;
	var str = adopt_array(mainstring);
	clear()
	//alert(str)
	array2 = make_array(str);
	//var start=document.createElement('input');
	//start.id = 'mess'
	//start.class = 'block2'
	//document.body.appendChild(start);
	for (j=0; j<array2.length; j++){ 
		array[array.length]=array2[j]
	}
	//var ok = document.getElementById('ok');
	//var load = document.getElementById('load');
	//load.style.visibility = visible;
	//ok.style.visibility = hidden;
	//var div = document.getElementById('reg');
	//div.outerHTML = '<input type="button" id="reg" value="загрузить текст" onClick="loadtext();" />'
	display_array(array);
	//alert(mainstring);
}

function make_array(mystring) {
	var str = mystring;
	var target = ' ';
	var arr = [];
	var s;
	//alert(str);
	var found;
	var pos = 0;
	target2='\n' /*
	while (true){
		found = str.indexOf(target2, pos);
		if (found == -1) {
			//s = str.substring(pos,);
			//arr.push(s);
			//alert('not found')
			break;
		}
		str.replace(target2,' br ')
		pos = found+1
	} */
	pos=0;
	while (true){
		found = str.indexOf(target, pos);
		if (found == -1) {
			//s = str.substring(pos,);
			//arr.push(s);
			break;
		}
		s = str.substring(pos,found);
		//alert(s);
		arr.push(s);
		pos = found+1;
	}
	return arr;
}



function display_array(array) {
	var arr;
	arr = array;
	var i;
	var n = array.length;
	var val;
	for (i=0;i<n;i++){
		if (arr[i]!=''){
		var btn = document.createElement('input');
		btn.id = i;
		btn.type = 'button';
		//btn.style="vertical-align: middle";
		var s = btn.style
  		s.MozBorderRadius = s.WebkitBorderRadius = s.borderRadius = '8px';
  		s.border = '0px groove green';
  		//s.display = 'block';
  		s.height = '30px';
  		s.lineHeight = '30px';
  		//s.width =200+'px';
  		//s.textDecoration = 'none';
  		s.textAlign = 'center';
  		s.color = 'black';
  		//s.fontWeight = 'bold';
  		//s.background = 'white';
  		s.backgroundColor='transparent'
  		s.fontSize = startFontSize+'px'

		btn.value = arr[i];
		val = arr[i];
		//btn.fontSize = 10*zoom+'px';
		btn.onclick = tooltip;
		document.onkeyup = scroll;
		var elem = document.getElementById('table');
		elem.appendChild(btn);
		}
		//if (arr[i]=='\n' || arr[i]=='\r' || arr[i]=='\r\n' || arr[i]=='<br>'){
		//if (arr[i]=='\n' || arr[i]=='\r'){
		//found = arr[i].indexOf(' ');
		//if (found!=-1){
		if (arr[i]==''){
			var br = document.createElement('br');
			elem.appendChild(br);	
		}
	}
}



function adopt_array(string){
	var newstr=string+' ';
	return newstr;
}


var d = document;
var offsetfromcursorY=15 // y offset of tooltip
var ie=d.all && !window.opera;
var ns6=d.getElementById && !d.all;
var tipobj,op;

/*
function tooltip(a, pos) {
//function tooltip(el) {
	//txt='qwerty'
	el='this';
	var ident = event.target.id;
	//alert(id);
	if (a==1){
		ident=pos;
	}
	txt=array[ident];
	
	var msg = new SpeechSynthesisUtterance(txt);
	msg.rate = 0.8;
	msg.lang = 'ru';
	window.speechSynthesis.speak(msg);
	
	tipobj=d.getElementById('mess');
	//tipobj=d.getElementById('ident');
	tipobj.innerHTML = txt;
	op = 1;  
	var br=d.getElementById(ident).getBoundingClientRect()
	var xx=br.left;
	var yy=br.top;
	//var xx=event.clientX;
	//var yy=event.clientY;
	xx=xx;
	yy=yy;
	yy = document.documentElement.clientHeight;
	var s = tipobj.style
	tipobj.position = 'fixed'
	s.position = 'fixed'
	//tipobj.top = 1500+'px'
	if (type==1){
  		s.MozBorderRadius = s.WebkitBorderRadius = s.borderRadius = '8px';
  		s.border = '0px groove green';
  		//s.display = 'block';
  		//var height_i = zoom*startFontSize*1.2
  		s.height = zoom*startFontSize*1.2+'px';
  		s.lineHeight = zoom*startFontSize*1.2+'px';
  		//s.width = startFontSize*zoom*txt.length*0.7+'px';
  		//s.width = 1100+'px'
  		s.width = 80+'%'
  		//s.textDecoration = 'none';
  		s.halign='center';
  		s.textAlign = 'center';
  		s.color = 'black';
  		//s.fontWeight = 'bold';
  		s.background = 'white';
  		s.fontSize = startFontSize*zoom+'px'
  		if ((xx+startFontSize*zoom*txt.length*0.7)>wnd){
  			xx=wnd-startFontSize*zoom*txt.length*0.7;
  		}
  		//s.left = xx+'px';
  		//s.top = yy+'px';
  		//s.left = 30+'px'
  		s.left = 10+'%'
  		//var top = 150-100*height/document.documentElement.clientHeight;
  		//s.top = 75 +'%';
  		s.top = 500 +'px';
  		s.opacity = op;
  		s.visibility="visible";
  		//s.verticalAlign="bottom";
  		//tipobj.top = 100+'%'
  	}
  	if (type==2){
  		zoom=1.1;
  		s.MozBorderRadius = s.WebkitBorderRadius = s.borderRadius = '8px';
  		s.border = '2px groove green';
  		//s.display = 'block';
  		s.height = zoom*startFontSize*1.1+'px';
  		s.lineHeight = zoom*startFontSize*1.1+'px';
  		//s.width = '100px';
  		//s.textDecoration = 'none';
  		s.textAlign = 'center';
  		s.color = 'black';
  		//s.fontWeight = 'bold';
  		s.background = 'white';
  		s.fontSize = startFontSize*zoom+'px'
  		s.left = xx+'px';
  		s.top = yy+'px';
  		s.opacity = 1;
  		s.visibility="visible";
  		//s.verticalAlign="bottom";
  	}
	//el.onmousemove=positiontip;
	position = ident;
	//appear();
	iter++;
	//position = id;
}

function scroll(event){
	var txt;
	if (event.keyCode==39) {
		if (position < (array.length-1)){
			position ++;
		}
		if (iter==0){position=0;}
		tooltip(1, position);
	}
	if (event.keyCode==37) {
		if (position > 0){
			position = position - 1;
		}
		if (iter==0){position=0;}
		//alert(position);
		tooltip(1, position);
	}  
	iter++;
}


var order;
function scrollbut(order){
	var txt;
	if (order==next) {
		if (position < (array.length-1)){
			position ++;
		}
		if (iter==0){position=0;}
		tooltip(1, position);
	}
	if (order==prev) {
		if (position > 0){
			position = position - 1;
		}
		if (iter==0){position=0;}
		//alert(position);
		tooltip(1, position);
	}  
	iter++;
 }
*/
 
var div_iter = 1; 
var div_iter_prev = 0; 
var max_div_iter = 125;
var div_color_prev = 'black';
var div_id = [];
//div_id.push('dt1');
//div_id.push('dt2');
//div_id.push('di3');
//div_id.push('dt4');
for (i=1; i<max_div_iter+1; i++){div_id.push('dt'+i.toString());}
//div_id = ['dt1','dt2','dt3','dt4','dt5','dt6','dt7','dt8','dt9','dt10'];
 
 
function scrollbut_div(order){
	//if (div_iter!=0 & div_iter!=max_div_iter){div_iter_prev = div_iter;}
	//if (div_iter!=div_iter_prev){div_iter_prev = div_iter;}
	div_iter_prev = div_iter;
	var txt;
	if (order==next) {
		if (div_iter < (max_div_iter)){ div_iter ++; }
		else{div_iter=max_div_iter;}
	}
	if (order==prev) {
		if (div_iter > 0){ div_iter = div_iter - 1; }
		else{div_iter=0;}
	}  
	var id = div_id[div_iter];
	//var id = 'dt'+str(iter);
	if (id.charAt(1)=='i'){
		tts('рисунок номер '+'1');
	}
	if (id.charAt(1)=='t'){
		show_zoom(id);	
		utter(id);
	}
	highlite(id);
 }
 
function show_zoom(id){
	//alert(id);
	var zoomline = d.getElementById('zoomline');
	var div = d.getElementById(id);
	zoomline.innerHTML=div.innerHTML;
	}
	
function highlite(id){
	//alert(id);
	if (id.charAt(1)!='i'){
		var div = d.getElementById(id);
		div.style.color='green';
	}
	if (div_id[div_iter_prev].charAt(1)!='i'){
		if (div_iter!=div_iter_prev){
		d.getElementById(div_id[div_iter_prev]).style.color='black';
		}
	}
	//div_color_prev = div.style.color;
	}
	
function utter(id){
	var div = d.getElementById(id);
	var txt = div.innerText;
	//alert(txt);
	//if (typeof msg !== 'undefined'){msg.stop();}
	var msg = new SpeechSynthesisUtterance(txt);
	msg.rate = 0.9;
	msg.lang = 'ru';
	window.speechSynthesis.speak(msg);
	}
	
function tts(txt){
	var msg = new SpeechSynthesisUtterance(txt);
	msg.rate = 0.9;
	msg.lang = 'ru';
	window.speechSynthesis.speak(msg);
	}

function load_file(){
	//alert('get name 2');
	var name = document.forms["reg2"].elements["name2"].value;
	alert(name);
	//var str = adopt_array(mainstring);
	clear()
	var div = d.getElementById('div2');
	
}
