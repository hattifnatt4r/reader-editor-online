//var config = {};
//config.readonlydir = ['books_txt',''];
//alert('common');
var readonlydir = ['/books_txt/', '/books_pdf/', '/textbooks/', '/encyclopedia/'];
var pdfdir = ['/books_pdf/', '/textbooks/', '/encyclopedia/'];

//-----------------------------------------------------------------------------
//var otag = 'em class="text"'; var ctag='em';  var tag_p = 'div';
var otag = 'span class="text"'; var ctag='span';  var tag_p = 'span';
var div_end = ':nl:'; 
var div_end = '<br>'; 
//var lang_arr = ['aut', 'ru', 'en'];
//var lang_auto_arr = ['ru', 'en'];
//var lang_auto_prefer = 0;
var zoomtype_arr = ['no zoom', 'by word', 'by sentence'];
var lang_local = 'en';
var lang_auto = 'en';
var reader_play_counter=1;

var login_messages_en = ['The name does not exists.', 'Wrong password.', ''];
var login_messages_ru = ['Указанное имя не существует.', 'Неправильный пароль.', ''];
var newlogin_messages_en = ['The new user is added successfully.', 'The name is busy.', ''];
var newlogin_messages_ru = ['Новый аккаунт успешно создан.', 'Невозможно создать новый аккаунт. Указанное имя занято.', ''];

var symbol_prev =        '<strong style="font-size:250%;line-height:80%;">&#8249;</strong>';
var symbol_prev_editor = '<strong style="font-size:280%;line-height:30%;">&#8249;</strong>';
var symbol_next =        '<strong style="font-size:250%;line-height:80%">&#8250;</strong>';
var symbol_next_editor = '<strong style="font-size:280%;line-height:30%">&#8250;</strong>';
var symbol_enter =       '<strong style="font-size:200%;line-height:105%">&#10004;</strong>';
var symbol_delete =      '<strong style="font-size:200%;line-height:105%;">&#10007;</strong>';
var symbol_delete_editor = '<strong style="font-size:180%;line-height:106%;">&#10007;</strong>';
var symbol_cut =         '<strong style="font-size:200%;">&#9985;</strong>';
var symbol_readall =     '<strong style="font-size:100%;line-height:115%;">&#9776;</strong>';
var symbol_play =        '<strong style="font-size:110%;line-height:115%;"> &#8883;</strong>';
var symbol_pause =       '<strong style="font-size:120%;line-height:115%;letter-spacing:-20px;">&#9595;&#9595;</strong>';
var symbol_speed =        '<strong style="font-size:120%;line-height:115%;">&#9837;</strong>';
var symbol_login =        '<strong style="font-size:200%;line-height:100%;">login</strong>';
var symbol_upload =       '<strong style="font-size:180%;line-height:115%;">&#8679;</strong>';
var symbol_mail =         '<strong style="font-size:130%;line-height:115%;">&#9993;</strong>';
var symbol_mail =         '<strong style="font-size:90%;line-height:150%;">&#128386;</strong>';
var symbol_newmail =      '<strong style="font-size:130%;">+</strong>';
var symbol_nextpage =   '<strong style="font-size:150%;opacity:0.8;line-height:70%">&#10150;</strong>';
var symbol_navigate =   '<strong style="font-size:300%;line-height:40%;">&#8249;&#8250;</strong>';
var symbol_left  =      '<strong style="font-size:150%;line-height:50%;">&#9668;</strong>';
var symbol_right =      '<strong style="font-size:150%;line-height:50%;">&#9658;</strong>';
var symbol_up =         '<strong style="font-size:150%;line-height:80%;">&#9650;</strong>';
var symbol_down =       '<strong style="font-size:150%;line-height:55%;">&#9660;</strong>';
var symbol_leftword  =      '<strong style="font-size:115%;line-height:70%;">&#9665;</strong>';
var symbol_rightword =      '<strong style="font-size:115%;line-height:70%;">&#9655;</strong>';
var symbol_mute  =      '<strong style="font-size:150%;line-height:120%;">&#128263;</strong>';
var symbol_sound =      '<strong style="font-size:150%;line-height:120%;">&#128265;</strong>';
var symbol_sound_sub =  '<sub><strong style="font-size:90%;"> &#128265;</strong></sub>';
var symbol_sound_sub2 = '<sub><strong style="font-size:90%;"> &#128265;auto</strong></sub>';

