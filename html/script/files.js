
//-- files variables ---------------------------------------------------------------

var files = {
	iter: 0,
	iter_prev: 0,
	zoom: 0,
	fontsize: 1.2,
	
	cookie_number: 4,
	cookie_suffix: "_f",
	editor_text: "",
	
	nentry: document.getElementById('hidden_files_nentry').innerHTML,
	username: "",
	userpass: "",
	
	name: "files",
	dir: "",
	zoom_arr: ['no zoom', 'zoom'],
	buttons_php: { "files_enter": "ffiles_enter_submit", 
		           "files_edit": "ffiles_edit_submit",
		           "files_delete": "ffiles_delete_submit",
		           "files_cleanhtml": "ffiles_cleanhtml_submit", 
		           "files_createtxt": "ffiles_createtxt_submit", 
		           "files_createdir": "ffiles_createdir_submit", 
		           "files_mail": "ffiles_mail_submit", 
		           "files_upload": "ffiles_upload_submit", 
		           "files_upload_choose": "ffiles_upload_choose", 
		           },
	click_php: function(id) { //alert('click: '+id);
		if (id==="files_enter" && this.get_ftype()=="dir" ) { this.iter=0; this.iter_prev=0; }
		document.getElementById(this.buttons_php[id]).click(); 
	},
	set_dir: function() {
		dir0 = document.getElementById('hidden_files_dir').innerHTML; 
	    i = dir0.indexOf('/');
	    if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
		this.dir = dir;
	},
	get_fname: function(i){ 
		if (i===undefined) {i=this.iter;} 
		return document.getElementById('fileid_'+this.iter.toString()).innerHTML; 
	},
	get_fid: function(i){ 
		if (i===undefined) {i=this.iter;} 
		return 'fileid_'+i.toString(); 
	}, 
	get_felem: function(i){
		if (i===undefined) {i=this.iter;} 
		return document.getElementById(this.get_fid(i));
	},
	get_ftype: function(i){
		if (i===undefined) {i=this.iter;} 
		var type = "";
		var elem = document.getElementById(this.get_fid(i));
		if (elem) { type=elem.getAttribute('title'); }
		return type;
	},
}                                                        //alert(files.dir);
window.onbeforeunload = files_beforunload;
function files_beforunload() {common.cookie_save.call(files); common.cookie_save(); }

//-- run files -------------------------------------------------------------------

files_run();

function files_run(){                                                    //alert('files_run');  
	files.set_dir(); 
	
	if (cookie_get('isset_files_')!='isset'){                            //alert('set_cookie');
		cookie_set("isset_files_", "isset");
		common.cookie_save.call(files);
	}else { common.cookie_load.call(files); }
	if (cookie_get('isset_common_')!='isset'){                           //alert('set_cookie');
		cookie_set("isset_common_", "isset");
		common.cookie_save();
	}else { common.cookie_load(); }                                      //alert( document.cookie );
	                                                                                                             
	var bodyStyles = window.getComputedStyle(document.body);
	screen_height = window.screen.height+'px';
	screen_width = window.screen.width+'px';                             //alert('alert1');
	document.body.style.setProperty('--screen-height', screen_height);
	document.body.style.setProperty('--screen-width', screen_width);     //alert('alert2');
	textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
	document.getElementById("files_area_box").style.height = textheight_zoom; //alert('alert3');
	
	files_show_buttons();                                                //alert('reader1');
	document.getElementById("base_elements").appendChild(document.getElementById("files_area_box"));        // alert('reader2');
	document.getElementById("base_elements").appendChild(document.getElementById("files_zoom_box"));
	
	common_set_fontsize(files.fontsize, files);                          //alert(files.fontsize);
	files_scroll(files.iter, 'no');                                      //alert('files run 2');
	files_set_zoom('no');                                                //alert('files run 3');
}                                                                        //alert('dir: '+files_get_dir());

//-- show buttons ---------------------------------------------------------------------------

