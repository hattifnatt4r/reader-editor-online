
var files_session = localStorage.getItem('files_session');
if (files_session!='started'){
	files_session = 'started';
	localStorage.setItem('files_session', files_session);
	localStorage.setItem('files_iter', '0');
	localStorage.setItem('files_iter_prev', '0');
	
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('editor_back', '/index.html');
	
	localStorage.setItem('if_edit_text', '0');
	localStorage.setItem('click_arr', '0');
	localStorage.setItem('setinner_id_arr', '0');
	localStorage.setItem('setvalue_id_arr', '0');
	
	localStorage.setItem('fastlogin', '0');
	localStorage.setItem('loginname', 'name');
	localStorage.setItem('loginpass', 'password');
	localStorage.setItem('editor_saveto_var', '0');
}
//alert( document.cookie );
//alert(get_cookie('PHPSESSID'));
var bodyStyles = window.getComputedStyle(document.body);
screen_height = window.screen.height+'px';
screen_width = window.screen.width+'px';
//alert('alert1');
document.body.style.setProperty('--screen-height', screen_height);
document.body.style.setProperty('--screen-width', screen_width);
//alert('alert2');
textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
document.getElementById("files_area_box").style.height = textheight_zoom;
//alert('alert3');

var files_iter = JSON.parse(localStorage.getItem('files_iter'));
var files_iter_prev = JSON.parse(localStorage.getItem('files_iter_prev'));
var nentry = document.getElementById('hidden_files_nentry').innerHTML;
//scroll_files(0);
//alert('alert4');
files_show_buttons(); 

if (localStorage.getItem('if_edit_text')=='1'){
	edit_text_back();
	localStorage.setItem('if_edit_text','0');
}
function edit_text_back(){
	text = localStorage.getItem('text_edit');             //alert('text: '+text);
	varname = localStorage.getItem('editor_saveto_var');  //alert('var: '+varname);
	if (varname!='0'){localStorage.setItem(varname, text);}
	click_arr = parse_words(localStorage.getItem('click_arr'));
	setinner_id_arr =    parse_words(localStorage.getItem('setinner_id_arr'));
	setvalue_id_arr =    parse_words(localStorage.getItem('setvalue_id_arr'));
	if (click_arr.length!=0)      { for (i=0; i<click_arr.length; i++){ document.getElementById(click_arr[i]).click(); } }
	if (setinner_id_arr.length!=0){ for (i=0; i<setinner_id_arr.length; i++){ document.getElementById(setinner_id_arr[i]).innerHTML=text; } }
	if (setvalue_id_arr.length!=0){ for (i=0; i<setvalue_id_arr.length; i++){ document.getElementById(setvalue_id_arr[i]).value=text; } }
	exists=file_exists(text);  //alert(exists);
	elem = document.getElementById('files_create_area');
	if (elem){
		if (exists[0]==1){	document.getElementById('files_createtxt_id').onclick=''; document.getElementById('files_createtxt_id').className='buttons disabled'; }
		if (exists[1]==1){	document.getElementById('files_createdir_id').onclick=''; document.getElementById('files_createdir_id').className='buttons disabled'; }
	}
	type = document.getElementById('fileid_'+files_iter.toString()).getAttribute('title');
	elem = document.getElementById('files_options_area');
	if (elem){
		if ((exists[0]==1 && type=='txt')||(exists[1]==1 && type=='dir')){	
			document.getElementById('files_edit_id').onclick=''; 
			document.getElementById('files_edit_id').className='buttons disabled'; }
		document.getElementById('files_delete_id').onclick=''; 
		document.getElementById('files_delete_id').className='buttons disabled';
	}
}

//alert('dir: '+files_get_dir());
files_fill_zoom();
function files_get_dir(){
	dir0 = document.getElementById('hidden_files_dir').innerHTML; 
	i = dir0.indexOf('/');
	if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
	return(dir);
}
function files_fill_zoom(){
	files_iter = JSON.parse(localStorage.getItem('files_iter'));
	dir0 = document.getElementById('hidden_files_dir').innerHTML; 
	i = dir0.indexOf('/');
	if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
	dir = '<em style="font-style:normal;color:#008000;opacity:0.6;">'+dir+' / </em>';
	document.getElementById('files_zoom').innerHTML = dir+document.getElementById('fileid_'+files_iter.toString()).innerHTML; 
	}
