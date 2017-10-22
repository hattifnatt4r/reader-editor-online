
//console.log(check_browser());


console.log(document.title);
//-- files variables ---------------------------------------------------------------
if (localStorage.getItem("isset")!="true"){
	localStorage.setItem("isset", "true");
	localStorage.setItem("copy_fname", "");
	localStorage.setItem("copy_fdir", "");
	localStorage.setItem("show_welcome", "yes");
}else{
	localStorage.setItem("show_welcome", "no");
}
var files = {
	iter: 0,
	iter_prev: 0,
	zoom: 0,
	fontsize: 1.2,
	username: "",
	userpass: "",
	userremember: false,
	
	cookie_number: 7,
	cookie_suffix: "_f",
	subdir: "",
	editor_text: "",
	
	nentry: document.getElementById('hidden_files_nentry').innerHTML,
	
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
		           "files_addmail": "ffiles_addmail_submit", 
		           "files_download": "ffiles_download_submit", 
		           "files_past": "ffiles_past_submit", 
		           },
	click_php: function(id) {                                            consolelog_func('brown');
		if (id==="files_enter" && this.get_ftype()=="dir" ) { this.iter=0; this.iter_prev=0; }
		document.getElementById(this.buttons_php[id]).click(); 
	},
	set_dir: function() {                                                consolelog_func('brown');
		dir0 = document.getElementById('hidden_files_dir').innerHTML; 
	    i = dir0.indexOf('/');
	    if (i!=-1) { dir = dir0.substr(i); } else{dir = '';}
		this.dir = dir;
	},
	get_fname: function(i){                                              consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return document.getElementById('fileid_'+this.iter.toString()+'_name').innerHTML; 
	},
	get_fid: function(i){                                                consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return 'fileid_'+i.toString(); 
	}, 
	get_felem_pic: function(i){                                          consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return document.getElementById(this.get_fid(i)+'_pic');
	},
	get_ftype: function(i){                                              consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		var type = "";
		var elem = document.getElementById(this.get_fid(i));
		if (elem) { type=elem.getAttribute('title'); }
		return type;
	},
}                                                        
window.onbeforeunload = files_beforunload;
function files_beforunload() {                                           consolelog_func();
	common.cookie_save.call(files); 
	common.cookie_save(); 
}
function files_cleancookie(){                                            consolelog_func();
	cookie_delete_all(); 
	window.location.href = '/index.php'; 
}

//-- run files -------------------------------------------------------------------
var elem = document.getElementById("php_goto");
var php_goto = elem.innerHTML.replace(' ','');
elem.innerHTML = '';
if (php_goto!=''){ window.location.href = '/'+php_goto; }

if ('speechSynthesis' in window) {
	/*
	var msg = new SpeechSynthesisUtterance();
	var msg2 = new SpeechSynthesisUtterance();
  	msg.text = 'Hello mozilla!';
  	msg2.text = 'Again';
  	msg.onend=function(event){ window.speechSynthesis.speak(msg2); };
  	window.speechSynthesis.speak(msg);
  	//window.speechSynthesis.speak(msg);
  	*/
  	console.log('Your browser supports speech synthesis.')
} else{ 
	common_show_notification('Your browser does not support speech synthesis.');
}
files_run();

function files_run(){                                                    consolelog_func('darkblue'); 
	files.set_dir(); 
	files.subdir = get_subdir(files.dir+'/');  
	document.getElementById('content_box').style.top = '-3.4%';
	
	if (cookie_get('isset_files_')!='isset'){                            
		cookie_set("isset_files_", "isset");
		common.cookie_save.call(files);
		common.cookie_save();
	}else { 
		common.cookie_load.call(files); 
		common.cookie_load();
	}
	   
	console.log('welcome: '+common.welcome);
	if (common.welcome=='do' && localStorage.getItem("show_welcome")==="yes" ){ 
		files_welcome();
	}                                                                                                  
	var bodyStyles = window.getComputedStyle(document.body);
	
	files_show_buttons();                                                
	document.getElementById("base_elements").appendChild(document.getElementById("content_box"));        
	document.getElementById("base_elements").appendChild(document.getElementById("zoom_box"));
	
	common_set_fontsize(files.fontsize, files);                         
	files_scroll(files.iter, 'no');                                      
	files_set_zoom('no');                                                
	common.style.resize();
	files_show_files();
	
	//elem = document.getElementById("php_alert");                         
	//if (elem.innerHTML!=''){console.log(elem.innerHTML);}
}                                                                        

