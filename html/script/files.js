
var files = {
	iter: 0,
	iter_prev: 0,
	dir: "",
	langbase: "en",
	
	editor_text: "",
	cookie_number: 5,
	cookie_suffix: "_",
	
	nentry: document.getElementById('hidden_files_nentry').innerHTML,
	username: "",
	userpass: ""
}

//-- run file manager -----------------------------------------------------------------
//-------------------------------------------------------------------------------------
                                                                         //alert( document.cookie );
//set_cookie("isset_", "");                                        
if (get_cookie('isset_')!='isset'){                                      //alert('set_cookie');
	set_cookie("isset_", "isset");
	common.cookie_save.call(files);
}else { common.cookie_load.call(files); }
window.onbeforeunload = files_beforunload;
function files_beforunload() {common.cookie_save.call(files);}
//cookie_delete_all();
                                                                         //alert( document.cookie );
                                                                         //alert(get_cookie('PHPSESSID'));    
files_run();

function files_run(){                                                    //alert('files_run');                                                                                                               
	var bodyStyles = window.getComputedStyle(document.body);
	screen_height = window.screen.height+'px';
	screen_width = window.screen.width+'px';                             //alert('alert1');
	document.body.style.setProperty('--screen-height', screen_height);
	document.body.style.setProperty('--screen-width', screen_width);     //alert('alert2');
	textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
	document.getElementById("files_area_box").style.height = textheight_zoom; //alert('alert3');
	
	files_show_buttons(); 
	document.getElementById("base_elements").appendChild(document.getElementById("files_area_box"));
	document.getElementById("base_elements").appendChild(document.getElementById("files_zoom_area"));
	
	scroll_files(files.iter);
	//files_fill_zoom();
}                                                                        //alert('dir: '+files_get_dir());

