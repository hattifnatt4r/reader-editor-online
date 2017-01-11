//alert('reader');
//alert(is_readable());
var session = localStorage.getItem('reader_session');
if (session!='started'){
	session = 'started';
	localStorage.setItem('reader_session', session);
	//localStorage.setItem('reader_iter', '0');
	//localStorage.setItem('reader_selecttype', '1');
	//localStorage.setItem('reader_zoomtype', '2');
	//localStorage.setItem('latest_w', 'p0s0w0');
	//localStorage.setItem('latest_s', 'p0s0');
	//localStorage.setItem('latest_p', 'p0');
	//localStorage.setItem('reader_id_prev', 'p0s0w0');
	//localStorage.setItem('reader_id_curr', 'p0s0w0');
	
	localStorage.setItem('text_origin', 'text_o');
	localStorage.setItem('text_parsed', 'text_p');
	localStorage.setItem('text_edit', '0test0');
	
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	
	localStorage.setItem('ischanged_text', '0');
	//localStorage.setItem('reader_lang', '0');
	
	//localStorage.setItem('reader_iter', get_cookie('counter_'+fname));
	}
var fname = document.getElementById('file_title').innerText.replace(' ','');
document.cookie = "username=John Doe";
//alert( get_cookie('counter_'+fname) );
if (get_cookie('isset_'+fname)!='isset'){
	document.cookie = "isset_"+fname+"=isset";
	document.cookie = "counter_"+fname+"=0";
	
	document.cookie = "latest_w_"+fname+"=p0s0w0";
	document.cookie = "latest_s_"+fname+"=p0s0";
	document.cookie = "latest_p_"+fname+"=p0";
	document.cookie = "id_prev_"+fname+"=p0s0w0";
	document.cookie = "id_curr_"+fname+"=p0s0w0";
	//document.cookie = "text_origin_"+fname+"=text_o0";
	//document.cookie = "text_parsed_"+fname+"=text_p0";
	
	document.cookie = "selecttype_"+fname+"=1";
	document.cookie = "zoomtype_"+fname+"=2";
	document.cookie = "lang_"+fname+"=0";
	}

var bodyStyles = window.getComputedStyle(document.body);
screen_height = window.screen.height+'px';
screen_width = window.screen.width+'px';
document.body.style.setProperty('--screen-height', screen_height);
document.body.style.setProperty('--screen-width', screen_width);