function files_show_buttons(){                                           //alert('alert b0');
    var elem = document.getElementById('files_buttons_area');                //alert('alert b1');
    var inner_e="";
    inner_e+= '<div id="files_menu"    class="buttons" onclick="files_show_menu();" '       +common_buttonpos(0)+'>menu</div>' ;
    inner_e+= '<div id="files_options" class="buttons" onclick="files_show_options();" '    +common_buttonpos(1)+'>opt</div>';
    inner_e+= '<div id="files_enter"   class="buttons" onclick="files.click_php(this.id);" '+common_buttonpos(2)+'>'+symbol_enter+'</div></div>';
    inner_e+= '<div id="files_login"   class="buttons" onclick="files_show_login();" '      +common_buttonpos(4)+'>'+'log in'+'</div>' ;
    inner_e+= '<div id="files_upload"  class="buttons" onclick="files_show_upload();" '     +common_buttonpos(5)+'>'+symbol_upload+'</div>' ;
    inner_e+= '<div id="files_prev"    class="buttons" onclick="files_scroll(this.id);" '   +common_buttonpos(3)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="files_next"    class="buttons" onclick="files_scroll(this.id);" '   +common_buttonpos(7)+'>'+symbol_next+'</div>' ;
    //inner_e+= '<div id="files_python_button" class="buttons" onclick="files_click(10);"   style="'+reader_button_position(6)+'">py</div>';
    elem.innerHTML=inner_e;
    //if ( dir=='/common' || dir.indexOf('/common/')==0 ){ files_disable('files_upload'); }
    subdir = get_subdir(files.dir+'/');                                        //alert('sub: '+subdir);
    if (subdir=='mail'){                                                 //alert('mail!');
        id = 'fileid_'+files.nentry;                                     //alert(id);
        document.getElementById(id).onclick=function() { files_show_addcontact(); } 
        document.getElementById(id).innerHTML=symbol_newmail;
        }
}
function files_show_menu(){  
	var inner_e = "";  var obj = 'files';
    inner_e += '<div class="reader_zoom_box" '+common_buttonpos_menu(1,1)+'><div id="common_lang_zoom1" class="text_zoom">'+common.langbase+'</div></div>';
    inner_e += '<div id="common_lang"    class="buttons"  onclick="common_show_lang(1,true)" ' +common_buttonpos_menu(2,0)+'>base lang</div>';
    //inner_e += '<div id="files_mail"     class="buttons"  onclick="files.click_php(this.id)" ' +common_buttonpos_menu(4,0)+'>email</div>';
    inner_e += '<div id="files_create"   class="buttons"  onclick="files_show_create();" '     +common_buttonpos_menu(7,0)+'>new file</div>';
    inner_e += '<div id="files_zoom"     class="buttons"  onclick="files_set_zoom();" '        +common_buttonpos_menu(3,0)+'>'+files.zoom_arr[files.zoom]+'</div>';
    inner_e += '<div id="files_fontsize" class="buttons"  onclick="common_show_fontsize('+obj+');" '+common_buttonpos_menu(0,0)+'> font size </div>';
    //inner_e += '<div id="files_fontsize" class="buttons"  onclick="common_show_fontsize();" '+    common_buttonpos_menu(7,0)+'> font size </div>';
    inner_e += '<div id="files_past"     class="buttons disabled" onclick="" '+common_buttonpos_menu(5,0)+'> past </div>';
    inner_e += '<div id="files_sound"    class="buttons disabled" onclick="" '+common_buttonpos_menu(4,0)+'> sound </div>';
    inner_e += '<div id="files_download" class="buttons disabled" onclick="" '+common_buttonpos_menu(6,0)+'> down load </div>';
    common_create_menu('files_menu', 0, inner_e);
}
function files_show_create(){
	var inner_e = "";
    inner_e += '<div class="reader_zoom_box" '+common_buttonpos_menu(0,2)+'><div id="files_create_edit" onclick="files_edittext(this.id);" class="text_zoom">file name</div></div>';    
    inner_e += '<div id="files_createtxt" class="buttons" onclick="files.click_php(this.id);" '+common_buttonpos_menu(6,0)+'>create txt</div>';
    inner_e += '<div id="files_createdir" class="buttons" onclick="files.click_php(this.id);" '+common_buttonpos_menu(4,0)+'>create dir </div>';
    common_create_menu('files_create', 1, inner_e);
}
function files_show_options(){                                           //alert('show_options');
    var fname = files.get_fname();
    var text = fname;
    if (fname.lastIndexOf('.')!=-1) { text = fname.substring(0, fname.indexOf('.')); }
    files.editor_text = text;
    var inner_e = ""; 
    inner_e += '<div class="reader_zoom_box" '+common_buttonpos_menu(0,2)+'><div id="files_options_edit" onclick="files_edittext(this.id);" class="text_zoom">'+text+'</div></div>';
    inner_e += '<div id="files_copy"      class="buttons disabled" onclick="" '+common_buttonpos_menu(6,0)+'>copy</div>';
    inner_e += '<div id="files_delete"    class="buttons" onclick="files.click_php(this.id);"  '+common_buttonpos_menu(4,0)+'>delete</div>';
    inner_e += '<div id="files_edit"      class="buttons" onclick="files.click_php(this.id);"  '+common_buttonpos_menu(7,0)+'>edit</div>';
    inner_e += '<div id="files_cleanhtml" class="buttons" onclick="files.click_php(this.id);"  '+common_buttonpos_menu(5,0)+'>html</div>';
    common_create_menu('files_options', 0, inner_e);
    if (fname.indexOf('.html')==-1){files_disable('files_cleanhtml');}
}
function files_show_login(){
    var inner_e="";
    inner_e+= '<div class="reader_zoom_box" '+common_buttonpos_menu(0,2, 4,3)+'><div id="files_loginname_edit" onclick="files_edittext(this.id);" class="text_zoom">name</div></div>';
    inner_e+= '<div class="reader_zoom_box" '+common_buttonpos_menu(4,2, 4,3)+'><div id="files_loginpass_edit" onclick="files_edittext(this.id);" class="text_zoom">password</div></div>';
    inner_e+= '<div id="files_userlogin"    class="buttons" onclick="loadDoc(0,files_login);"     '+common_buttonpos_menu(11,0,4,3)+'> login </div>';
    inner_e+= '<div id="files_usernew"      class="buttons" onclick="loadDoc(0,files_login_new);" '+common_buttonpos_menu(10,0,4,3)+'> new  </div>';
    inner_e+= '<div id="files_userlogout"   class="buttons" onclick="files_logout();"             '+common_buttonpos_menu(7, 0,4,3)+'> logout </div>';
    //inner_e+= '<div id="files_usermail      class="buttons disabled" onclick="" '+common_buttonpos_menu(9,0,4,3)+'> email </div>';
    inner_e+= '<div id="files_userremember" class="buttons disabled" onclick="" '+common_buttonpos_menu(8,0,4,3)+'> remem- ber me</div>';
    common_create_menu('files_lodin', 0, inner_e);
}
function files_show_addcontact(){
	var inner_e="";
    inner_e+= '<div id="files_addcontact_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_addcontact_zoom" class="text_zoom">file</div></div>';
    inner_e+= '<div id="files_edit-name" class="buttons" onclick="files_edittext_addcontact(123);" style="left:40%; top:45%;">edit name</div>';
    
    inner_e+= '<div hidden id="files_addcontact_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="addcontact_text_id"     name="addcontact_text_name"   value="file" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="addcontact_submit_id"   name="addcontact_submit_name" value="create file" ></div>';
    inner_e+= '<div id="files_addcontact_id" class="buttons" onclick="files_click(11);" style="left:13%;top:45%;">create file</div>';
    common_create_menu('files_addcontact', 0, inner_e);
}
function files_show_upload(){
    var inner_e = "";
    inner_e+= '<div class="reader_zoom_box" '+common_buttonpos_menu(0,2)+'><div id="files_upload_name" onclick="" class="text_zoom"></div></div>';
    inner_e+= '<div id="files_upload_choose" class="buttons" onclick="files.click_php(this.id);" '+common_buttonpos_menu(4,0)+'>choose file</div>';
    inner_e+= '<div id="files_upload"        class="buttons" onclick="files.click_php(this.id);" '+common_buttonpos_menu(6,0)+'>upload file</div>';
    common_create_menu('files_upload', 0, inner_e);
    document.getElementById('ffiles_upload_choose').onchange = uploadOnChange;
}
function uploadOnChange() {                                              //alert('file');
    var filename = this.value;                                           //alert(filename);
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
        filename = filename.substring(lastIndex + 1);
    }document.getElementById('files_upload_name').innerHTML = filename;
}