//alert('scroll_test');
function scroll_files(order){
	files_iter = JSON.parse(localStorage.getItem('files_iter'));
	files_iter_prev = JSON.parse(localStorage.getItem('files_iter_prev'));
	if (order==next){ if (files_iter<nentry) {files_iter+=1;} }
	else if (order==prev){ if (files_iter>0) {files_iter-=1;} }
	else ( files_iter = order );
	localStorage.setItem('files_iter_prev', JSON.stringify(files_iter));
	//files_iter+=1;
	localStorage.setItem('files_iter', JSON.stringify(files_iter));
	document.getElementById('hidden_file_iter').innerHTML=files_iter;
	document.getElementById('file_n').value = files_iter; 
	files_fill_zoom();
	
	var fileid = 'fileid_'+files_iter.toString();  scroll_to(fileid, 'files_area_box', title=0);
	
	title=elem.getAttribute('title');
	if (title=='dir'){fclass='files-dir-hover';} else{fclass='files-txt-hover';}  elem.className = 'files '+fclass; 
	if (files_iter!=files_iter_prev){
		var fileid = 'fileid_'+files_iter_prev.toString();
		elem = document.getElementById(fileid); title=elem.getAttribute('title'); 
		if (title=='dir'){fclass='files-dir';} else{fclass='files-txt';}  elem.className = 'files '+fclass; 
		}
	
	if (files_iter==0){fname_ii='..';}
	else{fname_ii = document.getElementById('fileid_'+files_iter.toString()).innerText; }
	fname_ii = replace_all(fname_ii,'_',' ')
	utter(fname_ii,1,1, onend=0);
	}