var symbols_play_pause = [symbol_play, symbol_pause];
var symbols_sound = [symbol_mute, symbol_sound];

var bodyStyles = window.getComputedStyle(document.body);
var yn = parseInt(bodyStyles.getPropertyValue('--reader-buttons-ny'));
var btop = parseInt(bodyStyles.getPropertyValue('--reader-texttop-pc'));
var bbot = parseInt(bodyStyles.getPropertyValue('--reader-textbottom-pc'));
var yspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-yspace'));
var xspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-xspace'));
var textright = parseInt(bodyStyles.getPropertyValue('--reader-textright-pc'));

function reader_button_position(i){
	yn=4; btop=2; bbot=98; yspace=7; dy_bot=1;
	xn=2; bleft=78; bright=99; xspace=3.5; xspace_bot=1; dx_side=0.8;
	dy = (bbot-btop-(yn-1)*yspace )/yn; 
	dy = dy*yn/(yn-1+dy_bot);
	y = btop + (i%yn)*(yspace+dy*1);
	if (i%yn==yn-1) {y=y;}
	dx = (bright-bleft-(xn-1)*xspace )/(xn-1.+dx_side);
	x = bleft + (i-i%yn)/yn*(dx+xspace); 
	if ((i-i%yn)/yn==xn-1){ dx = dx*dx_side; }	
	if (i%yn==yn-1){ dy = dy*dy_bot; }
	style = 'left:'+x+'%;top:'+y+'%;width:'+dx+'%;height:'+dy+'%;';
	return(style); 
}
	
function files_button_position(i){
	yn=5; btop=2; bbot=98; yspace=6; xspace=4; textright=78;
	dy = (bbot-btop-(yn-1)*yspace )/yn; 
	x = textright+xspace+0.4;  dx=100-textright-2*xspace;
	y = btop + i*(yspace+dy*1);
	style = 'left:'+x+'%;top:'+y+'%;width:'+dx+'%;height:'+dy+'%;';
	return(style); }

/*
set_screen_pars();
function set_screen_pars{
	alert('screen');
	var bodyStyles = window.getComputedStyle(document.body);
	screen_height = window.screen.height+'px';
	screen_width = window.screen.width+'px';
	document.body.style.setProperty('--screen-height', screen_height);
	document.body.style.setProperty('--screen-width', screen_width);
	alert(screen_height);	
	}
*/

function scroll_to(id, id_area, title){
	if (title==0){ elem = document.getElementById(id);  }
	else { elem= document.querySelectorAll('[id="'+id+'"]')[1]; //alert('title '+elem+' '+id+' '+area); 
	}
	rect_scroll = document.getElementById(id_area).getBoundingClientRect(); 
	rect = elem.getBoundingClientRect();  //alert(elem+' '+rect_scroll.right+' '+rect.left+' '+rect.right);
	if (rect.top+0.5*(rect.bottom-rect.top)>rect_scroll.bottom || rect.left+0.5*(rect.right-rect.left)>rect_scroll.right || rect.bottom-0.5*(rect.bottom-rect.top)<rect_scroll.top || rect.right-0.5*(rect.right-rect.left)<rect_scroll.left )
		{elem.scrollIntoView(true);} 
	}