reader_show_buttons();
//iter = parseInt(get_cookie('counter_'+fname)); alert('0 iter='+iter+' fname '+fname);
var ischanged = localStorage.getItem('ischanged_text');
if (ischanged=='0'){
	text = document.getElementById('hidden_text').innerHTML;
	//iter = parseInt(get_cookie('counter_'+fname)); alert('0 iter='+iter+' fname '+fname);
	if (is_inlist(pdfdir)){ parser = reader_parse_pdf(text); }
	else{ parser = reader_parse_txt(text, 0); }
	//parser = reader_parse_txt(text, 0); 
	//iter = parseInt(get_cookie('counter_'+fname)); alert('1 iter='+iter+' fname '+fname);
	text_parsed = parser[0];  //alert('parsed 0 '+text_parsed);
	var word_id=parser[1]; 	var sentence_id=parser[2]; var paragraph_id=parser[3];
	//iter = parseInt(get_cookie('counter_'+fname)); alert('2 iter='+iter+' fname '+fname);
	//alert('id_final '+word_id+' '+sentence_id+' '+paragraph_id);
	document.getElementById('text_from_file').innerHTML = text_parsed;   //alert('parsed 1 '+text_parsed);
	localStorage.setItem('text_origin', text);
	localStorage.setItem('text_parsed', text_parsed);
	//document.cookie = "text_origin_"+fname+"="+text;
	//document.cookie = "text_parsed_"+fname+"="+text_parsed.replace(' ','|');  alert('parsed 2 '+text_parsed);
	//text_parsed = get_cookie('text_parsed_'+fname).replace('|',' ');      alert('parsed '+text_parsed);
	//iter = parseInt(get_cookie('counter_'+fname)); alert('2 iter='+iter+' fname '+fname);
}else{
	text = localStorage.getItem('text_edit'); alert('text_edit: '+text);
	//text = replace_all(text, '<br>', ':nl:'); //alert('text_edit 2: '+text);
	
	text_parsed = localStorage.getItem('text_parsed'); //alert('text_parsed: '+text_parsed);
	//text_parsed = get_cookie('text_parsed_'+fname);      alert('parsed '+text_parsed);
	document.getElementById('temp').innerHTML = text_parsed;
	//id = localStorage.getItem('reader_id_curr');   //alert('id: '+id);
	id = get_cookie('id_curr_'+fname);               alert('id '+id);
	document.getElementById(id).innerHTML = text;    alert(text);
	
	text_all_parsed = document.getElementById('temp').innerHTML; //alert('text_all_parsed '+text_all_parsed);
	text_all_origin = merge_text(text_all_parsed);
	localStorage.setItem('text_origin', text_all_origin);
	//document.cookie = "text_origin_"+fname+"="+text_all_origin;  alert(text_all_origin);
	
	parser = reader_parse_txt(text_all_origin, 0); 
	text_parsed = parser[0]; 
	var word_id=parser[1]; 	var sentence_id=parser[2]; var paragraph_id=parser[3];
	document.getElementById('text_from_file').innerHTML = text_parsed;  //alert(text_parsed);
	localStorage.setItem('text_parsed', text_parsed);
	//document.cookie = "text_parsed_"+fname+"="+text_parsed;
	
	localStorage.setItem('ischanged_text', '0');
	save_file();
}function save_file(){
	text = localStorage.getItem('text_origin');
	//text = get_cookie('text_origin_'+fname);
	document.getElementById('save_text_text_js').value = text; 
	document.getElementById('save_text_submit_js').click(); 
	}
//iter = parseInt(get_cookie('counter_'+fname)); alert('10 iter='+iter+' fname '+fname);
reader_select_type(order=0);
reader_zoom_type(order=0);
alert(document.getElementById('text_from_file').innerHTML);

function scrollbut_div(order){
	//iter = JSON.parse(localStorage.getItem('reader_iter'));
	//iter = reader_iter*1; alert('iter '+iter);
	iter = parseInt(get_cookie('counter_'+fname));  //alert('iter '+iter);
	//n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	n_select_type = parseInt(get_cookie('selecttype_'+fname));
	id_arr = get_id_array();
	max_iter = id_arr.length;
	if (order==next) { if (iter < (max_iter)) { iter ++; } else { iter=max_iter; } }
	else if (order==prev) { if (iter > -1) { iter -= 1; } else { iter=-1; } } 
	if (iter==-1){ id='file_title'; } 
	else { id=id_arr[iter]; }
	//localStorage.setItem('reader_iter', JSON.stringify(iter));
	//alert(fname+'  iter_new '+iter);  alert('counter_'+fname+'='+iter.toString());
	document.cookie = "counter_"+fname+'='+iter.toString();   //alert(iter);
	//alert('set iter '+ get_cookie('counter_'+fname) );
	//localStorage.setItem('reader_id_curr', id); //alert(iter+' '+id);
	document.cookie = "id_curr_"+fname+"="+id;
	
	if (iter==-1){
		//localStorage.setItem('latest_w', id); 
		//localStorage.setItem('latest_s', id); 
		//localStorage.setItem('latest_p', id); 
		document.cookie = "latest_w_"+fname+"="+id;
		document.cookie = "latest_s_"+fname+"="+id;
		document.cookie = "latest_p_"+fname+"="+id;
	}
	if ((order==next|| order==prev) && iter>-1){
		if (n_select_type==0){ 
			//localStorage.setItem('latest_w', id); 
			//localStorage.setItem('latest_s', id.substr(0,4)); 
			//localStorage.setItem('latest_p', id.substr(0,2)); 
			document.cookie = "latest_w_"+fname+"="+id;
			document.cookie = "latest_s_"+fname+"="+id.substr(0,4);
			document.cookie = "latest_p_"+fname+"="+id.substr(0,2);
		}else if (n_select_type==1){ 
			//localStorage.setItem('latest_w', id+'w0'); 
			//localStorage.setItem('latest_s', id); 
			//localStorage.setItem('latest_p', id.substr(0,2)); 
			document.cookie = "latest_w_"+fname+"="+id+'w0';
			document.cookie = "latest_s_"+fname+"="+id;
			document.cookie = "latest_p_"+fname+"="+id.substr(0,2);
		}else if (n_select_type==2){ 
			//localStorage.setItem('latest_w', id+'s0w0' );
			//localStorage.setItem('latest_s', id+'s0' );
			//localStorage.setItem('latest_p', id );
			document.cookie = "latest_w_"+fname+"="+id+'s0w0';
			document.cookie = "latest_s_"+fname+"="+id+'s0';
			document.cookie = "latest_p_"+fname+"="+id;
			}
	}
	
	//lang = parseInt( localStorage.getItem('reader_lang') );
	lang = parseInt(get_cookie('lang_'+fname));
	if (n_select_type==0 || iter==-1 ){ utter(document.getElementById(id).innerText, lang, stop=1); }
	else {
		if (n_select_type==2){ utter_paragraph(id, sentence_id, word_id, lang, stop=1); }
		if (n_select_type==1){ utter_sentence(id, word_id, lang, stop=1); }
	}
	highlite();  zoom_set_text();  
	scroll_to(id,'text_from_file_box', title=0); //alert('scroll');
	scroll_to(id,'reader_zoom_box',title=1); //alert('scroll');
	document.getElementById('word_i').value = document.getElementById(id).innerText; 
}	

