
var common = {
	langbase: "en",
	lang: "auto",
	editor_nlines_lvl0: 3,
	editor_nlines_lvl1: 2,
	fontsize: 0.8,
	
	cookie_number: 5,
	cookie_suffix: "_",
	name: "common",
	play_counter: 1,
	
	symbol_ltag: '<abbr>',
	symbol_rtag: '</abbr>',
	otag: "span",
	ctag: "span",
	ptag: "span",
	
	cookie_save: function(){                                             //alert('save_cookies '+this.cookie_number);
	    var keys = Object.keys(this);                                    //alert(keys);
	    var i;
	    for (i=0; i<this.cookie_number; i+=1){                           //alert(keys[i]+this.suffix);       
	        cookie_set(keys[i]+this.cookie_suffix, this[keys[i]].toString() );                    
		}
	},
	cookie_load: function(){                                             //alert('load_cookies '+this.cookie_number);
	    var keys = Object.keys(this);                                    //alert(keys);
	    var i; var v;
	    for (i=0; i<this.cookie_number; i+=1){                           
			v = cookie_get(keys[i]+this.cookie_suffix);                  //alert(v);
			if (v == 'true') { v=true; }
			else if (v == 'false') { v=false; }
			else if ( v.match(/\d+/g)!=null && v.match(/[a-z]/i)===null ) { 
				if (v.indexOf('.')==-1) { v=parseInt(v); }
				else { v=parseFloat(v); }   
			}          //alert(v);
			this[keys[i]] = v;         
		}
	},
	style: {}	
}

common.style = {
	class_arr: ["buttons", "buttons disabled"],
    yn:4, btop:3.5, bbot:96.5, 
    xn:2, bright:98, xspace:4, dx_side:1,
    dy: 16.5, xy_ratio: 1.1,
    //content_width: 100,
    
    get_content_width: function(){
		var wratio = window.innerWidth/window.innerHeight;
		var bright = wratio*this.bright;
		var dx = this.xy_ratio*this.dy;
		var content_width = (bright - 2*dx -this.xspace-1*wratio);
		return(content_width);
	},
    get_yspace: function(){
		var yspace = (this.bbot-this.btop-(this.yn)*this.dy ) / (this.yn-1); 
	    return(yspace);
	},
    buttonpos: function(i, class_n){ //alert(i);
		var wratio = window.innerWidth/window.innerHeight;
		if (class_n===undefined) {class_n=0;}
		var class_name = this.class_arr[class_n];
	    var bright = wratio*this.bright;
	    var n_x = (i-i%this.yn)/this.yn;
	    
	    //var dy = this.get_dy();  alert(dy);
	    var dx = this.dy*1.1;
	    var yspace = this.get_yspace();                                  //alert(yspace);
	    var y = this.btop + (i%this.yn)*(yspace+this.dy*1);
	    var x = bright - (this.xn-n_x)*dx - (this.xn-n_x-1)*this.xspace; 
	    if ((i-i%this.yn)/this.yn==this.xn-1){ dx = dx*this.dx_side; }    
	    var style = 'left:'+x+'vh;top:'+y+'vh;width:'+dx+'vh;height:'+this.dy+'vh; border-bottom-width:'+this.dy*0.13+'vh;';
	    return('class="'+class_name+'" style="'+style+'"'); 
	},
	resize: function(){                                                  //alert('resize');
		var wratio = window.innerWidth/window.innerHeight;
		var content_width = this.get_content_width();
		var elem = document.getElementById('content_box');
	    if (elem){ elem.style.width= content_width+'vh'; }
	    var elem = document.getElementById('zoom_box');
	    if (elem){ elem.style.width= (content_width-5.4*wratio)+'vh'; }  //alert(content_width);
	}
		
}
//function common_buttonpos(i, class_n){ return(common.style.buttonpos(i, class_n)); }
/*
function common_buttonpos(i, class_n){
	var colors = ['#668113','#816513','#668113','#816513',   '#814a13','#668113','#814a13','#668113'];
	if (class_n===undefined) {class_n=0;}
	var class_arr = ["buttons", "buttons disabled"];
	var class_name = class_arr[class_n];
    var yn=4, btop=2,   bbot=98,   yspace=9,   dy_bot=1;
    var xn=2, bleft=73, bright=99, xspace=3.5, dx_side=1;
    //xspace=0; yspace=0; bright=98.8; bleft=74;
    var wratio = window.innerWidth/window.innerHeight;
    bright=98; btop=3; bbot=97; xspace=4; 
    bright = wratio*bright;
    var n_x = (i-i%yn)/yn;
    
    var dy = (bbot-btop-(yn-1)*yspace )/yn; 
    dy = dy*yn/(yn-1+dy_bot);
    var y = btop + (i%yn)*(yspace+dy*1);
    if (i%yn==yn-1) {y=y;}
    //var dx = (bright-bleft-(xn-1)*xspace )/(xn-1.+dx_side);
    var dx = dy*1.1;
    //var x = bleft + (i-i%yn)/yn*(dx+xspace); 
    var x = bright - (xn-n_x)*dx - (xn-n_x-1)*xspace; 
    if ((i-i%yn)/yn==xn-1){ dx = dx*dx_side; }    
    if (i%yn==yn-1){ dy = dy*dy_bot; }
    //var style = 'left:'+x+'vw;top:'+y+'vh;width:'+dx+'vw;height:'+dy+'vh;'; alert(dy);
    var style = 'left:'+x+'vh;top:'+y+'vh;width:'+dx+'vh;height:'+dy+'vh; border-bottom-width:'+dy*0.13+'vh;';
    //style+='background-color:'+colors[i]+';';
    //alert(bright - 2*dx -xspace );
    var elem = document.getElementById('content_box');
    if (elem){ elem.style.width= (bright - 2*dx -xspace-1)+'vh'; }
    var elem = document.getElementById('zoom_box');
    if (elem){ elem.style.width= (bright - 2*dx -xspace-5.4*wratio)+'vh'; }
    return('class="'+class_name+'" style="'+style+'"'); 
}
*/
//var config = {};
//config.readonlydir = ['books_txt',''];
var readonlydir = ['/books_txt/', '/books_pdf/', '/textbooks/', '/encyclopedia/'];
var pdfdir = ['/books_pdf/', '/textbooks/', '/encyclopedia/'];

