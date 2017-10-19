
var common = {
	langbase: "en",
	lang: "auto",
	editor_nlines_lvl0: 3,
	editor_nlines_lvl1: 2,
	fontsize: 0.8,
	time_delay: 10,
	welcome: 'do',
	
	cookie_number: 7,
	browser: "",
	cookie_suffix: "_",
	name: "common",
	play_counter: 1,
	utter_text: '',
	utter_stop: 0,
	utter_onend: 0,
	repeat_text: '',
	
	symbol_ltag: '<abbr>',
	symbol_rtag: '</abbr>',
	otag: "span",
	ctag: "span",
	ptag: "span",
	
	time_click: 0,
	
	cookie_save: function(){                                             consolelog_func('brown');
	    var keys = Object.keys(this);                                    
	    var i;
	    for (i=0; i<this.cookie_number; i+=1){                             
	        cookie_set(keys[i]+this.cookie_suffix, this[keys[i]].toString() );                    
		}
	},
	cookie_load: function(){                                             consolelog_func('brown');
	    var keys = Object.keys(this);                                    
	    var i; var v;
	    for (i=0; i<this.cookie_number; i+=1){                           
			v = cookie_get(keys[i]+this.cookie_suffix);                  
			if (v == 'true') { v=true; }
			else if (v == 'false') { v=false; }
			else if ( v.match(/\d+/g)!=null && v.match(/[a-z]/i)===null ) { 
				if (v.indexOf('.')==-1) { v=parseInt(v); }
				else { v=parseFloat(v); }   
			}         
			this[keys[i]] = v;                                           //console.log(keys[i]+' | '+v);
		}
	},
	style: {}	
}

common.style = {
	class_arr: ["buttons", "buttons disabled", "buttons symbol", "buttons symbol disabled", "buttons editor", "buttons editor disabled"],
    yn:4, btop:3.5, bbot:96.5, 
    xn:2, bright:98, xspace:4, dx_side:1,
    dy: 16.5, xy_ratio: 1.1,
    textheight_zoom: 78,
    textheight: 97,
    b_width: 12, 
    b_height: 17,
    
    get_content_width: function(){                                       consolelog_func('brown');
		var wratio = window.innerWidth/window.innerHeight;
		var bright = wratio*this.bright;
		var dx = this.xy_ratio*this.dy;
		var content_width = (bright - 2*dx -this.xspace-1*wratio);
		return(content_width);
	},
    buttonpos: function(i, class_n){                                     consolelog_func('brown');
		var wratio = window.innerWidth/window.innerHeight;
		if (class_n===undefined) {class_n=0;}
		var class_name = this.class_arr[class_n];
	    var bright = wratio*this.bright;           
	    var n_x = (i-i%this.yn)/this.yn;
	    
	    var dx = this.dy*1.1;
	    var yspace = (this.bbot-this.btop-(this.yn)*this.dy ) / (this.yn-1); 
	    var y = this.btop + (i%this.yn)*(yspace+this.dy*1);
	    var x = bright - (this.xn-n_x)*dx - (this.xn-n_x-1)*this.xspace; 
	    if ((i-i%this.yn)/this.yn==this.xn-1){ dx = dx*this.dx_side; }    
	    var style = 'left:'+x/wratio+'%;top:'+y+'%;width:'+dx/wratio+'%;height:'+this.dy+'%; border-bottom-width:'+this.dy*0.13+'%;';
	    return('class="'+class_name+'" style="'+style+'"'); 
	},
	
	buttonpos_menu: function(i, class_n, x_dim, y_dim, shift_n, shift_nleft){  consolelog_func('brown'); 
		if (class_n===undefined) {class_n=0;}
		var class_arr = ["buttons", "buttons_text", "text_zoom_box", "buttons disabled"];
		var class_name = class_arr[class_n];
		
		if (shift_nleft===undefined) {shift_nleft=0; shift_n=0;}
		if (x_dim===undefined) {x_dim=4; y_dim=2;}
		var b_width = 12; var b_height = 17;
		var b_width = this.b_width; var b_height = this.b_height;
		var b_left = 16;  var b_right = 84; 
		var b_top = 25; var b_bot = 75;
		if (y_dim===3) { b_left=15; b_right=85; b_top=17; b_bot=83; }
		if (y_dim===5) { b_left=15; b_right=85; b_top=14; b_bot=86; }
		var b_sspace = 1;
		var nx = i%(x_dim); var ny = (i-i%(x_dim))/x_dim;
		
		var class_arr = ["buttons"]
		
		var b_xspace = (b_right-b_left-b_width*x_dim - b_sspace*shift_n)/(x_dim-1-shift_n);
		var x = b_left + b_width*nx + b_xspace*(nx-shift_nleft) + b_sspace*shift_nleft;
		var b_yspace = (b_bot-b_top-b_height*y_dim)/(y_dim-1);
		var y = b_top + (b_yspace+b_height)*ny;
		//if (class_n===1) { x += b_xspace-1; }
		//if (class_n===2) { b_width = ( b_right-b_left-3*b_xspace-b_width); }
		if (class_n===2) { b_width = 2*b_width+b_xspace; }
		var style = 'left:'+x+'%; top:'+y+'%;'+'width:'+b_width+'%; height:'+b_height+'%;';  
		if (class_n===0){ style+= 'background-color: rgba(110, 152, 27, 0.7);'; }
		if (class_n===0){ style+= 'background-color: rgba(110, 152, 27, 0.7);'; }
		return('class="'+class_name+'" style="'+style+'"');
	},
	
	resize: function(){                                                  consolelog_func('brown');
		var wratio = window.innerWidth/window.innerHeight;
		var content_width = this.get_content_width();
		var elem = document.getElementById('content_box');
	    if (elem){ elem.style.width= content_width/wratio+'%'; }
	    var elem = document.getElementById('zoom_box');
	    if (elem){ elem.style.width= (content_width-5.4*wratio)/wratio+'%'; }  
	    var elem = document.getElementById('buttons_area');
	    if (elem){ elem.style.left= (content_width-0.5*wratio)/wratio+'%'; } 
	}	
}

