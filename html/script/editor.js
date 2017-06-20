//alert('editor 0');

//-- config -------------------------------------------------------------------
//-----------------------------------------------------------------------------

var editor = {
	dict: {},
	style: {},
	
	parent: "",
	destination: "",
	iter: 0,
	text_raw: "",
	
	sound_navigator: 1,
	sound_buttons: 0,
};

editor.dict = {
	letters_ru: { r1:'а',r2:'б',r3:'в',r4:'г',r5:'д',r6:'е',r7:'ё',r8:'ж',r9:'з',r10:'и',r11:'й',r12:'к',r13:'л',r14:'м',r15:'н',r16:'о',r17:'п',r18:'р',r19:'с',r20:'т',r21:'у',r22:'ф',r23:'х',r24:'ц',r25:'ч',r26:'ш',r27:'щ',r28:'ъ',r29:'ы',r30:'ь',r31:'э',r32:'ю',r33:'я' },
	letters_en: {  a:'a', b:'b', c:'c', d:'d', e:'e', f:'f', g:'g', h:'h', i:'i', j:'j', k:'k', l:'l', m:'m', n:'n', o:'o', p:'p', q:'q', r:'r', s:'s', t:'t', u:'u', v:'v', w:'w', x:'x', y:'y', z:'z'},
	symbols1:   { 0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',dot:'.', dash:'-', comma:',', qmark:'?', emark:'!', colon:':', semicolon:';', quotes:'"', plus:'+', minus:'-', eq:'=', star:'*', slash:'/', lbr:'(', rbr:')', power:'^', lbrsq:'[', rbrsq:']', lbrf:'{', rbrf:'}', underscore:'_'},
	symbols2:   { space:' ', newline:' <br> ', pc:'<abbr>&#37</abbr>', less:'<abbr>&#60</abbr>', more:'<abbr>&#62</abbr>', leq:'<abbr>&#8804</abbr>', geq:'<abbr>&#8805</abbr>', ll:'<abbr>&#8810</abbr>', gg:'<abbr>&#8811</abbr>', approx:'<abbr>&#8776</abbr>', vert:'|', backslash:'<abbr>&#8726</abbr>', sum:'<abbr>&#8721</abbr>', prod:'<abbr>&#8719</abbr>', cap:'<abbr>&#8745</abbr>', cup:'<abbr>&#8746</abbr>', subset:'<abbr>&#8834</abbr>', supset:'<abbr>&#8835</abbr>', sim:'<abbr>~</abbr>', cdot:'<abbr>&#8729</abbr>', neq:'<abbr>&#8800</abbr>', quiv:'<abbr>&#8801</abbr>', sqrt:'<abbr>&#8730</abbr>'},
	symbols2_b: { space:' ',  newline:'line',  pc:'&#37', less:'&#60', more:'&#62', leq:'&#8804', geq:'&#8805', ll:'&#8810', gg:'&#8811', approx:'&#8776', vert:'|', backslash:'&#8726', sum:'&#8721', prod:'&#8719', cap:'&#8745', cup:'&#8746', subset:'&#8834', supset:'&#8835', sim:'~', cdot:'&#8729', neq:'&#8800', quiv:'&#8801', sqrt:'&#8730'},
	allchar: function(){ 
		return( Object.assign({}, this.letters_en, this.letters_ru, this.symbols1, this.symbols2   )); }, 
	allchar_buttons: function(){ 
		return( Object.assign({}, this.letters_en, this.letters_ru, this.symbols1, this.symbols2_b )); },
	
	symbolset7_en: [ 
		['w','m','u','l','d',  'c','r','h','s','n','i',  'o','a','t','e','space'],
	    ['lbr','rbr','z','q','x','j',  'k','v','b','p','y','g',  'f','dash','emark','qmark','dot','comma'],             
	    ['space','star','quotes','colon','semicolon','space',  '1','2','3','4','5','newline',  '6','7','8','9','0','space']
	], symbolset7_ru: [ 
		['r21','r17','r5','r14','r12',  'r13','r3','r18','r19','r20','r15',  'r10','r1','r6','r16','space'],    
        ['r22','r31','r27','r24','r32','r26',  'r8','r23','r11','r25','r2','r9',  'r4','r30','r29','r33','dot','comma'],    
		['r28','colon','semicolon','emark','qmark','space',  '1','2','3','4','5','dash',  '6','7','8','9','0','space']
	], symbolset7_math: [
		['minus','plus','comma','dot','space',  'eq','1','2','3','4','5',  '6','7','8','9','0'],    
		['lbrf','rbrf','lbrsq','rbrsq','semicolon','colon',  'emark','qmark','star','power','less','more',  'sqrt','newline','slash','cdot','lbr','rbr'],    
		['i','j','k','l','underscore','space',  'd','e','f','g','h','space',  'a','b','c','x','y','z']  
	],	symbolset7_files: [ 
		['w','m','u','l','d',  'c','r','h','s','n','i',  'space','o','a','t','e'],
	    ['space','space','space','z','space','space',  'q','x','j','k','v','dash',  'b','p','y','g','f','underscore'],             
	    ['space','space','space','space','space','space',  'space','1','2','3','4','5', 'space','6','7','8','9','0']
	],                               
	symbolset7_all: function(){ return [this.symbolset7_math, this.symbolset7_en, this.symbolset7_ru, this.symbolset7_files] ; },
	
	/*
	symbolset6_en: [ 
		['e','t','a','o', 'i','n','s','h', 'r','d','l','c','u','m','w','space'],
		['','','','','','','','','','','','',''],
	    ['f', 'g','y','p','b', 'v','k','j','x', 'q','z','dot','comma','dash','emark','qmark','newline','lbr','rbr'], 
	    ['','','','','','','','','','','','',''],             
	    ['0','1','2','3','4','5','6','7','8','9','quotes','colon','semicolon','star']  
	    ['','','','','','','','','','','','','']
	], symbolset6_ru: [ 
		['r16','r6','r1','r10','r15','r20','r19','r18','r3','r13','r12','r14','r5','r17','r21','space'],
		['','','','','','','','','','','','',''],
        ['r31','r22','r28','r27', 'r2','r4','r8','r9','r11','r22','r23','r24','r25','r26','r29','r30','r33','dot','comma' ], 
        ['','','','','','','','','','','','',''],
		['1','2','3','lbr','rbr','colon','semicolon', '4','5','6','0','quotes','newline','7','8','9','emark','qmark','dash' ] 
		['','','','','','','','','','','','','']
	], symbolset6_math: [
		['0','1','2','3','4','5','6','7','8','9','space'],
		['','','','','','','','','','','','',''],
		['dot','comma','emark','qmark','newline','quotes','lbr','rbr','dash'],
		['','','','','','','','','','','','',''],
		['dot','comma','emark','qmark','newline','quotes','lbr','rbr','dash'] 
		['','','','','','','','','','','','','']
	],	symbolset6_files: [ 
		['e','t','a','o', 'i','n','s','h', 'r','d','l','c','u','m','w', 'f'],
		['','','','','','','','','','','','',''],
	    ['g','y','p','b', 'v','k','j','x', 'q','z', '0','1','2','3','4','5','6','7','8','9'], 
	    ['','','','','','','','','','','','',''],             
	    ['0','1','2','3','4','5','6','7','8','9']
	    ['','','','','','','','','','','','','']  
	],                               
	symbolset6_all: function(){ return [this.symbolset6_math, this.symbolset6_en, this.symbolset6_ru, this.symbolset6_files] ; }
	*/
	
};                                                                       //alert(editor.dict.symbolset_all());

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
	
	get_button: function (i){                                            //alert('pos: '+this.b_top);
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
	    if ( ny===this.b_ny-1 && this.b_botheight!=1 ) { b_height = b_height*this.b_botheight; style+='line-height:60%;'; }
	    
	    style+= 'left:'+x.toString()+'%; top:'+y.toString()+'%;'+'width:'+b_width.toString()+'%; height:'+b_height.toString()+'%;'  ;  //alert(style);
	    return('style="'+style+'"');
	},
	
	set_style: function (stylename){                                     //alert(stylename);
		if (stylename==='upper_oneline') {                               //alert(stylename);
		    this.b_nx=6; this.b_ny=3; 
		    this.b_yratio=0.5; this.b_xratio=0.5;
		    this.b_left=2; this.b_right=98; this.b_top=35; this.b_bottom=97; this.b_botheight=0.7;
		    this.b_leftwidth=1; this.b_rightwidth=1; this.zoomspace = 6;
		    var zoomheight = this.b_top - 2 - this.zoomspace;
		    document.getElementById('editor_text_box').style.height=zoomheight+'%';
		    document.getElementById('editor_text_box').className='reader_zoom_box';
		    document.getElementById('editor_text_area').className='text_zoom';
		    document.getElementById('editor_text_area').style.fontSize = this.window_height*zoomheight / 100 * 0.7;
		     
		}else if (stylename==='upper_twolines') {                        //alert('twolines');
		    this.b_nx=6; this.b_ny=2; 
		    this.b_yratio=0.5; this.b_xratio=0.55;
		    this.b_left=2; this.b_right=98; this.b_top=64; this.b_bottom=97; this.b_botheight=0.7;
		    this.b_leftwidth=1; this.b_rightwidth=1; this.zoomspace = 5;
		    var zoomheight = this.b_top - 2 - this.zoomspace;
		    document.getElementById('editor_text_box').style.height = zoomheight+'%';
		    document.getElementById('editor_text_box').className='text_scroll_box';
		    document.getElementById('editor_text_area').className='text_scroll';
		    document.getElementById('editor_text_box').style.width='96%';
		    document.getElementById('editor_text_box').style.left='2%';
		    editor_set_fontsize(this.nlines_lvl0);                       //alert(this.b_top);
		    		    
		}else if (stylename==='cut_leftright') {                         //alert(stylename);
		    this.b_nx=7; 
		    this.b_left=1.5; this.b_right=98.5;
		    this.b_rightwidth=0.6; this.b_leftwidth=0.6;
		    document.getElementById('editor_text_box').style.width='97%';
		    document.getElementById('editor_text_box').style.left='1.5%';
		}
	}	
};


