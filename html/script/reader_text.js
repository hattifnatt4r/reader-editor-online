var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	localStorage.setItem('reader_iter', JSON.stringify(0));
	localStorage.setItem('reader_selecttype', JSON.stringify(0));
	localStorage.setItem('reader_zoomtype', JSON.stringify(0));
	}
var reader_iter = JSON.parse(localStorage.getItem('reader_iter'));
var n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
var n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
//var types = ['by word','by sentence','by paragraph'];
//document.getElementById('reader_selecttype').value=types[n_select_type];
reader_select_type(order=0);
reader_zoom_type(order=0);

var text = document.getElementById('hidden_text').innerHTML;
//alert(text);
document.getElementById('text_from_file').innerHTML = reader_parse_text(text);
 
var max_reader_iter = 120;
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
	reader_iter = JSON.parse(localStorage.getItem('reader_iter'));
	var txt;
	if (order==next) {
		if (reader_iter < (max_reader_iter)){ reader_iter ++; }
		else{reader_iter=max_reader_iter;}
	}
	else if (order==prev) {
		if (reader_iter > 0){ reader_iter -= 1; }
		else{reader_iter=0;}
	}  
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type==0){arr_id=word_id;}
	else if (n_select_type==1){arr_id=sentence_id;}
	else if (n_select_type==2){arr_id=paragraph_id;}
	id=arr_id[reader_iter];
	localStorage.setItem('reader_iter', JSON.stringify(reader_iter));
	
	var name = document.getElementById(id).getAttribute("title");
	//if (id.charAt(1)=='i'){ tts('рисунок номер '+'1'); }
	//if (id.charAt(1)=='t'){ show_zoom(id); utter(id); }
	utter(id);
	highlite(id);
	document.getElementById('word_i').value = document.getElementById(id).innerText; 
	//document.getElementById('hidden_iter').innerHTML=reader_iter;
	id_prev = id;
 }	
function highlite(id){
	document.getElementById(id_prev).style.color=null;
	var div = document.getElementById(id);
	div.style.color='green';
	}
function utter(id){
	var div = document.getElementById(id);
	var txt = div.innerText;
	var msg = new SpeechSynthesisUtterance(txt);
	msg.rate = 0.9;
	msg.lang = 'ru';
	window.speechSynthesis.pause()
	window.speechSynthesis.cancel()
	window.speechSynthesis.speak(msg);	
	}	
function show_zoom(id){
	var zoomline = document.getElementById('zoomline');
	var div = document.getElementById(id);
	zoomline.innerHTML=div.innerHTML;
	}


function reader_select_type(order=0){
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	var types = ['by word','by sentence','by paragraph'];
	if (order==1){
		if (n_select_type == 0){n_select_type = 1; }	
		else if (n_select_type == 1){n_select_type = 2; }	
		else if (n_select_type == 2){n_select_type = 0; }	
		localStorage.setItem('reader_selecttype', JSON.stringify(n_select_type));
	}
	document.getElementById('reader_selecttype').value=types[n_select_type];
	//scrollbut_div('');
	}
	
//var elem = document.getElementById("reader_zoom_area");
function reader_zoom_type(order=0){
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	var types = ['no zoom', 'zoom word','zoom sentence'];
	if (order==1){
		if (n_zoom_type == 0){n_zoom_type = 1; }	
		else if (n_zoom_type == 1){n_zoom_type = 2; }	
		else if (n_zoom_type == 2){n_zoom_type = 0; }	
		localStorage.setItem('reader_zoomtype', JSON.stringify(n_zoom_type));
	}
	if (n_zoom_type==0){ 
		var elem = document.getElementById("reader_zoom_s");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		document.getElementById('text_from_file').style.height = '94%';
		}
	else if (n_zoom_type==1){
		var elem=create_element('div', 'reader_zoom_w', 'text_zoom');
		elem.innerHTML = 'zoom word';
		document.getElementById('text_from_file').style.height = '70%';
	}
	else if (n_zoom_type==2){
		var elem = document.getElementById("reader_zoom_w");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		var elem=create_element('div', 'reader_zoom_s', 'text_zoom');
		elem.innerHTML = 'zoom sentence';
		document.getElementById('text_from_file').style.height = '70%';
	}
	document.getElementById('reader_zoomtype').value=types[n_zoom_type];
	}

function reader_show_zoom(id){
	var zoomline = document.getElementById('zoomline');
	var div = document.getElementById(id);
	zoomline.innerHTML=div.innerHTML;
	}
	
	
function reader_parse_text(text_origin){
	var div_end = '\n'; var div_start = '';
	//alert(text_origin);
	/*
	var i_start=0; var proceed = 1; var i=0;
	while (proceed==1){
		if ( text_origin.substr(-2)==' ' ) { text = text_origin.substr(0,text_origin.length-1); }
		else{ proceed=0; }
		text_origin = text;
		}
		*/
	var text = text_origin.replace('\n', '| ');
	text_origin = text;
		
	var arr = []; var i_start=0;
	var proceed = 1; var k=0; var i=0; var word='';
	while (proceed==1){
		i = text_origin.indexOf(' ',i_start+1);
		if (i==-1){
			word = text_origin.substr(i_start); proceed=0; }
		else{
			word = text_origin.substr(i_start, i-i_start); i_start = i; }
		arr.push(word);
		//echo ' WORD '.$i.' '.$word;
		//if (word==' '){echo 'EMPTY!!!!!';}
		//if (strpos(word,'\n')!=False){echo 'PARAGRAPH!!!';}
		}
	
	var tag = 'em';
	var tag_p = 'p';
	var text = "<"+tag_p+" id='p0'><"+tag+" id='s0'><"+tag+" id='w0'>";
	var i_w = 1; var i_s = 1; var i_p = 1;
	var arr_w=['w0']; var arr_s=['s0']; var arr_p=['p0'];
	//alert(arr);
	//alert(arr.length);
	for (k=0; k<arr.length; k++){
		word=arr[k];
		if (k==arr.length-1){ text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'>'; }
		else{
			if ( word.indexOf('|')!=-1 ){ 
				text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'><'+tag_p+' id=p'+i_p.toString()+'><'+tag+' id=s'+i_s.toString()+'><'+tag+' id=w'+i_w.toString()+'>';
				//arr_p.push('p'+i_p);
				i_p+=1; i_s+=1; i_w+=1;
				}
			else if ( word.indexOf('.')!=-1 ){ 
				text = text+word+'</'+tag+'></'+tag+'><'+tag+' id=s'+i_s.toString()+'><'+tag+' id=w'+i_w.toString()+'>';
				i_s+=1; i_w+=1;
				}
			else{ 
				//$text = $text.'|'.$word.'|'."</$tag><$tag id=p$i_p"."s$i_s"."w$i_w>";
				text = text+word+'</'+tag+'><'+tag+' id=w'+i_w.toString()+'>';
				i_w+=1;
				}
			} 
		}
		
	alert(text);
	return (text);
}
