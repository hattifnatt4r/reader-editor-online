var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	localStorage.setItem('reader_iter', '0');
	localStorage.setItem('reader_selecttype', '1');
	localStorage.setItem('reader_zoomtype', '0');
	localStorage.setItem('latest_w', 'p0s0w0');
	localStorage.setItem('latest_s', 'p0s0');
	localStorage.setItem('latest_p', 'p0');
	localStorage.setItem('reader_id_prev', 'p0s0w0');
	localStorage.setItem('reader_id_curr', 'p0s0w0');
	
	localStorage.setItem('text_origin', 'text_o');
	localStorage.setItem('text_parsed', 'text_p');
	localStorage.setItem('text_edit', '0test0');
	
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	
	localStorage.setItem('ischanged_text', '0');
	}

var bodyStyles = window.getComputedStyle(document.body);
//var fooBar = bodyStyles.getPropertyValue('--button-radius');
screen_height = window.screen.height+'px';
screen_width = window.screen.width+'px';
document.body.style.setProperty('--screen-height', screen_height);
document.body.style.setProperty('--screen-width', screen_width);
//textheight_zoom = bodyStyles.getPropertyValue('--color_bkg1');
//alert(textheight_zoom);

var yn = parseInt(bodyStyles.getPropertyValue('--reader-buttons-ny'));
var btop = parseInt(bodyStyles.getPropertyValue('--reader-buttons-top'));
var bbot = parseInt(bodyStyles.getPropertyValue('--reader-buttons-bottom'));
var yspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-yspace'));
var lx = parseInt(bodyStyles.getPropertyValue('--reader-buttons-width-pc'));
//var bcolor = bodyStyles.getPropertyValue('--color_button_set');
//alert(yspace);
reader_show_buttons();
var ischanged = localStorage.getItem('ischanged_text');
if (ischanged=='0'){
	var text = document.getElementById('hidden_text').innerHTML;
	var text_parsed = reader_parse_text(text);
	document.getElementById('text_from_file').innerHTML = text_parsed;
	localStorage.setItem('text_origin', text);
	localStorage.setItem('text_parsed', text_parsed);
}
else{
	text = localStorage.getItem('text_edit');
	text = replace_all(text, '<br>', ':nl:'); 
	
	text_parsed = localStorage.getItem('text_parsed');
	document.getElementById('temp').innerHTML = text_parsed;
	id = localStorage.getItem('reader_id_curr');
	document.getElementById(id).innerHTML = text;
	
	text_all_parsed = document.getElementById('temp').innerHTML;
	text_all_origin = merge_text(text_all_parsed);
	localStorage.setItem('text_origin', text_all_origin);
	//alert('set new text: '+text);
	
	//var text_all_origin = localStorage.getItem('text_origin');
	text_parsed = reader_parse_text(text_all_origin);
	document.getElementById('text_from_file').innerHTML = text_parsed;
	localStorage.setItem('text_parsed', text_parsed);
	
	localStorage.setItem('ischanged_text', '0');
	save_file();
	//window.location.href = '/script/php_functions/save_file.php';
	//document.getElementById("save_text_submit").removeEventListener("click", myFunction);
	}

function save_file(){
	var text = localStorage.getItem('text_origin');
	document.getElementById('save_text_text_js').value = text; 
	document.getElementById('save_text_submit_js').click(); 
	}
reader_select_type(order=0);
reader_zoom_type(order=0);
 
