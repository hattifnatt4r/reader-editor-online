
var editor_lang = 'en';
var scroll_by = 'letter';
var scroll_by = 'word';


var dict_letters_ru = {r1:'а',r2:'б',r3:'в',r4:'г',r5:'д',r6:'е',r7:'ё',r8:'ж',r9:'з',r10:'и',r11:'й',r12:'к',r13:'л',r14:'м',r15:'н',r16:'о',r17:'п',r18:'р',r19:'с',r20:'т',r21:'у',r22:'ф',r23:'х',r24:'ц',r25:'ч',r26:'ш',r27:'щ',r28:'ъ',r29:'ы',r30:'ь',r31:'э',r32:'ю',r33:'я' };
var dict_letters_en = { a:'a', b:'b', c:'c', d:'d', e:'e', f:'f', g:'g', h:'h', i:'i', j:'j', k:'k', l:'l', m:'m', n:'n', o:'o', p:'p', q:'q', r:'r', s:'s', t:'t', u:'u', v:'v', w:'w', x:'x', y:'y', z:'z'};
var dict_symbols =    { 0:'0',1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9',dot:'.', dash:'-', comma:',', qmark:'?', emark:'!', colon:':', semicolon:';', quotes:'"', plus:'+', minus:'-', eq:'=', star:'*', divide:'/', lbr:'(', rbr:')', power:'^', lbrsq:'[', rbrsq:']', lbrf:'{', rbrf:'}'};
var dict_symbols2 =   { space:'<abbr>&#160 </abbr>', newline:'<br> ', pc:'<abbr>&#37</abbr>', less:'<abbr>&#60</abbr>', more:'<abbr>&#62</abbr>', leq:'<abbr>&#8804</abbr>', geq:'<abbr>&#8805</abbr>', ll:'<abbr>&#8810</abbr>', gg:'<abbr>&#8811</abbr>', approx:'<abbr>&#8776</abbr>', vert:'|', backslash:'<abbr>&#8726</abbr>', sum:'<abbr>&#8721</abbr>', prod:'<abbr>&#8719</abbr>', cap:'<abbr>&#8745</abbr>', cup:'<abbr>&#8746</abbr>', subset:'<abbr>&#8834</abbr>', supset:'<abbr>&#8835</abbr>', sim:'<abbr>~</abbr>', cdot:'<abbr>&#8729</abbr>', neq:'<abbr>&#8800</abbr>', quiv:'<abbr>&#8801</abbr>', sqrt:'<abbr>&#8730</abbr>'};
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

var editor_type = 'texttop_twolines_v1';
//var editor_type = 'texttop_oneline_v1';
//var editor_type = 'textleft_v1';
var bodyStyles = window.getComputedStyle(document.body);
screen_h = window.screen.height;     
screen_w = window.screen.width;
if (editor_type=='textleft_v1'){
	document.body.style.setProperty('--editor-fontsize-pc', 6.3);
	document.body.style.setProperty('--editor-borderwidth-pc', 1);
	document.body.style.setProperty('--editor-wordbreak', 'break-all');
	var b_nset=5; var b_n=8;
	var b_nx=2; var b_ny=4; var b_xspace=5; var b_yspace=6; 
	var b_left=75; var b_right=107; var b_top=4; var b_bottom=97; var b_rightwidth=6;
	e_style = 'width:'+(b_left-5)+'%; height:75%;';
	var elem=create_element('div', 'editor_text_box','text_scroll_box', e_style, '','','','',''); 
	elem.innerHTML = "<div class='text_scroll' align='left' ><div id='editor_text_area' class='reader_text'>text</div></div>";
}
if (editor_type=='texttop_oneline_v1'){
	document.body.style.setProperty('--editor-fontsize-pc', 7);
	document.body.style.setProperty('--editor-borderwidth-pc', 2);
	var b_nset=5; var b_n=10;
	var b_nx=5; var b_ny=2; var b_xspace=5; var b_yspace=7; 
	var b_left=3; var b_right=97; var b_top=38; var b_bottom=95;
	e_style = 'top:2%; width:96%; height:'+(b_top-8)+'%; left:2%;';
	var elem=create_element('div', 'editor_text_box','reader_zoom_box', e_style,'','','','','');
	elem.innerHTML = '<div id="editor_text_area" class="text_zoom" style="font-size:900%;">zoom word</div>'; 
}
if (editor_type=='texttop_twolines_v1'){
	document.body.style.setProperty('--editor-fontsize-pc', 7);
	document.body.style.setProperty('--editor-borderwidth-pc', 2);
	var b_nset=5; var b_n=10;
	var b_nx=5; var b_ny=2; var b_xspace=5; var b_yspace=7; 
	var b_top=55; var b_bottom=110; b_left=2; b_right=98; var b_botheight=13;
	e_style = 'top:2%; width:96%; height:'+(b_top-7)+'%; left:2%;';
	var elem=create_element('div', 'editor_text_box','text_scroll_box', e_style, '','','','',''); 
	elem.innerHTML = "<div class='text_scroll' align='left' ><div id='editor_text_area' class='reader_text' style='font-style:bold;font-size:650%;line-height:111%;color:rgba(0,0,0,0.6);'>text</div></div>"; 
}

text = localStorage.getItem('text_edit'); 
document.getElementById('editor_text_area').innerHTML=text; 
editor_set_cursor();  
editor_show_start();

function editor_exit(){
	localStorage.setItem('ischanged_text', '1');
	window.location.href = localStorage.getItem('editor_back');
	//alert(localStorage.getItem('text_edit'));
	}

function editor_set_cursor(){
	cursor='<em id="cursor" style="position:relative;"><em class="blinking-cursor" >|</em></em>';
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	text_c = text.substr(0, iter)+cursor+text.substr(iter);
	document.getElementById('editor_text_area').innerHTML=text_c;
	scroll_to('cursor','editor_text_box', title=0);
	//alert(text_c);
	}
function set_button_appearance(id){ alert(id); }
function editor_show_start(){
	app_button_html = '< div id="app_button" class="buttons" onclick="set_button_appearance(this.parentNode.id);" style="width:1.5%;height:3%;"> * </div>';
	//app_button_html = '<div id="app_button" class="button_app" onclick="set_button_appearance(this.id);" > * </div>';
	app = app_button_html; app='';
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '','','','','','',''); }
	//inner_e0 = '<div id="editor_back" class="buttons" onclick="alert(123);"  style="left:79%; top:2%;"> back </div>';
	inner_e1 = "<div id='editor_buttons_area_1'>";
	inner_e1+= '<div id="editor_menu"    class="buttons_editor" onclick="editor_show_menu();"      style="'+button_size_pos(1)[0]+'">menu</div>';
	inner_e1+= '<div id="editor_utter"   class="buttons_editor disabled" onclick="editor_utter_word();"     style="'+button_size_pos(7)[0]+'">utter</div>';
	inner_e1+= '<div id="editor_select"  class="buttons_editor disabled" onclick="editor_select_word();"    style="'+button_size_pos(6)[0]+'">by word</div>';
	//inner_e1+= '<div id="editor_symbols" class="buttons_editor" onclick="editor_show_letters(2);"  style="'+button_size_pos(1)[0]+'">symbols</div>';
	inner_e1+= '<div id="editor_numbers" class="buttons_editor" onclick="editor_show_letters(1);"  style="'+button_size_pos(2)[0]+'">numbers symbols</div>';
	inner_e1+= '<div id="editor_letters" class="buttons_editor" onclick="editor_show_letters(0);"  style="'+button_size_pos(3)[0]+'">letters</div>';
	inner_e1+= '<div id="editor_go"      class="buttons_editor disabled" onclick="show_menu_go();"          style="'+button_size_pos(0)[0]+'">go</div>';
	inner_e1+= '<div id="editor_exit"    class="buttons_editor" onclick="editor_exit();"           style="'+button_size_pos(5)[0]+'"> exit </div>';
	inner_e1+= "</div>"
	inner_e2 = "<div id='editor_buttons_area_2'>";
	inner_e2+= '<div id="editor_delete" class="buttons_editor" onclick="editor_delete();"   style="'+button_size_pos(4)[0]+'">'+symbol_delete_editor+'</div>';
	inner_e2+= '<div id="editor_prev"   class="buttons_editor" onclick="editor_scroll(0);"  style="'+button_size_pos(8)[0]+'">'+symbol_prev_editor+'</div>';
	inner_e2+= '<div id="editor_next"   class="buttons_editor" onclick="editor_scroll(1);"  style="'+button_size_pos(9)[0]+'">'+symbol_next_editor+'</div>';
	inner_e2+= "</div>"
	inner_e3 = "<div id='editor_buttons_area_3'></div>";
	inner_e4 = "<div id='editor_buttons_area_4'></div>";
	inner_e5 = '<div id="editor_backto_start"   class="buttons_editor" onclick="editor_backto_start();"    style="'+button_size_pos(5)[0]+'"> back </div>';
	inner_e5+= '<div id="editor_backto_letters" class="buttons_editor" onclick="editor_backto_letters();"  style="'+button_size_pos(5)[0]+'"> back </div>';
	elem.innerHTML = inner_e1+inner_e2+inner_e3 + inner_e4 + inner_e5;
	//document.getElementById('editor_letters_back').style.visibility='hidden';
	document.getElementById('editor_backto_start').style.visibility='hidden';
	document.getElementById('editor_backto_letters').style.visibility='hidden';
	}
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
/*
function editor_scroll_byword(order){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	space = '<abbr>&#160 </abbr>';
	lspace = text.substr(0,iter).lastIndexOf(space);
	
	proceed = 1;
	while(proceed==1){
		if text[iter]
		}
	}
	*/ 