//-----------------------------------------------------------------------------

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
//var symbol_nextpage =   '<strong style="font-size:150%;opacity:0.8;line-height:70%">+</strong>';
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

var b_alpha = 0.9;
var symbol_sound =       '<span style="font-size:9vmin;opacity:'+b_alpha+';">&#128265;</span>';
var symbol_delete_editor='<span style="font-size:10vmin;opacity:'+b_alpha+';position:relative;top:0.6vmin;">&#10007;</span>';
var symbol_enter =       '<span style="font-size:12vmin;opacity:'+b_alpha+';position:relative;top:0.8vmin;">&#10004;</span>';
var symbol_play =        '<span style="font-size:8.7vmin;opacity:'+b_alpha+';">&#9199;</span>';
//var symbol_play =        '<strong style="font-size:110%;opacity:'+b_alpha+';"> &#10704;</strong>';
var symbol_pause =       '<span style="font-size:8.7vmin;opacity:'+b_alpha+';">&#9208;</span>';
var symbol_prev =        '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9204;</span>';
var symbol_next =        '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9205;</span>';
var symbol_up =          '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9206;</span>';
var symbol_down =        '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9207;</span>';
var symbol_leftword =    '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9194;</span>';
var symbol_rightword =   '<span style="font-size:9.5vmin;opacity:'+b_alpha+';">&#9193;</span>';
var symbol_readall =     '<span style="font-size:12vmin;opacity:'+b_alpha+';">&#119218;</span>';
var symbol_readall =     '<span style="font-size:12vmin;opacity:'+b_alpha+';">&#8967;</span>';
var symbol_readall =     ' read all ';
var symbol_upload =     ' up- load ';
var symbol_ctrlz =     '<span style="font-size:12vmin;"> &#10554;</span>';
//var symbol_ctrlz =     '<strong style="font-size:145%;line-height:130%;"> &#8630;</strong>';
var symbol_ctrly =     '<span style="font-size:12vmin;"> &#10555;</span>';
//var symbol_ctrly =     '<strong style="font-size:145%;line-height:130%;"> &#8631;</strong>';
var symbol_left = symbol_prev;
var symbol_right = symbol_next;
var symbol_navigate = symbol_prev+symbol_next;
var symbol_nextpage1 =   '<span>xyz</span>';
var symbol_nextpage2 =   '123';
var symbol_nextpage3 =   '^ / %';