//-- show buttons ---------------------------------------------------------------------------
function files_show_buttons(){
	//alert('alert b0');
	elem = document.getElementById('files_buttons_area');
	//alert('alert b1');
	inner_e = '<div id="files_menu" class="buttons" onclick="files_show_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
	
	inner_e+= '<div id="files_button_options" class="buttons" onclick="files_show_options();"  style="'+reader_button_position(1)+'">opt</div>';
	
	inner_e+= '<div id="files_button_enter" style="left:84%;top:53%;position:fixed;">'; 
	inner_e+= '<form action="" method="post">  <input type="text" id="file_n" name="file_n" value="Mouse" style="width:0%;height:0%;">';
	inner_e+= '<input hidden type="submit" id="files_enter_hidden" value="enter" name="enter_obj" "></div>';
	inner_e+= '<div id="files_enter" class="buttons" style="'+reader_button_position(2)+'" onclick="files_click(0);">'+symbol_enter+'</div></div>';
	
	inner_e+= '<div id="prev" class="buttons" onclick="scroll_files(prev);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
	inner_e+= '<div id="next" class="buttons" onclick="scroll_files(next);"  style="'+reader_button_position(7)+'">'+symbol_next+'</div>' ;
	//inner_e+= '<div id="login" class="buttons" onclick=""  style="'+reader_button_position(4)+'">'+'log in'+'</div>' ;
	inner_e+= '<div id="files_login" class="buttons" onclick="files_show_login();"  style="'+reader_button_position(4)+'">'+'log in'+'</div>' ;
	inner_e+= '<div id="files_upload_button" class="buttons" onclick="files_show_upload();"  style="'+reader_button_position(5)+'">'+symbol_upload+'</div>' ;
	
	elem.innerHTML=inner_e;
	dir = files_get_dir();
	if ( dir=='/common' || dir.indexOf('/common/')==0 ){
		document.getElementById('files_upload_button').onclick=''; 
		document.getElementById('files_upload_button').className='buttons disabled';
	}
}
function files_show_upload(){
	menu_blur();
	elem=create_element('div', 'files_upload_area', '','','','','','','');
	inner_e = '<div id="files_upload_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_upload_area_2"  style="left:7%;top:5%; position:fixed; width:86%;height:90%; background-color:rgba(255,255,255,0.9);">';
	
	inner_e+= '<div hidden id="files_upload"> ';
	inner_e+= '<form action="" method="post" enctype="multipart/form-data">';
	inner_e+= '<input type="file"   id="upload_file_id"   name="upload_file_name" >';
	inner_e+= '<input type="submit" id="upload_submit_id" name="upload_submit_name" value="empty" ></div>';
	
	inner_e+= '<div id="files_upload_choose" class="buttons" onclick="files_click(8);"   style="left:20%; top:40%;">choose file</div>';
	inner_e+= '<div id="files_upload_submit" class="buttons" onclick="files_click(9);" style="left:70%;top:40%;">upload file</div>';
	
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
}
function files_show_login(){
	menu_blur();
	name='name'; pass='----';
	name = localStorage.getItem('loginname');
	pass = localStorage.getItem('loginpass');
	elem=create_element('div', 'files_login_area', '','','','','','','');
	inner_e = '<div id="files_login_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_login_area_2"  style="left:7%;top:5%; position:fixed; width:86%;height:90%; background-color:rgba(255,255,255,0.9);">';
	
	inner_e+= '<div id="files_login_zoomname_box"     class="reader_zoom_box" style="left:15%;top:15%;width:50%;border:solid 1px white;"><div onclick="files_edittext_login(0);" id="files_login_zoomname"     class="text_zoom">'+name+'</div></div>';
	inner_e+= '<div id="files_login_zoompassword_box" class="reader_zoom_box" style="left:15%;top:40%;width:50%;border:solid 1px white;"><div onclick="files_edittext_login(1);" id="files_login_zoompassword" class="text_zoom">'+pass+'</div></div>';
	
	inner_e+= '<div id="files_login" style="left:13%;top:68%;position:fixed;">'; 
	inner_e+= '<form action="" method="post">  <input type="text" id="login_form_id" name="login_form_name" value="login_form_value" style="position:fixed;width:1%;height:1%;">';
	inner_e+= '<input type="text" id="loginname_text_id"           name="loginname_text_name"    value="'+name+'" style="width:0%;height:0%;">';
	inner_e+= '<input type="text" id="loginpass_text_id"           name="loginpass_text_name"    value="'+pass+'" style="width:0%;height:0%;">';
	inner_e+= '<input hidden type="submit" id="login_submit_id"    name="login_submit_name"      value="login" >';
	inner_e+= '<input hidden type="submit" id="newlogin_submit_id" name="login_submit_name"      value="newlogin" > </div>';
	inner_e+= '<div id="files_login_button"     class="buttons buttons_menu" onclick="loadDoc(0,files_login);"      style="position:fixed;left:75%;top:68%;" >login</div></div>';
	inner_e+= '<div id="files_newlogin_button"  class="buttons buttons_menu" onclick="loadDoc(0,files_login_new);"  style="position:fixed;left:15%;top:68%;" >new  </div></div>';
	inner_e+= '<div id="files_logout_button"    class="buttons buttons_menu" onclick="files_logout();"              style="position:fixed;left:75%;top:40%;" >quit </div></div>';
	inner_e+= '<div id="files_loginemail_button" class="buttons buttons_menu disabled" onclick=""         style="position:fixed;left:40%;top:68%;" >email </div></div>';
	
	inner_e+= '<div id="files_login_remember"   class="buttons buttons_menu disabled" onclick=""   style="left:75%; top:15%;">remember</div>';
	inner_e+= '<div id="files_login_normal" class="buttons" onclick="files_show_loginnormal();" style="left:10%;top:10%;width:3%;height:5%;line-height:70%;">*</div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
}function files_show_loginnormal(){
	elem=document.getElementById('files_login_zoomname_box');
	inner_e='<textarea id="files_login_zoomname" name="comment" class="text_zoom" form="usrform">name</textarea>';
	elem.innerHTML = inner_e;
	elem=document.getElementById('files_login_zoompassword_box');
	inner_e='<textarea id="files_login_zoompassword" name="comment" class="text_zoom" form="usrform">password</textarea>';
	elem.innerHTML = inner_e;
	localStorage.setItem('fastlogin', '1');
	}