function menu_blur(){
	$('#base_elements').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); 
}
function editor_back(id, foggyoff){
	if (foggyoff==1){ $('#base_elements').foggy(false);  }
	elem = document.getElementById(id).parentNode;
	elem.parentNode.removeChild(elem);
	localStorage.setItem('fastlogin','0');
}
function utter_paragraph(id, id_all, id_all_w, lang, stop, onend){
	for (iii=0; iii<id_all.length; iii++){
		id_i = id_all[iii]; stop_s=0; onend_i=0;
		if (iii==0){ stop_s=stop; }
		if (iii==id_all.length-1){onend_i=onend;}
		utter_sentence(id_i, id_all_w, lang, stop_s, onend_i);
	}	
}	
function utter_sentence(id, id_all, lang, stop, onend){
	txt=document.getElementById(id).innerText;
	//alert(txt);
	/*
	proceed=true; ii=0;
	while(proceed){
		if (txt.length>200){
			txt_i=txt.substring(0,200);
			i=txt_i.lastIndexOf(' ');
			part_i=txt_i.substring(0,i);
			txt=txt.substring(i);
			if (ii==0){ stop_s=stop; }else{stop_s=0;}
			utter(part_i, lang, stop_s, 0);
			ii++;
		}else{proceed=false; //alert(txt); 
			utter(txt, lang, 0, onend); }
	}*/
	utter(txt, lang, stop, onend);
	//alert(id);
}
function utter(txt, lang, stop, onend){                                  // 0-auto, 1-ru, 2-en
	msg = new SpeechSynthesisUtterance(txt);
	ru = /[а-яА-ЯЁё]/.test(txt); en = /[a-zA-Z]/.test(txt); 
	if (lang=='auto'){ if (en){ msg.lang='en'; } if (ru){ msg.lang='ru'; } }
	else { msg.lang=lang; }
	//else { msg.lang=lang_arr[lang]; }
	//if (!ru && !en){ msg.lang=lang_arr[lang]; }
	if (!ru && !en && lang=='auto'){ msg.lang=lang_auto; }
	msg.rate = 0.9; 
	if (stop==1){ window.speechSynthesis.pause(); window.speechSynthesis.cancel(); }
	window.speechSynthesis.speak(msg);	
	reader_play_counter=1;
	msg.onstart=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[1]};
	if (onend==0){ msg.onend=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[0]}; }
	else{ msg.onend=function(event){scrollbut_div(1,0,1)}; }
	}	
	
function create_element(tag, id, cl, st, inner, value, name, onclick, t){
	//alert('create');
	element = document.createElement(tag);
	element.setAttribute('id', id);
	element.setAttribute('class', cl);
	element.setAttribute('style', st);
	element.setAttribute('value', value);
	element.setAttribute('name', name);
	element.setAttribute('onclick', onclick);
	element.setAttribute('type', t);
	element.innerHTML=inner;
	//document.body.appendChild(element);
	document.getElementById('created_elements').appendChild(element);
	return (element);
	}

function replace_all(text, a,b){
	proceed=1;
	while (proceed==1){
		i = text.indexOf(a);
		if (i==-1) { proceed=0; }
		else { text_i = text.replace(a, b); text = text_i; }
	}
	return(text);
}

function merge_text(text){
	//alert('merge 0 '+ctag+': '+text);
	/*
	text = replace_all(text, '<br>', ':nl:');
	text = replace_all(text, '<abbr>', ':lbr:');
	text = replace_all(text, '</abbr>', ':rbr:');
	proceed = 1;
	while (proceed==1){
		i = text.indexOf('<');
		if (i==-1){ proceed=0; }
		else { i2 = text.indexOf('>');
			text_i = text.substr(0,i)+text.substr(i2+1);
			text = text_i;
			}
		}
	text = replace_all(text, ':nl:', '<br>');
	text = replace_all(text, ':lbr:', '<abbr>');
	text = replace_all(text, ':rbr:', '</abbr>');
	*/
	proceed = 1;
	while (proceed==1){
		i = text.indexOf('<'+ctag);
		if (i==-1){ proceed=0; }
		else { i2 = text.indexOf('>',i+1);
			//alert(i+' '+i2+'  '+text);
			text = text.substr(0,i)+text.substr(i2+1); //alert(i+' '+i2+'  '+text);
		}
	} //alert('merge 1');
	text = replace_all(text, '</'+ctag+'>', '');
	return (text);
}