//-- show buttons ---------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
function files_show_buttons(){                                           //alert('alert b0');
    elem = document.getElementById('files_buttons_area');                //alert('alert b1');
    inner_e = '<div id="files_menu" class="buttons" onclick="files_show_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
    
    inner_e+= '<div id="files_button_options" class="buttons" onclick="files_show_options();"  style="'+reader_button_position(1)+'">opt</div>';
    
    inner_e+= '<div hidden id="files_button_enter" style="left:84%;top:53%;position:fixed;">'; 
    inner_e+= '<form action="" method="post">  <input type="text" id="file_n" name="file_n" value="Mouse" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="files_enter_id" value="enter" name="enter_obj" "></div>';
    inner_e+= '<div id="files_enter" class="buttons" style="'+reader_button_position(2)+'" onclick="files_click(0);">'+symbol_enter+'</div></div>';
    
    inner_e+= '<div id="prev" class="buttons" onclick="scroll_files(prev);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
    inner_e+= '<div id="next" class="buttons" onclick="scroll_files(next);"  style="'+reader_button_position(7)+'">'+symbol_next+'</div>' ;
    inner_e+= '<div id="files_login" class="buttons" onclick="files_show_login();"  style="'+reader_button_position(4)+'">'+'log in'+'</div>' ;
    inner_e+= '<div id="files_upload_button" class="buttons" onclick="files_show_upload();"  style="'+reader_button_position(5)+'">'+symbol_upload+'</div>' ;
    //inner_e+= '<div id="files_python_button" class="buttons" onclick="files_click(10);"   style="'+reader_button_position(6)+'">py</div>';
    
    elem.innerHTML=inner_e;
    dir = files_get_dir();
    if ( dir=='/common' || dir.indexOf('/common/')==0 ){ files_disable('files_upload_button'); }
    subdir = get_subdir(dir+'/');                                        //alert('sub: '+subdir);
    if (subdir=='mail'){                                                 //alert('mail!');
        id = 'fileid_'+files.nentry;                                     //alert(id);
        document.getElementById(id).onclick=function() { files_show_addcontact(); } 
        document.getElementById(id).innerHTML=symbol_newmail;
        }
}
function files_show_addcontact(){
    inner_e = '<div id="files_addcontact_zoom_box" class="reader_zoom_box" style="left:15%;top:15%;width:63%;border:solid 1px white;"><div id="files_addcontact_zoom" class="text_zoom">file</div></div>';
    inner_e+= '<div id="files_edit-name" class="buttons" onclick="files_edittext_addcontact(123);" style="left:40%; top:45%;">edit name</div>';
    
    inner_e+= '<div hidden id="files_addcontact_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="addcontact_text_id"     name="addcontact_text_name"   value="file" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="addcontact_submit_id"   name="addcontact_submit_name" value="create file" ></div>';
    inner_e+= '<div id="files_addcontact_id" class="buttons" onclick="files_click(11);" style="left:13%;top:45%;">create file</div>';
    common_create_menu('files_addcontact', 0, inner_e);
}
function files_show_upload(){
    inner_e = '<div hidden id="files_upload"> ';
    inner_e+= '<form action="" method="post" enctype="multipart/form-data">';
    inner_e+= '<input type="file"   id="upload_file_id"   name="upload_file_name" >';
    inner_e+= '<input type="submit" id="upload_submit_id" name="upload_submit_name" value="empty" ></div>';
    
    inner_e+= '<div id="files_upload_choose" class="buttons" onclick="files_click(8);"   style="left:20%; top:40%;">choose file</div>';
    inner_e+= '<div id="files_upload_submit" class="buttons" onclick="files_click(9);" style="left:70%;top:40%;">upload file</div>';
    common_create_menu('files_upload', 0, inner_e);
}
function files_show_login(){
    name='name'; pass='----';
    name = files.username;
    pass = files.userpass;
    
    inner_e= '<div id="files_login_zoomname_box"     class="reader_zoom_box" style="left:15%;top:15%;width:50%;border:solid 1px white;"><div onclick="files_edittext(this.id);" id="files_loginname_text"     class="text_zoom">'+name+'</div></div>';
    inner_e+= '<div id="files_login_zoompassword_box" class="reader_zoom_box" style="left:15%;top:40%;width:50%;border:solid 1px white;"><div onclick="files_edittext(this.id);" id="files_loginpass_text" class="text_zoom">'+pass+'</div></div>';
    
    inner_e+= '<div id="files_login" style="left:13%;top:68%;position:fixed;">'; 
    inner_e+= '<form action="" method="post">  <input type="text" id="login_form_id" name="login_form_name" value="login_form_value" style="position:fixed;width:1%;height:1%;">';
    inner_e+= '<input type="text" id="files_loginname_text_formid"           name="loginname_text_name"    value="'+name+'" style="width:0%;height:0%;">';
    inner_e+= '<input type="text" id="files_loginpass_text_formid"           name="loginpass_text_name"    value="'+pass+'" style="width:0%;height:0%;">';
    inner_e+= '<input hidden type="submit" id="login_submit_id"    name="login_submit_name"      value="login" >';
    inner_e+= '<input hidden type="submit" id="newlogin_submit_id" name="login_submit_name"      value="newlogin" > </div>';
    inner_e+= '<div id="files_login_button"     class="buttons" onclick="loadDoc(0,files_login);"      style="position:fixed;left:75%;top:68%;" >login</div></div>';
    inner_e+= '<div id="files_newlogin_button"  class="buttons" onclick="loadDoc(0,files_login_new);"  style="position:fixed;left:15%;top:68%;" >new  </div></div>';
    inner_e+= '<div id="files_logout_button"    class="buttons" onclick="files_logout();"              style="position:fixed;left:75%;top:40%;" >quit </div></div>';
    inner_e+= '<div id="files_loginemail_button" class="buttons disabled" onclick=""         style="position:fixed;left:40%;top:68%;" >email </div></div>';
    
    inner_e+= '<div id="files_login_remember"   class="buttons disabled" onclick=""   style="left:75%; top:15%;">remem- ber me</div>';
    inner_e+= '<div id="files_login_normal" class="buttons" onclick="files_show_loginnormal();" style="left:10%;top:10%;width:3%;height:5%;line-height:70%;">*</div>';
    common_create_menu('files_lodin', 0, inner_e);
}function files_show_loginnormal(){
    elem=document.getElementById('files_login_zoomname_box');
    inner_e='<textarea id="files_login_zoomname" name="comment" class="text_zoom" form="usrform">name</textarea>';
    elem.innerHTML = inner_e;
    elem=document.getElementById('files_login_zoompassword_box');
    inner_e='<textarea id="files_login_zoompassword" name="comment" class="text_zoom" form="usrform">password</textarea>';
    elem.innerHTML = inner_e;
    //localStorage.setItem('fastlogin', '1');
}
function files_show_options(){                                           //alert('show_options');
    var iter = files.iter;
    if_i=localStorage.getItem('if_rename_file');
    fname = document.getElementById('fileid_'+iter.toString()).innerHTML;
    
    files.editor_text = fname;
    inner_e = '<div id="files_options_zoom_box" class="reader_zoom_box" style="left:14%;top:16%;width:52%;"><div onclick="files_edittext(this.id);" id="files_options_text" class="text_zoom">'+fname+'</div></div>';
    inner_e+= '<div id="files_options_copy" class="buttons disabled" onclick="" style="left:50%; top:60%;">copy</div>';
    
    inner_e+= '<div hidden id="files_options_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="files_options_n"    name="files_options_n" value="'+iter.toString()+'" style="width:0%;height:0%;">';
    inner_e+= '<input type="text"   id="files_options_text_fomid" name="files_options_text" value="'+fname+'" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="files_delete_id"    name="files_options_submit" value="delete">'; 
    inner_e+= '<input type="submit" id="files_edit_id"      name="files_options_submit" value="edit">';
    inner_e+= '<input type="submit" id="files_html_id"      name="files_options_submit" value="html"></div>';
    inner_e+= '<div id="files_delete_button"    class="buttons" onclick="files_click(1);"  style="left:14%;top:60%;">delete</div>';
    inner_e+= '<div id="files_edit_button"      class="buttons" onclick="files_click(2);"  style="left:71%;top:60%;">edit</div>';
    inner_e+= '<div id="files_cleanhtml_button" class="buttons" onclick="files_click(10);" style="left:32%;top:60%;">html</div>';
    common_create_menu('files_options', 0, inner_e);
    fname = document.getElementById('fileid_'+files_iter.toString()).innerText;
    if (fname.indexOf('.html')==-1){files_disable('files_cleanhtml_button');}
}
function files_show_menu(){    
    lang = get_cookie('langbase_');
    inner_e = '<div id="files_sound"             class="buttons disabled" onclick="alert(123);" style="left:20%; top:60%;">sound</div>';
    inner_e+= '<div id="common_lang_zoombox" class="reader_zoom_box" style="left:32%;top:23%;width:11%;height:17%;"><div id="common_lang_zoom1" class="text_zoom">'+lang+'</div></div>';
    inner_e+= '<div id="common_lang"       class="buttons"          onclick="common_show_lang(1)"   style="left:44%; top:23%;">base lang</div>';
    
    inner_e+= '<div hidden id="files_mail" style="left:60%;top:15%;position:fixed;"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="mail_text_id"   name="mail_text_name"   value="empty" >';
    inner_e+= '<input type="submit" id="mail_submit_id" name="mail_submit_name" value="empty" >';
    inner_e+= '<input type="submit" id="past_submit_id" name="mail_submit_name" value="empty" ></div>';
    inner_e+= '<div id="files_mail_button" class="buttons" onclick="files_click(7)" style="left:68%;top:23%;">email</div>';
    inner_e+= '<div id="files_past_button" class="buttons disabled" onclick="" style="left:44%;top:60%;">past</div>';
    
    inner_e+= '<div id="files_create" class="buttons" onclick="files_show_create();" style="left:68%; top:60%;">new file</div>';
    common_create_menu('files_menu', 0, inner_e);
}
function files_show_create(){
    inner_e= '<div id="files_create_zoom_box" class="reader_zoom_box" style="left:14%;top:16%;width:52%;"><div onclick="files_edittext(this.id);" id="files_create_text" class="text_zoom">file name</div></div>';    
    inner_e+= '<div hidden id="files_create_form" style="left:13%;top:45%:width:20%;position:fixed;"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="files_create_text_formid"      name="create_text_name"   value="file" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="createtxt_submit_id" name="create_submit_name" value="create file" >';
    inner_e+= '<input type="submit" id="createdir_submit_id" name="create_submit_name" value="create dir"  ></div>';
    inner_e+= '<div id="files_createtxt_id" class="buttons" onclick="files_click(4)" style="left:13%;top:45%;">create file</div>';
    inner_e+= '<div id="files_createdir_id" class="buttons" onclick="files_click(3)" style="left:70%;top:45%;">create dir </div>';
    common_create_menu('files_create', 1, inner_e);
}

