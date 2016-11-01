//alert('reader');
var text_type=0;
var iter = 0;
var zoom = 5;
var n_display_type = 0;

var d = document;
var offsetfromcursorY=15 // y offset of tooltip
var ie=d.all && !window.opera;
var ns6=d.getElementById && !d.all;
var tipobj,op;
 
var div_iter = 1; 
var div_iter_prev = 0; 
var max_div_iter = 125;
var div_color_prev = 'black';
var div_id = [];
for (i=1; i<max_div_iter+1; i++){div_id.push('dt'+i.toString());}
var max_sentence_iter = 125;
var sentence_id = [];
for (i=1; i<max_sentence_iter+1; i++){sentence_id.push('st'+i.toString());}
//for (i=1; i<max_div_iter+1; i++){div_id.push('dt'+i.toString());}
//div_id = ['dt1','dt2','dt3','dt4','dt5','dt6','dt7','dt8','dt9','dt10'];
//div_id = ['st1','st2','st3','st4','st5'];
 
function scrollbut_div(order){
	//alert('reader');
	div_iter_prev = div_iter;
	var txt;
	if (order==next) {
		//alert('next');
		if (div_iter < (max_div_iter)){ div_iter ++; }
		else{div_iter=max_div_iter;}
	}
	if (order==prev) {
		//alert('prev');
		if (div_iter > 0){ div_iter = div_iter - 1; }
		else{div_iter=0;}
	}  
	if (n_display_type==0){var id=sentence_id[div_iter];}
	else {var id=div_id[div_iter];}
	if (id.charAt(1)=='i'){
		tts('рисунок номер '+'1');
	}
	if (id.charAt(1)=='t'){
		//show_zoom(id);	
		utter(id);
	}
	highlite(id);
	document.getElementById('hidden_iter').innerHTML=div_iter;
	document.getElementById('hidden_array').innerHTML=div_id;
 }
 
function show_zoom(id){
	//alert(id);
	var zoomline = d.getElementById('zoomline');
	var div = d.getElementById(id);
	zoomline.innerHTML=div.innerHTML;
	//alert(div.innerHTML);
	}
	
function highlite(id){
	//alert(id);
	if (n_display_type==0){var id_prev = sentence_id[div_iter_prev];}
	else {var id_prev=div_id[div_iter_prev];}
	//var id_prev = sentence_id[div_iter_prev]
	if (id.charAt(1)!='i'){
		var div = d.getElementById(id);
		div.style.color='green';
	}
	if (id_prev.charAt(1)!='i'){
		if (div_iter!=div_iter_prev){
		d.getElementById(id_prev).style.color='black';
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
	window.speechSynthesis.pause()
	window.speechSynthesis.cancel()
	window.speechSynthesis.speak(msg);	
	}
	

    
function change_type(type){
	//alert(n_display_type);
	n_display_type = n_display_type+1 
	if (n_display_type == 2){n_display_type = 0; alert('by sentence');}	
	else{alert('by paragraph');}
	}

//text_from_file(text);
function text_from_file(text){
	//alert('from file!');
    var page_text = read_file('books_test/test_book_3.txt'); 
    //var page_text = 'test test test';
	var text_place = d.getElementById('text_from_file');
	text_place.innerHTML=page_text;
	//alert('from file!');
	//text_place.innerHTML='ghjgjhgjhgj hjhjhk hjkhjhkjhk';
	}

function read_file(file){	
	//var file = 'test_book.txt';
    var file_i = new XMLHttpRequest();
    var allText = 'empty text';
    file_i.onreadystatechange = function ()
    {
	if(file_i.readyState === 4)
		{   if(file_i.status === 200 || file_i.status == 0)
			{   allText = file_i.responseText;
				//return allText;
			}
		}
    }
    file_i.open("GET", file, false);
    file_i.send(null);
    //alert(allText);
    return allText;
	}

