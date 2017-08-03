//-- editor variables -------------------------------------------------------------------
//alert('editor');
var editor = {
	dict: {},
	style: {},
	
	parent: "",
	destination: "",
	iter: 0,
	text_raw: "",
	
	sound_navigator: 1,
	sound_buttons: 0,
	capslock: 0,
	caps: 0,
	pin_letters: 0,
};

editor.dict = {
	letters_ru: { r1:'а',r2:'б',r3:'в',r4:'г',r5:'д',r6:'е',r7:'ё',r8:'ж',r9:'з',r10:'и',r11:'й',r12:'к',r13:'л',r14:'м',r15:'н',r16:'о',r17:'п',r18:'р',r19:'с',r20:'т',r21:'у',r22:'ф',r23:'х',r24:'ц',r25:'ч',r26:'ш',r27:'щ',r28:'ъ',r29:'ы',r30:'ь',r31:'э',r32:'ю',r33:'я' },
	letters_en: {  a:'a', b:'b', c:'c', d:'d', e:'e', f:'f', g:'g', h:'h', i:'i', j:'j', k:'k', l:'l', m:'m', n:'n', o:'o', p:'p', q:'q', r:'r', s:'s', t:'t', u:'u', v:'v', w:'w', x:'x', y:'y', z:'z'},
	symbols1:   { 0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',dot:'.', dash:'-', comma:',', qmark:'?', emark:'!', colon:':', semicolon:';', quotes:'"', plus:'+', minus:'-', eq:'=', star:'*', slash:'/', lbr:'(', rbr:')', power:'^', lbrsq:'[', rbrsq:']', lbrf:'{', rbrf:'}', underscore:'_', vert:'|'},
	symbols2:   { space:' ', newline:' <br> ', pc:'<abbr>&#37</abbr>', less:'<abbr>&#60</abbr>', more:'<abbr>&#62</abbr>', at:'<abbr>&#64</abbr>', 
				  backslash:'<abbr>&#8726</abbr>', sum:'<abbr>&#8721</abbr>', prod:'<abbr>&#8719</abbr>', sqrt:'<abbr>&#8730</abbr>', cdot:'<abbr>&#8729</abbr>', 
		          leq:'<abbr>&#8804</abbr>', geq:'<abbr>&#8805</abbr>', ll:'<abbr>&#8810</abbr>', gg:'<abbr>&#8811</abbr>', sim:'<abbr>~</abbr>', neq:'<abbr>&#8800</abbr>', quiv:'<abbr>&#8801</abbr>', approx:'<abbr>&#8776</abbr>', 
		          prime:'<abbr>&#8242</abbr>', ldquo:'<abbr>&#8220</abbr>', rdquo:'<abbr>&#8221</abbr>', lsquo:'<abbr>&#8216</abbr>', rsquo:'<abbr>&#8217</abbr>', 
		          cap:'<abbr>&#8745</abbr>', cup:'<abbr>&#8746</abbr>', subset:'<abbr>&#8834</abbr>', supset:'<abbr>&#8835</abbr>' },
	symbols2_b: { space:' ',  newline:'line',  pc:'&#37', less:'&#60', more:'&#62', leq:'&#8804', geq:'&#8805', ll:'&#8810', gg:'&#8811', approx:'&#8776', vert:'|', backslash:'&#8726', sum:'&#8721', prod:'&#8719', cap:'&#8745', cup:'&#8746', subset:'&#8834', supset:'&#8835', sim:'~', cdot:'&#8729', neq:'&#8800', quiv:'&#8801', sqrt:'&#8730',   prime:'&#8242', ldquo:'&#8220', rdquo:'&#8221', lsquo:'&#8216', rsquo:'&#8217', at:'&#64' },
	allchar: function(){ 
		return( Object.assign({}, this.letters_en, this.letters_ru, this.symbols1, this.symbols2   )); }, 
	allchar_buttons: function(){ 
		return( Object.assign({}, this.letters_en, this.letters_ru, this.symbols1, this.symbols2_b )); },
	
	symbolset7_en: [ 
		['m','u','c','d','r','l',  'o','t','h','e','s',  'n','a','i','space'],
	    [ 'qmark','dash','dot','comma','z','q','prime',   'j','x','g','p','f',   'k','v','b','y','w' ],             
	    ['colon','semicolon','emark','quotes','lbr','rbr',  '1','2','3','4','5',  '6','7','8','9','0','newline']
	], symbolset7_ru: [ 
		['r5','r17','r18','r16','r13','r14',  'r3','r1','r6','r15','r10',   'space','r12','r19','r20'],    
        ['r22','r11','r25','r32','r26','r27','r31',   'r23','r8','r9','r2','r21',  'r24','r29','r33','r30','r4'],    
		['r28','1','2','3','4','5',  '6','7','8','9','0',   'newline','emark','qmark','dash','dot','comma']
	], symbolset7_math: [
		['comma','dot','minus','plus','8','9',  '4','5','6','7','space',  '0','1','2','3'],    
		['lbrf','rbrf','lbrsq','rbrsq','semicolon','colon',  'qmark','sqrt','power','less','more',  'newline','eq','slash','cdot','lbr','rbr'],    
		['i','j','k','l','underscore','space',  'd','e','f','g','h','space',  'a','b','c','x','y','z']  
	], symbolset7_math2: [
		['a','b','comma','dot','2','3', 'slash','minus','plus','lbr','rbr', 'x','y','z','space'],    
		['less','more','sqrt','power','cdot','eq',  'newline','1','2','3','4','5',  '6','7','8','9','0','space'],    
		['space','space','space','space','space','space',  'lbrf','rbrf','lbrsq','rbrsq','less','pc', 'underscore','c','d','e','f','g','h']  
	],	symbolset7_files: [ 
		['m','u','c','d','r','l',  'o','t','h','e','s',  'n','a','i','underscore'],
		[ 'dot','space','space','dash','z','q','at',   'j','x','g','p','f',   'k','v','b','y','w' ],             
	    ['space','space','space','space','space','space', '1','2','3','4','5',  '6','7','8','9','0','underscore']
	],symbolset7_other: [  
		['lbrf','rbrf','lbrsq','rbrsq','lsquo','rsquo',  'quotes','at','ldquo','rdquo','less','more',  'eq','slash','cdot','lbr','rbr'],  
		['comma','dot','minus','plus','8','9',  '4','5','6','7','space',  '0','1','2','at'],    
		['i','j','k','l','underscore','space',  'd','e','f','g','h','space',  'a','b','c','x','y','z']  
	],                               
	symbolset7_all: function(){ return [this.symbolset7_math, this.symbolset7_math2, this.symbolset7_other, this.symbolset7_files, this.symbolset7_en, this.symbolset7_ru] ; },
	
};                                                                       //alert(editor.dict.symbolset_all());

//-- editor style object --------------------------------------------------------------
editor.style = {
	window_height: window.innerHeight,
	b_nx: 5, b_ny: 2, 
	b_height: 15, b_width:12,
	b_xratio: 0.4, b_yratio: 0.5,
	b_left: 3, b_right: 97, b_top: 38, b_bottom: 95,
	b_leftwidth: 1, b_rightwidth: 1, b_botheight: 1,
	font_size : '900%',
	text_zoom :  '900%',
	box_class :  'text_zoom',
	zoomspace : 5,
	nlines_lvl0: 3,
	nlines_lvl1: 2,
	fontsize: 0,
	cursorshift: 0,
	class_arr: ["buttons editor", "buttons symbol", "buttons nobkg", "buttons disabled"],
	
	get_button: function (i, class_n){                                   //alert('pos: '+this.b_top);
		if (class_n===undefined) {class_n=0;}
		var class_name = this.class_arr[class_n];
		var style="";
	    var ny = (i-i%this.b_nx)/this.b_nx;                              //alert('pos: '+i+' '+ny);
	    var nx = i % this.b_nx;
	   
	    var b_yspace = (this.b_bottom - this.b_top) / ( this.b_ny-1 + (this.b_ny-1+this.b_botheight) / this.b_yratio ); 
	    var b_xspace = (this.b_right - this.b_left) / ( this.b_nx-1 + (this.b_nx-2+this.b_leftwidth+this.b_rightwidth) / this.b_xratio ); 
	    var b_height = b_yspace/this.b_yratio;
	    var b_width  = b_xspace/this.b_xratio;
	    
	    var y = this.b_top + (b_height+b_yspace)* ny;
	    var x = this.b_left + (b_width+b_xspace)* nx;
	    
	    if ( nx>0 )   { x -= b_width*(1-this.b_leftwidth); }
	    if ( nx===0 )           { b_width = b_width*this.b_leftwidth; }
	    if ( nx===this.b_nx-1 ) { b_width = b_width*this.b_rightwidth; }
	    if ( ny===this.b_ny-1 && this.b_botheight!=1 ) { b_height = b_height*this.b_botheight; //style+='line-height:60%;'; 
		}
	    
	    style+= 'left:'+x+'vw; top:'+y+'vh; width:'+b_width+'vw; height:'+b_height+'vh; border-bottom-width:'+b_height*0.07+'vh;'  ;  //alert(style);
	    return('class="'+class_name+'" style="'+style+'"');
	},
	
	set_style: function (stylename, ncol){                                     //alert(stylename);
		if (stylename==='bottom_3rows') {                               //alert(stylename);
			if (ncol===undefined) {ncol=7;}
		    this.b_nx=ncol; this.b_ny=3; 
		    this.b_yratio=0.5; this.b_xratio=0.5;
		    this.b_left=2; this.b_right=98; this.b_top=42.5; this.b_bottom=97; this.b_botheight=0.8;
		    this.b_leftwidth=1; this.b_rightwidth=1; this.zoomspace = 6;
		    var zoomheight = this.b_top - 2 - this.zoomspace;
		    document.getElementById('editor_text_box').style.height=zoomheight+'%';
		    document.getElementById('editor_buttons_area').style.top=(this.b_top-this.zoomspace/2)+'%';
		    editor_set_fontsize(this.nlines_lvl1,1);  
		     
		}else if (stylename==='bottom_2rows') {                          //alert('2rows');
			if (ncol===undefined) {ncol=6;}
		    this.b_nx=ncol; this.b_ny=2; 
		    this.b_yratio=0.5; this.b_xratio=0.5;
		    this.b_left=2; this.b_right=98; this.b_top=64; this.b_bottom=97; this.b_botheight=0.8;
		    this.b_leftwidth=1; this.b_rightwidth=1; this.zoomspace = 5;
		    var zoomheight = this.b_top - 2 - this.zoomspace;
		    document.getElementById('editor_text_box').style.height = zoomheight+'%';  
		    document.getElementById('editor_buttons_area').style.top=(this.b_top-this.zoomspace/2)+'%';
		    editor_set_fontsize(this.nlines_lvl0,0);                     //alert('nlines_lvl0: '+this.nlines_lvl0);
		    		    
		}else if (stylename==='cut_leftright') {                         //alert(stylename);
		    this.b_nx=7; 
		    this.b_left=1.5; this.b_right=98.5;
		    this.b_rightwidth=0.6; this.b_leftwidth=0.6;
		    document.getElementById('editor_text_box').style.width='97%';
		    document.getElementById('editor_text_box').style.left='1.5%';
		}
	},
	button_exit:   function(i) { return '<div id="editor_exit"    onclick="editor_exit();" '    +this.get_button(i) +'> exit </div>'; },
	button_delete: function(i) { return '<div id="editor_delete"  onclick="editor_delete();" '  +this.get_button(i) +'>'+symbol_delete_editor+'</div>'; },
	button_prev:   function(i) { return '<div id="editor_prev"    onclick="editor_scroll(0);" ' +this.get_button(i) +'>'+symbol_left+'</div>' },
	button_next:   function(i) { return '<div id="editor_next"    onclick="editor_scroll(1);" ' +this.get_button(i) +'>'+symbol_right+'</div>' },
	button_backto_start:   function(i)    { return '<div id="editor_backto_start"   onclick="editor_backto_start();" '        +this.get_button(i) +'> back </div>' },
	button_backto_letters: function(i, s) { return '<div id="editor_backto_letters" onclick="editor_backto_letters('+s+');" ' +this.get_button(i) +'> back </div>' },
		
};


//-- run editor -----------------------------------------------------------------

//editor_run();
if (typeof reader!=='undefined' && reader.ineditor===true) { reader_editor();}

function editor_run(parent, text_raw, destination, iter){                //alert(destination);
	editor.style.nlines_lvl0 = common.editor_nlines_lvl0;
	editor.style.nlines_lvl1 = common.editor_nlines_lvl1;
	if (text_raw==undefined) { text_raw=""; }
	if (destination==undefined) { destination=""; }
	if (iter==undefined) { iter=0; }
	editor.parent = parent;
	editor.destination = destination.toString();
	editor.text_raw = text_raw.toString();
	editor.iter = iter;

    create_element('editor_bkg','editor_bkg', 'created_elements');
    create_element('editor_area','editor_bkg', 'editor_base_elements');
    
	var elem=create_element('editor_text_box','text_scroll_box', 'editor_area'); 
	elem.style = 'top:2%; width:96%; left:2%;';
	elem.innerHTML = '<div class="text_scroll" ><div id="editor_text_area" class="reader_text" style="line-height:115%;color:rgba(0,0,0,0.55);align:left;width:99%;height:100%;">zoom word</div></div>'; 
	elem = create_element('editor_buttons_area', 'editor_buttons_area', 'editor_area'); 
	
	editor_type = 'bottom_2rows';
	editor.style.set_style(editor_type);
	
	document.getElementById('editor_text_area').innerHTML=editor.text_raw;   //alert('editor 3');
	editor_set_cursor();                                                     //alert('editor 4');
	editor_show_start();                                                     //alert('editor 5');
	if (parent==='files') { editor_show_symbols(3,0); }
}
function editor_exit(){                                                  //alert(editor.destination);
    var elem = document.getElementById('editor_area');
    elem.parentNode.removeChild(elem);
    var elem = document.getElementById('editor_bkg');
    elem.parentNode.removeChild(elem);
    if (editor.parent=="reader"){ 
		reader.ischanged_text = true;
		reader.editor_text = editor.text_raw;
		reader.ineditor = false;
		reader_run(); 
	}else if (editor.parent=="files"){                                   //alert(editor.destination);
		elem = document.getElementById(editor.destination);
		if (elem) { elem.innerHTML = editor.text_raw; }                  //alert(elem);
		elem = document.getElementById("ffiles_edit_text" );
		if (elem) { elem.value = editor.text_raw; }                      //alert(editor.text_raw);
		filesys.editor_text = "";                                        
	}  
}function editor_save(){                                                 //alert('editor_save');
    if (editor.parent=='reader'){
		reader.editor_text = editor.text_raw;
        reader.ischanged_text = true;
        reader_run(); 
        //document.getElementById('reader_edit').click();
    }
}

//-- show buttons ---------------------------------------------------------------
//-------------------------------------------------------------------------------
function editor_show_start(){                                            //alert('editor_start');
    elem = document.getElementById('editor_buttons_area');
    inner_e0 = "<div id='editor_buttons_area_0'>";
    inner_e0+= '<div id="editor_numbers"    onclick="editor_show_symbols(1,0);" '+editor.style.get_button(3,1) +'> xyz </div>';
    inner_e0+= '<div id="editor_numbers"    onclick="editor_show_symbols(0,0);" '+editor.style.get_button(9,1) +'> 123 </div>';
    inner_e0+= '<div id="editor_letters_en" onclick="editor_show_symbols(4,0);" '+editor.style.get_button(4,1) +'> abc </div>';
    inner_e0+= '<div id="editor_letters_ru" onclick="editor_show_symbols(5,0);" '+editor.style.get_button(10,1)+'> абв </div>';
    inner_e0+= '<div id="editor_letters_ru" onclick="editor_show_symbols(2,0);" '+editor.style.get_button(11,1)+'>'+symbol_nextpage3+'</div>';
    inner_e0+= '<div id="editor_navigate"   onclick="editor_show_navigate(0);" ' +editor.style.get_button(5)   +'>'+symbol_navigate+'</div>';
    inner_e0+= '<div id="editor_exit"       onclick="editor_exit();" '           +editor.style.get_button(6)  +'> exit </div>';
    inner_e0+= '<div id="editor_menu"       onclick="editor_show_menu();" '      +editor.style.get_button(2)   +'> menu </div>';
    inner_e0+= '<div id="editor_save"       onclick="editor_save();" '           +editor.style.get_button(8)   +'> save </div>';
    //inner_e0+= '<div id="editor_copy"       onclick="" ' +editor.style.get_button(7,3) +'> copy </div>';
    inner_e0+= '<div id="editor_past"       onclick="" ' +editor.style.get_button(1,3) +'> copy past </div>';
    inner_e0+= '<div id="editor_go"         onclick="" ' +editor.style.get_button(0,3) +'> go </div>';
    inner_e0+= "</div>"
    inner_e1 = "<div id='editor_buttons_area_1'></div>";
    inner_e2 = "<div id='editor_buttons_area_2'></div>";
    inner_e3 = "<div id='editor_buttons_area_3'></div>";
    inner_e4 = "<div id='editor_buttons_area_4'></div>";
    elem.innerHTML = inner_e0+inner_e1+inner_e2 + inner_e3 + inner_e4;
}
function editor_show_menu(){
    var inner_e = "";
    var parent = "editor_created_elements";
    //inner_e+= '<div '+common_buttonpos_menu(2,1)+'><div id="common_lang_zoom1" class="text_zoom menu_zoom">'+common.langbase+'</div></div>';
    //inner_e+= '<div '+common_buttonpos_menu(6,1)+'><div id="common_lang_zoom1" class="text_zoom menu_zoom" >'+common.lang+'</div></div>';
    //inner_e+= '<div id="common_langbase"     onclick="common_show_lang(1, true,  this.parentElement.id);" ' +common_buttonpos_menu(3,0)+'> base lang </div>';
    //inner_e+= '<div id="common_lang"         onclick="common_show_lang(1, false, this.parentElement.id);" ' +common_buttonpos_menu(7,0)+'> lang </div>';
    inner_e+= '<div id="common_lang_both_zoom"  onclick="" ' +common_buttonpos_menu(2,1,4,2,0,-1)+'>'+common.langbase+' +<br> '+common.lang+'</div>';
    inner_e+= '<div id="common_lang"            onclick="common_show_lang(1);" '+common_buttonpos_menu(3,0)+'>local lang</div>';
    inner_e+= '<div id="editor_fontsize"     onclick="editor_show_fontsize();" '+common_buttonpos_menu(5,0)+'> font size </div>';
    inner_e+= '<div id="editor_sound"        onclick="" '+common_buttonpos_menu(0,3)+'> sound </div>';
    inner_e+= '<div id="editor_read"         onclick="" '+common_buttonpos_menu(4,3)+'> read </div>';
    inner_e+= '<div id="editor_sound_button" onclick="" '+common_buttonpos_menu(1,3)+'> sound </div>';
    common_create_menu('editor_menu', 0, inner_e,'editor_created_elements', true);
}
function editor_show_fontsize(){
	var inner_e = "";
    inner_e += '<div id="5"  onclick="editor_set_fontsize(this.id,0);"  '+common_buttonpos_menu(4,0)+'> 5 lines </div>';
    inner_e += '<div id="4"  onclick="editor_set_fontsize(this.id,0);"  '+common_buttonpos_menu(5,0)+'> 4 lines </div>';
    inner_e += '<div id="3"  onclick="editor_set_fontsize(this.id,0);"  '+common_buttonpos_menu(6,0)+'> 3 lines </div>';
    inner_e += '<div id="2"  onclick="editor_set_fontsize(this.id,0);"  '+common_buttonpos_menu(7,0)+'> 2 lines </div>';
    common_create_menu('editor_fontsize', 1, inner_e, 'editor_created_elements', true);
}
    
function editor_show_symbols(lang, lvl){                                 //alert('show_symbols');
    editor.style.set_style('bottom_3rows');
    editor.style.b_nx=7;
    
    var symbol1, symbol2;
	if (lang===0)      { symbol1 = symbol_nextpage3; symbol2 = symbol_nextpage1; }
	else if (lang===1) { symbol1 = symbol_nextpage2; symbol2 = symbol_nextpage3; }
	else               { symbol1 = symbol_nextpage1; symbol2 = symbol_nextpage2; }
	if (lang===4) { symbol1 = 'эюя'; }
    
    key_arr = editor.dict.symbolset7_all()[lang][lvl];                    //alert(key_arr);
    inner_e = ''; i=0; 
    if (lvl==0){                                                         //alert('lvl=0');
        inner_e+= editor.style.button_delete(6);
        inner_e+= editor.style.button_prev(19);
        inner_e+= editor.style.button_next(20);
        inner_e+= '<div id="editor_letters_p1" onclick="editor_show_symbols('+lang+',1);" ' +editor.style.get_button(13) +'>'+symbol1+'</div>';
        inner_e+= '<div id="editor_letters_p2" onclick="editor_show_symbols('+lang+',2);" ' +editor.style.get_button(7)  +'>'+symbol2+'</div>';
        if (editor.parent==="files"){ inner_e+= editor.style.button_exit(14); }
		else {                        inner_e+= editor.style.button_backto_start(14); }
        reserved=[5,6, 13,14,20];                                        //alert('2: '+inner_e);
        reserved=[6,7, 13,14,20,19];                                        //alert('2: '+inner_e);
    }else {
        inner_e+= editor.style.button_backto_letters(14,1);
        if (lvl===2)  { 
			inner_e+= '<div id="editor_letters_p1" onclick="editor_show_symbols('+lang+',1);" ' +editor.style.get_button(13) +'>'+symbol1+'</div>'; 
			inner_e+= '<div id="editor_capslock" onclick="editor_capital(1,1,0);" ' +editor.style.get_button(6)  +'> caps lock </div>';
			inner_e+= '<div id="editor_caps" onclick="editor.pin_letters=1;" ' +editor.style.get_button(7) +'> pin tab </div>';
			reserved=[14,6,7,13];
		}else if (lvl===1)  { 
			inner_e+= '<div id="editor_caps"     onclick="editor_capital(1,0,0);" ' +editor.style.get_button(20) +'> caps </div>';
			inner_e+= '<div id="editor_letters_p1" onclick="editor_show_symbols('+lang+',2);" ' +editor.style.get_button(7) +'>'+symbol2+'</div>'; 
			inner_e+= '<div id="editor_caps" onclick="editor.pin_letters=1;" ' +editor.style.get_button(13) +'> pin tab </div>';
			reserved=[14,7,13,20];
		}
    }                                                                    //alert('3: '+inner_e);
    for (ii=0; ii<editor.style.b_nx*editor.style.b_ny; ii++){
        if (reserved.indexOf(ii)==-1 && i<key_arr.length){
            i_name = key_arr[i];
            i_name_button = editor.dict.allchar_buttons()[key_arr[i]];   //alert(i+' '+i_name+' '+i_name_button);
            style = editor.style.get_button(ii, 1);                      //alert(ii, style);
            keys = Object.keys(editor.dict.allchar() ); nn=keys.indexOf(i_name).toString();
            inner_e += '<div id="editor_letter_'+i_name+'" onclick="editor_set_letter('+nn+');"  '+style+'>'+i_name_button+'</div>';
            i+=1;
        } 
    }
    if (lvl==0){
        document.getElementById('editor_buttons_area_0').style.visibility='hidden';
        elem = document.getElementById('editor_buttons_area_1');
    }else{
        document.getElementById('editor_buttons_area_1').style.visibility='hidden';
        elem = document.getElementById('editor_buttons_area_2');
    }elem.style.visibility='visible';
    elem.innerHTML = inner_e;                                            //alert('pin: '+editor.pin_letters);
    editor_capital(0,1);
}

function editor_show_navigate(lvl){
	var elem; var inner_e = "";
	editor.style.set_style('bottom_2rows',7);
    inner_e+= editor.style.button_delete(6);
    inner_e+= editor.style.button_prev(10);
    inner_e+= editor.style.button_next(12);
    inner_e+= '<div id="editor_prevword" onclick="editor_scrollword(0);" ' +editor.style.get_button(9) +'>' +symbol_leftword  +'</div>' ;
	inner_e+= '<div id="editor_nextword" onclick="editor_scrollword(1);" ' +editor.style.get_button(13)+'>' +symbol_rightword +'</div>' ;
    inner_e+= '<div id="editor_up"       onclick="editor_scrollvert(0);" ' +editor.style.get_button(4) +'>' +symbol_up        +'</div>' ;
	inner_e+= '<div id="editor_down"     onclick="editor_scrollvert(1);" ' +editor.style.get_button(11) +'>' +symbol_down      +'</div>' ;
	inner_e+= '<div id="editor_sound"    onclick="editor_sound();" '       +editor.style.get_button(2) +'>' +symbols_sound[editor.sound_navigator] +'</div>' ;
	inner_e+= '<div id="editor_spell"    onclick="editor_spell();" '       +editor.style.get_button(8) +'> spell </div>' ;
	inner_e+= '<div id="editor_ctrlz"    onclick="editor_ctrlz();"  '      +editor.style.get_button(0,3) +'>' +symbol_ctrlz +'</div>' ;
	inner_e+= '<div id="editor_ctrly"    onclick="editor_ctrly();"  '      +editor.style.get_button(1,3) +'>' +symbol_ctrly +'</div>' ;
    inner_e+= '<div id="editor_show_letter" '+editor.style.get_button(5,2)+'>_</div>';
    if (lvl===0){ 
		inner_e+= editor.style.button_backto_start(7);
		document.getElementById('editor_buttons_area_0').style.visibility='hidden';
		elem = document.getElementById('editor_buttons_area_1');
	}else{ 
		inner_e+= editor.style.button_backto_letters(7,1);
		document.getElementById('editor_buttons_area_1').style.visibility='hidden';
		elem = document.getElementById('editor_buttons_area_2');
	}
    elem.style.visibility='visible';
    elem.innerHTML = inner_e;
}

function editor_capital(setcaps, lock, reset){
	if (setcaps===undefined) {setcaps=0;}
	if (lock===undefined) {lock=0;}
	if (reset===undefined) {reset=0;}
	
	if (reset===1) {editor.caps=0;}
	if (setcaps===1) {	
		if (lock===0){ editor.caps = (editor.caps+1)%2; }
		else { editor.capslock=(editor.capslock+1)%2; }
	}                                                                    //alert('caps: '+editor.caps+ +editor.capslock);
	var arr = document.getElementsByClassName("symbol");
	var inner = ""; var i = 0;
	for (i=0; i<arr.length; i+=1){
		inner = arr[i].innerHTML;
		if ( /^[a-zA-Z]+$/.test(inner) || /^[а-яА-Я]+$/.test(inner) ) { 
			if (editor.caps+editor.capslock===1) { arr[i].innerHTML = inner.toUpperCase(); }
			else                                 { arr[i].innerHTML = inner.toLowerCase(); }
		}
	}	
	if (setcaps===1 && editor.pin_letters===0) { editor_backto_letters(); }
}

//-- delete / add functions ------------------------------------------------------
//--------------------------------------------------------------------------------
function editor_delete(){                                                //alert(editor.iter);
    if (editor.iter>0) { 
		//var rtag = "</abbr>"; var ltag = "<abbr>";    
		var ltag = common.symbol_ltag, rtag = common.symbol_rtag;              
        var iter = editor.iter;
		var text = editor.text_raw;                                      //alert(iter+'  '+text);
		
        var i = text.substr(0,iter).lastIndexOf(rtag);                       //alert(iter+' '+i);
        if (iter==i+rtag.length && i!=-1){
            iter_l = text.substr(0,iter).lastIndexOf(ltag);
        }else{
            i = text.substr(0,iter).lastIndexOf('>');
            if (iter==i+1 && i!=-1){
                iter_l = text.substr(0,iter).lastIndexOf('<');
            }else{iter_l=iter-1;}    
        }
        
        text_c = text.substr(0, iter_l)+text.substr(iter);
        editor.iter = iter_l;
		editor.text_raw = text_c;	
        editor_set_cursor(); 
    }
}function editor_set_letter(n){
    var iter = editor.iter;
	var text = editor.text_raw;
    keys = Object.keys( editor.dict.allchar() );
    letter = editor.dict.allchar()[keys[n]];                              //alert(n+' '+arr[n]+'  '+letter);
    if (editor.capslock+editor.caps===1) { 
		if (/^[a-zA-Z]+$/.test(letter) || /^[а-яА-Я]+$/.test(letter)) { letter = letter.toUpperCase(); }
	}
    text_c = text.substr(0, iter)+letter+text.substr(iter);
    editor.text_raw = text_c;
    iter_new = iter+letter.length;
    editor.iter = iter_new;
    editor_set_cursor(); 
    if (editor.pin_letters===0) { editor_backto_letters(); }
    editor_capital(0,0,1);
}

//-- menu functions ------------------------------------------------------------
//------------------------------------------------------------------------------
function editor_sound(){
    editor.sound_navigator = (editor.sound_navigator+1)%2;                   //alert(editor_sound_counter);
    document.getElementById('editor_sound').innerHTML = symbols_sound[editor.sound_navigator];
}
function editor_set_fontsize(id, lvl){
    var zoomheight = editor.style.b_top - 2 - editor.style.zoomspace;    //alert(zoomheight+' '+id); 
    if (lvl===0){
		editor.style.nlines_lvl0 = parseInt(id);                                   //alert(editor.nlines_lvl0);             
		common.editor_nlines_lvl0 = parseInt(id);                                   //alert(editor.nlines_lvl0); 
	}else if (lvl===1){
		editor.style.nlines_lvl1 = parseInt(id);                                   //alert(editor.nlines_lvl0);             
		common.editor_nlines_lvl1 = parseInt(id);         
	}            
    var fontsize = editor.style.window_height * zoomheight/100 / 1.2 / id;  //alert(fontsize);
	document.getElementById('editor_text_area').style.fontSize = fontsize.toString()+'px';
	editor.style.fontsize = fontsize;    
}
function editor_spell(){
    var iter = editor.iter;
	var text = editor.text_raw;
    if (text[iter-1]!=' ' || text[iter]!=' '){ 
        i1 = text.substr(0,iter).lastIndexOf(' '); 
        i2 = text.indexOf(' ',iter);
        if (i1==-1){i1=0;}
        if (i2==-1){i2=text.length;}
        utter(text.substr(i1, i2-i1), 1, 0);
    }
}

function editor_backto_start(){
    editor.style.set_style('bottom_2rows');
    document.getElementById('editor_buttons_area_0').style.visibility='visible';
    document.getElementById('editor_buttons_area_1').style.visibility='hidden';
}
function editor_backto_letters(change_style){
    if (change_style==1){ editor.style.set_style('bottom_3rows'); }
    document.getElementById('editor_buttons_area_1').style.visibility='visible';
    document.getElementById('editor_buttons_area_2').style.visibility='hidden';
    document.getElementById('editor_buttons_area_3').style.visibility='hidden';
    document.getElementById('editor_text_box').style.width='96%';
    editor.pin_letters = 0;
    //editor_capital(0,0,1);
}

//-- cursor functions -----------------------------------------------------------
//-------------------------------------------------------------------------------
function editor_scrollvert(order){                                       //alert('scrollvert');
    order = parseInt(order);
    var iter_prev = editor.iter;
    var iter_save = iter_prev; 
    var pos0 = parseInt(document.getElementById('cursor').offsetTop);        //alert(pos0);
    var proceed = 1;
    while(proceed==1){
        editor_scrollword(order);
        pos = parseInt(document.getElementById('cursor').offsetTop);     //alert('|'+pos0+'|'+pos+'|');
        iter = editor.iter;
        if (pos!=pos0 || iter==iter_prev) {proceed=0;}
        iter_prev = iter;
    }
    if (order==1 && pos==pos0 && iter!=iter_save) {
        iter=iter_save;
        editor.iter = iter;
        editor_set_cursor();
        } 
    if (order==0){
        pos0 = parseInt(document.getElementById('cursor').offsetTop);    //alert(pos0);
        proceed = 1;
        while(proceed==1){
            editor_scrollword(0);
            pos = parseInt(document.getElementById('cursor').offsetTop); //alert('|'+pos0+'|'+pos+'|');
            var iter = editor.iter;  
            if (pos!=pos0 || iter==iter_prev) {proceed=0;}
            iter_prev = iter;
        }editor_scrollword(1);
    }
    var text_read = common_textto_read( editor.text_raw.substring(iter_save, iter) );
	if (editor.sound_navigator==1) { utter(text_read, 1, 0); }   
}
function editor_scrollword(order){                                       //alert('scrollword '+order);
    order = parseInt(order);
    var iter = editor.iter;
    var text = editor.text_raw;
    
    var i_left=iter, i_right=iter, i=0;
    if (order==1){ 
		if (text[iter]!=' '){
			i = text.lastIndexOf(' ', iter-1);
			if (i!=-1) { i_left = i+1; } else{i_left=0;}
			
			if (text.indexOf(' ', iter)!=-1) { iter = text.indexOf(' ', iter); }
			else {iter = text.length;}
		}
		iter = find_spaceend(text, iter);	
		i_right = iter;	
	}
	if (order==0){
		if (text[iter-1]!==' ' && iter>0){ i_right = text.indexOf(' ', iter); if (i_right==-1){i_right=text.length;} }
		if (text[iter-1]===' ' && iter>0){ iter = find_spacestart(text,iter-1) }
		if (iter>0){ 
			i = text.lastIndexOf(' ', iter-1);
			if (i!=-1) { iter = i+1; } else{iter=0;}
		}
		i_left = iter;
	}
	editor.iter = iter;
	editor_set_cursor();
	var text_read = common_textto_read( text.substring(i_left, i_right) );
	if (editor.sound_navigator==1) { utter(text_read, 1, 0); }   
}
function editor_scroll(order){
    var ltag = common.symbol_ltag, rtag = common.symbol_rtag; 
    var iter = editor.iter;
    var iter_prev = iter;
    var text = editor.text_raw;
    max_iter = text.length;
    if (order==1 && iter < max_iter){ 
        if (iter==text.indexOf(ltag,iter) ){
            iter = text.indexOf(rtag,iter) + rtag.length; 
        }else{
            if (iter==text.indexOf('<',iter) ){
                iter = text.indexOf('>',iter) + 1; 
            }else{iter+=1;}
        }
    }else if (order==0 && iter > 0) { 
        i = text.substr(0,iter).lastIndexOf(rtag);
        if (iter==i+rtag.length && i!=-1){
            iter = text.substr(0,iter).lastIndexOf(ltag);                //alert('1:'+iter);
        }else{
            i = text.substr(0,iter).lastIndexOf('>');
            if (iter==i+1 && i!=-1){
                iter = text.substr(0,iter).lastIndexOf('<');             //alert('2:'+iter);
            }else{iter-=1;}     
        } 
    }  
    editor.iter = iter;
    editor_set_cursor();
    i1 = Math.min(iter_prev, iter); i2 = Math.max(iter_prev, iter); 
    var letter = text.substr(i1, i2-i1);
    var text_read = common_textto_read(letter);
    if (editor.sound_navigator==1) { utter(text_read, 1, 0); }
    if (letter==' '){letter='_';}
    document.getElementById('editor_show_letter').innerHTML = letter;
    return (iter);
}

function editor_set_cursor(){                                            //alert('set_cursor');
	var cursorshift = editor.style.fontsize*0.15;                        //alert(cursorshift);
    var cursor = '<em id="cursor" style="position:relative;"><em class="blinking-cursor" style="left:-'+cursorshift.toString()+'px" >|</em></em>'; 
    var iter = editor.iter;                                              //alert('iter: '+iter);
    var text = editor.text_raw;                                          //alert('text: '+text);
    rspace = text.indexOf(' ',iter);                                     //alert('rspace: '+rspace);
    lspace = text.substr(0,iter).lastIndexOf(' ');                       
    if (rspace>0 && lspace>0 && lspace<rspace){                          //alert('|'+lspace+'|'+iter+'|'+rspace+'|');
        text_c = text.substr(0, lspace+1)+'<span style="white-space:nowrap;">'+text.substr(lspace+1,iter-lspace-1)+cursor+text.substr(iter,rspace-iter)+'</span>'+text.substr(rspace);
    }else{ 
        text_c = text.substr(0, iter)+cursor+text.substr(iter); 
    }                                                                    //alert(text); alert(text_c);
    document.getElementById('editor_text_area').innerHTML=text_c;
    scroll_to('cursor','editor_text_box', title=0);                      //alert(text_c);
    }

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