//-- show buttons ---------------------------------------------------------------------------
function files_resize(){                                                 consolelog_func("darkblue"); 
	files_show_buttons();
	common.style.resize();
	files_show_files();
}

function files_show_buttons(){                                           consolelog_func();  
    var elem = document.getElementById('buttons_area');               
    var inner_e="";
    inner_e+= '<div id="files_menu"    onclick="files_show_menu();" '       +common.style.buttonpos(0,4)+'> menu </div>' ;
    inner_e+= '<div id="files_options" onclick="files_show_options();" '    +common.style.buttonpos(1,4)+'> opt </div>';
    inner_e+= '<div id="files_enter"   onclick="files.click_php(this.id);" '+common.style.buttonpos(2,2)+'>'+symbol_enter+'</div></div>';
    inner_e+= '<div id="files_login"   onclick="files_show_login();" '      +common.style.buttonpos(4,2)+'>'+'log in'+'</div>' ;
    inner_e+= '<div id="files_upload"  onclick="files_show_upload();" '     +common.style.buttonpos(5,2)+'>up- load</div>' ;
    inner_e+= '<div id="files_prev"    onclick="files_scroll(this.id);" '   +common.style.buttonpos(3,4)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="files_next"    onclick="files_scroll(this.id);" '   +common.style.buttonpos(7,4)+'>'+symbol_next+'</div>' ;
    //inner_e+= '<div id="files_test"    onclick="clean_tmp();" '             +common.style.buttonpos(6,4)+'>clean_tmp</div>' ;
    //inner_e+= '<div id="files_python_button" class="buttons" onclick="files_click(10);"   style="'+reader_button_position(6)+'">py</div>';
    elem.innerHTML=inner_e;
    //if ( dir=='/common' || dir.indexOf('/common/')==0 ){ files_disable('files_upload'); }
    if (files.subdir=='mail'){                                           console.log(files.subdir);                        
        id = 'fileid_'+files.nentry;                                    
        document.getElementById(id).onclick=function() { files_show_addcontact(); } 
        document.getElementById(id).innerHTML = symbol_addcontact;
        }
}
function files_show_menu(){                                              consolelog_func();
	document.getElementById("ffiles_copyfname_text").value = localStorage.getItem("copy_fname");
    document.getElementById("ffiles_copyfdir_text").value = localStorage.getItem("copy_fdir"); 
	var inner_e = "";  var obj = 'files';
    inner_e += '<div id="common_lang_both_zoom"  onclick="" ' +common.style.buttonpos_menu(1,1,4,2,0,-1)+'>'+common.langbase+' +<br> '+common.lang+'</div>';
    inner_e += '<div id="common_lang_both"   onclick="common_show_lang(1)" ' +common.style.buttonpos_menu(2,0)+'>lang</div>';
    inner_e += '<div id="files_create"   onclick="files_show_create();" '     +common.style.buttonpos_menu(7,0)+'>new file</div>';
    inner_e += '<div id="files_zoom"     onclick="files_set_zoom();" '        +common.style.buttonpos_menu(3,0)+'>'+files.zoom_arr[files.zoom]+'</div>';
    inner_e += '<div id="files_fontsize" onclick="common_show_fontsize('+obj+');" '+common.style.buttonpos_menu(6,0)+'> font size </div>';
    inner_e += '<div id="files_cleancookie" onclick="files_cleancookie();" '  +common.style.buttonpos_menu(0,0)+'> delete cookie </div>';
    inner_e += '<div id="files_past"     onclick="files_past();" '+common.style.buttonpos_menu(5,0)+'> past </div>';
    //inner_e += '<div id="files_sound"    onclick="" '+common.style.buttonpos_menu(4,3)+'> sound </div>';
    inner_e += '<div id="files_clickdelay" onclick="common_show_clickdelay();" '+common.style.buttonpos_menu(4,0)+'> click delay </div>';
    common_create_menu('files_menu', 0, inner_e);
    if (localStorage.getItem("copy_fdir")=="") { files_disable("files_past"); }
}
function files_show_create(){                                            consolelog_func();
	var inner_e = "";
    inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_create_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">file name</div></div>';    
    inner_e += '<div id="files_createtxt" onclick="files.click_php(this.id);" '+common.style.buttonpos_menu(6,0)+'>create txt</div>';
    inner_e += '<div id="files_createdir" onclick="files.click_php(this.id);" '+common.style.buttonpos_menu(4,0)+'>create dir </div>';
    common_create_menu('files_create', 1, inner_e);
}
function files_show_options(){                                           consolelog_func();
    var fname = files.get_fname();
    var text = fname;
    if (fname.lastIndexOf('.')!=-1) { text = fname.substring(0, fname.indexOf('.')); }
    files.editor_text = text;
    var inner_e = ""; 
    inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_options_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">'+text+'</div></div>';
    inner_e += '<div id="files_delete"    onclick="files.click_php(this.id);"  '+common.style.buttonpos_menu(4,0)+'> delete </div>';
    inner_e += '<div id="files_edit"      onclick="files.click_php(this.id);"  '+common.style.buttonpos_menu(7,0)+'> edit name </div>';
    inner_e += '<div id="files_cleanhtml" onclick="files.click_php(this.id);"  '+common.style.buttonpos_menu(5,0)+'> html to txt </div>';
    inner_e += '<div id="files_download"  onclick="files_download();"  '+common.style.buttonpos_menu(3,0)+'> down- load </div>';
    inner_e += '<div id="files_copy"      onclick="files_copy();" '+common.style.buttonpos_menu(6,0)+'>copy</div>';    
    common_create_menu('files_options', 0, inner_e);
    if (fname.indexOf('.php')==-1){files_disable('files_cleanhtml');}
}
function files_show_login(){                                             consolelog_func();
	var name="name", pass="password";
	if (files.userremember) {name = files.username; pass = files.userpass; }
    var inner_e="";
    inner_e+= '<div '+common.style.buttonpos_menu(0,2, 4,3)+'><div id="files_loginname_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">'+name+'</div></div>';
    inner_e+= '<div '+common.style.buttonpos_menu(4,2, 4,3)+'><div id="files_loginpass_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">'+pass+'</div></div>';
    inner_e+= '<div '+common.style.buttonpos_menu(2,2, 4,3)+'><div id="files_loginmail_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom"> mail address </div></div>';
    inner_e+= '<div id="files_userlogin"    onclick="loadDoc(0,files_login);"     '+common.style.buttonpos_menu(11,0,4,3)+'> login </div>';
    inner_e+= '<div id="files_usernew"      onclick="loadDoc(0,files_login_new);" '+common.style.buttonpos_menu(9,0,4,3)+'> new  </div>';
    inner_e+= '<div id="files_userlogout"   onclick="files_logout();"             '+common.style.buttonpos_menu(10, 0,4,3)+'> logout </div>';
    inner_e+= '<div id="files_userremember" onclick="files_login_remember();" '    +common.style.buttonpos_menu(8,0,4,3)+'> remem- ber me</div>';
    inner_e+= '<div id="files_userdelete"   onclick="" '    +common.style.buttonpos_menu(6,3,4,3)+'> delete </div>';
    inner_e+= '<div id="files_usermail"      onclick="" '   +common.style.buttonpos_menu(7,3,4,3)+'> mail data </div>';
    common_create_menu('files_lodin', 0, inner_e);
}
function files_show_addcontact(){                                        consolelog_func();
	var inner_e="";
	inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_addmail_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom"> new contact </div></div>';
	inner_e += '<div id="files_addmail"      onclick="files.click_php(this.id);" '+common.style.buttonpos_menu(4,0)+'> add contact </div>';
    common_create_menu('files_addmail', 0, inner_e);
}
function files_show_upload(){                                            consolelog_func();
    var inner_e = "";
    inner_e+= '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_upload_name" onclick="" class="text_zoom menu_zoom"></div></div>';
    inner_e+= '<div id="files_upload_choose" onclick="files.click_php(this.id);" '+common.style.buttonpos_menu(4,0)+'>choose file</div>';
    inner_e+= '<div id="files_upload"        onclick="files.click_php(this.id);" '+common.style.buttonpos_menu(6,0)+'>upload file</div>';
    common_create_menu('files_upload', 0, inner_e);
    document.getElementById('ffiles_upload_choose').onchange = uploadOnChange;
}
function uploadOnChange() {                                              consolelog_func();
    var filename = this.value;                                           
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
        filename = filename.substring(lastIndex + 1);
    }document.getElementById('files_upload_name').innerHTML = filename;
}