function zoom_set_text(){
	//alert('zoom_set_text');
	//n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	n_zoom_type = parseInt(get_cookie('zoomtype_'+fname));
	if (n_zoom_type==1){
		//text = document.getElementById(localStorage.getItem('latest_w')).innerHTML;
		text = document.getElementById(get_cookie('latest_w_'+fname)).innerHTML;
	}if (n_zoom_type==2){
		//text = document.getElementById(localStorage.getItem('latest_s')).innerHTML;
		text = document.getElementById(get_cookie('latest_s_'+fname)).innerHTML;
	}
	elem=document.getElementById('reader_zoom');
	if (elem){elem.innerHTML=text; }
}
function highlite(){
	//alert('highlite');
	//id_prev = localStorage.getItem('reader_id_prev'); 
	id_prev = get_cookie('id_prev_'+fname);
	id = get_id()
	//alert('highlite 0 id '+id +' id_prev '+id_prev);
	//document.getElementById(id_prev).style.color=null;
	document.getElementById(id_prev).className='text';
	div = document.getElementById(id);
	//alert('highlite div '+ div + ' id '+id +' id_prev '+id_prev);
	//div.style.color='green';
	div.className='text_highlite';
	//alert('highlite 2');
	//localStorage.setItem('reader_id_prev', id);
	document.cookie = "id_prev_"+fname+"="+id;
	//alert('highlite done');
}


function get_id(){
	//alert('get_id()');
	//iter = JSON.parse(localStorage.getItem('reader_iter'));
	//iter = reader_iter*1;
	iter = parseInt(get_cookie('counter_'+fname)); //alert('get_id  iter='+iter+' fname '+fname);
	id_arr = get_id_array();
	if (iter==-1){ latest_id='file_title'; }
	else{ latest_id = id_arr[iter]; }
	//alert('get_id() done');
	return(latest_id);
}function get_id_array(){
	//alert('get_id_array()');
	//n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	n_select_type = parseInt(get_cookie('selecttype_'+fname));
	if (n_select_type == 1){ id_arr=sentence_id; }	
	else if (n_select_type == 2){ id_arr=paragraph_id; }	
	else if (n_select_type == 0){ id_arr=word_id; }	
	//alert('get_id_array() done');
	return(id_arr);
}function get_id_backup(){
	//alert('get_id_backup()');
	//n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	n_select_type = parseInt(get_cookie('selecttype_'+fname));
	//if (n_select_type == 0){ latest_id=localStorage.getItem('latest_w'); }	
	//else if (n_select_type == 1){ latest_id=localStorage.getItem('latest_s'); }	
	//else if (n_select_type == 2){ latest_id=localStorage.getItem('latest_p'); }	
	if (n_select_type == 0){ latest_id=get_cookie('latest_w_'+fname); }	
	else if (n_select_type == 1){ latest_id=get_cookie('latest_s_'+fname); }	
	else if (n_select_type == 2){ latest_id=get_cookie('latest_p_'+fname); }	
	//alert('get_id_backup() done');
	return(latest_id);
}