var symbols_play_pause = [symbol_play, symbol_pause];
var symbols_sound = [symbol_mute, symbol_sound];


function scroll_to(id, id_area, title){
    if (title==0){ elem = document.getElementById(id);  }
    else { elem= document.querySelectorAll('[id="'+id+'"]')[1]; //alert('title '+elem+' '+id+' '+area); 
    }
    rect_scroll = document.getElementById(id_area).getBoundingClientRect(); 
    rect = elem.getBoundingClientRect();  //alert(elem+' '+rect_scroll.right+' '+rect.left+' '+rect.right);
    if (rect.top+0.5*(rect.bottom-rect.top)>rect_scroll.bottom || rect.left+0.5*(rect.right-rect.left)>rect_scroll.right || rect.bottom-0.5*(rect.bottom-rect.top)<rect_scroll.top || rect.right-0.5*(rect.right-rect.left)<rect_scroll.left )
        {elem.scrollIntoView(true);} 
}

function utter_paragraph(id, id_all, id_all_w, stop, onend){
    for (iii=0; iii<id_all.length; iii++){
        id_i = id_all[iii]; stop_s=0; onend_i=0;
        if (iii==0){ stop_s=stop; }
        if (iii==id_all.length-1){onend_i=onend;}
        utter_sentence(id_i, id_all_w, stop_s, onend_i);
    }    
}    
function utter_sentence(id, id_all, stop, onend){
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
            utter(part_i, stop_s, 0);
            ii++;
        }else{proceed=false; //alert(txt); 
            utter(txt, onend); }
    }*/
    utter(txt, stop, onend);
}
function utter(txt, stop, onend){                                  // 0-auto, 1-ru, 2-en
    msg = new SpeechSynthesisUtterance(txt);
    ru = /[а-яА-ЯЁё]/.test(txt); en = /[a-zA-Z]/.test(txt); 
    if (common.lang=='auto'){ if (en){ msg.lang='en'; } if (ru){ msg.lang='ru'; } }
    else { msg.lang=common.lang; }
    if (!ru && !en && common.lang=='auto'){ msg.lang=common.langbase; }
    msg.rate = 0.9; 
    if (stop==1){ window.speechSynthesis.pause(); window.speechSynthesis.cancel(); }
    window.speechSynthesis.speak(msg);    
    common.play_counter=1;
    msg.onstart=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[1]};
    if (onend==0){ msg.onend=function(event){document.getElementById('playpause').innerHTML=symbols_play_pause[0]}; }
    else{ msg.onend=function(event){reader_scroll(1,0,1)}; }
}    
    