function editor_scroll(order){
	ltag = '<abbr>'; rtag = '</abbr>';
	iter = parseInt(localStorage.getItem('editor_iter'));
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
			iter = text.substr(0,iter).lastIndexOf(ltag); //alert('1:'+iter);
		}else{
			i = text.substr(0,iter).lastIndexOf('>');
			if (iter==i+1 && i!=-1){
				iter = text.substr(0,iter).lastIndexOf('<'); //alert('2:'+iter);
			}else{iter-=1;}	 
		} 
	}  
	localStorage.setItem('editor_iter', iter.toString());
	editor_set_cursor();
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
}function editor_set_letter(n, type){
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	letter = dict_allchar[arr[n]];   //alert(n+' '+arr[n]+'  '+letter);
	text_c = text.substr(0, iter)+letter+text.substr(iter);
	localStorage.setItem('text_edit', text_c);
	iter_new = iter+letter.length;
	localStorage.setItem('editor_iter', iter_new.toString());
	editor_set_cursor(); 
	editor_backto_letters();
}
	

function button_size_pos(i){ 
	dx = (b_right - b_left -(b_nx-1)*b_xspace)/b_nx; 
	x = b_left + (dx+b_xspace)*(i%b_nx); //alert(x);
	dy = (b_bottom - b_top -(b_ny-1)*b_yspace )/b_ny; //alert(dy);
	y = b_top + (dy+b_yspace)*(i-i%b_nx)/b_nx;   ny = (i-i%b_nx)/b_nx;
	if (b_botheight!=null && ny==b_ny-1){dy=b_botheight;}
	if (b_rightwidth!=null && (i%b_nx)==b_nx-1){dx=b_rightwidth;}
	style = 'left:'+x.toString()+'%; top:'+y.toString()+'%;'+'width:'+dx.toString()+'%; height:'+dy.toString()+'%;'  ;
	return([style,x,y,dx,dy]);
	}