function scrollbut_div(order){
	reader_iter = JSON.parse(localStorage.getItem('reader_iter'));
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	id_arr = get_id_array();
	max_iter = id_arr.length;
	if (order==next) { if (reader_iter < (max_iter)) { reader_iter ++; } else { reader_iter=max_iter; } }
	else if (order==prev) { if (reader_iter > 0) { reader_iter -= 1; } else { reader_iter=0; } }  
	id=id_arr[reader_iter];
	localStorage.setItem('reader_iter', JSON.stringify(reader_iter));
	localStorage.setItem('reader_id_curr', id);
	
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
	utter(id); highlite(); zoom_set_text();
	document.getElementById('word_i').value = document.getElementById(id).innerText; 
	
}	
function zoom_set_text(){
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	if (n_zoom_type==1){
		text = document.getElementById(localStorage.getItem('latest_w')).innerHTML;
	}if (n_zoom_type==2){
		text = document.getElementById(localStorage.getItem('latest_s')).innerHTML;
	}
	elem=document.getElementById('reader_zoom');
	if (elem){elem.innerHTML=text;}
}
function highlite(){
	//alert(id_prev);
	id_prev = localStorage.getItem('reader_id_prev'); id = get_id()
	//document.getElementById(id_prev).style.color=null;
	document.getElementById(id_prev).className='text';
	var div = document.getElementById(id);
	//div.style.color='green';
	div.className='text_highlite';
	localStorage.setItem('reader_id_prev', id);
}function utter(id){
	var txt = document.getElementById(id).innerText;
	var msg = new SpeechSynthesisUtterance(txt);
	msg.rate = 0.9; msg.lang = 'ru';
	window.speechSynthesis.pause()
	window.speechSynthesis.cancel()
	window.speechSynthesis.speak(msg);	
	}	


function get_id(){
	//alert('get_id()');
	iter = JSON.parse(localStorage.getItem('reader_iter'));
	id_arr = get_id_array();
	latest_id = id_arr[iter];
	//alert('get_id() done');
	return(latest_id);
}function get_id_array(){
	//alert('get_id_array()');
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type == 1){ id_arr=sentence_id; }	
	else if (n_select_type == 2){ id_arr=paragraph_id; }	
	else if (n_select_type == 0){ id_arr=word_id; }	
	//alert('get_id_array() done');
	return(id_arr);
}function get_id_backup(){
	//alert('get_id_backup()');
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	if (n_select_type == 0){ latest_id=localStorage.getItem('latest_w'); }	
	else if (n_select_type == 1){ latest_id=localStorage.getItem('latest_s'); }	
	else if (n_select_type == 2){ latest_id=localStorage.getItem('latest_p'); }	
	//alert('get_id_backup() done');
	return(latest_id);
}

function reader_select_type(order=0){
	n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	var types = ['by word','by sentence','by paragraph'];
	if (order==1){
		n_select_type = (n_select_type+1)%3;
		localStorage.setItem('reader_selecttype', JSON.stringify(n_select_type));
		id_arr = get_id_array();  latest_id = get_id_backup();
		localStorage.setItem('reader_iter', id_arr.indexOf(latest_id).toString() );
	}
	highlite(); zoom_set_text();
	document.getElementById('reader_selecttype').innerHTML=types[n_select_type];
}
function reader_zoom_type(order=0){
	n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	var types = ['no zoom', 'zoom word','zoom sentence'];
	if (order==1){
		n_zoom_type = (n_zoom_type+1)%3;	
		localStorage.setItem('reader_zoomtype', JSON.stringify(n_zoom_type));
	}
	textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom');
	if (n_zoom_type==0){ 
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		document.getElementById('text_from_file_box').style.height = bodyStyles.getPropertyValue('--reader-textheight');
	}else{
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		var elem=create_element('div', 'reader_zoom_box','reader_zoom_box');
		inner_i = '<div id="reader_zoom" class="text_zoom">zoom word</div>';
		//inner_i+= "<div class='zoom_scroll_shadow'> </div>";
		//inner_i+= "<div class='zoom_scroll_shadow' style='left:97%;background: linear-gradient(to right, rgba(255,255,255,0),white);'> </div>";
		elem.innerHTML = inner_i;
		document.getElementById('text_from_file_box').style.height = textheight_zoom;
	}
	//document.getElementById('reader_zoomtype').innerHTML=types[n_zoom_type];
	elem = document.getElementById('reader_menu_back');
	if (elem!=null){elem.click();}
	zoom_set_text();
}
	
//-- buttons -------------------------------------------------------------------------