//-- text display functions ---------------------------------------------------------------
//-----------------------------------------------------------------------------------------
function files_fill_zoom(){
    var dir0 = document.getElementById('hidden_files_dir').innerHTML; 
    i = dir0.indexOf('/');
    if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
    dir = '<em style="font-style:normal;color:#008000;opacity:0.6;">'+dir+' / </em>';
    document.getElementById('files_zoom').innerHTML = dir+document.getElementById('fileid_'+files.iter.toString()).innerHTML; 
}                                                                       //alert('scroll_test');
function scroll_files(order){                                            //alert('order '+order);
    var iter = files.iter;                                               //alert(iter);
    var iter_prev = files.iter_prev;                                     //alert(iter_prev);
    if (order==next){ if (iter<files.nentry) {iter+=1;} }
    else if (order==prev){ if (iter>0) {iter-=1;} }
    else { iter = order };  
    //if ( order<files.nentry && order>0 ) { iter=order;} 
    iter_prev = files.iter;   
    files.iter_prev = files.iter;
    files.iter = iter;
    set_cookie('iter_', iter);
    set_cookie('iter_prev_', iter_prev);
                                              
    document.getElementById('hidden_file_iter').innerHTML=files.iter;
    document.getElementById('file_n').value = files.iter; 
    files_fill_zoom();
    
    var fileid = 'fileid_'+iter.toString();  scroll_to(fileid, 'files_area_box', title=0);
    
    title=elem.getAttribute('title');
    if (title=='dir'){fclass='files-dir-hover';} else{fclass='files-txt-hover';}  elem.className = 'files '+fclass; 
    if (iter!=iter_prev){
        var fileid = 'fileid_'+iter_prev.toString();
        elem = document.getElementById(fileid); title=elem.getAttribute('title'); 
        if (title=='dir'){fclass='files-dir';} else{fclass='files-txt';}  elem.className = 'files '+fclass; 
        }
    
    if (iter==0){fname_ii='..';}
    else{fname_ii = document.getElementById('fileid_'+iter.toString()).innerText; }
    fname_ii = replace_all(fname_ii,'_',' ')
    lang = get_cookie('langbase_');                                      //alert(lang);
    utter(fname_ii,lang,1, onend=0);
}