function files_login(xml){
	if (localStorage.getItem('fastlogin')=='1'){
		document.getElementById('loginname_text_id').value=document.getElementById('files_login_zoomname').value;
		document.getElementById('loginpass_text_id').value=document.getElementById('files_login_zoompassword').value;
	}
	name=document.getElementById('loginname_text_id').value;
	pass=document.getElementById('loginpass_text_id').value;	
	user_access=0;
	data =  JSON.parse(xml.responseText); users = data.users;
    for (i=0; i<users.length; i++){
		name_i = users[i].name;
		if (name_i==name){
			user_access=1;
			pass_i = users[i].password;
			if (pass_i==pass){
				user_access=2;
				files_click(6);
	}}} //alert(user_access);
	utter(login_messages_en[user_access],0,0,0);
}function files_login_new(xml){
	if (localStorage.getItem('fastlogin')=='1'){
		document.getElementById('loginname_text_id').value=document.getElementById('files_login_zoomname').value;
		document.getElementById('loginpass_text_id').value=document.getElementById('files_login_zoompassword').value;
		}
	name=document.getElementById('loginname_text_id').value;
	pass=document.getElementById('loginpass_text_id').value;	
	user_access=0;
	data =  JSON.parse(xml.responseText); users = data.users;
    for (i=0; i<users.length; i++){
		name_i = users[i].name;
		if (name_i==name){ user_access=1; }
	}   //alert(user_access);
	if (user_access==0){ files_click(5); }
	utter(newlogin_messages_en[user_access],0,0,0);
}
function files_login_test(){
	name=get_cookie('PHPSESSID'); pass='';
	document.getElementById('login_text_id').value=name+' '+pass;
	files_click(5);
}
function files_logout(){
	document.getElementById('loginname_text_id').value='common';
	document.getElementById('loginpass_text_id').value='';
	files_click(6);
}
function loadDoc(url1, login_function) {
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
		login_function(this);
    }
  };
  xhttp.open("GET", "data/login.json", true);
  xhttp.send();
}
function files_edittext_login(i){
	arr = ['loginname', 'loginpass']; type=arr[i];
	localStorage.setItem('editor_saveto_var', type);
	localStorage.setItem('text_edit', '');
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('if_edit_text', '1');
	localStorage.setItem('editor_back', '/index.html');
	localStorage.setItem('click_arr', 'files_login' );
	localStorage.setItem('setinner_id_arr', '');
	localStorage.setItem('setvalue_id_arr', '');
	window.location.href = '/editor.html';
	}

function files_click(n){ 
	arr_names = ["files_enter_hidden", "files_delete_hidden", "files_edit_hidden", 'files_createdir_hidden', 'files_createtxt_hidden', 'newlogin_submit_id','login_submit_id', "mail_submit_id", 'upload_file_id','upload_submit_id', 'python_submit_id'];
	document.getElementById(arr_names[n]).click();  }
function files_show_options(){
	//alert('show_options');
	menu_blur();
	iter = localStorage.getItem('files_iter');
	if_i=localStorage.getItem('if_rename_file');
	fname = document.getElementById('fileid_'+iter.toString()).innerHTML;
	elem=create_element('div', 'files_options_area', '','','','','','','');
	inner_e = '<div id="files_options_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_options_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	
	inner_e+= '<div id="files_options_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_options_zoom" class="text_zoom">'+fname+'</div></div>';
	inner_e+= '<div id="files_options_edit-name" class="buttons" onclick="files_edittext_options();" style="left:40%; top:45%;">edit name</div>';
	
	inner_e+= '<div id="files_options_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">';
	inner_e+= '<input type="text" id="files_options_n" name="files_options_n" value="'+iter.toString()+'" style="width:0%;height:0%;">';
	inner_e+= '<input type="text" id="files_options_text" name="files_options_text" value="'+fname+'" style="width:0%;height:0%;">';
	inner_e+= '<input hidden id="files_delete_hidden" type="submit" value="delete" name="files_options_submit">'; 
	inner_e+= '<input hidden id="files_edit_hidden"   type="submit" value="edit"   name="files_options_submit"></div>';
	inner_e+= '<div id="files_delete_id" class="buttons" onclick="files_click(1);" style="left:13%;top:45%;">delete</div>';
	inner_e+= '<div id="files_edit_id"   class="buttons" onclick="files_click(2);" style="left:70%;top:45%;">edit</div>';
	inner_e+= '</div>';
		
	elem.innerHTML = inner_e;
	}