common.browser = check_browser();


document.addEventListener("click",handler,true);
function handler(e){                                                     consolelog_func(); 
	var time = new Date().getTime();
	var type = e.target.type;     
	if (type===undefined){
		if (time-common.time_click<common.time_delay) {                      
			e.stopPropagation();
		    e.preventDefault();
		}
		else{ common.time_click = time; }
	}
}


var readonlydir = ['/books_txt/', '/books_pdf/', '/textbooks/', '/encyclopedia/'];
var pdfdir = ['/books_pdf/', '/textbooks/', '/encyclopedia/'];

//-----------------------------------------------------------------------------

var login_messages_en = ['The name does not exists.', 'Wrong password.', ''];
var login_messages_ru = ['Указанное имя не существует.', 'Неправильный пароль.', ''];
var newlogin_messages_en = ['The new user is added successfully.', 'The name is busy.', ''];
var newlogin_messages_ru = ['Новый аккаунт успешно создан.', 'Невозможно создать новый аккаунт. Указанное имя занято.', ''];

var symbol_nextpage1 =   '<span>xyz</span>';
var symbol_nextpage2 =   '123';
var symbol_nextpage3 =   '^ / %';

//var symbol_enter = '<svg class="ion_symbol"> <use xlink:href="#ion-left-right"></use> </svg>';
var symbol_enter     = '<svg class="ion_symbol ion_symbol_smaller"> <use xlink:href="#ion-checkmark-round"></use> </svg>';
var symbol_prev_next = '<svg class="ion_symbol"> <use xlink:href="#ion-left-right"></use> </svg>';
var symbol_prev_prev = '<svg class="ion_symbol"> <use xlink:href="#ion-left-left"></use> </svg>';
var symbol_next_next = '<svg class="ion_symbol"> <use xlink:href="#ion-right-right"></use> </svg>';
var symbol_up_down   = '<svg class="ion_symbol"> <use xlink:href="#ion-up-down"></use> </svg>';
var symbol_play      = '<svg class="ion_symbol" style="position:relative;" > <use xlink:href="#ion-play-pause"></use> </svg>';
var symbol_pause     = '<svg class="ion_symbol"> <use xlink:href="#ion-pause"></use> </svg>';
var symbol_next      = '<svg class="ion_symbol"> <use xlink:href="#ion-arrow-right-b"></use> </svg>';
var symbol_prev      = '<svg class="ion_symbol"> <use xlink:href="#ion-arrow-left-b"></use> </svg>';
var symbol_up        = '<svg class="ion_symbol"> <use xlink:href="#ion-arrow-up-b"></use> </svg>';
var symbol_down      = '<svg class="ion_symbol"> <use xlink:href="#ion-arrow-down-b"></use> </svg>';
var symbol_sound_on  = '<svg class="ion_symbol"> <use xlink:href="#ion-android-volume-up"></use> </svg>';
var symbol_sound_off = '<svg class="ion_symbol"> <use xlink:href="#ion-android-volume-off"></use> </svg>';
var symbol_delete    = '<svg class="ion_symbol"> <use xlink:href="#ion-backspace"></use> </svg>';
var symbol_undo      = '<svg class="ion_symbol"> <use xlink:href="#ion-ios-undo"></use> </svg>';
var symbol_redo      = '<svg class="ion_symbol"> <use xlink:href="#ion-ios-redo"></use> </svg>';


var symbols_play_pause = [symbol_play, symbol_pause];
var symbols_sound = [symbol_sound_off, symbol_sound_on];


function check_browser(){                                                consolelog_func(); 
    c = navigator.userAgent.search("Chrome");
    f = navigator.userAgent.search("Firefox");
    m8 = navigator.userAgent.search("MSIE 8.0");
    m9 = navigator.userAgent.search("MSIE 9.0");
    if (c > -1) {
        browser = "Chrome";
    } else if (f > -1) {
        browser = "Firefox";
    } else if (m9 > -1) {
        browser ="MSIE 9.0";
    } else if (m8 > -1) {
        browser ="MSIE 8.0";
    } else{ browser = "Other";}
    return browser;
}

function scroll_to(id, id_area, title){                                  consolelog_func(); 
    if (title==0){ elem = document.getElementById(id);  }
    else { elem= document.querySelectorAll('[id="'+id+'"]')[1]; 
    }
    rect_scroll = document.getElementById(id_area).getBoundingClientRect(); 
    rect = elem.getBoundingClientRect();  
    if (rect.top+0.5*(rect.bottom-rect.top)>rect_scroll.bottom || rect.left+0.5*(rect.right-rect.left)>rect_scroll.right || rect.bottom-0.5*(rect.bottom-rect.top)<rect_scroll.top || rect.right-0.5*(rect.right-rect.left)<rect_scroll.left )
        {elem.scrollIntoView(true);} 
}

