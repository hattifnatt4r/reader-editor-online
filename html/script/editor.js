$.getScript("/script/common.js");
//alert(localStorage.getItem('text_edit'));
var editor_type = 'math_right';
var editor_type = '';

var dict_symbols = { a:'a', b:'b', c:'c', d:'d', e:'e', f:'f', g:'g', h:'h', i:'i', j:'j', k:'k', l:'l', m:'m', n:'n', o:'o', p:'p', q:'q', r:'r', s:'s', t:'t', u:'u', v:'v', w:'w', x:'x', y:'y', z:'z', dot:'.', dash:'-', comma:',', qmark:'?', emark:'!', quotes:'"', space:' ', newline:'<br> ', plus:'+', minus:'-', eq:'=', less:' ', more:' ', sim:'~', cdot:'.', star:'*', divide:'/', lbr:'(', rbr:')', power:'^', pc:'%', lbrsq:'[', rbrsq:']', lbrf:'{', rbrf:'}'};
var dict_symbols_buttons = dict_symbols;
var letters_arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','dash','dot', 'comma','qmark','emark','quotes','space','newline'];
var numbers_arr = ['space','newline', 0,1,2,3,4,5,6,7,8,9, 'plus','minus','eq','star','divide','less','more','dot','comma', 'power','qmark','emark','quotes', 'x','y','z','a','b','c','d','e'];
//var numbers_arr = letters_arr;
var symbols_arr = letters_arr;
if (editor_type=='math_right'){
	var b_nset=5; var b_n=8;
	var b_nx=2; var b_ny=4; var b_xspace=3; var b_yspace=5; 
	var b_left=65; var b_right=98; var b_top=4; var b_bottom=96;
}else{
	var b_nset=5; var b_n=10;
	var b_nx=5; var b_ny=2; var b_xspace=4; var b_yspace=8; 
	var b_left=3; var b_right=97; var b_top=37; var b_bottom=96;
	//var n_butset=5; var n_but=8; var d_x=0.6; var d_y=0.6;
	//var n_x=4; var n_y=2; var l_x=100; var l_y=70; var o_x=0; var o_y=25; 
}

var bodyStyles = window.getComputedStyle(document.body);
screen_h = window.screen.height;
screen_w = window.screen.width;
if (editor_type=='math_right'){
	e_style = 'width:'+(b_left-5)+'%; height:75%;';
	var elem=create_element('div', 'editor_text_box','text_scroll_box', st=e_style); 
	elem.innerHTML = "<div class='text_scroll' align='left' ><div id='editor_text_area' class='reader_text'>text</div></div>";
}else{
	document.body.style.setProperty('--editor-fontsize-pc', 7);
	
	e_style = 'top:2%; width:96%; height:'+(b_top-7)+'%; left:2%; font-size:'+(screen_h*2.7/100)+';';
	var elem=create_element('div', 'editor_text_box','reader_zoom_box', st=e_style); 
	elem.innerHTML = '<div id="editor_text_area" class="text_zoom">zoom word</div>'; 
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
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	text_c = text.substr(0, iter)+'|'+text.substr(iter);
	document.getElementById('editor_text_area').innerHTML=text_c;
	}
