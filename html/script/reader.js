
function show_reader_menu(){
	//alert('menu');
	//var e1=create_element('div', 'reader_menu_area_0', 'buttons', 'width:100%; height:100%; left:0%; top:0%;background-color: rgba(0,0,0,0.4);');
	var e2=create_element('div', 'reader_menu_area', 'buttons', 'width:80%; height:86%; left:10%; top:7%;background-color: rgba(255,255,255,0.9);');
	var inner_e2 = '<input id="reader_menu_appearance" type="button" class="buttons" value="appearance" onclick="alert(123);" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e2+= '<input id="reader_menu_appearance-common" type="button" class="buttons" value="appearance-common" onclick="show_menu_appearance_common();" style="left:35%; top:15%; position:fixed; width:14%;">';
	inner_e2+= '<input id="reader_menu_edit" type="button" class="buttons" value="edit" onclick="alert(123);" style="left:50%; top:50%; position:fixed; width:14%;">';
	inner_e2+= '<input id="reader_menu_sound" type="button" class="buttons" value="sound" onclick="alert(123);" style="left:15%; top:50%; position:fixed; width:14%;">';
	inner_e2+= '<input id="reader_menu_go" type="button" class="buttons" value="go" onclick="show_menu_go();" style="left:68%; top:50%; position:fixed; width:14%;">';
	inner_e2+= '<input id="reader_menu_back" type="button" class="buttons" value="back" onclick="reader_menu_back();" style="left:68%; top:15%; position:fixed; width:14%;">';
	e2.innerHTML = inner_e2;
	}
function reader_menu_back(){
	//var elem = document.getElementById("reader_menu_area_0");
	//elem.parentNode.removeChild(elem);
	var elem = document.getElementById("reader_menu_area");
	elem.parentNode.removeChild(elem);
	}
function show_menu_appearance_common(element_id='reader_menu_area'){
	e = document.getElementById(element_id)
	var inner_e = '<input id="reader_menu_appearance-common_reset" type="button" class="buttons" value="reset" onclick="alert(123);" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e += '<input id="reader_menu_appearance-common_buttonsize" type="button" class="buttons" value="buttonsize" onclick="alert(123);" style="left:35%; top:15%; position:fixed; width:14%;">';
	e.innerHTML = inner_e;
	}
function show_menu_go(element_id='reader_menu_area'){
	e = document.getElementById(element_id)
	var inner_e = '<input id="reader_menu_go_files" type="button" class="buttons" value="files" onclick="goto_files();" style="left:15%; top:15%; position:fixed; width:14%;">';
	inner_e += '<input id="reader_menu_go_file1" type="button" class="buttons" value="file1" onclick="goto_files();" style="left:35%; top:15%; position:fixed; width:14%;">';
	e.innerHTML = inner_e;
	}
function goto_files(){ window.location.href = '/index.html'; }
	
function create_element(tag, id, cl, st, inner='', value='', name='', onclick='', t=''){
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