function reader_select_type(order){ 
	//alert('select');
	//n_select_type = JSON.parse(localStorage.getItem('reader_selecttype'));
	n_select_type = parseInt(get_cookie('selecttype_'+fname));
	var types = ['select word','select sentence','select paragr'];
	if (order==1){
		n_select_type = (n_select_type+1)%3;
		//localStorage.setItem('reader_selecttype', JSON.stringify(n_select_type));
		document.cookie = "selecttype_"+fname+"="+n_select_type;
		id_arr = get_id_array();  latest_id = get_id_backup();
		//iter = id_arr.indexOf(latest_id).toString();
		//localStorage.setItem('reader_iter', id_arr.indexOf(latest_id).toString() );
		//alert('selecttype '+iter);
		document.cookie = "counter_"+fname+"="+id_arr.indexOf(latest_id).toString();  
	}
	alert('select 0');
	highlite(); zoom_set_text();
	alert('select 1');
	id=get_id(); 
	//localStorage.setItem('reader_id_curr', id);
	document.cookie = "id_curr_"+fname+"="+id;
	document.getElementById('reader_selecttype').innerHTML=types[n_select_type];
	//alert('selecttype done');
	}

function reader_zoom_type(order){
	//alert('zoom');
	//n_zoom_type = JSON.parse(localStorage.getItem('reader_zoomtype'));
	n_zoom_type = parseInt(get_cookie('zoomtype_'+fname));
	var types = ['no zoom', 'zoom word','zoom sentence'];
	if (order==1){
		n_zoom_type = (n_zoom_type+1)%3;	
		//localStorage.setItem('reader_zoomtype', JSON.stringify(n_zoom_type));
		document.cookie = "zoomtype_"+fname+"="+n_zoom_type;
	}
	textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
	if (n_zoom_type==0){ 
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		document.getElementById('text_from_file_box').style.height = bodyStyles.getPropertyValue('--reader-textheight');
	}else{
		var elem = document.getElementById("reader_zoom_box");
		if (elem!=null){ elem.parentNode.removeChild(elem); }
		var elem=create_element('div', 'reader_zoom_box','reader_zoom_box', '','','','','','');
		inner_i = '<div id="reader_zoom" class="text_zoom">zoom word</div>';
		elem.innerHTML = inner_i;
		document.getElementById('text_from_file_box').style.height = textheight_zoom; //alert(textheight_zoom);
	}
	elem = document.getElementById('reader_menu_back');
	if (elem!=null){elem.click();}
	zoom_set_text();
	document.getElementById('reader_zoomtype').innerHTML=types[n_zoom_type];
}
	
//-- buttons -------------------------------------------------------------------------

function reader_show_buttons(){
	//var elem=create_element('div', 'reader_buttons_area', 'buttons_area');
	var elem = document.getElementById('reader_buttons_area');
	//alert('buttons');
	inner_e = '<div id="reader_menu" class="buttons" onclick="show_reader_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
	inner_e+= '<div id="reader_zoomtype" class="buttons" onclick="reader_zoom_type(1);"  style="'+reader_button_position(1)+'">zoom</div>' ;
	inner_e+= '<div id="reader_selecttype" class="buttons" onclick="reader_select_type(1);"  style="'+reader_button_position(2)+'">word</div>' ;
	inner_e+= '<div id="prev" class="buttons" onclick="scrollbut_div(prev);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
	inner_e+= '<div id="next" class="buttons" onclick="scrollbut_div(next);"  style="'+reader_button_position(4)+'">'+symbol_next+'</div>' ;
	elem.innerHTML=inner_e;
	}
