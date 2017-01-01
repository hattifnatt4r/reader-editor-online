
var symbol_prev =        '<strong style="font-size:200%;line-height:105%;">&#8672;</strong>';
var symbol_prev_editor = '<strong style="font-size:200%;line-height:80%;">&#8672;</strong>';
var symbol_next =        '<strong style="font-size:200%;line-height:105%">&#8674;</strong>';
var symbol_next_editor = '<strong style="font-size:200%;line-height:80%">&#8674;</strong>';
var symbol_enter =       '<strong style="font-size:200%;line-height:105%">&#10004;</strong>';
var symbol_delete =      '<strong style="font-size:200%;line-height:105%;">&#10008;</strong>';
var symbol_delete =      '<strong style="font-size:200%;line-height:105%;">&#10007;</strong>';
var symbol_delete_editor = '<strong style="font-size:200%;line-height:106%;">&#10007;</strong>';
var symbol_cut =         '<strong style="font-size:200%;">&#9985;</strong>';

var bodyStyles = window.getComputedStyle(document.body);
var yn = parseInt(bodyStyles.getPropertyValue('--reader-buttons-ny'));
var btop = parseInt(bodyStyles.getPropertyValue('--reader-texttop-pc'));
var bbot = parseInt(bodyStyles.getPropertyValue('--reader-textbottom-pc'));
var yspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-yspace'));
var xspace = parseInt(bodyStyles.getPropertyValue('--reader-buttons-xspace'));
var textright = parseInt(bodyStyles.getPropertyValue('--reader-textright-pc'));
function reader_button_position(i){
	dy = (bbot-btop-(yn-1)*yspace )/yn; 
	x = textright+xspace+0.4;  dx=100-textright-2*xspace;
	//x = 100-lx*1.1;  
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

function scroll_to(id, id_area, title=0){
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
function utter(txt, lang='ru'){
	//var txt = document.getElementById(id).innerText;
	var msg = new SpeechSynthesisUtterance(txt);
	//lang = localStorage.getItem('reader_lang');
	ru = /[а-яА-ЯЁё]/.test(txt); en = /[a-zA-Z]/.test(txt); 
	if (en){ msg.lang='en'; } else{msg.lang=lang;}
	if (ru){ msg.lang='ru'; } 
	msg.rate = 0.9; //msg.lang = 'ru';
	window.speechSynthesis.pause()
	window.speechSynthesis.cancel()
	window.speechSynthesis.speak(msg);	
	}	
	
function create_element(tag, id, cl='', st='', inner='', value='', name='', onclick='', t=''){
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
	var tag = 'em'; var tag_p = 'p';
	closing = '</'+tag+'></'+tag+'></'+tag_p+'>';
	text = replace_all(text, closing, ':nl:');
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
	text = replace_all(text, ':lbr:', '<abbr>');
	text = replace_all(text, ':rbr:', '</abbr>');
	return (text);
	}

function reader_parse_text(text_origin){
	var div_end = '\n'; var div_start = '';
		
	var arr = []; var i_start=0;
	var proceed = 1; var k=0; var i=0; var word='';
	while (proceed==1){
		i = text_origin.indexOf(' ',i_start+1);
		if (i==-1){
			word = text_origin.substr(i_start); proceed=0; }
		else{
			word = text_origin.substr(i_start, i-i_start); i_start = i; }
		arr.push(word);
		}
	
	var tag = 'em'; var tag_p = 'p';
	var tag = 'em class="text"'; var tag_p = 'p';
	var text = "<"+tag_p+" id='p0'><"+tag+" id='p0s0'><"+tag+" id='p0s0w0'>";
	var i_w = 0; var i_s = 0; var i_p = 0;
	var arr_w=['p0s0w0']; var arr_s=['p0s0']; var arr_p=['p0'];
	//alert(arr);
	//alert(arr.length);
	for (k=0; k<arr.length; k++){
		word=arr[k];
		if (k==arr.length-1){ text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'>'+  '<'+tag_p+'><br></'+tag_p+'>'; }
		else{
			//id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
			if ( word.indexOf(':nl:')!=-1 ){ 
			//if ( word.indexOf('\n')!=-1 ){ 
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
	text = replace_all(text, ':nl:',''); 
	//alert('parsed:'+text);
	word_id = arr_w;
	sentence_id = arr_s;
	paragraph_id = arr_p;
	//return (text);
	return ([text, word_id, sentence_id, paragraph_id]);
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