//-- run editor -----------------------------------------------------------------
//-------------------------------------------------------------------------------

//editor_run();
if (typeof reader!=='undefined' && reader.ineditor===true) { reader_editor();}

function editor_run(parent, text_raw, destination, iter){                //alert(destination);
	editor.style.nlines_lvl0 = common.editor_nlines;
	if (text_raw==undefined) { text_raw=""; }
	if (destination==undefined) { destination=""; }
	if (iter==undefined) { iter=0; }
	editor.parent = parent;
	editor.destination = destination.toString();
	editor.text_raw = text_raw.toString();
	editor.iter = iter;
	document.body.style.setProperty('--editor-fontsize-pc', 7);
	document.body.style.setProperty('--editor-borderwidth-pc', 2);

    create_element('editor_area','body_bkg', 'editor_elements');
    
	var elem=create_element('editor_text_box','reader_zoom_box', 'editor_area'); 
	elem.style = 'top:2%; width:96%; left:2%;';
	elem.innerHTML = '<div id="editor_text_area" class="text_zoom" style="line-height:115%;color:rgba(0,0,0,0.55);align:left;">zoom word</div>'; 
	elem = create_element('editor_buttons_area', '', 'editor_area'); 
	//document.getElementById("base_elements").appendChild(document.getElementById("editor_buttons_area"));
	//document.getElementById("base_elements").appendChild(document.getElementById("editor_text_box"));
	
	//editor_type = 'upper_oneline';
	editor_type = 'upper_twolines';
	editor.style.set_style(editor_type);
	
	document.getElementById('editor_text_area').innerHTML=editor.text_raw;   //alert('editor 3');
	editor_set_cursor();                                                     //alert('editor 4');
	editor_show_start();                                                     //alert('editor 5');
	if (parent==='files') { editor_show_symbols(3,0); }
}
function editor_exit(){                                                  //alert(editor.destination);
    //var elem = document.getElementById('editor_area').parentNode;    
    var elem = document.getElementById('editor_area');
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

//-- show buttons functions -----------------------------------------------------
//-------------------------------------------------------------------------------
function editor_show_start(){                                            //alert('editor_start');
    elem = document.getElementById('editor_buttons_area');
    inner_e0 = "<div id='editor_buttons_area_0'>";
    inner_e0+= '<div id="editor_numbers"    class="buttons_editor symbol0" onclick="editor_show_symbols(0,0);" '+editor.style.get_button(3)+'>xyz</div>';
    inner_e0+= '<div id="editor_numbers"    class="buttons_editor symbol0" onclick="editor_show_symbols(0,0);" '+editor.style.get_button(9)+'>123</div>';
    inner_e0+= '<div id="editor_letters_en" class="buttons_editor symbol0" onclick="editor_show_symbols(1,0);" '+editor.style.get_button(4)+'>abc</div>';
    inner_e0+= '<div id="editor_letters_ru" class="buttons_editor symbol0" onclick="editor_show_symbols(2,0);" '+editor.style.get_button(10)+'>абв</div>';
    inner_e0+= '<div id="editor_go"      class="buttons_editor disabled" onclick="show_menu_go();" '+editor.style.get_button(0)+'>go</div>';
    inner_e0+= '<div id="editor_exit"    class="buttons_editor" onclick="editor_exit();" '+editor.style.get_button(11)+'> exit </div>';
    inner_e0+= '<div id="editor_menu"    class="buttons_editor" onclick="editor_show_menu();" '+editor.style.get_button(2)+'>menu</div>';
    inner_e0+= '<div id="editor_save"    class="buttons_editor" onclick="editor_save();" '+editor.style.get_button(8)+'> save </div>';
    inner_e0+= '<div id="editor_copy"    class="buttons_editor disabled" onclick="" '+editor.style.get_button(7)+'> copy </div>';
    inner_e0+= '<div id="editor_past"    class="buttons_editor disabled" onclick="" '+editor.style.get_button(1)+'> past </div>';
    inner_e0+= '<div id="editor_navigate"    class="buttons_editor" onclick="editor_show_navigate(0);" '+editor.style.get_button(5)+'>'+symbol_navigate+'</div>';
    //inner_e0+= '<div id="common_lang_zoom1"  class="buttons_editor nobkg" '+editor.style.get_button(10)+'>'+common.lang+'</div>';
    //inner_e0+= '<div id="common_lang"        class="buttons_editor" onclick="common_show_lang(0,false,this.parentElement.id);" '+editor.style.get_button(11)+'>lang</div>';
    inner_e0+= "</div>"
    inner_e1 = "<div id='editor_buttons_area_1'></div>";
    inner_e2 = "<div id='editor_buttons_area_2'></div>";
    inner_e3 = "<div id='editor_buttons_area_3'></div>";
    inner_e4 = "<div id='editor_buttons_area_4'></div>";
    elem.innerHTML = inner_e0+inner_e1+inner_e2 + inner_e3 + inner_e4;
    }

var button_exit = ['<div id="editor_exit"    class="buttons_editor" onclick="editor_exit();" ', '> exit </div>']
var button_delete = ['<div id="editor_delete" class="buttons_editor" onclick="editor_delete();" ', '>'+symbol_delete_editor+'</div>'];
var button_prev = [ '<div id="editor_prev"   class="buttons_editor" onclick="editor_scroll(0);" ', '>'+symbol_left+'</div>' ];
var button_next = [ '<div id="editor_next"   class="buttons_editor" onclick="editor_scroll(1);" ', '>'+symbol_right+'</div>' ];
var button_navigate =    [ '<div id="editor_navigate"     class="buttons_editor" onclick="editor_show_navigate(', ');" ', '>'+symbol_navigate+'</div>' ];
var button_backto_start   = ['<div id="editor_backto_start"   class="buttons_editor" onclick="editor_backto_start();" ', '> back </div>'];
var button_backto_letters = ['<div id="editor_backto_letters" class="buttons_editor" onclick="editor_backto_letters(', ');" ', '> back </div>'];
var button_p1 = ['<div id="editor_letters_p1" class="buttons_editor" onclick="editor_show_symbols(', ');" ', '>'+symbol_nextpage+'</div>'];
var button_p2 = ['<div id="editor_letters_p2" class="buttons_editor" onclick="editor_show_symbols(', ');" ', '>'+symbol_nextpage+'</div>'];
var button_up   = [ '<div id="editor_up"   class="buttons_editor" onclick="editor_scrollvert(0);" ', '>'+symbol_up+'</div>' ];
var button_down = [ '<div id="editor_down" class="buttons_editor" onclick="editor_scrollvert(1);" ', '>'+symbol_down+'</div>' ];
var button_prevword = [ '<div id="editor_prevword"  class="buttons_editor" onclick="editor_scrollword(0);" ', '>'+symbol_leftword+'</div>' ];
var button_nextword = [ '<div id="editor_nextword"  class="buttons_editor" onclick="editor_scrollword(1);" ', '>'+symbol_rightword+'</div>' ];
var button_sound = [ '<div id="editor_sound"   class="buttons_editor" onclick="editor_sound();" ', '>'+symbols_sound[editor.sound_navigator]+'</div>' ];
var button_spell = [ '<div id="editor_spell"   class="buttons_editor" onclick="editor_spell();" ', '>spell</div>' ];
function editor_show_menu(){
    var inner_e = "";
    //inner_e+= '<div id="editor_appearance"  class="buttons disabled" onclick=""    style="left:15%; top:15%;"> appearance-common </div>';
    inner_e+= '<div class="reader_zoom_box" '+common_buttonpos_menu(2,1)+'><div id="common_lang_zoom1" class="text_zoom">'+common.langbase+'</div></div>';
    inner_e+= '<div id="common_langbase"         class="buttons"  onclick="common_show_lang(1, true, this.parentElement.id);" '   +common_buttonpos_menu(3,0)+'> base lang </div>';
    inner_e+= '<div class="reader_zoom_box" '+common_buttonpos_menu(6,1)+'><div id="common_lang_zoom1" class="text_zoom">'+common.lang+'</div></div>';
    inner_e+= '<div id="common_lang"         class="buttons"  onclick="common_show_lang(1, false, this.parentElement.id);" '   +common_buttonpos_menu(7,0)+'> lang </div>';
    inner_e+= '<div id="editor_fontsize"     class="buttons"  onclick="editor_show_fontsize();" '+common_buttonpos_menu(5,0)+'> font size </div>';
    inner_e+= '<div id="editor_sound"        class="buttons disabled" onclick="" '+common_buttonpos_menu(0,0)+'> sound </div>';
    inner_e+= '<div id="editor_read"         class="buttons disabled" onclick="" '+common_buttonpos_menu(4,0)+'> read </div>';
    inner_e+= '<div id="editor_sound_button" class="buttons disabled" onclick="" '+common_buttonpos_menu(1,0)+'> sound </div>';
    common_create_menu('editor_menu', 0, inner_e, 'editor_buttons_area');
}
function editor_show_fontsize(){
	var inner_e = "";
    inner_e += '<div id="5"  class="buttons" onclick="editor_set_fontsize(this.id);"  '+common_buttonpos_menu(4,0)+'> 5 lines </div>';
    inner_e += '<div id="4"  class="buttons" onclick="editor_set_fontsize(this.id);"  '+common_buttonpos_menu(5,0)+'> 4 lines </div>';
    inner_e += '<div id="3"  class="buttons" onclick="editor_set_fontsize(this.id);"  '+common_buttonpos_menu(6,0)+'> 3 lines </div>';
    inner_e += '<div id="2"  class="buttons" onclick="editor_set_fontsize(this.id);"  '+common_buttonpos_menu(7,0)+'> 2 lines </div>';
    common_create_menu('editor_fontsize', 1, inner_e, 'editor_buttons_area');
}
    
function editor_show_symbols(lang, lvl){                                 //alert('show_symbols');
    editor.style.set_style('upper_oneline');
    //editor.style.set_style('cut_leftright');
    editor.style.b_nx=7;
    
    key_arr = editor.dict.symbolset7_all()[lang][lvl];                    //alert(key_arr);
    inner_e = ''; i=0; 
    if (lvl==0){                                                         //alert('lvl=0');
        inner_e+= button_delete[0]+editor.style.get_button(6)+button_delete[1];
        inner_e+= button_navigate[0]+'1'+button_navigate[1]+editor.style.get_button(5)+button_navigate[2];             //alert('1: '+inner_e);
        inner_e+= button_p1[0]+lang+',1'+button_p1[1]+editor.style.get_button(20)+button_p1[2];
        inner_e+= button_p2[0]+lang+',2'+button_p2[1]+editor.style.get_button(13)+button_p2[2];
        if (editor.parent==="files"){
			inner_e+= button_exit[0]+editor.style.get_button(14)+button_exit[1];
		}else{
			inner_e+= button_backto_start[0]+editor.style.get_button(14)+button_backto_start[1];
		}
        reserved=[5,6, 13,14,20];                                        //alert('2: '+inner_e);
    }else {
        inner_e+= button_backto_letters[0]+'1'+button_backto_letters[1]+editor.style.get_button(20)+button_backto_letters[2];
        reserved=[6,13,20];
        //if (editor.parent==="files"){reserved=[20];}
    }                                                                    //alert('3: '+inner_e);
    for (ii=0; ii<editor.style.b_nx*editor.style.b_ny; ii++){
        if (reserved.indexOf(ii)==-1 && i<key_arr.length){
            i_name = key_arr[i];
            i_name_button = editor.dict.allchar_buttons()[key_arr[i]];   //alert(i+' '+i_name+' '+i_name_button);
            style = editor.style.get_button(ii);                      //alert(ii, style);
            keys = Object.keys(editor.dict.allchar() ); nn=keys.indexOf(i_name).toString();
            inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor symbol" onclick="editor_set_letter('+nn+', 1);"  '+style+'>'+i_name_button+'</div>';
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
    elem.innerHTML = inner_e;
}

function editor_show_navigate(lvl){
	var inner_e = ""; var elem;
	if (lvl===1) {editor.style.set_style('upper_twolines'); }
    inner_e+= button_up[0]+editor.style.get_button(3)+button_up[1];
    inner_e+= button_down[0]+editor.style.get_button(9)+button_down[1];
    inner_e+= button_prev[0]+editor.style.get_button(8)+button_prev[1];
    inner_e+= button_next[0]+editor.style.get_button(10)+button_next[1];
    inner_e+= button_prevword[0]+editor.style.get_button(7)+button_prevword[1];
    inner_e+= button_nextword[0]+editor.style.get_button(11)+button_nextword[1];
    inner_e+= button_delete[0]+editor.style.get_button(5)+button_delete[1];
    inner_e+= button_sound[0]+editor.style.get_button(0)+button_sound[1];
    inner_e+= button_spell[0]+editor.style.get_button(1)+button_spell[1];
    inner_e+='<div id="editor_show_letter"   class="buttons_editor nobkg" '+editor.style.get_button(4)+'>_</div>';
    if (lvl===0){ 
		inner_e+= button_backto_start[0]+editor.style.get_button(6)+button_backto_start[1]; 
		document.getElementById('editor_buttons_area_0').style.visibility='hidden';
		elem = document.getElementById('editor_buttons_area_1');
	}else{ 
		inner_e+= button_backto_letters[0]+'1'+button_backto_letters[1]+editor.style.get_button(6)+button_backto_letters[2]; 
		document.getElementById('editor_buttons_area_1').style.visibility='hidden';
		elem = document.getElementById('editor_buttons_area_2');
	}
    elem.style.visibility='visible';
    elem.innerHTML = inner_e;
}

//-- cursor functions -------------------------------------------------------
function editor_scrollvert(order){                                       //alert('scrollvert');
    order = parseInt(order);
    var iter_prev = editor.iter;
    iter_save = iter_prev; 
    pos0 = parseInt(document.getElementById('cursor').offsetTop);        //alert(pos0);
    proceed2 = 1;
    while(proceed2==1){
        editor_scrollword(order);
        pos = parseInt(document.getElementById('cursor').offsetTop);     //alert('|'+pos0+'|'+pos+'|');
        iter = editor.iter;
        if (pos!=pos0 || iter==iter_prev) {proceed2=0;}
        iter_prev = iter;
    }
    if (order==1 && pos==pos0 && iter!=iter_save) {
        iter=iter_save;
        editor.iter = iter;
        editor_set_cursor();
        } 
    if (order==0){
        pos0 = parseInt(document.getElementById('cursor').offsetTop);    //alert(pos0);
        proceed2 = 1;
        while(proceed2==1){
            editor_scrollword(0);
            pos = parseInt(document.getElementById('cursor').offsetTop); //alert('|'+pos0+'|'+pos+'|');
            var iter = editor.iter;  
            if (pos!=pos0 || iter==iter_prev) {proceed2=0;}
            iter_prev = iter;
        }editor_scrollword(1);
    }
}
function editor_scrollword(order){                                       //alert('scrollword '+order);
    order = parseInt(order);
    var iter = editor.iter;
    var text = editor.text_raw;
    if (order==1 && iter<text.length-1){
        iter_prev = text.substr(0,iter).lastIndexOf(' '); 
        iter = text.indexOf(' ',iter);                                   //alert(iter); 
        proceed = 1;
        while(proceed==1){
            if (iter<text.length-1 && text[iter]==' ' && iter>=0 ){iter+=1;} 
            else{proceed=0;}                                             //alert(iter);
        }
    }if (order==0 && iter>0){                                            //alert('|'+text[iter]+'|');
        if (text[iter-1]==' '){                                            
            iter -=1;
            iter_prev = iter;
            proceed = 1;
            while(proceed==1){
                if (iter>1 && text[iter]==' '){iter=iter-1;}
                else{proceed=0;}                                         //alert(iter);
            }
        }else{ iter_prev = text.indexOf(' ',iter);  }
        iter = text.substr(0,iter).lastIndexOf(' ')+1;
    }
    editor.iter = iter;
    editor_set_cursor();
    i1 = Math.min(iter_prev, iter); i2 = Math.max(iter_prev, iter); 
    if (editor.sound_navigator==1) { utter(text.substr(i1, i2-i1), 1, 0); }
}
function editor_scroll(order){
    ltag = '<abbr>'; rtag = '</abbr>';
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
    letter = text.substr(i1, i2-i1);
    if (editor.sound_navigator==1) { utter(letter, 1, 0); }
    if (letter==' '){letter='_';}
    document.getElementById('editor_show_letter').innerHTML = letter;
}

function editor_set_cursor(){                                            //alert('set_cursor');
    cursor = '<em id="cursor" style="position:relative;"><em class="blinking-cursor" >|</em></em>';   
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

//-- delete / add functions ------------------------------------------------------
//--------------------------------------------------------------------------------
function editor_delete(){
    if (iter>0) { 
        var iter = editor.iter;
		var text = editor.text_raw;
		
        i = text.substr(0,iter).lastIndexOf(rtag);
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
}function editor_set_letter(n, back){
    var iter = editor.iter;
	var text = editor.text_raw;
    keys = Object.keys( editor.dict.allchar() );
    letter = editor.dict.allchar()[keys[n]];                                       //alert(n+' '+arr[n]+'  '+letter);
    text_c = text.substr(0, iter)+letter+text.substr(iter);
    editor.text_raw = text_c;
    iter_new = iter+letter.length;
    editor.iter = iter_new;
    editor_set_cursor(); 
    if (back==1){ editor_backto_letters(); }
}

//-- menu functions ------------------------------------------------------------
//------------------------------------------------------------------------------
function editor_sound(){
    editor.sound_navigator = (editor.sound_navigator+1)%2;                   //alert(editor_sound_counter);
    document.getElementById('editor_sound').innerHTML = symbols_sound[editor.sound_navigator];
}
function editor_set_fontsize(id){
    var zoomheight = editor.style.b_top - 2 - editor.style.zoomspace;    //alert(zoomheight+' '+id); 
    editor.style.nlines_lvl0 = parseInt(id);                                   //alert(editor.nlines_lvl0);             
    common.editor_nlines = parseInt(id);                                   //alert(editor.nlines_lvl0);             
    var fontsize = editor.style.window_height * zoomheight/100 / 1.2 / editor.style.nlines_lvl0;  //alert(fontsize);
	document.getElementById('editor_text_area').style.fontSize = fontsize.toString()+'px';
    
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
    editor.style.set_style('upper_twolines');
    document.getElementById('editor_buttons_area_0').style.visibility='visible';
    document.getElementById('editor_buttons_area_1').style.visibility='hidden';
    }
function editor_backto_letters(change_style){
    if (change_style==1){ editor.style.set_style('upper_oneline'); }
    document.getElementById('editor_buttons_area_1').style.visibility='visible';
    document.getElementById('editor_buttons_area_2').style.visibility='hidden';
    document.getElementById('editor_buttons_area_3').style.visibility='hidden';
    document.getElementById('editor_text_box').style.width='96%';
    }

function set_button_appearance(id){ alert(id); }

//-- save / exit ------------------------------------------------------------------
//---------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