function utter_paragraph(id, id_all, id_all_w, stop, onend){             consolelog_func(); 
    for (iii=0; iii<id_all.length; iii++){
        id_i = id_all[iii]; stop_s=0; onend_i=0;
        if (iii==0){ stop_s=stop; }
        if (iii==id_all.length-1){onend_i=onend;}
        var txt = document.getElementById(id_i).innerText;
        utter_sentence(txt, stop_s, onend_i);
    }    
}    
function utter_sentence(txt, stop, onend, repeat){                       consolelog_func();  
    if (repeat!==undefined){ txt=common.repeat_text; }                   //console.log(txt);
    var proceed=true; 
    var ii=0, i=0, txt_i='', part_i='';
    while(proceed){
        if (txt.length>200){
            txt_i=txt.substring(0,200);
            i=txt_i.lastIndexOf(',');                                    
            if (i===-1){i=txt_i.lastIndexOf(' ');}
            part_i=txt_i.substring(0,i+1);
            txt=txt.substring(i+1);
            if (ii==0){ stop_s=stop; }else{stop_s=0;}                    
            if (common.utter_text===''){ common.utter_onend = onend; }
            else{ onend = common.utter_onend; }
            common.utter_onend = onend;
            common.utter_text = txt;
            utter(part_i, stop_s, 1);
            ii++;
        }else{                                                           
			if (common.utter_text!=''){
				stop=0;
				onend = common.utter_onend;
			}
			proceed=false;                                               
			common.utter_text = '';
            utter(txt, stop, onend); 
        }
    }
}
function utter(txt, stop, onend, rate){                                  consolelog_func(); 
	if (rate===undefined){rate=1;}
	
	if (document.title=='reader'){
		if (editor.if_spell===1){
			txt = editor.spell_arr[editor.i_spell];
			editor.i_spell +=1;
			if (editor.spell_arr.length===editor.i_spell){
				onend=0;
				editor.i_spell = 0;
				editor.if_spell=0; 
				editor.spell_arr=[];                                         
			}
		}
	}
	txt.replace('.', ' ');                                               
	
    var msg = new SpeechSynthesisUtterance();
    msg.text = txt;
    //var voices = speechSynthesis.getVoices();
    //msg.voice = voices[0];   
    //console.log(msg.voice);
    
    ru = /[а-яА-ЯЁё]/.test(txt); en = /[a-zA-Z]/.test(txt); 
    if (common.lang=='auto'){ if (en){ msg.lang='en'; } if (ru){ msg.lang='ru'; } }
    else { msg.lang=common.lang; }
    if (!ru && !en && common.lang=='auto'){ msg.lang=common.langbase; }
    msg.rate = rate;                                                     //console.log('rate: '+msg.rate+', lang: '+msg.lang+', txt: '+msg.text+', stop: '+stop);
    if (stop==1){ 
		if (common.browser!='Firefox'){
			window.speechSynthesis.pause();         
		}
		window.speechSynthesis.cancel();        
	}   
    
    window.speechSynthesis.speak(msg);  
      
    if (document.title=='reader'){
    common.play_counter=1;
	    msg.onstart=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[1]};
	    if (onend==0){ 
			msg.onend=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[0]}; 
		}else{ 
			if (editor.if_spell===1){ msg.onend=function(event){editor_spell_i()}; }
			else if (common.text_utter!='') { msg.onend=function(event){utter_sentence(common.utter_text, '', '')}; }
			else{ msg.onend=function(event){reader_scroll(1,0,1)}; }
		}
	}
}    
    
function create_element(id, cl, parent, style, inner){                   consolelog_func(); 
    if (parent===undefined){ parent = 'created_elements'; }
    var element = document.createElement('div');
    element.setAttribute('id', id);
    element.setAttribute('class', cl);
    if (style!=undefined) { element.setAttribute('style', style); }
    if (inner!=undefined) { element.innerHTML=inner; }
    document.getElementById(parent).appendChild(element);
    return (element);
}

function replace_all(text, a,b){                                         consolelog_func(); 
    proceed=1;
    while (proceed==1){
        i = text.indexOf(a);
        if (i==-1) { proceed=0; }
        else { text_i = text.replace(a, b); text = text_i; }
    }
    return(text);
}

function merge_text(text){                                               consolelog_func(); 
    proceed = 1;
    while (proceed==1){
        i = text.indexOf('<'+common.ctag);
        if (i==-1){ proceed=0; }
        else { 
			i2 = text.indexOf('>',i+1);                               
            text = text.substr(0,i)+text.substr(i2+1);                   
        }
    }                                                                    
    text = replace_all(text, '</'+common.ctag+'>', '');
    return (text);
}