function reader_parse_pdf(text_origin){
	tag = 'div';
	ii=0; ii_start=-1; ii_end=-1; ii_end_prev = 0;
	n=0; pr0 = true; text_new = '';
	idw=[]; ids=[]; idp=[];
	while (pr0){
		//alert(' i_end '+ii_end);
		ii = text_origin.indexOf('<'+tag, ii_end+1); 
		//alert('ii '+ii+' i_end '+ii_end);
		if (ii==-1){
			pr0=false; 
			//word_i = text_origin.substr(ii_end_prev); 
		}else{
			//ii_start = text_origin.indexOf('>',ii+1) + 1;
			//ii_end = text_origin.indexOf('</'+tag+'>',ii+1);
			iii = find_closing(text_origin, tag, ii); //alert(ii_start+' '+ii_end+' '+iii);
			ii_start = iii[0]; ii_end = iii[1];
			word_i = text_origin.substr(ii_start, ii_end-ii_start);  //alert('word = '+word_i);
			parser = reader_parse_txt(word_i, n); 
			word_new = parser[0]; 
			idw=idw.concat(parser[1]); ids=ids.concat(parser[2]); idp=idp.concat(parser[3]); 
			//alert(ii_start+' '+ii_end+' id '+idw+' '+ids+' '+idp);
			text_new += text_origin.substr(ii_end_prev, ii_start-ii_end_prev);
			text_new += word_new;
			//alert( 'text '+ii_end_prev+' '+ii_start+' '+text_origin.substr(ii_end_prev, ii_start-ii_end_prev) );
			//alert('word = '+word_i); alert('parser = '+parser); //alert('textnew = '+text_new);
			ii_end_prev = ii_end; 
			n = parseInt(parser[3][parser[3].length-1].substr(1))+1; //alert('n '+n);
		} 
	}
	text_new += text_origin.substr(ii_end_prev);
	return([text_new, idw, ids, idp]);
}
function find_closing(text, tag, i0){
	i=i0*1; i_start=i0; i_end=i0;
	pr1 = true;
	while (pr1){
		//alert('i '+i);
		i1 = text.indexOf('<'+tag,i+1); //alert('i1 '+i1);
		i_start = text.indexOf('>',i+1) + 1;
		i_end = text.indexOf('</'+tag+'>',i+1);
		//i2 = text.indexOf('</'+tag+'>',i+1);
		//alert('find '+i_start+' '+i_end);
		//i = text_origin.indexOf('<div',i_end+1);
		if (i1==-1 || (i1>i_end && i1!=-1)){ 
			pr1=false; 
			i_start = text.indexOf('>',i+1) + 1;
			i_end = text.indexOf('</'+tag+'>',i+1);
			}
		else{ 
			i = i1*1;
		}
	}
	return([i_start, i_end]);
}
function parse_words(text){
	arr = []; 
	if (text!=''){
		proceed = 1; i=0; i_start=0; word='';
		while (proceed==1){
			i = text.indexOf(' ',i_start+1);
			if (i==-1){
				word = text.substr(i_start); proceed=0; }
			else{
				word = text.substr(i_start, i-i_start); i_start = i; 
			}
			arr.push(word.replace(' ',''));
		}
	}
	//alert(arr);
	return(arr);
}