function create_element(id, cl, parent, style, inner){                   //alert(id, cl, parent, style);
    //alert('create');
    if (parent===undefined){ parent = 'created_elements'; }
    var element = document.createElement('div');
    element.setAttribute('id', id);
    element.setAttribute('class', cl);
    if (style!=undefined) { element.setAttribute('style', style); }
    if (inner!=undefined) { element.innerHTML=inner; }
    document.getElementById(parent).appendChild(element);
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
    proceed = 1;
    while (proceed==1){
        i = text.indexOf('<'+common.ctag);
        if (i==-1){ proceed=0; }
        else { 
			i2 = text.indexOf('>',i+1);                                  //alert(i+' '+i2+'  '+text);
            text = text.substr(0,i)+text.substr(i2+1);                   //alert(i+' '+i2+'  '+text);
        }
    }                                                                    //alert('merge 1');
    text = replace_all(text, '</'+common.ctag+'>', '');
    return (text);
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


function find_spaceend(txt, i_start){                                    //alert('spaceend: '+txt+', '+i_start);
	//if (i_start==txt.length ) { return(-1); }
	if ( txt[i_start]!=' ' || i_start==txt.length ) { return(i_start); }
	
	if ( i_start === undefined ) { i_start = 0; }
	var proceed = 1; var i=i_start+1;
	while (proceed==1){
		if ( i>=txt.length-1 ) { proceed=0; }
		else if ( txt[i]!=' ' ) { proceed=0; }
		else { i+=1; } 
	}                                                                    //alert('spaceend i '+i);
	return (i); 
}
function find_spacestart(txt, i_start){                                  //alert('spaceend: '+txt+', '+i_start+', '+txt[i_start]);
	//if ( (txt[i_start]!=' ') || i_start===0 ) { alert('return'); return(i_start); }
	
	if ( i_start === undefined ) { i_start = txt.length-1; }
	var proceed = 1; var i=i_start;
	while (proceed==1){
		if ( i<=0 ) { proceed=0; }
		else if ( txt[i-1]!=' ' ) { proceed=0; }
		else { i-=1; } 
	}                                                                    //alert('spaceend i '+i);
	return (i); 
}

function find_indexof(text_origin, arr, i_start, i_end){                 //alert(arr);
	if ( i_start === undefined ) { i_start = 0; }                        //alert(i_start);
	if ( i_end === undefined ) { i_end = text_origin.length; }           //alert(i_end);
	var txt = text_origin.substring(i_start, i_end);                     //alert('indexof txt: '+txt);
	var i=0, j=0, res=txt.length, symb='', success=0;
	
	for (i=0; i<arr.length; i++) {
		j = txt.indexOf(arr[i]);
		if ( j!=-1 && j<res ) { res=j; symb=arr[i]; success=1; }
	}                                                                    //alert('indexof res: '+res+' '+symb);
	if ( success == 0 ) { res = -1; }
	else {res = res+i_start; }
	return([res, symb]);
}
function common_textto_read(text){
	text = text.replace('<br>', ' new line ');
	text = text.replace('<abbr>', '');
	text = text.replace('</abbr>', '');
	return(text);
}

function text_clean(text_origin){                                        // only void tags allowed!  
	var txt = text_origin.replace('\n','<br>');                          //alert('txt1: '+txt);
	var proceed = 1, i = 0, j1=0, j2=0; 
	i = txt.indexOf('<');
	if (i===-1) {proceed=0;}
	while (proceed==1){                                                  //alert('clean i: '+i);
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
function reader_parse_html(text_origin){                                 //alert('reader_parse_html');
	if (text_origin.replace(' ','')==='') { return reader_parse_txt(text_origin, 0); }
	
	var txt = text_clean(text_origin);  
	
	//var endtag = ['div','p','article','aside','button','canvas','caption','cite','code','datalist','del','details','dialog','dl','dt','figcaption','figure','footer'];
	var tag_arr = ['div','p'];                                            //alert('clean_text: '+txt);
	//for (i=0; i<endtag.length; i+=1){
	//	txt = txt.replace( '</'+endtag[i], '<br></'+endtag[i] );
	//	txt = txt.replace( '<'+endtag[i], '<br><'+endtag[i] );   } 
	
	tag_open_close = [];
	for (i=0; i<tag_arr.length; i+=1) { tag_open_close.push("<"+tag_arr[i]); }
	for (i=0; i<tag_arr.length; i+=1) { tag_open_close.push("</"+tag_arr[i]); }        //alert(tag_open_close);
	
	var index_arr = [[0,0]];
	var proceed=1, j1=0, j2=0;                                                            
	while (proceed==1){
		//j1 = find_indexof(txt, tag_open_close, j2+1)[0];
		
		j1=txt.length;
		for (i=0; i<tag_open_close.length; i+=1){
			ii = txt.indexOf(tag_open_close[i],j2);
			if (ii===-1){ii=txt.length;}
			if (ii<j1){j1=ii;}
		}if (j1===txt.length){j1=-1;}                                    //alert('tag: '+j1);
		
		if (j1!=-1) {
			j2 = txt.indexOf('>', j1); 
			index_arr.push([j1,j2+1]);                                   //alert('tag: '+j1+'-'+j2+' - '+txt.substring(j1,j2+1));
		}else{ proceed=0; }
	}
	index_arr.push([txt.length,txt.length]);                             //alert('index_arr: '+index_arr);
	
	var text_final = "", arr_w=[], arr_s=[], arr_p=[];
	var i=0, n_p=0, txt_i="", txt_parsed="", tag1="", tag2="", upper_div=false, scip_div=false;
	for (i=1; i<index_arr.length; i+=1){
		scip_div=false;
		upper_div=false;
		txt_i = txt.substring(index_arr[i-1][1], index_arr[i][0]);       //alert('txt_i: '+txt_i+' | '+index_arr[i-1]);
		text_final += txt.substring(index_arr[i-1][0], index_arr[i-1][1]);  //alert('text_final 1: '+text_final);
		
		if (i>1 && i<index_arr.length-1) {
			tag1 = txt.substring(index_arr[i-1][0], index_arr[i-1][1]);      //alert('tag: '+tag1);
			tag2 = txt.substring(index_arr[i][0], index_arr[i][1]);          //alert(tag2);
			if (tag1.indexOf("</")===-1 && tag2.indexOf("</")!=-1 ) {
				upper_div=true;             //alert(tag1+' '+upper_div);
				if (tag1.indexOf("void_div")!=-1) { scip_div=true; }
			}
			else{ upper_div=false; }
		}else{upper_div=false;}                                          //alert(' scip: '+scip_div+'|'+txt_i.toString().replace(' ','')+'|');
		
		if ( (txt_i.toString().replace(' ','')!=='' || upper_div==true) && scip_div===false ) { 
			txt_parsed = reader_parse_txt(txt_i, n_p);                   //alert('txt_parsed: '+txt_parsed);
			text_final += txt_parsed[0];                                 //alert('text_final 2: '+text_final);
			arr_w = arr_w.concat(txt_parsed[1]);
			arr_s = arr_s.concat(txt_parsed[2]);
			arr_p = arr_p.concat(txt_parsed[3]);                                     
			n_p = txt_parsed[4]+1;
		}
	}                                                                    //alert(arr_p);
	return ([text_final, arr_w, arr_s, arr_p]);
}

function reader_parse_txt(text_origin, n_p){       
    //var txt = text_clean(text_origin);                                   //alert('txt2: '+txt); 
    var txt = text_origin;
    var endsymbol = ['<br>', '...', '!!!', '???', '.', '!', '?', ',', ' ','<'] ;
    var emptytag = ['area','base','col','command','embed','hr','img','input','ceygen','link','meta','param','source','track','wbr','video','audio'];
    var proceed = 1, i = 0, i_end=0, j = [], arr = [], tag_arr=[]; 
    
    if (txt[0]==' '){
		i = find_spaceend(txt,0);
		arr.push( txt.substring(0,i) );
	}
    while (proceed==1){                                                  //alert('i: '+i);
		if ( i>=txt.length-1 ) { break; }                                //alert('no break');
	
		j = find_indexof(txt, endsymbol, i );                            //alert('j: '+j);
		if ( j[0]+j[1].length == txt.length || j[0]==-1 ) { 
			i_end = txt.length; 
			proceed=0; 
		} else if ( j[0]==i && j[1]=="<" ) { 
			i_end = find_spaceend(txt, txt.indexOf(">", i)+1 ); 
			if ( find_indexof(txt, emptytag, i)!=1 ) { tag_arr.push(arr.length); }      // tags for skip
		} else if ( j[0]==i ){ 
			i_end = find_spaceend(txt, j[0]+j[1].length);  
		} else { 
			if (j[1]==' ') { i_end = find_spaceend(txt, j[0]+1); }
			else { i_end = j[0]; }                                       
        }                                                                //alert('i_end: '+i_end);
        arr.push( txt.substring(i,i_end) );                              //alert('words: |'+ txt.substring(i,i_end)+'|');
        i = i_end;
    }                                                                    //alert('words: '+arr+' '+arr.length);
    if (arr.length===0){ arr=[" "]; }
    
    var endsentence = ['...', '!!!', '???', '.', '!', '?'];
    var p0=n_p.toString();  
    var text = '';
    var i_w = 0, i_s = 0, i_p = n_p; 
    var arr_w=['p'+p0+'s0w0'], arr_s=['p'+p0+'s0'], arr_p=['p'+p0];
    
    var id_p='', id_s='', id_w='';
    var word='', word_start = '', word_end='';
    var otag=common.otag, ctag=common.ctag, tag_p=common.ptag;
    
    word_start = "<"+tag_p+" id='p"+p0+"'><"+otag+" id='p"+p0+"s0'><"+otag+" id='p"+p0+"s0w0'>";
    
    var i = arr.length-1,  i_end=-1;
    while (i_end==-1 && i>=0 ) {
		if ( tag_arr.indexOf(i)==-1 ) { i_end = i; }
		else { i -=1; } 
	}                                                                    //alert('i_end: '+i_end+' '+arr.length);
    
    for (i=0; i<arr.length; i+=1){
        word=arr[i];                                                     //alert(i);
		
        if ( tag_arr.indexOf(i)!=-1 ) { 
				text = text+word; 
		} else if (i===i_end) { 
			word_end = '</'+ctag+'></'+ctag+'></'+tag_p+'>'; 
			text = text+ word_start + word + word_end;
			
		} else if ( word.indexOf('<br>')!=-1 ){ 
			i_p+=1;  i_s=0;  i_w=0;
			id_p = 'p'+i_p; 
			id_s = 'p'+i_p + 's'+i_s; 
			id_w = 'p'+i_p + 's'+i_s + 'w'+i_w;
			arr_p.push(id_p);  arr_s.push(id_s);  arr_w.push(id_w);
			
			word_end = '</'+ctag+'></'+ctag+'></'+tag_p+'>';
			text = text+ word_start + word + word_end;
			word_start =  '<'+tag_p+' id="'+id_p+'"><'+otag+' id="'+id_s+'"><'+otag+' id="'+id_w+'">';
			
		} else if ( find_indexof(word, endsentence)[0] !=-1 ){    
			i_s+=1; i_w=0;
			id_s = 'p'+i_p + 's'+i_s; 
			id_w = 'p'+i_p + 's'+i_s + 'w'+i_w;
			arr_s.push(id_s);  arr_w.push(id_w);
			
			word_end = '</'+ctag+'></'+ctag+'>';
			text = text+ word_start + word + word_end;
			word_start =  '<'+otag+' id="'+id_s+'"><'+otag+' id="'+id_w+'">';
			
		} else { 
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


//-- show functions ------------------------------------------------------------
//------------------------------------------------------------------------------
function common_show_lang(lvl, parent){                         //alert('common_show_lang '+parent);
    var inner_e = ''; var lang='';
    inner_e+=     '<div id="en"               onclick="common_set_lang(this.id,'+true+');" '+common_buttonpos_menu(1,0)+'>en</div>';
    inner_e+=     '<div id="ru"               onclick="common_set_lang(this.id,'+true+');" '+common_buttonpos_menu(2,0)+'>ru</div>';
    inner_e+=     '<div id="en"               onclick="common_set_lang(this.id,'+false+');" '+common_buttonpos_menu(5,0)+'>en</div>';
    inner_e+=     '<div id="ru"               onclick="common_set_lang(this.id,'+false+');" '+common_buttonpos_menu(6,0)+'>ru</div>';
    inner_e+=     '<div id="auto"             onclick="common_set_lang(this.id,'+false+');" '+common_buttonpos_menu(7,0)+'>auto</div>';
    inner_e+=     '<div id="common_langbase_zoom"  onclick="" '+common_buttonpos_menu(0,1)+'>'+common.langbase+'</div>';
    inner_e+=     '<div id="common_lang_zoom"      onclick="" '+common_buttonpos_menu(4,1)+'>'+common.lang+'</div>';
    if (editor!=undefined) {parent = "editor_created_elements";}
    common_create_menu('common_lang',lvl, inner_e, parent);
}
function common_set_lang(lang, is_base){                                 //alert(lang+' '+is_base);
    if (is_base===true){ 
		common.langbase = lang; 
		document.getElementById('common_langbase_zoom').innerHTML = lang;
	}else{ 
		common.lang = lang; 
		document.getElementById('common_lang_zoom').innerHTML = lang;
	}          
    document.getElementById('common_lang_both_zoom').innerHTML = common.langbase+'+ <br>'+common.lang;       //alert('zoom1');
}

function common_show_fontsize(obj){                                      //alert('obj_name: '+obj.name+ ' '+obj.fontsize);
    var inner_e = ''; 
    inner_e+=     '<div id="0.8"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(2,0)+'> x 0.7 </div>';
    inner_e+=     '<div id="1"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(3,0)+'> x 1 </div>';
    inner_e+=     '<div id="1.2"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(7,0)+'> x 1.2 </div>';
    inner_e+=     '<div id="1.45"    class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(6,0)+'> x 1.5 </div>';
    inner_e+=     '<div id="1.9"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(5,0)+'> x 2 </div>';
    inner_e+=     '<div id="2.4"      class="buttons"  onclick="common_set_fontsize(this.id,'+obj.name+');" '+common_buttonpos_menu(4,0)+'> x 2.5 </div>';
    inner_e+=     '<div class="text_zoom_box" '+common_buttonpos_menu(0,2)+'><div id="common_fontsize_zoom" class="text_zoom menu_zoom" style="font-size:'+obj.fontsize*3.5+'vh;">text example</div></div>';
    common_create_menu('common_fontsize',1, inner_e);
}
function common_set_fontsize(id, obj){                                   //alert('obj_name 2: '+obj);
	var classname = ''; var lineheight = 1.1; var alpha_def=0.6;
	if (obj.name==='files'){ classname = 'files_name'; lineheight = 1.1; alpha_def=0.6;}
	if (obj.name==='common'){ classname = 'text_scroll'; lineheight = 1.38; alpha_def=0.8;}             //alert('class: '+class_name);
	var font_default = 3.5;             
	var scale = parseFloat(id);                                          //alert(scale);
	var elem = document.getElementById('common_fontsize_zoom');
    if (elem) {elem.style.fontSize = (font_default*scale)+'vh'; }
    var alpha = alpha_def-0.3*scale/3;
    $('.'+classname).css('font-size', (font_default*scale)+'vmin');
    $('.'+classname).css('line-height', (lineheight*font_default*scale)+'vmin');
    $('.'+classname).css('color', 'rgba(0,0,0,'+alpha+')');
    obj.fontsize = scale;                                                //alert('obj_name 2: '+obj.name+' '+obj.fontsize);
}

function common_create_menu(id, lvl, buttons_html, parent, ineditor){    //alert('create_menu '+ineditor);
	if (parent==undefined) { parent='created_elements'; }
    if (lvl==0){                                                         //alert('lvl0');
        menu_blur(ineditor);
        inner_e = '<div id="'+id+'_back"  onclick="menu_back(this.id,1,'+ineditor+');" class="back_area"></div>';
        inner_e+= '<div id="'+id+'_area"  class="menu_area">';
    }else{                                                               //alert('lvl1');
        inner_e = '<div id="'+id+'_back"  onclick="menu_back(this.id,0,'+ineditor+');" class="back_area" style="opacity:0;"></div>';
        inner_e+= '<div id="'+id+'_area1"  class="menu_area" style="background-color:rgba(100,100,100,0.2);"></div>';
        inner_e+= '<div id="'+id+'_area2"  class="menu_area_lvl2">';
        }                                                                //alert(inner_e);
    element = document.createElement('div');
    element.setAttribute('id', id);
    element.innerHTML=inner_e+buttons_html+'</div>';
    document.getElementById(parent).appendChild(element);
    return (element);
    }

function menu_blur(ineditor){                                            //alert('blur '+ineditor);
	if (ineditor===undefined) {ineditor=false;}
	if (ineditor){ $('#editor_base_elements').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); }
	else{          $('#base_elements').foggy({ blurRadius:5, opacity:0.8, cssFilterSupport:true }); }
}
function menu_back(id, foggyoff, ineditor){                              //alert(id);
	if (ineditor===undefined) {ineditor=false;}
	if (ineditor){ if (foggyoff==1){ $('#editor_base_elements').foggy(false);  } }
	else{          if (foggyoff==1){ $('#base_elements').foggy(false);  } }
    elem = document.getElementById(id).parentNode;
    elem.parentNode.removeChild(elem);
}

//-- cookie ---------------------------------------------------------------------

function cookie_get(cname) {
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
function cookie_set(cname, cvalue, exdays){
	if (exdays===undefined) {exdays=60;}
	var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 3600 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function cookie_delete_all() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

//-- button position -----------------------------------------------------------------------------

function common_buttonpos_menu(i, class_n, x_dim, y_dim, shift_n, shift_nleft){                         //alert('style');
	if (class_n===undefined) {class_n=0;}
	var class_arr = ["buttons", "buttons_text", "text_zoom_box", "buttons disabled"];
	var class_name = class_arr[class_n];
	
	if (shift_nleft===undefined) {shift_nleft=0; shift_n=0;}
	if (x_dim===undefined) {x_dim=4; y_dim=2;}
	var b_width = 12; var b_height = 17;
	var b_left = 16;  var b_right = 84; 
	var b_top = 25; var b_bot = 75;
	if (y_dim===3) { b_left=15; b_right=85; b_top=17; b_bot=83; }
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
	var style = 'left:'+x+'vw; top:'+y+'vh;'+'width:'+b_width+'vw; height:'+b_height+'vh;';  //alert(style);
	if (class_n===0){ style+= 'background-color: rgba(110, 152, 27, 0.7);'; }
	if (class_n===0){ style+= 'background-color: rgba(110, 152, 27, 0.7);'; }
	return('class="'+class_name+'" style="'+style+'"')
	}
