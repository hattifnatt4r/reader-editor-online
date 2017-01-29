//var config = {};
//config.readonlydir = ['books_txt',''];
var readonlydir = ['/books_txt/', '/books_pdf/', '/textbooks/', '/encyclopedia/'];
var pdfdir = ['/books_pdf/', '/textbooks/', '/encyclopedia/'];

//-----------------------------------------------------------------------------
var otag = 'em class="text"'; var ctag='em';  var tag_p = 'div';
var div_end = ':nl:'; var div_end = '<br>'; 
var lang_arr = ['auto', 'ru', 'en'];

var symbol_prev =        '<strong style="font-size:200%;line-height:105%;">&#8672;</strong>';
var symbol_prev_editor = '<strong style="font-size:200%;line-height:80%;">&#8672;</strong>';
var symbol_next =        '<strong style="font-size:200%;line-height:105%">&#8674;</strong>';
var symbol_next_editor = '<strong style="font-size:200%;line-height:80%">&#8674;</strong>';
var symbol_enter =       '<strong style="font-size:200%;line-height:105%">&#10004;</strong>';
var symbol_delete =      '<strong style="font-size:200%;line-height:105%;">&#10008;</strong>';
var symbol_delete =      '<strong style="font-size:200%;line-height:105%;">&#10007;</strong>';
var symbol_delete_editor = '<strong style="font-size:200%;line-height:106%;">&#10007;</strong>';
var symbol_cut =         '<strong style="font-size:200%;">&#9985;</strong>';
var symbol_readall =     '<strong style="font-size:100%;line-height:115%;">&#9776;</strong>';
var symbol_play =        '<strong style="font-size:110%;line-height:115%;"> &#8883;</strong>';
var symbol_stop =        '<strong style="font-size:120%;line-height:115%;letter-spacing:-20px;">&#9595;&#9595;</strong>';
var symbol_speed =        '<strong style="font-size:120%;line-height:115%;">&#9837;</strong>';

var bodyStyles = window.getComputedStyle(document.body);
var yn = parseInt(bodyStyles.getPropertyValue('--reader-buttons-ny'));
var btop = parseInt(bodyStyles.getPropertyValue('--reader-texttop-pc'));
var bbot = parseInt(bodyStyles.getPropertyValue('--reader-textbottom-pc'));
var yspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-yspace'));
var xspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-xspace'));
var textright = parseInt(bodyStyles.getPropertyValue('--reader-textright-pc'));

function reader_button_position(i){
	yn=5; btop=2; bbot=98; yspace=4; 
	xn=2; bleft=83; bright=99.5; xspace=2; xspace_bot=1; dx_side=0.4;
	dy = (bbot-btop-(yn-1)*yspace )/yn; 
	y = btop + (i%yn)*(yspace+dy*1);
	//dx=100-bleft-2*xspace;
	dx = (bright-bleft-(xn-1)*xspace )/(xn-1.+dx_side);
	x = bleft + (i-i%yn)/yn*(dx+xspace); 
	//if (i>2 && i<yn ){ dx=bright-bleft-xspace_bot; }
	if ((i-i%yn)/yn==xn-1){ dx = dx*dx_side; }	
	style = 'left:'+x+'%;top:'+y+'%;width:'+dx+'%;height:'+dy+'%;';
	return(style); }
	
function files_button_position(i){
	yn=5; btop=2; bbot=98; yspace=3; xspace=2; textright=82;
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
	$('.text_scroll_box').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); 
	$('.buttons_area').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); 
	$('.reader_zoom_box').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); 
	$('#editor_buttons_area').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); 
}
function editor_back(id){
	//var elem = document.getElementById('reader_buttons_area');
	//var elem = $('#reader_buttons_area');
	//if ( document.getElementById('reader_buttons_area') || document.getElementById('files_buttons_area') ){
		//alert('unblur');
		$('.text_scroll_box').foggy(false); 
		$('.buttons_area').foggy(false); 
		$('.reader_zoom_box').foggy(false); 
		$('#editor_buttons_area').foggy(false); 
	//}
	var elem = document.getElementById(id).parentNode;
	elem.parentNode.removeChild(elem);
}
function utter_paragraph(id, id_all, id_all_w, lang, stop){
	for (i=0; i<id_all.length; i++){
		if (id_all[i].indexOf(id+'s')!=-1) {
			id_i = id_all[i]; stop_s=0;
			if (id_i==id+'s0'){ stop_s=stop; }
			utter_sentence(id_i, id_all_w, lang, stop_s);
	}	}	}
function utter_sentence(id, id_all, lang, stop){
	utter(document.getElementById(id).innerText, lang, stop);
	//for (i=0; i<id_all.length; i++){
	//	if (id_all[i].indexOf(id+'w')!=-1) {
	//		id_i = id_all[i]; stop_w=0;
	//		if (id_i==id+'w0'){ stop_w=stop; }
	//		utter(document.getElementById(id_i).innerText, lang, stop_w);
	//}	}   
	}
function utter(txt, lang, stop){
	//lang_arr = ['auto', 'ru', 'en'];
	var msg = new SpeechSynthesisUtterance(txt);
	ru = /[а-яА-ЯЁё]/.test(txt); en = /[a-zA-Z]/.test(txt); 
	if (lang==0){ if (en){ msg.lang='en'; } if (ru){ msg.lang='ru'; } }
	else { msg.lang=lang_arr[lang]; }
	msg.rate = 0.9; 
	if (stop==1){ window.speechSynthesis.pause(); window.speechSynthesis.cancel(); }
	window.speechSynthesis.speak(msg);	
	}	
	
function create_element(tag, id, cl, st, inner, value, name, onclick, t){
	//alert('create');
	var element = document.createElement(tag);
	element.setAttribute('id', id);
	element.setAttribute('class', cl);
	element.setAttribute('style', st);
	element.setAttribute('value', value);
	element.setAttribute('name', name);
	element.setAttribute('onclick', onclick);
	element.setAttribute('type', t);
	element.innerHTML=inner;
	document.body.appendChild(element);
	return (element);
	}

function replace_all(text, a,b){
	var proceed=1;
	while (proceed==1){
		i = text.indexOf(a);
		if (i==-1) { proceed=0; }
		else { text_i = text.replace(a, b); text = text_i; }
	}
	return(text);
}

function merge_text(text){
	//alert('start: '+text);
	//var tag = 'em'; var tag_p = 'p';
	//closing = '</'+ctag+'></'+ctag+'></'+tag_p+'>';
	text = replace_all(text, '<br>', ':nl:');
	text = replace_all(text, '<abbr>', ':lbr:');
	text = replace_all(text, '</abbr>', ':rbr:');
	//alert('replaced: '+text);
	var proceed = 1;
	while (proceed==1){
		i = text.indexOf('<');
		if (i==-1){ proceed=0; }
		else { i2 = text.indexOf('>');
			text_i = text.substr(0,i)+text.substr(i2+1);
			text = text_i;
			}
		}
	//alert('merged: '+text);
	text = replace_all(text, ':nl:', '<br>');
	text = replace_all(text, ':lbr:', '<abbr>');
	text = replace_all(text, ':rbr:', '</abbr>');
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
		if (ii==-1){pr0=false; }
		
		else{
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
	text = replace_all(text, ':nl:',''); 
	return ([text, arr_w, arr_s, arr_p]);
}


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

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function concatenate_arr(arr1, arr2){ for (i=0; i<arr2.length; i++){ arr1.push(arr2[i]); } return(arr1);}


function get_cookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