//-- text display functions ---------------------------------------------------------------

function files_scroll(order, i_utter){                                   //alert('order '+order);
    var iter = files.iter;                                               //alert(files.fontsize);
    var iter_prev = files.iter_prev;                                     //alert(iter_prev);
    if (order==='files_next'){ if (iter<files.nentry) {iter+=1;} }
    else if (order==='files_prev'){ if (iter>0) {iter-=1;} }
    else { iter = order };                                               //alert(iter);
    iter_prev = files.iter;   
    files.iter_prev = files.iter;
    files.iter = iter;
                                              
    var elem = document.getElementById('ffiles_iter');
    if (elem) {elem.value = files.iter; } 
    files_fill_zoom();
    scroll_to(files.get_fid(), 'files_area_box', title=0);
    
    var type = files.get_ftype();
    if (type=='dir'){fclass='files-dir-hover';} else{fclass='files-txt-hover';}  
    elem = files.get_felem();
    elem.className = 'files '+fclass; 
    if (iter!=iter_prev){
        type = files.get_ftype(iter_prev);
        if (type=='dir'){fclass='files-dir';} else{fclass='files-txt';}  
        files.get_felem(iter_prev).className = 'files '+fclass; 
        }
    
    if (iter==0){fname_ii='..';}
    else{fname_ii = elem.innerText; }
    fname_ii = replace_all(fname_ii,'_',' ');
    if (i_utter===undefined){ utter(fname_ii, 1, onend=0); }
}