//-- account functions ------------------------------------------------------------------
//---------------------------------------------------------------------------------------
function files_login(xml){
    var name = document.getElementById('loginname_text_id').value;
    var pass = document.getElementById('loginpass_text_id').value;
    files.username = name;
    user_access=0;
    data =  JSON.parse(xml.responseText); users = data.users;
    for (i=0; i<users.length; i++){
        name_i = users[i].name;                                          //alert('NAME: '+name_i+' '+name);
        if (name_i==name){
            user_access=1;
            pass_i = users[i].password;
            if (pass_i==pass){
                user_access=2;
                files_click(6);
    }}}                                                                  //alert(user_access);
    utter(login_messages_en[user_access],0,0,0);
}function files_login_new(xml){
    name=document.getElementById('loginname_text_id').value;
    pass=document.getElementById('loginpass_text_id').value; 
    files.username = name;
    user_access=0;
    data =  JSON.parse(xml.responseText); users = data.users;
    for (i=0; i<users.length; i++){
        name_i = users[i].name;
        if (name_i==name){ user_access=1; }
    }                                                                    //alert(user_access);
    if (user_access==0){ files_click(5); }
    utter(newlogin_messages_en[user_access],0,0,0);
}

//function files_login_test(){
//    name=get_cookie('PHPSESSID'); pass='';
//    document.getElementById('login_text_id').value=name+' '+pass;
//    files_click(5);
//}
function files_logout(){
    document.getElementById('loginname_text_id').value='common';
    document.getElementById('loginpass_text_id').value='';
    files_click(6);
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
function files_edittext(id){
	var text = files.editor_text;
    editor_run('files', text , id);
}
    
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
function file_exists(fname){
    fname = fname.toString();
    txt=0; dir=0; a='';
    i_max = files.nentry;
    for (i=0; i<=i_max; i++){
        fname_i = document.getElementById('fileid_'+i.toString()).innerHTML.replace('.txt','');
        type = document.getElementById('fileid_'+i.toString()).getAttribute('title');
        a+=i+' '+fname+' '+fname_i+' '+type+"\n";                        //alert(a);
        if(fname_i==fname){ if(type=='dir'){dir=1;} if(type=='txt'){txt=1;} }
    }                                                                    //alert(a + i_max +'\n'+txt+' '+dir);
    return([txt,dir]);
}
function files_get_dir(){
    dir0 = document.getElementById('hidden_files_dir').innerHTML; 
    i = dir0.indexOf('/');
    if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
    return(dir);
}

function files_click(n){ 
    arr_names = ["files_enter_id", "files_delete_id", "files_edit_id", 'createdir_submit_id', 'createtxt_submit_id', 'newlogin_submit_id','login_submit_id', "mail_submit_id", 'upload_file_id','upload_submit_id', 'files_html_id', 'addcontact_submit_id'];
    document.getElementById(arr_names[n]).click();  }
function files_disable(id){
    document.getElementById(id).onclick=''; 
    document.getElementById(id).className='buttons disabled';
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