function files_edittext_options(){
	fname = document.getElementById('fileid_'+iter.toString()).innerHTML.replace('.txt','');
	localStorage.setItem('text_edit', fname);
	if (fname!='trash'){
		localStorage.setItem('editor_iter', '0');
		localStorage.setItem('if_edit_text', '1');
		localStorage.setItem('editor_back', '/index.html');
		localStorage.setItem('click_arr', 'files_button_options' );
		localStorage.setItem('setinner_id_arr', 'files_options_zoom');
		localStorage.setItem('setvalue_id_arr', 'files_options_text');
		window.location.href = '/editor.html';
	}
}

function files_show_menu(){
	elem=create_element('div', 'files_menu_area', '','','','','','','');
	inner_e = '<div id="files_menu_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	
	inner_e+= '<div id="files_menu_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,0.9);">';
	inner_e+= '<div id="files_appearance"        class="buttons disabled" onclick="alert(123);" style="left:15%; top:15%;">appearance</div>';
	inner_e+= '<div id="files_appearance-common" class="buttons disabled" onclick="show_menu_appearance_common();" style="left:35%; top:15%;">appearance-common</div>';
	inner_e+= '<div id="files_sound"             class="buttons disabled" onclick="alert(123);" style="left:15%; top:50%;">sound</div>';
	
	inner_e+= '<div hidden id="files_mail" style="left:60%;top:15%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">';
	inner_e+= '<input type="text"   id="mail_text_id"   name="mail_text_name"   value="empty" >';
	inner_e+= '<input type="submit" id="mail_submit_id" name="mail_submit_name" value="empty" ></div>';
	inner_e+= '<div id="files_mail_button" class="buttons" onclick="files_click(7)" style="left:60%;top:15%;">email</div>';
	
	inner_e+= '<div id="files_create" class="buttons" onclick="files_show_create();" style="left:60%; top:50%;">new file</div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
	menu_blur();
	}
function files_show_create(){
	elem=create_element('div', 'files_create_area', '','','','','','','');
	inner_e = '<div id="files_create_back"  onclick="editor_back(this.id);" class="back_area"></div>';
	inner_e+= '<div id="files_create_area_2"  style="left:10%;top:10%; position:fixed; width:80%;height:80%; background-color:rgba(255,255,255,1);">';
	
	inner_e+= '<div id="files_create_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_create_zoom" class="text_zoom">file</div></div>';
	inner_e+= '<div id="files_edit-name" class="buttons" onclick="files_edittext_create(123);" style="left:40%; top:45%;">edit name</div>';
	
	inner_e+= '<div id="files_create_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
	inner_e+= '<form action="" method="post">  <input type="text" id="files_name_text" name="files_name_text" value="file" style="width:0%;height:0%;">';
	inner_e+= '<input hidden id="files_createtxt_hidden" type="submit" value="create file" name="files_create_submit" >';
	inner_e+= '<input hidden id="files_createdir_hidden" type="submit" value="create dir"  name="files_create_submit"></div>';
	inner_e+= '<div id="files_createtxt_id" class="buttons" onclick="files_click(4)" style="left:13%;top:45%;">create file</div>';
	inner_e+= '<div id="files_createdir_id" class="buttons" onclick="files_click(3)" style="left:70%;top:45%;">create dir </div>';
	inner_e+= '</div>';
	elem.innerHTML = inner_e;
}

function files_edittext_create(text){
	localStorage.setItem('text_edit', text);
	localStorage.setItem('editor_iter', '0');
	localStorage.setItem('if_edit_text', '1');
	localStorage.setItem('editor_back', '/index.html');
	localStorage.setItem('click_arr', 'files_menu files_create' );
	localStorage.setItem('setinner_id_arr', 'files_create_zoom');
	localStorage.setItem('setvalue_id_arr', 'files_name_text');
	window.location.href = '/editor.html';
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
function file_exists(fname){
	fname = fname.toString();
	txt=0; dir=0;
	i_max = document.getElementById('hidden_files_nentry').innerHTML;
	for (i=0; i<i_max; i++){
		fname_i = document.getElementById('fileid_'+i.toString()).innerHTML.replace('.txt','');
		type = document.getElementById('fileid_'+i.toString()).getAttribute('title');
		//alert(i+' '+fname+' '+fname_i+' '+type);
		if(fname_i==fname){ if(type=='dir'){dir=1;} if(type=='txt'){txt=1;} }
	}
	return([txt,dir]);
}
