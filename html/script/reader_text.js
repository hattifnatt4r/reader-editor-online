var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	localStorage.setItem('reader_iter', JSON.stringify(0));
	localStorage.setItem('reader_selecttype', JSON.stringify(0));
	localStorage.setItem('reader_zoomtype', JSON.stringify(0));
	localStorage.setItem('latest_w', 'p0s0w0');
	localStorage.setItem('latest_s', 'p0s0');
	localStorage.setItem('latest_p', 'p0');
	localStorage.setItem('id_prev', 'p0s0w0');
	}
var reader_iter = JSON.parse(localStorage.getItem('reader_iter'));
var n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
var n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));

//var types = ['by word','by sentence','by paragraph'];
//document.getElementById('reader_selecttype').value=types[n_select_type];
 

var text = document.getElementById('hidden_text').innerHTML;
//alert(text);
document.getElementById('text_from_file').innerHTML = reader_parse_text(text);
//alert(word_id.toString());
reader_select_type(order=0);
reader_zoom_type(order=0);
 
function scrollbut_div(order){
	reader_iter = JSON.parse(localStorage.getItem('reader_iter'));
	var txt;
	
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type==0){arr_id=word_id; }
	else if (n_select_type==1){arr_id=sentence_id;}
	else if (n_select_type==2){arr_id=paragraph_id;}
	max_iter = arr_id.length;
	if (order==next) {
		if (reader_iter < (max_iter)){ reader_iter ++; }
		else{reader_iter=max_iter;}
	}else if (order==prev) {
		if (reader_iter > 0){ reader_iter -= 1; }
		else{reader_iter=0;}
	}  
	localStorage.setItem('reader_iter', JSON.stringify(reader_iter));
	id=arr_id[reader_iter];
	
	if ((order==next)||(order==prev)){
		if (n_select_type==0){ 
			localStorage.setItem('latest_w', id); 
			localStorage.setItem('latest_s', id.substr(0,4)); 
			localStorage.setItem('latest_p', id.substr(0,2)); 
		}else if (n_select_type==1){ 
			localStorage.setItem('latest_w', id+'w0'); 
			localStorage.setItem('latest_s', id); 
			localStorage.setItem('latest_p', id.substr(0,2)); 
		}else if (n_select_type==2){ 
			localStorage.setItem('latest_w', id+'s0w0' );
			localStorage.setItem('latest_s', id+'s0' );
			localStorage.setItem('latest_p', id );
			}
	}
	
	var name = document.getElementById(id).getAttribute("title");
	//if (id.charAt(1)=='i'){ tts('рисунок номер '+'1'); }
	//if (id.charAt(1)=='t'){ show_zoom(id); utter(id); }
	utter(id);
	highlite(id);
	document.getElementById('word_i').value = document.getElementById(id).innerText; 
	
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	if (n_zoom_type==1){
		text = document.getElementById(localStorage.getItem('latest_w')).innerHTML;
		elem=document.getElementById('reader_zoom_w');
		if (elem){elem.innerHTML=text;}
		}
	if (n_zoom_type==2){
		text = document.getElementById(localStorage.getItem('latest_s')).innerHTML;
		elem=document.getElementById('reader_zoom_s');
		if (elem){elem.innerHTML=text;}
		}
	//document.getElementById('hidden_iter').innerHTML=reader_iter;
	//id_prev = id;
	localStorage.setItem('id_prev', id );
 }	
function highlite(id){
	id_prev = localStorage.getItem('id_prev');
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
		if (n_select_type == 0){n_select_type = 1; arr_id=sentence_id; latest_id=localStorage.getItem('latest_s'); }	
		else if (n_select_type == 1){n_select_type = 2; arr_id=paragraph_id; latest_id=localStorage.getItem('latest_p'); }	
		else if (n_select_type == 2){n_select_type = 0; arr_id=word_id; latest_id=localStorage.getItem('latest_w'); }	
		localStorage.setItem('reader_selecttype', JSON.stringify(n_select_type));
		reader_iter = arr_id.indexOf(latest_id);
		localStorage.setItem('reader_iter', JSON.stringify(reader_iter));
	}
	else{
		if (n_select_type == 1){ arr_id=sentence_id; }	
		else if (n_select_type == 2){ arr_id=paragraph_id; }	
		else if (n_select_type == 0){ arr_id=word_id; }	
		iter = JSON.parse(localStorage.getItem('reader_iter'));
		latest_id = arr_id[iter];
		}
	highlite(latest_id);
	localStorage.setItem('id_prev', latest_id);
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
	}else if (n_zoom_type==1){
		var elem=create_element('div', 'reader_zoom_w', 'text_zoom');
		elem.innerHTML = 'zoom word';
		document.getElementById('text_from_file').style.height = '70%';
	}else if (n_zoom_type==2){
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
	var text = "<"+tag_p+" id='p0'><"+tag+" id='p0s0'><"+tag+" id='p0s0w0'>";
	var i_w = 0; var i_s = 0; var i_p = 0;
	var arr_w=['p0s0w0']; var arr_s=['p0s0']; var arr_p=['p0'];
	//alert(arr);
	//alert(arr.length);
	for (k=0; k<arr.length; k++){
		word=arr[k];
		if (k==arr.length-1){ text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'>'; }
		else{
			//id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
			if ( word.indexOf('|')!=-1 ){ 
				i_p+=1; i_s=0; i_w=0;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'><'+tag_p+' id="'+id_p+'"><'+tag+' id="'+id_p+id_s+'"><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_p.push(id_p); arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
			}else if ( word.indexOf('.')!=-1 ){ 
				i_s+=1; i_w=0;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'></'+tag+'><'+tag+' id="'+id_p+id_s+'"><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
			}else{ 
				i_w+=1;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_w.push(id_p+id_s+id_w);
			}
		} 
	}
	alert(text);
	word_id = arr_w;
	sentence_id = arr_s;
	paragraph_id = arr_p;
	return (text);
}
