//alert('editor 0');

var editor_lang = 'en';
//var scroll_by = 'letter';
//var scroll_by = 'word';
var editor_sound_counter = 1;

var dict_letters_ru = {r1:'а',r2:'б',r3:'в',r4:'г',r5:'д',r6:'е',r7:'ё',r8:'ж',r9:'з',r10:'и',r11:'й',r12:'к',r13:'л',r14:'м',r15:'н',r16:'о',r17:'п',r18:'р',r19:'с',r20:'т',r21:'у',r22:'ф',r23:'х',r24:'ц',r25:'ч',r26:'ш',r27:'щ',r28:'ъ',r29:'ы',r30:'ь',r31:'э',r32:'ю',r33:'я' };
var dict_letters_en = { a:'a', b:'b', c:'c', d:'d', e:'e', f:'f', g:'g', h:'h', i:'i', j:'j', k:'k', l:'l', m:'m', n:'n', o:'o', p:'p', q:'q', r:'r', s:'s', t:'t', u:'u', v:'v', w:'w', x:'x', y:'y', z:'z'};
var dict_symbols =    { 0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',dot:'.', dash:'-', comma:',', qmark:'?', emark:'!', colon:':', semicolon:';', quotes:'"', plus:'+', minus:'-', eq:'=', star:'*', divide:'/', lbr:'(', rbr:')', power:'^', lbrsq:'[', rbrsq:']', lbrf:'{', rbrf:'}'};
var dict_symbols2 =   { space:' ', newline:' <br> ', pc:'<abbr>&#37</abbr>', less:'<abbr>&#60</abbr>', more:'<abbr>&#62</abbr>', leq:'<abbr>&#8804</abbr>', geq:'<abbr>&#8805</abbr>', ll:'<abbr>&#8810</abbr>', gg:'<abbr>&#8811</abbr>', approx:'<abbr>&#8776</abbr>', vert:'|', backslash:'<abbr>&#8726</abbr>', sum:'<abbr>&#8721</abbr>', prod:'<abbr>&#8719</abbr>', cap:'<abbr>&#8745</abbr>', cup:'<abbr>&#8746</abbr>', subset:'<abbr>&#8834</abbr>', supset:'<abbr>&#8835</abbr>', sim:'<abbr>~</abbr>', cdot:'<abbr>&#8729</abbr>', neq:'<abbr>&#8800</abbr>', quiv:'<abbr>&#8801</abbr>', sqrt:'<abbr>&#8730</abbr>'};
var dict_symbols2_b = { space:'space',  newline:'line',  pc:'&#37', less:'&#60', more:'&#62', leq:'&#8804', geq:'&#8805', ll:'&#8810', gg:'&#8811', approx:'&#8776', vert:'|', backslash:'&#8726', sum:'&#8721', prod:'&#8719', cap:'&#8745', cup:'&#8746', subset:'&#8834', supset:'&#8835', sim:'~', cdot:'&#8729', neq:'&#8800', quiv:'&#8801', sqrt:'&#8730'};
dict_1 = merge_options(dict_letters_en, dict_letters_ru); 
dict_2 = merge_options(dict_1, dict_symbols); 
var dict_allchar = merge_options(dict_2, dict_symbols2);
var dict_allchar_buttons = merge_options(dict_2, dict_symbols2_b);


var letters_arr_en = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','dash','dot', 'comma','qmark','emark','quotes','space','newline'];
var letters_arr_ru = ['newline','qmark','emark','quotes','pc','lbr','rbr','r7','plus',  'r26','r27','r28','r29','r31','r32','dot','comma','dash',   'r20','r21','r22','r23','r24','r25','r30','r32','r33',    'r11','r12','r13','r14','r15','r16','r17','r18','r19',   'r1','r2','r3','r4','r5','r6','r8','r9','r10',    'space'];
var numbers_arr =    ['newline','sim','approx','leq','geq','ll','gg','cup','cap',   'vert','qmark','pc','less','more','lbrf','rbrf','lbr','rbr',   'x','y','z','a','b','c','d','i','f',  'plus','minus','eq','star','divide','dot','comma','power','0',   '1','2','3','4','5','6','7','8','9',  'space'];
var symbols_arr = letters_arr;
var letters_arr = letters_arr_ru;

var b_nset=5; var b_n=10;
var b_nx=5; var b_ny=2; var b_xspace=5; var b_yspace=7; 
var b_left=3; var b_right=97; var b_top=38; var b_bottom=95;
var b_rightwidth=null;
var text_zoom = '900%';
var box_class = 'text_zoom';
var style_text = 'upper_twolines';
//var e_style = 'top:2%; width:96%; left:2%;';
document.body.style.setProperty('--editor-fontsize-pc', 7);
document.body.style.setProperty('--editor-borderwidth-pc', 2);
/*
function setstyle_left(){
	document.body.style.setProperty('--editor-fontsize-pc', 6.3);
	document.body.style.setProperty('--editor-borderwidth-pc', 1);
	document.body.style.setProperty('--editor-wordbreak', 'break-all');
	b_nset=5; b_n=8; b_nx=2; b_ny=4; b_xspace=5; b_yspace=6; 
	b_left=75; b_right=107; b_top=4; b_bottom=97; b_rightwidth=6; b_botheight=null;
	text_zoom = '100%'; box_class = 'reader_text';
	e_style = 'width:'+(b_left-5)+'%; height:75%;';
	} */
function setstyle_upper_oneline(){                                       //alert('oneline');
	b_nset=5; b_n=18; b_nx=6; b_ny=3; b_xspace=5; b_yspace=6; 
	b_left=2; b_right=98; b_top=38; b_bottom=97; b_botheight=0.7;
	document.getElementById('editor_text_box').style.height=(b_top-8)+'%';
	document.getElementById('editor_text_box').className='reader_zoom_box';
	document.getElementById('editor_text_area').className='text_zoom';
	document.getElementById('editor_text_area').style.fontSize='900%';
	style_text = 'upper_oneline';                                        //alert(style_text);
}function setstyle_upper_twolines(){                                     //alert('twolines');
	b_nset=5; b_n=10; b_nx=6; b_ny=2; b_xspace=5; b_yspace=6; 
	b_left=2; b_right=98; b_top=61.5; b_bottom=97; b_botheight=0.7;
	document.getElementById('editor_text_box').style.height=(b_top-7)+'%';
	document.getElementById('editor_text_box').className='text_scroll_box';
	document.getElementById('editor_text_area').className='text_scroll';
	document.getElementById('editor_text_area').style.fontSize='650%';
	style_text = 'upper_twolines';
}
elem=create_element('div', 'editor_text_box','reader_zoom_box', 'top:2%; width:96%; left:2%;','','','','','');  //alert(e_style);
elem.innerHTML = '<div id="editor_text_area" class="text_zoom" style="line-height:115%;color:rgba(0,0,0,0.55);align:left;">zoom word</div>'; 

editor_type = 'texttop_twolines_v1';
//editor_type = 'texttop_oneline_v1';
//editor_type = 'textleft_v1';
var bodyStyles = window.getComputedStyle(document.body);
screen_h = window.screen.height;     
screen_w = window.screen.width;
if (editor_type=='textleft_v1'){ setstyle_left(); }
if (editor_type=='texttop_oneline_v1'){ setstyle_upper_oneline(); }
if (editor_type=='texttop_twolines_v1'){ setstyle_upper_twolines(); }

function button_size_pos(i){     
	ny = (i-i%b_nx)/b_nx;                                                //alert('pos: '+i+' '+ny);
	dx = (b_right - b_left -(b_nx-1)*b_xspace)/b_nx; 
	x = b_left + (dx+b_xspace)*(i%b_nx);     
	dy = (b_bottom - b_top -(b_ny-1)*b_yspace )/b_ny;                    //alert('dy: '+dy);
	if (b_botheight!=null){ dy = dy/(b_ny-1+b_botheight)*b_ny;  } 
	y = b_top + (dy+b_yspace)*(i-i%b_nx)/b_nx;                           //alert('y: '+y);
	if (b_botheight!=null && ny==b_ny-1){dy=dy*b_botheight;}
	if (b_rightwidth!=null && (i%b_nx)==b_nx-1){dx=b_rightwidth;}
	style = 'left:'+x.toString()+'%; top:'+y.toString()+'%;'+'width:'+dx.toString()+'%; height:'+dy.toString()+'%;'  ;  //alert(style);
	return([style,x,y,dx,dy]);
}

text = localStorage.getItem('text_edit'); 
document.getElementById('editor_text_area').innerHTML=text; 
editor_set_cursor();  
editor_show_start();

function editor_exit(){                                                  //alert('editor exit');
	localStorage.setItem('ischanged_text', '1');
	window.location.href = localStorage.getItem('editor_back');          //alert(localStorage.getItem('text_edit'));
}

function editor_set_cursor(){
	cursor='<em id="cursor" style="position:relative;"><em class="blinking-cursor" >|</em></em>';
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	rspace = text.indexOf(' ',iter);
	lspace = text.substr(0,iter).lastIndexOf(' ');                       //alert('|'+style_text+'|');
	if (rspace>0 && lspace>0 && lspace<rspace){                      //alert('|'+lspace0+'|'+iter+'|'+rspace0+'|');
		text_c = text.substr(0, lspace+1)+'<span style="white-space:nowrap;">'+text.substr(lspace+1,iter-lspace-1)+cursor+text.substr(iter,rspace-iter)+'</span>'+text.substr(rspace);
	}else{ 
		text_c = text.substr(0, iter)+cursor+text.substr(iter); 
	}                                                                    //alert(text); alert(text_c);
	document.getElementById('editor_text_area').innerHTML=text_c;
	scroll_to('cursor','editor_text_box', title=0);                      //alert(text_c);
	}
function set_button_appearance(id){ alert(id); }
function editor_show_start(){
	app_button_html = '< div id="app_button" class="buttons" onclick="set_button_appearance(this.parentNode.id);" style="width:1.5%;height:3%;"> * </div>';
	//app_button_html = '<div id="app_button" class="button_app" onclick="set_button_appearance(this.id);" > * </div>';
	app = app_button_html; app='';
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '','','','','','',''); }
	inner_e0 = "<div id='editor_buttons_area_0'>";
	inner_e0+= '<div id="editor_menu"    class="buttons_editor" onclick="editor_show_menu();"      style="'+button_size_pos(1)[0]+'">menu</div>';
	inner_e0+= '<div id="editor_utter"   class="buttons_editor disabled" onclick="editor_utter_word();"     style="'+button_size_pos(8)[0]+'">utter</div>';
	inner_e0+= '<div id="editor_select"  class="buttons_editor disabled" onclick="editor_select_word();"    style="'+button_size_pos(7)[0]+'">by word</div>';
	inner_e0+= '<div id="editor_numbers" class="buttons_editor" onclick="editor_show_symbols_p0(1);"  style="'+button_size_pos(2)[0]+'">math</div>';
	inner_e0+= '<div id="editor_letters" class="buttons_editor" onclick="editor_show_symbols_p0(0);"  style="'+button_size_pos(3)[0]+'">text</div>';
	inner_e0+= '<div id="editor_go"      class="buttons_editor disabled" onclick="show_menu_go();"          style="'+button_size_pos(0)[0]+'">go</div>';
	inner_e0+= '<div id="editor_exit"    class="buttons_editor" onclick="editor_exit();"           style="'+button_size_pos(6)[0]+'"> exit </div>';
	inner_e0+= '<div id="editor_delete" class="buttons_editor" onclick="editor_delete();"   style="'+button_size_pos(5)[0]+'">'+symbol_delete_editor+'</div>';
	//inner_e0+= '<div id="editor_prev"   class="buttons_editor" onclick="editor_scroll(0);"  style="'+button_size_pos(10)[0]+'">'+symbol_prev_editor+'</div>';
	//inner_e0+= '<div id="editor_next"   class="buttons_editor" onclick="editor_scroll(1);"  style="'+button_size_pos(11)[0]+'">'+symbol_next_editor+'</div>';
	inner_e0+= '<div id="editor_navigate"   class="buttons_editor" onclick="editor_show_navigate();"  style="'+button_size_pos(11)[0]+'">'+symbol_navigate+'</div>';
	inner_e0+= "</div>"
	inner_e1 = "<div id='editor_buttons_area_1'></div>";
	inner_e2 = "<div id='editor_buttons_area_2'></div>";
	inner_e3 = "<div id='editor_buttons_area_3'></div>";
	inner_e4 = "<div id='editor_buttons_area_4'></div>";
	elem.innerHTML = inner_e0+inner_e1+inner_e2 + inner_e3 + inner_e4;
	}