function editor_show_letters(type){
	document.getElementById('editor_backto_start').style.visibility='visible';
	document.getElementById('editor_backto_letters').style.visibility='hidden';
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_3');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area_3', '', 'background-color: green;', '','','','',''); }
	else{ document.getElementById('editor_buttons_area_3').style.visibility='visible'; }
	inner_e = ''; i=0;
	for (ii=0; ii<b_n; ii++){
		if (ii!=5 && ii!=4 && ii!=3 &&i<b_nset){
		i_name=''; for (j=0;j<b_n-1;j++) { i_name+=' '+ dict_allchar_buttons[ arr[j+i*(b_n-1)] ] +' '; }
		style = button_size_pos(ii)[0];
		inner_e += '<div id="editor_letterset_'+i.toString()+'" class="buttons_editor" onclick="editor_show_letters_set('+i.toString()+','+type.toString()+');"  style="'+style+'">'+i_name+'</div>';
		i+=1; }
	}
	inner_e += '<div id="editor_letter_space" class="buttons_editor" onclick="editor_set_letter(45,'+type.toString()+');"  style="'+button_size_pos(3)[0]+'">space</div>';
	elem.innerHTML = inner_e;
}function editor_show_letters_set(n, type){
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	document.getElementById('editor_buttons_area_2').style.visibility='hidden';
	document.getElementById('editor_buttons_area_3').style.visibility='hidden';
	document.getElementById('editor_backto_start').style.visibility='hidden';
	document.getElementById('editor_backto_letters').style.visibility='visible';
	elem = document.getElementById('editor_buttons_area_4');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area_4', '', 'background-color: green;', '','','','',''); }
	else{ document.getElementById('editor_buttons_area_4').style.visibility='visible'; }
	inner_e = ''; ii=0;
	for (i=0; i<b_n; i++){
		if (i==5){ii+=1;}
		n_letter = i+n*(b_n-1);
		i_name = arr[n_letter].toString();
		i_name_button = dict_allchar_buttons[i_name]; //alert(i+' '+i_name+' '+i_name_button);
		style = button_size_pos(ii)[0];
		inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor" onclick="editor_set_letter('+n_letter+','+type.toString()+');"  style="'+style+'">'+i_name_button+'</div>';
		ii+=1;
	}
	elem.innerHTML = inner_e;
}
function editor_backto_start(){
	document.getElementById('editor_buttons_area_1').style.visibility='visible';
	document.getElementById('editor_buttons_area_2').style.visibility='visible';
	document.getElementById('editor_buttons_area_3').style.visibility='hidden';
	document.getElementById('editor_buttons_area_4').style.visibility='hidden';
	document.getElementById('editor_backto_start').style.visibility='hidden';
	document.getElementById('editor_backto_letters').style.visibility='hidden';
	}
function editor_backto_letters(){
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	document.getElementById('editor_buttons_area_2').style.visibility='visible';
	document.getElementById('editor_buttons_area_3').style.visibility='visible';
	document.getElementById('editor_buttons_area_4').style.visibility='hidden';
	document.getElementById('editor_backto_start').style.visibility='visible';
	document.getElementById('editor_backto_letters').style.visibility='hidden';
	}