//-- text display functions ---------------------------------------------------------------
function files_show_files(){                                             consolelog_func();
	var files_arr = document.getElementById('files_array').childNodes;   
	var wratio = window.innerWidth/window.innerHeight;                   
	var left = 2.5; 
	var top=-7; 
	var content_width = common.style.get_content_width();                
	var eratio_x = content_width/wratio/100;                             
	var eratio_y = 0.74;
    var ywidth=21.5; var yspace=3;
    var xwidth=ywidth*1.2;
    var xspace = 3;                                                      
    var xn = Math.floor((content_width+1)/(xspace+xwidth));             
    if (xn<1){xn=1};
    var ratio = (content_width+1)/(xspace+xwidth)/xn;
    var pic_width = 0.6*xwidth;
    xwidth = xwidth*ratio;
    xspace = xspace*ratio;
    var i=0;       
	for (i=0; i<files_arr.length; i+=1){                                 
		var n_y = (i-i%xn)/xn;
	    var x = left + (xspace+xwidth)* (i%xn);
	    var y = top +  (ywidth+yspace)*n_y;  
	    files_arr[i].style.top = y/eratio_y+'%';
	    files_arr[i].style.left = x/wratio/eratio_x+'%';
	    files_arr[i].style.height = ywidth/eratio_y+'%';
	    dx = xwidth/wratio/eratio_x/100;
	    files_arr[i].style.width = xwidth/wratio/eratio_x+'%';
	    var elem_pic = document.getElementById(files_arr[i].id+'_pic');
	    //elem_pic.innerHTML = symbol_file;
	    var elem_name = document.getElementById(files_arr[i].id+'_name');	    
		}
	document.getElementById('files_array').style.visibility = 'visible';
}