function reader_button_position(i){
	yh = (bbot-btop-(yn-1)*yspace )/yn; 
	x = 100-lx*1.1;  
	y = btop + i*(yspace+yh*1);
	style = 'left:'+x+'%;top:'+y+'%;width:'+lx+'%;height:'+yh+'%;';
	return(style); }
function reader_show_buttons(){
	var elem=create_element('div', 'reader_buttons_area', '');
	inner_e = '<div id="reader_menu" class="buttons" onclick="show_reader_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
	inner_e+= '<div id="reader_go" class="buttons" onclick="show_menu_go();"  style="'+reader_button_position(1)+'">go</div>' ;
	inner_e+= '<div id="reader_selecttype" class="buttons" onclick="reader_select_type(1);"  style="'+reader_button_position(2)+'">word</div>' ;
	inner_e+= '<div id="prev" class="buttons" onclick="scrollbut_div(prev);"  style="'+reader_button_position(3)+'"><strong style="font-size:200%;">&#8672;</strong></div>' ;
	inner_e+= '<div id="next" class="buttons" onclick="scrollbut_div(next);"  style="'+reader_button_position(4)+'"><strong style="font-size:200%;">&#8674;</strong></div>' ;
	elem.innerHTML=inner_e;
	}
function show_reader_menu(){
	//var e2=create_element('div', 'reader_menu_area', 'buttons', 'width:80%; height:86%; left:10%; top:7%;background-color: rgba(255,255,255,0.9);');
	var elem=create_element('div', 'reader_menu_area', '');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="reader_menu_appearance" class="buttons" onclick="alert(123);" style="left:15%; top:15%;">appearance</div>';
	inner_e+= '<div id="reader_menu_appearance-common" class="buttons" onclick="show_menu_appearance_common();" style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="reader_menu_sound" class="buttons" onclick="alert(123);" style="left:15%; top:50%;">sound</div>';
	inner_e+= '<div id="reader_zoomtype" class="buttons" onclick="reader_zoom_type(1);"  style="left:65%;top:50%;width:14%;">zoom</div>' ;
	inner_e+= '<div id="reader_edit" class="buttons" onclick="reader_editor(reader_edit);"  style="left:65%;top:15%;width:14%;">edit</div>' ;
	//inner_e+= '<div id="reader_menu_save_js" class="buttons" onclick="save_file();" style="left:60%; top:50%;">save js</div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
}function show_menu_appearance_common(element_id='reader_menu_area'){
	e = document.getElementById(element_id)
	var inner_e = '<input id="reader_menu_appearance-common_reset" type="button" class="buttons" value="reset" onclick="alert(123);" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e += '<input id="reader_menu_appearance-common_buttonsize" type="button" class="buttons" value="buttonsize" onclick="alert(123);" style="left:35%; top:15%; position:fixed; width:14%;">';
	e.innerHTML = inner_e;
}

function show_menu_go(element_id='reader_menu_area'){
	//var e=create_element('div', 'reader_menu_area', 'buttons', 'width:80%; height:86%; left:10%; top:7%;background-color: rgba(255,255,255,0.9);');
	//e = document.getElementById(element_id)
	var elem=create_element('div', 'reader_go_area', '');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_go_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<input id="reader_menu_go_files" type="button" class="buttons" value="files" onclick="goto_files();" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e+= '<input id="reader_menu_go_file1" type="button" class="buttons" value="file1" onclick="goto_files();" style="left:35%; top:15%; position:fixed; width:14%;">';
	inner_e+= '<input id="reader_menu_back" type="button" class="buttons" value="back" onclick="reader_menu_back();" style="left:68%; top:15%; position:fixed; width:14%;">';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}
function goto_files(){ window.location.href = '/index.html'; }
	
function reader_editor(){
	//alert(123);
	id = get_id();
	text = document.getElementById(id).innerHTML;
	text_plane = merge_text(text);
	text_plane = replace_all(text, ':nl:', '<br>');
	localStorage.setItem('text_edit', text_plane);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	window.location.href = '/editor.html';
}
