var letters_arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-',',','?','!','"','space','\n'];
var numbers_arr = ['space','\n', 0,1,2,3,4,5,6,7,8,9, '+','-','=','*','/','<','>','.',',', '^','?','!','"', 'x','y','z','a','b','c','d','e'];
//var numbers_arr = letters_arr;
var symbols_arr = letters_arr;
var n_butset=5; var n_but=8; var d_x=0.6; var d_y=0.6;
var n_x=4; var n_y=2; var l_x=100; var l_y=70; var o_x=0; var o_y=25; 
//var n_x=2; var n_y=4; var l_x=40; var l_y=100; var o_x=60; var o_y=0; 
	
//alert(localStorage.getItem('id_prev'));
//id = get_id();
//text = document.getElementById(id).innerHTML;
text = localStorage.getItem('text_edit');
document.getElementById('editor_text_area').innerHTML=text;
editor_set_cursor();
editor_show_start();


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
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '', 'background-color: green;'); }
	//inner_e0 = '<div id="editor_back" class="buttons" onclick="alert(123);"  style="left:79%; top:2%;"> back </div>';
	inner_e1 = "<div id='editor_buttons_area_1'>";
	inner_e1+= '<input id="editor_menu" type="button" class="buttons" value="menu" onclick="editor_show_menu();"  style="'+button_size_pos(0)[0]+'">';
	inner_e1+= '<input id="editor_symbols" type="button" class="buttons" value="symbols" onclick="editor_show_letters(2);"  style="'+button_size_pos(1)[0]+'">';
	inner_e1+= '<input id="editor_numbers" type="button" class="buttons" value="numbers" onclick="editor_show_letters(1);"  style="'+button_size_pos(2)[0]+'">';
	inner_e1+= '<input id="editor_letters" type="button" class="buttons" value="letters" onclick="editor_show_letters(0);"  style="'+button_size_pos(3)[0]+'">';
	inner_e1+= '<input id="editor_go" type="button" class="buttons" value="go" onclick="show_menu_go();"  style="'+button_size_pos(4)[0]+'">';
	inner_e1+= "</div>"
	inner_e2= "<div id='editor_buttons_area_2'>";
	inner_e2+= '<input id="editor_delete" type="button" class="buttons" value="delete" onclick="editor_delete();"  style="'+button_size_pos(5)[0]+'">';
	inner_e2+= '<input id="editor_prev" type="button" class="buttons" value="prev" onclick="editor_scroll(0);"  style="'+button_size_pos(6)[0]+'">';
	inner_e2+= '<div id="editor_next" class="buttons" onclick="editor_scroll(1);"  style="'+button_size_pos(7)[0]+'"> next </div>';
	inner_e2+= "</div>"
	inner_e3 = "<div id='editor_buttons_area_3'></div>";
	inner_e4 = "<div id='editor_buttons_area_4'></div>";
	elem.innerHTML = inner_e1+inner_e2+inner_e3;
	}
function editor_show_menu(){
	var elem=create_element('div', 'editor_menu_area', '');
	var inner_e = '<div id="editor_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="editor_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="editor_appearance" class="buttons" onclick="alert(123);" style="left:15%; top:15%;"> appearance-common </div>';
	inner_e+= '<div id="editor_appearance-common" class="buttons" onclick="show_menu_appearance_common();" style="left:35%; top:15%;"> appearance </div>';
	inner_e+= '<div id="editor_sound"  class="buttons" onclick="alert(123);" style="left:15%; top:50%;"> sound </div>';
	inner_e+= '<div id="editor_read"  class="buttons" onclick="alert(123);" style="left:60%; top:15%;"> read </div>';
	inner_e+= '<div id="editor_save"  class="buttons" onclick="editor_reader();" style="left:60%; top:50%;"> save </div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	}

function editor_scroll(order){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	max_iter = text.length;
	if (order==1) { if (iter < max_iter) { iter +=1; } else { iter=max_iter; } }
	else if (order==0) { if (iter > 0) { iter -= 1; } else { iter=0; } }  
	localStorage.setItem('editor_iter', iter.toString());
	editor_set_cursor();
}function editor_delete(){
	if (iter>0) { 
		iter = parseInt(localStorage.getItem('editor_iter'));
		text = localStorage.getItem('text_edit');
		text_c = text.substr(0, iter-1)+text.substr(iter);
		localStorage.setItem('text_edit', text_c);
		localStorage.setItem('editor_iter', (iter-1).toString());
		editor_set_cursor(); 
	}
}function editor_set_letter(n, type){
	//alert(n);
	if (type==0) { arr=letters_arr; }  else if (type==1) { arr=numbers_arr; } else if (type==2) { arr=symbols_arr; }
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	text_c = text.substr(0, iter)+arr[n]+text.substr(iter);
	localStorage.setItem('text_edit', text_c);
	iter_new = iter+1;
	localStorage.setItem('editor_iter', iter_new.toString());
	editor_set_cursor(); 
	document.getElementById('editor_buttons_area_1').style.visibility='hidden';
	document.getElementById('editor_buttons_area_2').style.visibility='visible';
	document.getElementById('editor_buttons_area_3').style.visibility='visible';
	document.getElementById('editor_buttons_area_4').style.visibility='hidden';
}
	

function button_size_pos(i){ 
	x = o_x + l_x/n_x*0.5 + l_x/n_x* (i%n_x)  - l_x/n_x*0.5*d_x;
	y = o_y + l_y/n_y*0.5 + l_y/n_y* (i-i%n_x)/n_x  - l_y/n_y*0.5*d_y;
	dx = l_x/n_x*d_x;  dy = l_y/n_y*d_y;
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
	for (i=0; i<n_butset; i++){
		i_name=''; for (j=0;j<n_but;j++) { i_name+=' '+arr[j+i*n_but]+' '; }
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
	for (i=0; i<n_but; i++){
		i_name = arr[i+n*n_but];
		style = button_size_pos(i)[0];
		if (i+n*8 == n_butset*n_but-1){
			inner_e += '<div id="editor_letters_back" class="buttons" onclick="editor_letters_back();"  style="'+style+'"> back </div>';
		}else{
			inner_e += '<div id="editor_letter_'+i_name+'" class="buttons" onclick="editor_set_letter('+(i+n*n_but)+','+type.toString()+');"  style="'+style+'">'+i_name+'</div>';
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