function reader_parse_txt(text_origin, n_p){
	div_start = '';		
	arr = []; i_start=0;
	proceed = 1; k=0; i=0; word='';
	while (proceed==1){
		i = text_origin.indexOf(' ',i_start+1);
		if (i==-1){
			word = text_origin.substr(i_start); proceed=0; }
		else{
			i1 = text_origin.indexOf('<',i_start+1);
			i2 = text_origin.indexOf('>',i_start+1);
			i3 = text_origin.indexOf('<br>',i_start+1);
			//word = text_origin.substr(i_start, i-i_start); i_start = i; 
			if (i1==-1 || i1>i || (i1<=i&&i1==i3) ){ word = text_origin.substr(i_start, i-i_start); i_start = i; 
			}else{ word = text_origin.substr(i_start, i2-i_start); i_start = i2; }
		}
		arr.push(word);
		}
	
	//otag = 'em class="text"'; ctag='em';  tag_p = 'div';
	p0=n_p.toString();
	text = "<"+tag_p+" id='p"+p0+"'><"+otag+" id='p"+p0+"s0'><"+otag+" id='p"+p0+"s0w0'>";
	i_w = 0; i_s = 0; i_p = n_p; 
	arr_w=['p'+p0+'s0w0']; arr_s=['p'+p0+'s0']; arr_p=['p'+p0];
	//alert(arr);
	//alert(arr.length);
	for (k=0; k<arr.length; k++){
		word=arr[k];
		if (k==arr.length-1){ text = text+word+'</'+ctag+'></'+ctag+'></'+tag_p+'>'; }
		else{
			if (word.indexOf('<')!=-1 && word.indexOf('<br>')==-1){ text = text+word;}
			else{
				if ( word.indexOf(div_end)!=-1 || word.indexOf('\n')!=-1 ){ 
					i_p+=1; i_s=0; i_w=0;
					id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
					text = text+word+'</'+ctag+'></'+ctag+'></'+tag_p+'><'+tag_p+' id="'+id_p+'"><'+otag+' id="'+id_p+id_s+'"><'+otag+' id="'+id_p+id_s+id_w+'">';
					arr_p.push(id_p); arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
				}else if ( word.indexOf('.')!=-1 ){ 
					i_s+=1; i_w=0;
					id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
					text = text+word+'</'+ctag+'></'+ctag+'><'+ctag+' id="'+id_p+id_s+'"><'+otag+' id="'+id_p+id_s+id_w+'">';
					arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
				}else{ 
					i_w+=1;
					id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
					text = text+word+'</'+ctag+'><'+otag+' id="'+id_p+id_s+id_w+'">';
					arr_w.push(id_p+id_s+id_w);
				}
			}
		} 
	}
	//text = replace_all(text, ':nl:',''); 
	return ([text, arr_w, arr_s, arr_p]);
}


function text_from_file(text){
	//alert('from file!');
    page_text = read_file('books_test/test_book_3.txt'); 
    //var page_text = 'test test test';
	text_place = d.getElementById('text_from_file');
	text_place.innerHTML=page_text;
	//alert('from file!');
	//text_place.innerHTML='ghjgjhgjhgj hjhjhk hjkhjhkjhk';
	}

function read_file(file){	
	//var file = 'test_book.txt';
    file_i = new XMLHttpRequest();
    allText = 'empty text';
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

function merge_options(obj1,obj2){
    obj3 = {};
    for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function concatenate_arr(arr1, arr2){ for (i=0; i<arr2.length; i++){ arr1.push(arr2[i]); } return(arr1);}


function get_cookie(cname) {
    name = cname + "=";
    decodedCookie = decodeURIComponent(document.cookie);
    ca = decodedCookie.split(';');
    for( i = 0; i <ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function loadDocXML(url1, login_function) {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      login_function(this);
    }
  };
  xhttp.open("GET", "data/login.xml", true);
  xhttp.send();
}

function get_subdir(name){
	i1 = name.indexOf('/',name.indexOf('/')+1);
	i2 = name.indexOf('/',i1+1);
	if (i2==-1) {dir='';}
	else{ dir=name.substr(i1+1,i2-i1-1); }
	//alert(i1+' '+i2+' '+dir);
	return(dir);
	}
function get_usrname(fname_i){
	i1 = fname_i.indexOf('/');
	i2 = fname_i.indexOf('/',i1+1);
	if (i2==-1) {dir='';}
	else{ dir=fname_i.substr(i1+1,i2-i1-1); }
	//alert(i1+' '+i2+' '+dir);
	return(dir);
	}