function files_scroll(order, i_utter){                                   consolelog_func('darkblue');
    var iter = files.iter;                                               
    var iter_prev = files.iter_prev;                                     
    if (order==='files_next'){ if (iter<files.nentry) {iter+=1;} }
    else if (order==='files_prev'){ if (iter>0) {iter-=1;} }
    else { iter = order };                                               
    iter_prev = files.iter;   
    files.iter_prev = files.iter;
    files.iter = iter;
                                              
    var elem = document.getElementById('ffiles_iter');
    if (elem) {elem.value = files.iter; } 
    files_fill_zoom();
    scroll_to(files.get_fid(), 'content_box', title=0);
    
    if (iter==0){fname_ii='..';}
    else{fname_ii = files.get_fname(); }
    fname_ii = fname_ii.replace('_',' ');                               
    if (i_utter===undefined){ utter(fname_ii, 1, onend=0); }
}

function files_fill_zoom(){                                              consolelog_func();
	var dir = files.dir; var name = files.get_fname();                   
	if (get_usrname(dir)=="guests"){
		i1 = dir.indexOf('/',dir.indexOf('/')+1);
	    i2 = dir.indexOf('/',i1+1);                                     
		if (i2==-1) { i2 = dir.length; }                                 //console.log(i1+' - '+i2);
		dir = dir.substring(0,i1)+dir.substring(i2); 
	}
    dir = '<em style="font-style:normal;color:#008000;opacity:0.6;">'+dir+'/ </em>';
    document.getElementById('files_zoom_text').innerHTML = dir+files.get_fname(); 
}   
function files_set_zoom(order){                                          consolelog_func();
	if (order===undefined){ files.zoom = (files.zoom+1)%2; }             
    var bodyStyles = window.getComputedStyle(document.body);
    var elem = document.getElementById("zoom_box");               
    if (files.zoom===1){ 
        elem.style.visibility='hidden';
        document.getElementById('content_box').style.height = '96%';  
    }else{
        elem.style.visibility='visible';
        document.getElementById('content_box').style.height = common.style.textheight_zoom+'%'; 
    }                                                                    
    var name = files.zoom_arr[files.zoom];                               
    elem = document.getElementById('files_zoom'); 
    document.getElementById('zoom_box').style.height = (100 - common.style.textheight_zoom-2)+'%';
    document.getElementById('zoom_box').style.top = (common.style.textheight_zoom +0.2)+'%';
    if (elem) { 
		elem.innerHTML = files.zoom_arr[files.zoom]; 
		}
}