var button_delete = ['<div id="editor_delete" class="buttons_editor" onclick="editor_delete();"   style="', '">'+symbol_delete_editor+'</div>'];
var button_prev = [ '<div id="editor_prev"   class="buttons_editor" onclick="editor_scroll(0);"  style="', '">'+symbol_left+'</div>' ];
var button_next = [ '<div id="editor_next"   class="buttons_editor" onclick="editor_scroll(1);"  style="', '">'+symbol_right+'</div>' ];
var button_navigate =    [ '<div id="editor_navigate"     class="buttons_editor" onclick="editor_show_navigate();"     style="', '">'+symbol_navigate+'</div>' ];
var button_navigate_p0 = [ '<div id="editor_navigate_p0"  class="buttons_editor" onclick="editor_show_navigate_p0();"  style="', '">'+symbol_navigate+'</div>' ];
var button_backto_start   = ['<div id="editor_backto_start"   class="buttons_editor" onclick="editor_backto_start();"    style="', '"> back </div>'];
var button_backto_letters = ['<div id="editor_backto_letters" class="buttons_editor" onclick="editor_backto_letters(', ');"  style="', '"> back </div>'];
var button_p1 = ['<div id="editor_letters_p1" class="buttons_editor" onclick="editor_show_symbols_p1(', ');"  style="', '">'+symbol_nextpage+'</div>'];
var button_p2 = ['<div id="editor_letters_p2" class="buttons_editor" onclick="editor_show_symbols_p2(', ');"  style="', '">'+symbol_nextpage+'</div>'];
var button_up   = [ '<div id="editor_up"   class="buttons_editor" onclick="editor_scrollvert(0);"  style="', '">'+symbol_up+'</div>' ];
var button_down = [ '<div id="editor_down" class="buttons_editor" onclick="editor_scrollvert(1);"  style="', '">'+symbol_down+'</div>' ];
var button_prevword = [ '<div id="editor_prevword"  class="buttons_editor" onclick="editor_scrollword(0);"  style="', '">'+symbol_leftword+'</div>' ];
var button_nextword = [ '<div id="editor_nextword"  class="buttons_editor" onclick="editor_scrollword(1);"  style="', '">'+symbol_rightword+'</div>' ];
var button_sound = [ '<div id="editor_sound"   class="buttons_editor" onclick="editor_sound();"  style="', '">'+symbols_sound[editor_sound_counter]+'</div>' ];
function editor_show_menu(){
	menu_blur();
	var elem=create_element('div', 'editor_menu_area', '','','','','','','');
	var inner_e = '<div id="editor_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="editor_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="editor_appearance"  class="buttons disabled" onclick=""    style="left:15%; top:15%;"> appearance-common </div>';
	inner_e+= '<div id="editor_appearance-common" class="buttons disabled" onclick="show_menu_appearance_common();" style="left:35%; top:15%;"> appearance </div>';
	inner_e+= '<div id="editor_sound"       class="buttons disabled" onclick=""    style="left:15%; top:50%;"> sound </div>';
	inner_e+= '<div id="editor_read"        class="buttons disabled" onclick=""    style="left:60%; top:15%;"> read </div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}
function editor_scrollvert(order){                                       //alert('scrollvert');
	order = parseInt(order);
	iter_prev = parseInt(localStorage.getItem('editor_iter')); 
	iter_save = iter_prev; 
	pos0 = parseInt(document.getElementById('cursor').offsetTop);        //alert(pos0);
	proceed2 = 1;
	while(proceed2==1){
		editor_scrollword(order);
		pos = parseInt(document.getElementById('cursor').offsetTop);     //alert('|'+pos0+'|'+pos+'|');
		iter = parseInt(localStorage.getItem('editor_iter'));   
		if (pos!=pos0 || iter==iter_prev) {proceed2=0;}
		iter_prev = iter;
	}
	if (order==1 && pos==pos0 && iter!=iter_save) {
		iter=iter_save;
		localStorage.setItem('editor_iter', iter.toString());
		editor_set_cursor();
		} 
	if (order==0){
		pos0 = parseInt(document.getElementById('cursor').offsetTop);    //alert(pos0);
		proceed2 = 1;
		while(proceed2==1){
			editor_scrollword(0);
			pos = parseInt(document.getElementById('cursor').offsetTop); //alert('|'+pos0+'|'+pos+'|');
			iter = parseInt(localStorage.getItem('editor_iter'));   
			if (pos!=pos0 || iter==iter_prev) {proceed2=0;}
			iter_prev = iter;
		}editor_scrollword(1);
	}
}
function editor_scrollword(order){                                       //alert('scrollword '+order);
	order = parseInt(order);
	iter = parseInt(localStorage.getItem('editor_iter'));                //alert('iter '+iter);
	text = localStorage.getItem('text_edit');
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
			//iter = text.substr(0,iter).lastIndexOf(' ');               //alert(iter);
			proceed = 1;
			while(proceed==1){
				if (iter>1 && text[iter]==' '){iter=iter-1;}
				else{proceed=0;}                                         //alert(iter);
			}
		}else{ iter_prev = text.indexOf(' ',iter);  }
		iter = text.substr(0,iter).lastIndexOf(' ')+1;
	}
	localStorage.setItem('editor_iter', iter.toString());
	editor_set_cursor();
	i1 = Math.min(iter_prev, iter); i2 = Math.max(iter_prev, iter); 
	if (editor_sound_counter==1) { utter(text.substr(i1, i2-i1), editor_lang, 1, 0); }
}
function editor_scroll(order){
	ltag = '<abbr>'; rtag = '</abbr>';
	iter = parseInt(localStorage.getItem('editor_iter'));                //alert(iter);
	iter_prev = iter;
	text = localStorage.getItem('text_edit');
	max_iter = text.length;
	if (order==1 && iter < max_iter){ 
		if (iter==text.indexOf(ltag,iter) ){
			iter = text.indexOf(rtag,iter) + rtag.length; 
		}else{
			if (iter==text.indexOf('<',iter) ){
				iter = text.indexOf('>',iter) + 1; 
			}else{iter+=1;}
		}
	}  
	else if (order==0 && iter > 0) { 
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
	localStorage.setItem('editor_iter', iter.toString());
	editor_set_cursor();
	i1 = Math.min(iter_prev, iter); i2 = Math.max(iter_prev, iter); 
	if (editor_sound_counter==1) { utter(text.substr(i1, i2-i1), editor_lang, 1, 0); }
}function editor_delete(){
	if (iter>0) { 
		text = localStorage.getItem('text_edit');
		iter = parseInt(localStorage.getItem('editor_iter'));
		
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
		localStorage.setItem('text_edit', text_c);
		localStorage.setItem('editor_iter', (iter_l).toString());
		editor_set_cursor(); 
	}
}function editor_set_letter(n, back){
	//if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	//letter = dict_allchar[arr[n]]; 
	keys = Object.keys(dict_allchar);
	letter = dict_allchar[keys[n]];                                       //alert(n+' '+arr[n]+'  '+letter);
	text_c = text.substr(0, iter)+letter+text.substr(iter);
	localStorage.setItem('text_edit', text_c);
	iter_new = iter+letter.length;
	localStorage.setItem('editor_iter', iter_new.toString());
	editor_set_cursor(); 
	if (back==1){ editor_backto_letters(); }
}
	
/*
function button_size_pos(i){ 
	dx = (b_right - b_left -(b_nx-1)*b_xspace)/b_nx; 
	x = b_left + (dx+b_xspace)*(i%b_nx); //alert(x);
	dy = (b_bottom - b_top -(b_ny-1)*b_yspace )/b_ny; //alert(dy);
	y = b_top + (dy+b_yspace)*(i-i%b_nx)/b_nx;   ny = (i-i%b_nx)/b_nx;
	if (b_botheight!=null && ny==b_ny-1){dy=b_botheight;}
	if (b_rightwidth!=null && (i%b_nx)==b_nx-1){dx=b_rightwidth;}
	style = 'left:'+x.toString()+'%; top:'+y.toString()+'%;'+'width:'+dx.toString()+'%; height:'+dy.toString()+'%;'  ;
	return([style,x,y,dx,dy]);
	}*/
function editor_make_symbols_p0(type){
	//type = parseInt(type); alert(type);
	if (type==0 && editor_lang=='en'){
		key_arr = ['e','t','a','o', 'i','n','s','h', 'r','d','i','c','space'];               //alert(key_arr);
	}if (type==0 && editor_lang=='ru'){
		key_arr = ['r1','r2','r3','a','b','c','d','e','f','g','h','i','space']; 
	}if (type==1){
		key_arr = ['0','1','2','3','4','5','6','7','8','9','space']; 
	}
	inner_e = ''; i=0; reserved=[5,11,12,4,17];
	for (ii=0; ii<b_n; ii++){
		if (reserved.indexOf(ii)==-1 && i<key_arr.length){
			i_name = key_arr[i];
			i_name_button = dict_allchar_buttons[key_arr[i]];            //alert(i+' '+i_name+' '+i_name_button);
			style = button_size_pos(ii)[0];                              //alert(ii, style);
			keys = Object.keys(dict_allchar); nn=keys.indexOf(i_name).toString();
			inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor symbol" onclick="editor_set_letter('+nn+', 0);"  style="'+style+'">'+i_name_button+'</div>';
			i+=1;
		} 
	}inner_e+= button_backto_start[0]+button_size_pos(12)[0]+button_backto_start[1];
	inner_e+= button_delete[0]+button_size_pos(5)[0]+button_delete[1];
	inner_e+= button_navigate_p0[0]+button_size_pos(4)[0]+button_navigate_p0[1];
	inner_e+= button_p1[0]+type+button_p1[1]+button_size_pos(17)[0]+button_p1[2];
	inner_e+= button_p2[0]+type+button_p2[1]+button_size_pos(11)[0]+button_p2[2];
	//inner_e+= button_prev[0]+button_size_pos(16)[0]+button_prev[1];
	//inner_e+= button_next[0]+button_size_pos(17)[0]+button_next[1];
	return (inner_e);
}function editor_make_symbols_p1(type){
	//type = parseInt(type); alert(type);
	if (type==0 && editor_lang=='en'){                                   //alert('0 en');
		key_arr = ['u','m','w','f', 'g','y','p','b', 'v','k','j','x', 'q','z','dot','comma','dash'];              
	}if (type==0 && editor_lang=='ru'){ alert('0 ru');
		key_arr = ['dot','comma','emark','qmark','newline','quotes','lbr','rbr','dash']; 
	}if (type==1){
		key_arr = ['dot','comma','emark','qmark','newline','quotes','lbr','rbr','dash']; 
	}                                                                    //alert(key_arr)
	inner_e = ''; i=0; 
	for (ii=0; ii<b_n; ii++){
		if (i<key_arr.length){
			i_name = key_arr[i];
			i_name_button = dict_allchar_buttons[key_arr[i]];            //alert(i+' '+i_name+' '+i_name_button);
			style = button_size_pos(ii)[0];                              //alert(ii, style);
			keys = Object.keys(dict_allchar); nn=keys.indexOf(i_name).toString();
			inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor symbol" onclick="editor_set_letter('+nn+', 1);"  style="'+style+'">'+i_name_button+'</div>';
			i+=1;
		} 
	}inner_e+= button_backto_letters[0]+'0'+button_backto_letters[1]+button_size_pos(17)[0]+button_backto_letters[2];
	return (inner_e);
}function editor_make_symbols_p2(type){
	if (type==0 && editor_lang=='en'){                                   //alert('0 en');
		key_arr = ['0','1','2','3','4','5','6','7','8','9','emark','qmark','newline','quotes','lbr','rbr'];               
	}if (type==0 && editor_lang=='ru'){ alert('0 ru');
		key_arr = ['0','1','2','3','4','5','6','7','8','9','plus','eq','dot','quotes']; 
	}if (type==1){
		key_arr = ['dot','comma','emark','qmark','newline','quotes','lbr','rbr','dash']; 
	}                                                                    //alert(key_arr)
	inner_e = ''; i=0; 
	for (ii=0; ii<b_n; ii++){
		if (i<key_arr.length){
			i_name = key_arr[i];
			i_name_button = dict_allchar_buttons[key_arr[i]];            //alert(i+' '+i_name+' '+i_name_button);
			style = button_size_pos(ii)[0];                              //alert(ii, style);
			keys = Object.keys(dict_allchar); nn=keys.indexOf(i_name).toString();
			inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor symbol" onclick="editor_set_letter('+nn+', 1);"  style="'+style+'">'+i_name_button+'</div>';
			i+=1;
		} 
	}inner_e+= button_backto_letters[0]+'0'+button_backto_letters[1]+button_size_pos(17)[0]+button_backto_letters[2];
	return (inner_e);
}
function editor_show_symbols_p0(type){                                       //alert('p0');
	setstyle_upper_oneline();                                            //alert('setstyle');
	document.getElementById('editor_buttons_area_0').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_1');
	elem.style.visibility='visible';
	inner_e = editor_make_symbols_p0(type);
	elem.innerHTML = inner_e;
	editor_set_cursor();
}function editor_show_symbols_p1(type){
	setstyle_upper_oneline();                                            //alert('setstyle');
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_2');
	elem.style.visibility='visible';
	inner_e = editor_make_symbols_p1(type);
	elem.innerHTML = inner_e;
}function editor_show_symbols_p2(type){
	setstyle_upper_oneline();                                            //alert('setstyle');
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_2');
	elem.style.visibility='visible';
	inner_e = editor_make_symbols_p2(type);
	elem.innerHTML = inner_e;
}

function editor_show_navigate(){
	inner_e = button_backto_start[0]+button_size_pos(6)[0]+button_backto_start[1];
	inner_e+= button_up[0]+button_size_pos(3)[0]+button_up[1];
	inner_e+= button_down[0]+button_size_pos(9)[0]+button_down[1];
	inner_e+= button_prev[0]+button_size_pos(8)[0]+button_prev[1];
	inner_e+= button_next[0]+button_size_pos(10)[0]+button_next[1];
	inner_e+= button_prevword[0]+button_size_pos(7)[0]+button_prevword[1];
	inner_e+= button_nextword[0]+button_size_pos(11)[0]+button_nextword[1];
	inner_e+= button_delete[0]+button_size_pos(5)[0]+button_delete[1];
	inner_e+= button_sound[0]+button_size_pos(0)[0]+button_sound[1];
	document.getElementById('editor_buttons_area_0').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_1');
	elem.style.visibility='visible';
	elem.innerHTML = inner_e;
}function editor_show_navigate_p0(){
	setstyle_upper_twolines();
	inner_e = button_backto_letters[0]+'1'+button_backto_letters[1]+button_size_pos(6)[0]+button_backto_letters[2];
	inner_e+= button_up[0]+button_size_pos(3)[0]+button_up[1];
	inner_e+= button_down[0]+button_size_pos(9)[0]+button_down[1];
	inner_e+= button_prev[0]+button_size_pos(8)[0]+button_prev[1];
	inner_e+= button_next[0]+button_size_pos(10)[0]+button_next[1];
	inner_e+= button_prevword[0]+button_size_pos(7)[0]+button_prevword[1];
	inner_e+= button_nextword[0]+button_size_pos(11)[0]+button_nextword[1];
	inner_e+= button_delete[0]+button_size_pos(5)[0]+button_delete[1];
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_2');
	elem.style.visibility='visible';
	elem.innerHTML = inner_e;
}
function editor_sound(){
	editor_sound_counter = (editor_sound_counter+1)%2;                   //alert(editor_sound_counter);
	document.getElementById('editor_sound').innerHTML = symbols_sound[editor_sound_counter];
	}

function editor_backto_start(){
	setstyle_upper_twolines();
	document.getElementById('editor_buttons_area_0').style.visibility='visible';
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	}
function editor_backto_letters(change_style){
	if (change_style==1){ setstyle_upper_oneline(); }
	document.getElementById('editor_buttons_area_1').style.visibility='visible';
	document.getElementById('editor_buttons_area_2').style.visibility='hidden';
	document.getElementById('editor_buttons_area_3').style.visibility='hidden';
	}