function set_button_appearance(id){ alert(id); }
function editor_show_start(){
	app_button_html = '< div id="app_button" class="buttons" onclick="set_button_appearance(this.parentNode.id);" style="width:1.5%;height:3%;"> * </div>';
	//app_button_html = '<div id="app_button" class="button_app" onclick="set_button_appearance(this.id);" > * </div>';
	app = app_button_html; app='';
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area'); }
	//inner_e0 = '<div id="editor_back" class="buttons" onclick="alert(123);"  style="left:79%; top:2%;"> back </div>';
	inner_e1 = "<div id='editor_buttons_area_1'>";
	inner_e1+= '<div id="editor_menu"    class="buttons_editor" onclick="editor_show_menu();"      style="'+button_size_pos(0)[0]+'">menu</div>';
	inner_e1+= '<div id="editor_symbols" class="buttons_editor" onclick="editor_show_letters(2);"  style="'+button_size_pos(2)[0]+'">symbols</div>';
	inner_e1+= '<div id="editor_numbers" class="buttons_editor" onclick="editor_show_letters(1);"  style="'+button_size_pos(3)[0]+'">numbers</div>';
	inner_e1+= '<div id="editor_letters" class="buttons_editor" onclick="editor_show_letters(0);"  style="'+button_size_pos(4)[0]+'">letters</div>';
	inner_e1+= '<div id="editor_go"      class="buttons_editor" onclick="show_menu_go();"          style="'+button_size_pos(5)[0]+'">go</div>';
	inner_e1+= '<div id="editor_exit"    class="buttons_editor" onclick="editor_exit();"           style="'+button_size_pos(6)[0]+'"> exit </div>';
	inner_e1+= "</div>"
	inner_e2= "<div id='editor_buttons_area_2'>";
	inner_e2+= '<div id="editor_delete" class="buttons_editor" onclick="editor_delete();"   style="'+button_size_pos(7)[0]+'">'+symbol_delete+'</div>';
	inner_e2+= '<div id="editor_prev"   class="buttons_editor" onclick="editor_scroll(0);"  style="'+button_size_pos(8)[0]+'">'+symbol_prev+'</div>';
	inner_e2+= '<div id="editor_next"   class="buttons_editor" onclick="editor_scroll(1);"  style="'+button_size_pos(9)[0]+'">'+symbol_next+'</div>';
	inner_e2+= "</div>"
	inner_e3 = "<div id='editor_buttons_area_3'></div>";
	inner_e4 = "<div id='editor_buttons_area_4'></div>";
	elem.innerHTML = inner_e1+inner_e2+inner_e3;
	}