//-- account functions ------------------------------------------------------------------
function files_login(xml){                                               consolelog_func();
    var name = document.getElementById('files_loginname_edit').innerHTML;
    var pass = document.getElementById('files_loginpass_edit').innerHTML;
    document.getElementById('ffiles_username').value = name;
    document.getElementById('ffiles_userpass').value = pass;
    document.getElementById('ffiles_userlogin_submit').value = "login";  
    files.username = name;                                               
    user_access=0;
    data =  JSON.parse(xml.responseText);                                
    users = data.users;                                                  
    for (i=0; i<users.length; i++){
        name_i = users[i].name;                                          
        if (name_i==name){
            user_access=1;
            pass_i = users[i].password;
            if (pass_i==pass){
                user_access=2;
                files.iter = 0;
                document.getElementById("ffiles_userlogin_submit").click();
    }}}                                                                  
    utter(login_messages_en[user_access],0,0,0);
}
function files_login_new(xml){                                           consolelog_func();
    var name = document.getElementById('files_loginname_edit').innerHTML;
    var pass = document.getElementById('files_loginpass_edit').innerHTML;   
	
	user_access=0;
	if (name!='guest'){
	    document.getElementById('ffiles_username').value = name;
	    document.getElementById('ffiles_userpass').value = pass; 
	    document.getElementById('ffiles_userlogin_submit').value = "new";    
	    files.username = name;
	    data =  JSON.parse(xml.responseText); 
	    users = data.users;
	    for (i=0; i<users.length; i++){
	        name_i = users[i].name;                                          
	        if (name_i==name){ user_access=1; }
	    }                       
	}          
	                                   
    if (user_access==0){ 
		files.iter = 0;
		document.getElementById("ffiles_userlogin_submit").click();
	}
    utter(newlogin_messages_en[user_access],0,0,0);
}
function loadDoc(url1, login_function) {                                 consolelog_func();
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {                              consolelog_func();
	    if (this.readyState == 4 && this.status == 200) {                
	        login_function(this);   
	    }
    };
    xhttp.open("GET", "data/login.json", true);
    xhttp.send();
}

function files_logout(){                                                 consolelog_func();
    document.getElementById('ffiles_username').value = 'guest';
    document.getElementById('ffiles_userpass').value = '';     
    files.iter = 0;    
    document.getElementById("ffiles_userlogin_submit").click();
}
function files_login_remember(){                                         consolelog_func();
    files.username = document.getElementById('files_loginname_edit').innerHTML;
    files.userpass = document.getElementById('files_loginpass_edit').innerHTML;  
    files.userremember = true;
}

//-------------------------------------------------------------------------------
function files_edittext(id){                                             consolelog_func('darkblue');
	var text = files.editor_text;
    editor_run('files', text , id);
}
    
//------------------------------------------------------------------------------
function file_exists(fname){                                             consolelog_func();                                           
    fname = fname.toString();
    txt=0; dir=0; a='';
    i_max = files.nentry;
    for (i=0; i<=i_max; i++){
        fname_i = files.get_fname(i).replace('.txt','');
        type = files.get_ftype(i);
        a+=i+' '+fname+' '+fname_i+' '+type+"\n";                        
        if(fname_i==fname){ if(type=='dir'){dir=1;} if(type=='txt'){txt=1;} }
    }                                                                    
    return([txt,dir]);
}

function files_disable(id){                                              consolelog_func();
    document.getElementById(id).onclick=''; 
    document.getElementById(id).className='buttons disabled';
}

function files_download(){                                               consolelog_func();
	var fname = files.get_fname(); 
    var elem = document.getElementById('created_elements');
    inner_e = elem.innerHTML;
    inner_e+= '<a id="link_download" href="/users'+files.dir+'/'+fname+'" download>'+fname+'</a>';
    elem.innerHTML = inner_e;
    var link = document.getElementById("link_download");
    link.click();
    elem.parentNode.removeChild(link);
}
function files_copy(){                                                   consolelog_func();
    localStorage.setItem("copy_fname", files.get_fname());
    localStorage.setItem("copy_fdir", files.dir);
}
function files_past(){                                                   consolelog_func();
    document.getElementById("ffiles_copyfname_text").value = localStorage.getItem("copy_fname");
    document.getElementById("ffiles_copyfdir_text").value = localStorage.getItem("copy_fdir"); 
    document.getElementById("ffiles_past_submit").click(); 
}

//------------------------------------------------------------------------

function files_welcome(){
	var text = "Welcome! <br>This website may help you to read and write. See 'readme.txt' file to learn about website and how to use it. <br><br> Your browser does not support speech synthesis. Your browser does not support speech synthesis. Your browser does not support speech synthesis. Your browser does not support speech synthesis.";
	var text = "Welcome! <br>This website may help you to read and write.";
	text+=     " See 'readme.txt' file to learn about website and how to use it. <br>";
	text+=     "To open the file close this menu, then click on the file icon and 'check' button to the right. ";
	text+=     "Use right and left arrows to read the file."
	//var text = "Welcome! Your browser does not support speech synthesis. ";
	common_show_notification(text);
	common.repeat_text = replace_all(text,'<br>','');
	//utter_sentence(0, 1, 0, 1);
}

function clean_tmp(){
	//window.location.href = '/script/cron.php';
	document.getElementById('ffiles_test_submit').click(); 
}