function files_fill_zoom(){
    var dir = '<em style="font-style:normal;color:#008000;opacity:0.6;">'+files.dir+' / </em>';
    document.getElementById('files_zoom_text').innerHTML = dir+files.get_fname(); 
}   
function files_set_zoom(order){                
	if (order===undefined){ files.zoom = (files.zoom+1)%2; }             //alert(files.zoom);
    var bodyStyles = window.getComputedStyle(document.body);
    textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
    var elem = document.getElementById("files_zoom_box");               //alert('zoom2');
    if (files.zoom===1){ 
        elem.style.visibility='hidden';
        document.getElementById('files_area_box').style.height = '96%';  //alert('zoom3');
    }else{
        elem.style.visibility='visible';
        document.getElementById('files_area_box').style.height = textheight_zoom; //alert(textheight_zoom);
    }                                                                    
    var name = files.zoom_arr[files.zoom];                               //alert(name);
    elem = document.getElementById('files_zoom'); 
    if (elem) { elem.innerHTML = files.zoom_arr[files.zoom]; }
    //files_fill_zoom();
}

//-- account functions ------------------------------------------------------------------
function files_login(xml){                                               //alert('login');
    var name = document.getElementById('files_loginname_edit').innerHTML;
    var pass = document.getElementById('files_loginpass_edit').innerHTML;
    document.getElementById('ffiles_username').value = name;
    document.getElementById('ffiles_userpass').value = pass;
    document.getElementById('ffiles_userlogin_submit').value = "login";  //alert('login: '+name+' '+pass);
    files.username = name;                                               //alert(files.username);
    user_access=0;
    data =  JSON.parse(xml.responseText);                                //alert(data);
    users = data.users;                                                  //alert(users);
    for (i=0; i<users.length; i++){
        name_i = users[i].name;                                          //alert('NAME: '+name_i+' '+name);
        if (name_i==name){
            user_access=1;
            pass_i = users[i].password;
            if (pass_i==pass){
                user_access=2;
                files.iter = 0;
                document.getElementById("ffiles_userlogin_submit").click();
    }}}                                                                  //alert(user_access);
    utter(login_messages_en[user_access],0,0,0);
}
function files_login_new(xml){                                           //alert('login');
    var name = document.getElementById('files_loginname_edit').innerHTML;
    var pass = document.getElementById('files_loginpass_edit').innerHTML;    //alert(name, pass)
    document.getElementById('ffiles_username').value = name;
    document.getElementById('ffiles_userpass').value = pass; 
    document.getElementById('ffiles_userlogin_submit').value = "new";    //alert(name+' '+pass);
    files.username = name;
    user_access=0;
    data =  JSON.parse(xml.responseText); 
    users = data.users;
    for (i=0; i<users.length; i++){
        name_i = users[i].name;                                          //alert('NAME: '+name_i+' '+name);
        if (name_i==name){ user_access=1; }
    }                                                                    //alert(user_access);
    if (user_access==0){ 
		files.iter = 0;
		document.getElementById("ffiles_userlogin_submit").click();
	}
    utter(newlogin_messages_en[user_access],0,0,0);
}
function loadDoc(url1, login_function) {                                 //alert('loadDoc');
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {                //alert('load  '+ this.readyState+' '+this.status );
	        login_function(this);   
	    }
    };
    xhttp.open("GET", "data/login.json", true);
    xhttp.send();
}

function files_logout(){                                                 //alert('logout');
    document.getElementById('ffiles_username').value = 'common';
    document.getElementById('ffiles_userpass').value = '';     
    files.iter = 0;    
    document.getElementById("ffiles_userlogin_submit").click();
}

//-------------------------------------------------------------------------------
function files_edittext(id){
	var text = files.editor_text;
    editor_run('files', text , id);
}
    
//------------------------------------------------------------------------------
function file_exists(fname){
    fname = fname.toString();
    txt=0; dir=0; a='';
    i_max = files.nentry;
    for (i=0; i<=i_max; i++){
        fname_i = files.get_fname(i).replace('.txt','');
        type = files.get_ftype(i);
        a+=i+' '+fname+' '+fname_i+' '+type+"\n";                        //alert(a);
        if(fname_i==fname){ if(type=='dir'){dir=1;} if(type=='txt'){txt=1;} }
    }                                                                    //alert(a + i_max +'\n'+txt+' '+dir);
    return([txt,dir]);
}

function files_disable(id){
    document.getElementById(id).onclick=''; 
    document.getElementById(id).className='buttons disabled';
}