function find_closing(text, tag, i0){                                    consolelog_func(); 
    i=i0*1; i_start=i0; i_end=i0;
    pr1 = true;
    while (pr1){
        i1 = text.indexOf('<'+tag,i+1);
        i_start = text.indexOf('>',i+1) + 1;
        i_end = text.indexOf('</'+tag+'>',i+1);
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
function parse_words(text){                                              consolelog_func(); 
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
    return(arr);
}


function find_spaceend(txt, i_start){                                    consolelog_func(color="green", noargs=true); 
	if ( txt[i_start]!=' ' || i_start==txt.length ) { return(i_start); }
	if ( i_start === undefined ) { i_start = 0; }
	var proceed = 1; var i=i_start+1;
	while (proceed==1){
		if ( i>=txt.length-1 ) { proceed=0; }
		else if ( txt[i]!=' ' ) { proceed=0; }
		else { i+=1; } 
	}                                                                    
	return (i); 
}
function find_spacestart(txt, i_start){                                  consolelog_func(color="green", noargs=true); 	
	if ( i_start === undefined ) { i_start = txt.length-1; }
	var proceed = 1; var i=i_start;
	while (proceed==1){
		if ( i<=0 ) { proceed=0; }
		else if ( txt[i-1]!=' ' ) { proceed=0; }
		else { i-=1; } 
	}                                                                    
	return (i); 
}

function find_indexof(text_origin, arr, i_start, i_end){                 consolelog_func(color="green", noargs=true); 
	if ( i_start === undefined ) { i_start = 0; }                       
	if ( i_end === undefined ) { i_end = text_origin.length; }           
	var txt = text_origin.substring(i_start, i_end);                     
	var i=0, j=0, res=txt.length, symb='', success=0;
	
	for (i=0; i<arr.length; i++) {
		j = txt.indexOf(arr[i]);
		if ( j!=-1 && j<res ) { res=j; symb=arr[i]; success=1; }
	}                                                                    
	if ( success == 0 ) { res = -1; }
	else {res = res+i_start; }
	return([res, symb]);
}
function find_indexof_all(text_origin, arr, i_start, i_end){             consolelog_func(color="green", noargs=true); 
	if ( i_start === undefined ) { i_start = 0; }                        
	if ( i_end === undefined ) { i_end = text_origin.length; }           
	var txt = text_origin.substring(i_start, i_end);                     
	var i=0, j=0, res=txt.length, symb='', success=0;
	var res_arr = [];
	var proceed = true; var k=0;                                         
	
	while (proceed){
		success = 0; res = txt.length;
		for (i=0; i<arr.length; i++) {
			j = txt.indexOf(arr[i], k);
			if ( j!=-1 && j<res ) { 
				res=j; symb=arr[i]; success=1;      
			}
		}                                                                    
		if ( success == 0 ) { 
			res = -1; 
			proceed = false;
		}else { 
			if ( symb == "<" ) { 
				k = txt.indexOf(">", k+1)+1; 
				
				var proceed2 = 1; 
				while (proceed2==1){
					if ( k>=txt.length-1 || txt[k]!=' ') { proceed2=0; }
					else { k+=1; } 
				}         
			}
			else{ k = res + symb.length; }
			res_arr.push([res,symb]);
		}
	}
	for (i=0; i<res_arr.length; i+=1) { res_arr[i][0] += i_start; }
	return(res_arr);
}
function common_textto_read(text){                                       consolelog_func(); 
	text = text.replace('<br>', ' new line ');
	text = text.replace('<abbr>', '');
	text = text.replace('</abbr>', '');
	return(text);
}

function text_clean(text_origin){                                        consolelog_func();  // only void tags allowed!  
	var txt = text_origin.replace('\n','<br>');                          
	var proceed = 1, i = 0, j1=0, j2=0; 
	i = txt.indexOf('<');
	if (i===-1) {proceed=0;}
	while (proceed==1){                                                  
		j1 = txt.indexOf('>', i);
		j2 = txt.indexOf('<', i+1);
		if (i===txt.length-1) { txt = txt.substring(0,i); proceed=0; }
		else if (j2===-1) { proceed=0; }
		else if (j1===-1 || j1>j2 ) { txt = txt.substring(0,i)+txt.substring(i+1); alert('lonely bracket!! '+i); 
		}
		i = j2;
	}
	replace_all(txt, '< ', '<'); 
	replace_all(txt, '</ ', '</');
	return (txt);
}
function reader_parse_html(text_origin){                                 consolelog_func(); 
	if (text_origin.replace(' ','')==='') { return reader_parse_txt(text_origin, 0); }
	
	var txt = text_clean(text_origin);  
	
	//var endtag = ['div','p','article','aside','button','canvas','caption','cite','code','datalist','del','details','dialog','dl','dt','figcaption','figure','footer'];
	var tag_arr = ['div','p', 'h1', 'h2', 'h3'];                                            
	
	tag_open_close = [];
	for (i=0; i<tag_arr.length; i+=1) { tag_open_close.push("<"+tag_arr[i]); }
	for (i=0; i<tag_arr.length; i+=1) { tag_open_close.push("</"+tag_arr[i]); }        
	
	var index_arr = [[0,0]];
	var proceed=1, j1=0, j2=0;                                                            
	while (proceed==1){                                                  // devide text by tags. index_arr[i] = [ tag_start, tag_end ]		
		j1=txt.length;
		for (i=0; i<tag_open_close.length; i+=1){
			ii = txt.indexOf(tag_open_close[i],j2);
			if (ii===-1){ii=txt.length;}
			if (ii<j1){j1=ii;}
		}if (j1===txt.length){j1=-1;}                                    
		
		if (j1!=-1) {
			j2 = txt.indexOf('>', j1); 
			index_arr.push([j1,j2+1]);                                   
		}else{ proceed=0; }
	}
	index_arr.push([txt.length,txt.length]);                             //console.log('index_arr: '+index_arr);
	
	var text_final = "", arr_w=[], arr_s=[], arr_p=[];
	var i=0, n_p=0, txt_i="", txt_parsed="", tag1="", tag2="", upper_div=false, skip_div=false;
	for (i=1; i<index_arr.length; i+=1){                                 //console.log('text block: '+i+', index_arr[i]='+index_arr[i]);
		skip_div=false;                                                  // 
		upper_div=false;                                                 // div without div inside
		txt_i = txt.substring(index_arr[i-1][1], index_arr[i][0]);       
		text_final += txt.substring(index_arr[i-1][0], index_arr[i-1][1]);  
		
		if (i>1 && i<index_arr.length-1) {
			tag1 = txt.substring(index_arr[i-1][0], index_arr[i-1][1]);      
			tag2 = txt.substring(index_arr[i][0], index_arr[i][1]);          
			if (tag1.indexOf("</")===-1 && tag2.indexOf("</")!=-1 ) {
				upper_div=true;            
				if (tag1.indexOf("void_div")!=-1) { skip_div=true; }
			}
			else{ upper_div=false; }
		}else{upper_div=false;}                                          
		
		//console.log(' scip: '+skip_div+'|'+txt_i.toString().replace(' ','').substring(0,300)+'|');
		//console.log('----------------------');
		//if (txt_i.length>300){ console.log(txt_i.substring(0,300)+"..."); }
		//else { console.log(txt_i); }
		
		if ( (txt_i.toString().replace(' ','')!=='' || upper_div==true) && skip_div===false ) { 
			txt_parsed = reader_parse_txt(txt_i, n_p);                   //console.log(txt_parsed[0].substring(0,300)); 
			text_final += txt_parsed[0];                                 
			arr_w = arr_w.concat(txt_parsed[1]);
			arr_s = arr_s.concat(txt_parsed[2]);
			arr_p = arr_p.concat(txt_parsed[3]);                                     
			n_p = txt_parsed[4]+1;
		}
	}                                                                    
	return ([text_final, arr_w, arr_s, arr_p]);
}

function reader_parse_txt(text_origin, n_p){                             consolelog_func(); 
    var txt = text_origin;
    var endsymbol = ['<br>', '...', '!!!', '???', '.', '!', '?', ',', ' ','<'] ;
    var emptytag = ['area','base','col','command','embed','hr','img','input','ceygen','link','meta','param','source','track','wbr','video','audio'];
    var proceed = 1, i = 0, i_end=0, j = [], arr = [], tag_arr=[]; 
    var tag_i = "";
    
    if (txt[0]==' '){
		//i = find_spaceend(txt,0);		
		var proceed2 = 1; 
		while (proceed2==1){                                             // find first not-space symbol
			if ( i>=txt.length-1 || txt[i]!=' ') { proceed2=0; }
			else { i+=1; } 
		}  
		arr.push( txt.substring(0,i) );
	}
	var arr_endpositions = find_indexof_all(txt, endsymbol );  
	var k=0;        
	var i_end_test=0;
	for (k=0; k<arr_endpositions.length; k+=1){
		if ( i>=txt.length-1 ) { break; }                                
		if (k<arr_endpositions.length-1) { i_end_test = arr_endpositions[k+1][0]; }
		else { i_end_test = txt.length; }
		
		j = arr_endpositions[k];                                         //if (k<10){console.log(k+" ["+j+"]");}
		if ( k==arr_endpositions.length-1 ) {                            // end of text
			i_end = txt.length; 
			proceed=0; 
		} else if ( j[0]==i && j[1]=="<" ) {                             // 
			i_end = txt.indexOf(">", i)+1;           
			tag_i = txt.substring(i+1, txt.indexOf(" ",i));
			if ( emptytag.indexOf(tag_i)!=-1 ) { tag_arr.push(arr.length); }    // remember index if word with non-empty tag, to preserve html structure
		} else if ( j[0]==i ){                                           //
			i_end = j[0]+j[1].length;
			a=0;  
		} else {                                                         
			if (j[1]==' ') { i_end = j[0]+1; }
			else { i_end = j[0]; }    
			a=0;                                   
        }   
                 
        var proceed2 = 1; 
		while (proceed2==1){                                             // find first not-space symbol
			if ( i_end>=txt.length-1 || txt[i_end]!=' ' ) { proceed2=0; }
			else { i_end+=1; } 
		}  
		                                                         
        if (i!=i_end){
			arr.push( txt.substring(i,i_end) );     
		}                         
        //if (j[1]=='<br>'){ console.log( k+" ["+j+"], word: "+txt.substring(i,i_end).substring(0,300) ); }
        i = i_end;
    }                                                                    
    if (arr.length===0){ arr=[" "]; }                                    
    
    var endsentence = ['...', '!!!', '???', '.', '!', '?'];
    var p0=n_p.toString();  
    var text = '';
    var i_w = 0, i_s = 0, i_p = n_p; 
    var arr_w=['p'+p0+'s0w0'], arr_s=['p'+p0+'s0'], arr_p=['p'+p0];
    
    var id_p='', id_s='', id_w='';
    var word='', word_start = '', word_end='';
    var otag=common.otag, ctag=common.ctag, tag_p=common.ptag;
    var character='';
    
    word_start = "<"+tag_p+" id='p"+p0+"'><"+otag+" id='p"+p0+"s0'><"+otag+" id='p"+p0+"s0w0'>";
    
    var i = arr.length-1,  i_end=-1;
    while (i_end==-1 && i>=0 ) {
		if ( tag_arr.indexOf(i)==-1 ) { i_end = i; }
		else { i -=1; } 
	}                                                                    
    
    var new_sentence = false;
    for (i=0; i<arr.length; i+=1){
        word=arr[i];             
        if (i===i_end) {character = 'A';}
        else{ character = arr[i+1].charAt(0); }
        if (character.toLowerCase() === character.toUpperCase() && /^\d+$/.test(character)===false){ character='a'; }   
		new_sentence = (character == character.toUpperCase() && endsentence.indexOf(word.replace(' ',''))!=-1); 
		
        if ( tag_arr.indexOf(i)!=-1 ) {                                  // if tag, no wrapping
				text = text+word; 
		} else if (i===i_end) {                                          // last word
			word_end = '</'+ctag+'></'+ctag+'></'+tag_p+'>'; 
			text = text+ word_start + word + word_end;
			
		} else if ( word.indexOf('<br>')!=-1 ){                          // new paragraph
			i_p+=1;  i_s=0;  i_w=0;
			id_p = 'p'+i_p; 
			id_s = 'p'+i_p + 's'+i_s; 
			id_w = 'p'+i_p + 's'+i_s + 'w'+i_w;
			arr_p.push(id_p);  arr_s.push(id_s);  arr_w.push(id_w);
			
			word_end = '</'+ctag+'></'+ctag+'></'+tag_p+'>';
			text = text+ word_start + word + word_end;
			word_start =  '<'+tag_p+' id="'+id_p+'"><'+otag+' id="'+id_s+'"><'+otag+' id="'+id_w+'">';
			
		} else if ( new_sentence ){                                      // new sentence
			i_s+=1; i_w=0;
			id_s = 'p'+i_p + 's'+i_s; 
			id_w = 'p'+i_p + 's'+i_s + 'w'+i_w;
			arr_s.push(id_s);  arr_w.push(id_w);
			
			word_end = '</'+ctag+'></'+ctag+'>';
			text = text+ word_start + word + word_end;
			word_start =  '<'+otag+' id="'+id_s+'"><'+otag+' id="'+id_w+'">';
			
		} else {                                                         // new word
			i_w+=1;
			id_w = 'p'+i_p + 's'+i_s + 'w'+i_w;
			arr_w.push(id_w);
			
			word_end = '</'+ctag+'>';
			text = text+ word_start + word + word_end;
			word_start =  '<'+otag+' id="'+id_w+'">';
		}
    }
    return ([text, arr_w, arr_s, arr_p, i_p]);


}


function text_from_file(text){                                           consolelog_func(); 
    var page_text = read_file('books_test/test_book_3.txt'); 
    var text_place = d.getElementById('text_from_file');
    text_place.innerHTML=page_text;
}

function read_file(file){                                                consolelog_func(); 
    var file_i = new XMLHttpRequest();
    var allText = 'empty text';
    file_i.onreadystatechange = function (){                             consolelog_func();    
    if(file_i.readyState === 4)
        {   if(file_i.status === 200 || file_i.status == 0)
            {   allText = file_i.responseText;
            }
        }
    }
    file_i.open("GET", file, false);
    file_i.send(null);
    return allText;
}

function merge_options(obj1,obj2){                                       consolelog_func(); 
    obj3 = {};
    for (attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
function concatenate_arr(arr1, arr2){                                    consolelog_func(); 
	for (i=0; i<arr2.length; i++){ arr1.push(arr2[i]); } 
	return(arr1);
}


function loadDocXML(url1, login_function) {                              consolelog_func(); 
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {                                consolelog_func(); 
    if (this.readyState == 4 && this.status == 200) {
      login_function(this);
    }
  };
  xhttp.open("GET", "data/login.xml", true);
  xhttp.send();
}

function get_subdir(name){                                               consolelog_func(); 
    var i1 = name.indexOf('/',name.indexOf('/')+1);
    var i2 = name.indexOf('/',i1+1);
    var dir = "";
    if (i2==-1) {dir='';}
    else{ dir=name.substr(i1+1,i2-i1-1); }
    return(dir);
}
function get_usrname(fname_i){                                           consolelog_func(); 
    var i1 = fname_i.indexOf('/');
    var i2 = fname_i.indexOf('/',i1+1);
    var dir = "";
    if (i2==-1) {dir='';}
    else{ dir=fname_i.substr(i1+1,i2-i1-1); }
    return(dir);
}


//-- show functions ------------------------------------------------------------
//------------------------------------------------------------------------------
function common_show_lang(lvl, parent){                                  consolelog_func(); 
    var inner_e = ''; var lang='';
    inner_e+=     '<div id="en"               onclick="common_set_lang(this.id,'+true+');" '+common.style.buttonpos_menu(1,0)+'>en</div>';
    inner_e+=     '<div id="ru"               onclick="common_set_lang(this.id,'+true+');" '+common.style.buttonpos_menu(2,0)+'>ru</div>';
    inner_e+=     '<div id="en"               onclick="common_set_lang(this.id,'+false+');" '+common.style.buttonpos_menu(5,0)+'>en</div>';
    inner_e+=     '<div id="ru"               onclick="common_set_lang(this.id,'+false+');" '+common.style.buttonpos_menu(6,0)+'>ru</div>';
    inner_e+=     '<div id="auto"             onclick="common_set_lang(this.id,'+false+');" '+common.style.buttonpos_menu(7,0)+'>auto</div>';
    inner_e+=     '<div id="common_langbase_zoom"  onclick="" '+common.style.buttonpos_menu(0,1)+'>'+common.langbase+'</div>';
    inner_e+=     '<div id="common_lang_zoom"      onclick="" '+common.style.buttonpos_menu(4,1)+'>'+common.lang+'</div>';
    if (editor!=undefined) {parent = "editor_created_elements";}
    common_create_menu('common_lang',lvl, inner_e, parent);
}
function common_set_lang(lang, is_base){                                 consolelog_func(); 
    if (is_base===true){ 
		common.langbase = lang; 
		document.getElementById('common_langbase_zoom').innerHTML = lang;
	}else{ 
		common.lang = lang; 
		document.getElementById('common_lang_zoom').innerHTML = lang;
	}          
    document.getElementById('common_lang_both_zoom').innerHTML = common.langbase+'+ <br>'+common.lang;       
}

function common_show_fontsize(obj){                                      consolelog_func(); 
    var inner_e = ''; 
    inner_e+=     '<div id="0.8"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(2,0)+'> x 0.7 </div>';
    inner_e+=     '<div id="1"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(3,0)+'> x 1 </div>';
    inner_e+=     '<div id="1.2"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(7,0)+'> x 1.2 </div>';
    inner_e+=     '<div id="1.45"    class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(6,0)+'> x 1.5 </div>';
    inner_e+=     '<div id="1.9"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(5,0)+'> x 2 </div>';
    inner_e+=     '<div id="2.4"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common.style.buttonpos_menu(4,0)+'> x 2.5 </div>';
    inner_e+=     '<div class="text_zoom_box" '+common.style.buttonpos_menu(0,2)+'><div id="common_fontsize_zoom" class="text_zoom menu_zoom" style="font-size:'+obj.fontsize*3.5+'vh;">text example</div></div>';
    common_create_menu('common_fontsize',1, inner_e);
}
function common_set_fontsize(id, obj){                                   consolelog_func(); 
	var classname = ''; var lineheight = 1.1; var alpha_def=0.6;
	if (obj.name==='files'){ classname = 'files_name'; lineheight = 1.1; alpha_def=0.6;}
	if (obj.name==='common'){ classname = 'text_scroll'; lineheight = 1.38; alpha_def=0.8;}             
	var font_default = 3.5;             
	var scale = parseFloat(id);                                          
	var elem = document.getElementById('common_fontsize_zoom');
    if (elem) {elem.style.fontSize = (font_default*scale)+'vh'; }
    var alpha = alpha_def-0.3*scale/3;
    $('.'+classname).css('font-size', (font_default*scale)+'vmin');
    $('.'+classname).css('line-height', (lineheight*font_default*scale)+'vmin');
    $('.'+classname).css('color', 'rgba(0,0,0,'+alpha+')');
    obj.fontsize = scale;                                                
}

function common_create_menu(id, lvl, buttons_html, parent, ineditor){    consolelog_func(); 
	if (parent==undefined) { parent='created_elements'; }
    if (lvl==0){                                                         
        menu_blur(ineditor);
        inner_e = '<div id="'+id+'_back"  onclick="menu_back(this.id,1,'+ineditor+');" class="back_area"></div>';
        inner_e+= '<div id="'+id+'_area"  class="menu_area">';
    }else{                                                               
        inner_e = '<div id="'+id+'_back"  onclick="menu_back(this.id,0,'+ineditor+');" class="back_area" style="opacity:0;"></div>';
        inner_e+= '<div id="'+id+'_area1"  class="menu_area" style="background-color:rgba(100,100,100,0.2);"></div>';
        inner_e+= '<div id="'+id+'_area2"  class="menu_area_lvl2">';
        }                                                                
    element = document.createElement('div');
    element.setAttribute('id', id);
    element.innerHTML=inner_e+buttons_html+'</div>';
    document.getElementById(parent).appendChild(element);
    return (element);
}

function menu_blur(ineditor){                                            consolelog_func(); 
	if (ineditor===undefined) {ineditor=false;}
	if (ineditor){ $('#editor_base_elements').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); }
	else{          $('#base_elements').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); }
}
function menu_back(id, foggyoff, ineditor){                              consolelog_func(); 
	if (ineditor===undefined) {ineditor=false;}
	if (ineditor){ if (foggyoff==1){ $('#editor_base_elements').foggy(false);  } }
	else{          if (foggyoff==1){ $('#base_elements').foggy(false);  } }
    elem = document.getElementById(id).parentNode;
    elem.parentNode.removeChild(elem);
}

function common_show_clickdelay(){                                       consolelog_func(); 
	var delay = common.time_delay/1000;
    var inner_e = ''; 
    inner_e+= '<div id="common_clickdelay_zoom"  onclick="" ' +common.style.buttonpos_menu(0,1)+'>'+delay+' sec</div>';
    inner_e+= '<div id="0.0"      class="buttons"  onclick="common_set_clickdelay(0.01);" '+common.style.buttonpos_menu(4,0)+'> 0.0 </div>';
    inner_e+= '<div id="0.1"      class="buttons"  onclick="common_set_clickdelay(0.1);" '+common.style.buttonpos_menu(5,0)+'> 0.1 sec </div>';
    inner_e+= '<div id="0.5"      class="buttons"  onclick="common_set_clickdelay(0.5);" '+common.style.buttonpos_menu(6,0)+'> 0.5 sec </div>';
    inner_e+= '<div id="0.7"      class="buttons"  onclick="common_set_clickdelay(0.7);" '+common.style.buttonpos_menu(7,0)+'> 0.7 sec </div>';
    common_create_menu('common_clickdelay',1, inner_e);
}
function common_set_clickdelay(delay){                                   consolelog_func(); 
	common.time_delay = delay*1000;                                     
	document.getElementById('common_clickdelay_zoom').innerHTML = delay+' sec';
}

//-- cookie ---------------------------------------------------------------------

function cookie_get(cname) {                                             consolelog_func(); 
    var name = cname + "=";                                              
    decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');  
    var i;  var c;
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
function cookie_set(cname, cvalue, exdays){                              consolelog_func(); 
	if (exdays===undefined) {exdays=60;}
	var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function cookie_delete_all() {                                           consolelog_func(); 
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

//-- misc ----------------------------------------------------------------

function consolelog_func(color, noargs) { 
	if (color===undefined) { color='green'; }
	var caller = consolelog_func.caller;
	var arg = consolelog_func.caller.arguments;
	var name = consolelog_func.caller.name;
	var i=0;
	var msg_arg = "";
	
	if (noargs===true){ arg = []; }
	for (i=0; i<arg.length; i+=1) {
		if (i>0){ msg_arg+=', '; }
		msg_arg += typeof arg[i];
		if(arg[i]!==undefined){ 
			if(arg[i].length>100){ msg_arg += '= -- too long --'; }
			else { msg_arg += '='+arg[i]; }
		}
	}
	var msg = name+'('+msg_arg+')';
	var lvl = 0;
	if (caller.caller!=null) { 
		lvl = 1;
		if (caller.caller.caller!=null) {
			lvl = 2;
			if (caller.caller.caller.caller!=null){
				lvl = 3;
				if (caller.caller.caller.caller.caller!=null){
					lvl = 4;
					if (caller.caller.caller.caller.caller!=null){
						lvl = 5;
						if (caller.caller.caller.caller.caller!=null){
							lvl = 6;
						}
					}
				}
			}
		}
	}
	var msg_shift = "";
	var shift = ". ";
	for (i=0; i<lvl; i+=1) { 
		if (i<3 || i==lvl-1){msg_shift += shift; }
		else {msg_shift += '.'; }
	}
	if (lvl>3) { msg+= " <-- " + caller.caller.name + "()"; }
	console.log('%c'+msg_shift+msg, 'color:'+color); 
}
function consolelog(text, lvl, color){
	if (lvl===undefined) { lvl = 1; }
	if (color===undefined) { color='grey'; }
	var i=0; var shift = '  ';
	for (i=0; i<lvl; i+=1) { text = shift+text; }
	console.log('%c'+text, 'color:'+color); 
}


function common_show_notification(text){                                 consolelog_func();
	//if (parent==undefined) { parent='created_elements'; }
	var parent='created_elements';
	var id = "notification";
	var b_top = 90-common.style.b_height;
	menu_blur();
	
	inner_e = '<div id="'+id+'_back" onclick="menu_back(this.id,1,false);" class="back_area"> </div>';
	inner_e+= '<div class="menu_area" >';
	//inner_e+= '<div id="'+id+'_area"  class="menu_area" style="left:0;width:100vw;top:25vh;height:50vh;" >';
	inner_e+= '<div class="text_scroll_box" style="position:fixed;top:15vh;left:12vw;width:76vw;height:'+(b_top-23)+'vh;font-size:5vmin;line-height:8vh; color: rgba(0,0,0,0.55);">';
	inner_e+= '<div class="text_scroll" align="left" style="top:0;"> <div class="reader_text" style="top:-10vh;height:20%;font-family:Ubuntu;">'+text+' &nbsp </div> </div> </div> </div>' ;
                                       
    inner_e += '<div onclick="utter_sentence(0, 1, 0, 1);" ' +common.style.buttonpos_menu(19,0,4,5)+' > repeat </div>';
    //inner_e += '<div onclick="" ' +common.style.buttonpos_menu(18,0,4,5)+' > zoom in </div>';
    inner_e += '<div onclick="welcome_donot();" ' +common.style.buttonpos_menu(16,0,4,5)+" > Don't show again </div>";
    //inner_e += '<div onclick="" ' +common.style.buttonpos_menu(16,0,4,5)+" >  </div>";
                              
    element = document.createElement('div');
    element.setAttribute('id', id);
    element.innerHTML=inner_e;
    document.getElementById(parent).appendChild(element);
    return (element);	
}
function welcome_donot(){                                                 consolelog_func();
	common.welcome="donot";
	cookie_set("welcome_", "donot");
}