function editor_show_menu(){
	var elem=create_element('div', 'editor_menu_area', '');
	var inner_e = '<div id="editor_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="editor_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="editor_appearance"  class="buttons" onclick="alert(123);"    style="left:15%; top:15%;"> appearance-common </div>';
	inner_e+= '<div id="editor_appearance-common" class="buttons" onclick="show_menu_appearance_common();" style="left:35%; top:15%;"> appearance </div>';
	inner_e+= '<div id="editor_sound"       class="buttons" onclick="alert(123);"    style="left:15%; top:50%;"> sound </div>';
	inner_e+= '<div id="editor_read"        class="buttons" onclick="alert(123);"    style="left:60%; top:15%;"> read </div>';
	//inner_e+= '<div id="editor_exit"        class="buttons" onclick="editor_exit();" style="left:60%; top:50%;"> exit </div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}

function editor_scroll(order){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	max_iter = text.length;
	if (order==1 && iter < max_iter){ 
		iter +=1; 
		i_rbr = text.indexOf('>',iter); i_lbr = text.indexOf('<',iter);
		if (i_lbr==-1){i_lbr=text.length;} if (i_rbr==-1){i_rbr=text.length+1;}
		if (i_rbr<i_lbr){ iter=i_rbr+1; }
		}  
	else if (order==0 && iter > 0) { 
		iter -= 1; 
		i_rbr = text.substr(0,iter).lastIndexOf('>'); i_lbr = text.substr(0,iter).lastIndexOf('<');
		if (i_lbr==-1){i_lbr=0;} if (i_rbr==-1){i_rbr=0;}
		if (i_rbr<i_lbr){ iter=i_lbr; }
		}  
	//i_rbr = text.indexOf('>',iter); i_lbr = text.indexOf('<',iter);
	//if (i_lbr==-1){i_lbr=text.length;} if (i_rbr==-1){i_rbr=text.length+1;}
	//if (i_rbr<i_lbr){ iter=i_rbr; }
	localStorage.setItem('editor_iter', iter.toString());
	editor_set_cursor();
}function editor_delete(){
	if (iter>0) { 
		text = localStorage.getItem('text_edit');
		iter = parseInt(localStorage.getItem('editor_iter'));
		i_rbr = text.substr(0,iter).lastIndexOf('>'); i_lbr = text.substr(0,iter).lastIndexOf('<');
		if (i_rbr==iter-1){ i_l = i_lbr }
		else { i_l = iter-1 }
		text_c = text.substr(0, i_l)+text.substr(iter);
		localStorage.setItem('text_edit', text_c);
		localStorage.setItem('editor_iter', (i_l).toString());
		editor_set_cursor(); 
	}
}function editor_set_letter(n, type){
	//alert(n);
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	//letter = arr[n];
	letter = dict_symbols[arr[n]];
	text_c = text.substr(0, iter)+letter+text.substr(iter);
	localStorage.setItem('text_edit', text_c);
	iter_new = iter+letter.length;
	localStorage.setItem('editor_iter', iter_new.toString());
	editor_set_cursor(); 
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	document.getElementById('editor_buttons_area_2').style.visibility='visible';
	document.getElementById('editor_buttons_area_3').style.visibility='visible';
	document.getElementById('editor_buttons_area_4').style.visibility='hidden';
}
	

function button_size_pos(i){ 
	dx = (b_right - b_left -(b_nx-1)*b_xspace)/b_nx; 
	x = b_left + (dx+b_xspace)*(i%b_nx); //alert(x);
	dy = (b_bottom - b_top -(b_ny-1)*b_yspace )/b_ny; //alert(dy);
	y = b_top + (dy+b_yspace)*(i-i%b_nx)/b_nx;
	style = 'left:'+x.toString()+'%; top:'+y.toString()+'%;'+'width:'+dx.toString()+'%; height:'+dy.toString()+'%;'  ;
	return([style,x,y,dx,dy]);
	}
function editor_show_letters(type){
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_3');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area_3', '', 'background-color: green;'); }
	else{ document.getElementById('editor_buttons_area_3').style.visibility='visible'; }
	inner_e = '';
	for (i=0; i<b_nset; i++){
		i_name=''; for (j=0;j<b_n;j++) { i_name+=' '+arr[j+i*b_n]+' '; }
		style = button_size_pos(i)[0];
		inner_e += '<div id="editor_letterset_'+i.toString()+'" class="buttons" onclick="editor_show_letters_set('+i.toString()+','+type.toString()+');"  style="'+style+'">'+i_name+'</div>';
	}
	elem.innerHTML = inner_e;
}function editor_show_letters_set(n, type){
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	document.getElementById('editor_buttons_area_2').style.visibility='hidden';
	document.getElementById('editor_buttons_area_3').style.visibility='hidden';
	elem = document.getElementById('editor_buttons_area_4');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area_4', '', 'background-color: green;'); }
	else{ document.getElementById('editor_buttons_area_4').style.visibility='visible'; }
	inner_e = '';
	for (i=0; i<b_n; i++){
		i_name = arr[i+n*b_n];
		i_name_button = dict_symbols_buttons[arr[i+n*b_n]];
		style = button_size_pos(i)[0];
		if (i+n*8 == b_nset*b_n-1){
			inner_e += '<div id="editor_letters_back" class="buttons_editor" onclick="editor_letters_back();"  style="'+style+'"> back </div>';
		}else{
			inner_e += '<div id="editor_letter_'+i_name+'" class="buttons_editor" onclick="editor_set_letter('+(i+n*b_n)+','+type.toString()+');"  style="'+style+'">'+i_name_button+'</div>';
		}
	}
	elem.innerHTML = inner_e;
}
function editor_letters_back(){
	document.getElementById('editor_buttons_area_1').style.visibility='visible';
	document.getElementById('editor_buttons_area_2').style.visibility='visible';
	document.getElementById('editor_buttons_area_3').style.visibility='hidden';
	document.getElementById('editor_buttons_area_4').style.visibility='hidden';
	}