function show_reader_menu(){
	//iter = JSON.parse(localStorage.getItem('reader_iter'));
	//iter = 1*reader_iter;
	iter = parseInt(get_cookie('counter_'+fname));
	if (iter==-1 || is_inlist(readonlydir)){ edit_function = ''; edit_class='buttons disabled'; }
	else { edit_function='onclick="reader_editor(reader_edit);"'; edit_class='buttons'; }
	//lang = lang_arr[ parseInt( localStorage.getItem('reader_lang') ) ];
	lang = lang_arr[ parseInt( get_cookie('lang_'+fname) ) ];
	
	var elem=create_element('div', 'reader_menu_area', '','','','','','','');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	inner_e+= '<div id="reader_menu_appearance"        class="buttons disabled" onclick=""   style="left:15%; top:15%;">appearance</div>';
	//inner_e+= '<div id="reader_menu_appearance-common" class="buttons disabled" onclick=""   style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="reader_menu_sound"             class="buttons disabled" onclick=""   style="left:15%; top:50%;">sound</div>';
	inner_e+= '<div id="reader_menu_lang"              class="buttons"          onclick="reader_change_lang()"   style="left:35%; top:50%;">lang '+lang+'</div>';
	inner_e+= '<div id="reader_go"                     class="buttons disabled" onclick=""   style="left:70%;top:50%;">go</div>' ;
	inner_e+= '<div id="reader_menu_go-files"  class="buttons" onclick="goto_files();"                style="left:50%; top:15%;">go home</div>';
	inner_e+= '<div id="reader_edit"           class="'+edit_class+'" '+edit_function+'  style="left:70%;top:15%;">edit</div>' ;
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	menu_blur();
}
function is_inlist(list){ 
	inlist = false;
	fname_i = document.getElementById('file_title').innerText; 
	for (i=0; i<list.length; i++){ if (fname_i.indexOf(list[i])==fname_i.indexOf('/')){inlist = true;} 
		//alert(fname.indexOf(readonlydir[i])); alert(readonlydir[i]); alert(fname); 
		}
	return(inlist);
}
function goto_files(){ window.location.href = '/index.html'; }
	
function reader_change_lang(){
	//lang = parseInt( localStorage.getItem('reader_lang') );
	lang = parseInt(get_cookie('lang_'+fname));
	lang_new = (lang+1)%3;
	//localStorage.setItem('reader_lang', lang_new);
	document.cookie = "lang_"+fname+"="+lang_new;
	document.getElementById('reader_menu_lang').innerHTML = 'lang '+lang_arr[lang_new];
	}
function reader_editor(){
	text_all = document.getElementById('text_from_file').innerHTML;
	localStorage.setItem('text_parsed', text_all);
	//document.cookie = "text_parsed_"+fname+"="+text_all;
	//alert(123);
	id = get_id();
	text = document.getElementById(id).innerHTML;
	text_plane = merge_text(text);
	//text_plane = replace_all(text_plane, ':nl:', '<br>');
	localStorage.setItem('text_edit', text_plane);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/reader.html');
	window.location.href = '/editor.html';
}


/*
function show_menu_appearance_common(element_id='reader_menu_area'){
	e = document.getElementById(element_id)
	var inner_e = '<input id="reader_menu_appearance-common_reset" type="button" class="buttons" value="reset" onclick="alert(123);" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e += '<input id="reader_menu_appearance-common_buttonsize" type="button" class="buttons" value="buttonsize" onclick="alert(123);" style="left:35%; top:15%; position:fixed; width:14%;">';
	e.innerHTML = inner_e;
}
function show_menu_go(element_id='reader_menu_area'){
	var elem=create_element('div', 'reader_go_area', '','','','','','','');
	var inner_e = '<div id="reader_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="reader_go_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<input id="reader_menu_go_file1" type="button" class="buttons" value="file1" onclick="goto_files();" style="left:35%; top:15%; position:fixed; width:14%;">';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}*/
