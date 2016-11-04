var letters_arr = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','-',',','space'];

//alert(localStorage.getItem('id_prev'));
text = localStorage.getItem('text_edit');
document.getElementById('editor_text_area').innerHTML=text;
editor_set_cursor()

editor_show_start();
function editor_set_cursor(){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	text_c = text.substr(0, iter)+'|'+text.substr(iter);
	document.getElementById('editor_text_area').innerHTML=text_c;
	}
function editor_show_start(){
	alert(111);
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '', 'position:fixed; width:100%; height:74%; left:0%; top:25%;background-color: rgba(255,255,255,0.3);'); }
	inner_e = '<input id="editor_send" type="button" class="buttons" value="send" onclick="editor_send();"  style="left:5%; top:30%;">';
	inner_e+= '<input id="editor_delete" type="button" class="buttons" value="delete" onclick="editor_delete();"  style="left:5%; top:67%;">';
	inner_e+= '<input id="editor_letters" type="button" class="buttons" value="letters" onclick="editor_show_letters();"  style="left:70%; top:30%;">';
	inner_e+= '<input id="editor_numbers" type="button" class="buttons" value="numbers" onclick="editor_show_numbers();"  style="left:40%; top:30%;">';
	inner_e+= '<input id="editor_prev" type="button" class="buttons" value="prev" onclick="editor_scroll(0);"  style="left:40%; top:67%;">';
	inner_e+= '<input id="editor_next" type="button" class="buttons" value="next" onclick="editor_scroll(1);"  style="left:70%; top:67%;">';
	elem.innerHTML = inner_e;
	}
function editor_scroll(order){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	max_iter = text.length;
	if (order==1) { if (iter < (max_iter)) { iter ++; } else { iter=max_iter; } }
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
}function editor_set_letter(n){
	iter = parseInt(localStorage.getItem('editor_iter'));
	text = localStorage.getItem('text_edit');
	text_c = text.substr(0, iter)+letters_arr[n]+text.substr(iter);
	localStorage.setItem('text_edit', text_c);
	iter_new = iter+1;
	localStorage.setItem('editor_iter', iter_new.toString());
	editor_set_cursor(); 
}
	
function editor_show_letters(){
	//alert(111);
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '', 'position:fixed; width:100%; height:74%; left:0%; top:25%;background-color: rgba(255,255,255,0.3);'); }
	inner_e = '';
	for (i=0; i<6; i++){
		i_name = i.toString();
		a = 5+(i%3)*35;	b = 30+(i-i%3)/3*35;
		style = 'left:'+a.toString()+'%; top:'+b.toString()+'%;';
		inner_e += '<input id="editor_letters_'+i.toString()+'" type="button" class="buttons" value="'+i_name+'" onclick="editor_show_letters_set('+i.toString()+');"  style="'+style+'">';
	}
	elem.innerHTML = inner_e;
}function editor_show_letters_set(n){
	//alert(111);
	elem = document.getElementById('editor_buttons_area');
	if (elem==null){ var elem = create_element('div', 'editor_buttons_area', '', 'position:fixed; width:100%; height:74%; left:0%; top:25%;background-color: rgba(255,255,255,0.3);'); }
	inner_e = '';
	for (i=0; i<6; i++){
		i_name = letters_arr[i+n*6];
		a = 5+(i%3)*35;	b = 30+(i-i%3)/3*35;
		style = 'left:'+a.toString()+'%; top:'+b.toString()+'%;';
		inner_e += '<input id="editor_letter_'+i_name+'" type="button" class="buttons" value="'+i_name+'" onclick="editor_set_letter('+(i+n*6).toString()+');"  style="'+style+'">';
	}
	elem.innerHTML = inner_e;
}
