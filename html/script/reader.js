var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	localStorage.setItem('reader_iter', JSON.stringify(0));
	}
var reader_iter = localStorage.getItem('reader_iter');

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
 
//var div_iter = 0; 
var div_iter_prev = 0; 
var max_div_iter = 120;
var paragraph_id = [];
//for (i=1; i<max_div_iter+1; i++){div_id.push('dt'+i.toString());}
for (i=0; i<5+1; i++){paragraph_id.push('p'+i.toString());}
var sentence_id = [];
//for (i=1; i<max_sentence_iter+1; i++){sentence_id.push('st'+i.toString());}
for (i=0; i<30+1; i++){sentence_id.push('s'+i.toString());}
var word_id = [];
for (i=0; i<125+1; i++){word_id.push('w'+i.toString());}
var arr_id = word_id;
var id_prev='w0';
 
function scrollbut_div(order){
	//alert('reader');
	//div_iter_prev = div_iter;
	var txt;
	if (order==next) {
		//alert('next');
		if (reader_iter < (max_div_iter)){ reader_iter ++; }
		else{reader_iter=max_div_iter;}
	}
	if (order==prev) {
		//alert('prev');
		if (reader_iter > 0){ reader_iter -= 1; }
		else{reader_iter=0;}
	}  
	n_display_type = document.getElementById('hidden_type').innerHTML;
	if (n_display_type==0){arr_id=word_id;}
	else if (n_display_type==1){arr_id=sentence_id;}
	else if (n_display_type==2){arr_id=paragraph_id;}
	//else {var id=div_id[div_iter];}
	id=arr_id[reader_iter];
	localStorage.setItem('reader_iter', JSON.stringify(reader_iter));
	var name = document.getElementById(id).getAttribute("title");
	if (id.charAt(1)=='i'){
		tts('рисунок номер '+'1');
	}
	utter(id);
	if (id.charAt(1)=='t'){
		//show_zoom(id);	
		utter(id);
	}
	highlite(id);
	document.getElementById('word_i').value = d.getElementById(id).innerText; 
	document.getElementById('hidden_iter').innerHTML=reader_iter;
	//document.getElementById('hidden_array').innerHTML=div_id;
	id_prev = id;
 }
 
function show_zoom(id){
	//alert(id);
	var zoomline = d.getElementById('zoomline');
	var div = d.getElementById(id);
	zoomline.innerHTML=div.innerHTML;
	//alert(div.innerHTML);
	}
	
function highlite(id){
	d.getElementById(id_prev).style.color=null;
	var div = d.getElementById(id);
	div.style.color='green';
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
	//n_display_type = n_display_type+1 
	var n;
	if (n_display_type == 0){n = 1; arr_id=sentence_id; alert('by sentence');}	
	else if (n_display_type == 1){n = 2; arr_id=paragraph_id; alert('by paragraph');}	
	else if (n_display_type == 2){n = 0; arr_id=word_id; alert('by word');}	
	n_display_type = n;
	document.getElementById('hidden_type').innerHTML=n_display_type;
	//else{alert('by paragraph');}
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

