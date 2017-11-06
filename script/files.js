
console.log('--------------\n'+document.title);

//-- files variables ---------------------------------------------------------------

var files = {
	iter: 0,
	iter_prev: 0,
	zoom: 1,
	username: "",
	userpass: "",
	userremember: false,
	
	cookie_number: 7,
	cookie_suffix: "_f",
	name: "files",
	
	nentry:1,
	nfolders: 1,
	entries: [],
	json_tmp: "",
	dir: "",
	subdir: "",
	editor_text: "",
	zoom_arr: ['no zoom', 'zoom'],
	
	get_fname: function(i){                                              //consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return document.getElementById('fileid_'+this.iter.toString()+'_name').innerHTML; 
	},
	get_fid: function(i){                                                //consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return 'fileid_'+i.toString(); 
	}, 
	get_felem: function(i){                                              //consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return document.getElementById(this.get_fid(i));
	},
	get_felem_pic: function(i){                                          //consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		return document.getElementById(this.get_fid(i)+'_pic');
	},
	get_ftype: function(i){                                              //consolelog_func('brown');
		if (i===undefined) {i=this.iter;} 
		var type = "";
		var elem = document.getElementById(this.get_fid(i));
		if (elem) { type=elem.getAttribute('title'); }
		return type;
	},
}                                                        

//-- start ---------------------------------------------------------------
if (localStorage.getItem("isset")!="true"){
	localStorage.setItem("isset", "true");
	localStorage.setItem("copy_fname", "");
	localStorage.setItem("copy_fdir", "");
	localStorage.setItem("show_welcome", "yes");
	localStorage.setItem("run", "1");
}else{
	localStorage.setItem("show_welcome", "no");
}
window.onbeforeunload = files_beforunload;

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

files_click_ajax("ffiles_run_submit", true);

//-- run functions -------------------------------------------------------

function files_click_ajax(submit_name, start) {                                 consolelog_func('brown');
	if (start==undefined) { start=false; }

	var return_data = '';                                                console.log(' POST ');
	var url = "files.php";   
	var hr = new XMLHttpRequest();
	hr.open("POST", url, true);
	hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	hr.onreadystatechange = function(){
		console.log('state: '+hr.readyState+' '+hr.status);
		if (hr.readyState ==4 && hr.status == 200){
			var return_data = hr.responseText;
			//console.log('RETURN: '+return_data);
			files.json_tmp = return_data;
			files_run(start);
	}} 
	console.log('ITER: '+files.iter);
	
	var send_var = "ffiles_iter="+files.iter;
	send_var    += "&"+submit_name+"=" +document.getElementById(submit_name).value;
	send_var    += "&ffiles_edit_text="+document.getElementById("ffiles_edit_text").value;
	send_var    += "&ffiles_username=" +document.getElementById("ffiles_username").value;
	send_var    += "&ffiles_userpass=" +document.getElementById("ffiles_userpass").value;
	send_var    += "&ffiles_copyfname_text="+document.getElementById("ffiles_copyfname_text").value;
	send_var    += "&ffiles_copyfdir_text=" +document.getElementById("ffiles_copyfdir_text").value;
	hr.send(send_var);
	
	if (submit_name=="ffiles_enter_submit" ){
		if (files.get_ftype()!=="dir") { window.location.href = '/reader.html'; }
		else {
			files.iter = 0; 
			files.iter_prev = 0;
	}}
}

function files_run(start){                                               consolelog_func('darkblue'); 
	if (start==undefined) { start=false; }
	
	var files_arr = JSON.parse(files.json_tmp);                          console.log(files_arr);
	
	files.dir = files_arr.usr_dir;                                       console.log('dir: '+files.dir);
	files.entries = files_arr.entries;
	files.nentry = files_arr.entries.length-1;
	files.nfolders = files_arr.nfolders;
	
	files.subdir = get_subdir(files.dir+'/');  
	document.getElementById('content_box').style.top = '-3.4%';
	
	if (start){
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
	}                                                                                                
	
	files_show_buttons();                                                
	common_set_fontsize(common.f_fontsize_scale, files);                                                                                                             
	common.style.resize();
	files_show_files();
	files_scroll(files.iter, 'no'); 
	files_set_zoom('no'); 
}                                                                        

//-- show buttons ---------------------------------------------------------------------------
function files_resize(){                                                 consolelog_func("darkblue"); 
	common.style.resize();
	common_set_fontsize(common.f_fontsize_scale,files);
	files_show_buttons();
	files_show_files();
}

function files_show_buttons(){                                           consolelog_func();  
    var elem = document.getElementById('buttons_area');                  //console.log('files.iter: '+files.iter);
    var inner_e="";
    inner_e+= '<div id="files_menu"    onclick="files_show_menu();" '       +common.style.buttonpos(0,4)+'> menu </div>' ;
    inner_e+= '<div id="files_options" onclick="files_show_options();" '    +common.style.buttonpos(1,4)+'> opt </div>';
    inner_e+= '<div id="ffiles_enter_submit"   onclick="files_click_ajax(this.id);" '+common.style.buttonpos(2,2)+'>'+symbol_enter+'</div></div>';
    inner_e+= '<div id="files_login"   onclick="files_show_login();" '      +common.style.buttonpos(4,2)+'>'+'log in'+'</div>' ;
    inner_e+= '<div id="files_upload"  onclick="files_show_upload();" '     +common.style.buttonpos(5,2)+'>upload</div>' ;
    inner_e+= '<div id="files_prev"    onclick="files_scroll(this.id);" '   +common.style.buttonpos(3,4)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="files_next"    onclick="files_scroll(this.id);" '   +common.style.buttonpos(7,4)+'>'+symbol_next+'</div>' ;
    //inner_e+= '<div id="files_test"    onclick="clean_tmp();" '             +common.style.buttonpos(6,4)+'>clean_tmp</div>' ;
    //inner_e+= '<div id="files_python_button" class="buttons" onclick="files_click(10);"   style="'+reader_button_position(6)+'">py</div>';
    elem.innerHTML=inner_e;
         
}
function files_show_menu(){                                              consolelog_func();
	document.getElementById("ffiles_copyfname_text").value = localStorage.getItem("copy_fname");
    document.getElementById("ffiles_copyfdir_text").value = localStorage.getItem("copy_fdir"); 
	var inner_e = "";  var obj = 'files';
    inner_e += '<div id="common_lang_both_zoom"  onclick="" ' +common.style.buttonpos_menu(1,1,4,2,0,-1)+'>'+common.langbase+' +<br> '+common.lang+'</div>';
    inner_e += '<div id="common_lang_both"   onclick="common_show_lang(1)" '  +common.style.buttonpos_menu(2,0)+'>lang</div>';
    inner_e += '<div id="files_create"   onclick="files_show_create();" '     +common.style.buttonpos_menu(7,0)+'>new file</div>';
    inner_e += '<div id="files_zoom"     onclick="files_set_zoom();" '        +common.style.buttonpos_menu(3,0)+'>'+files.zoom_arr[files.zoom]+'</div>';
    inner_e += '<div id="files_cleancookie" onclick="files_cleancookie();" '  +common.style.buttonpos_menu(0,0)+'> delete cookie </div>';
    inner_e += '<div id="files_past"     onclick="files_past();" '            +common.style.buttonpos_menu(5,0)+'> past </div>';
    inner_e += '<div id="files_clickdelay" onclick="common_show_clickdelay();" '   +common.style.buttonpos_menu(4,0)+'> click delay </div>';
    inner_e += '<div id="files_fontsize" onclick="common_show_fontsize('+obj+');" '+common.style.buttonpos_menu(6,0)+'> font size </div>';
    //inner_e += '<div id="files_sound"    onclick="" '+common.style.buttonpos_menu(4,3)+'> sound </div>';
    common_create_menu('files_menu', 0, inner_e);
}
function files_show_create(){                                            consolelog_func();
	var inner_e = "";
    inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_create_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">file name</div></div>';    
    inner_e += '<div id="ffiles_createtxt_submit" onclick="files_click_ajax(this.id);" '+common.style.buttonpos_menu(6,0)+'>create txt</div>';
    inner_e += '<div id="ffiles_createdir_submit" onclick="files_click_ajax(this.id);" '+common.style.buttonpos_menu(4,0)+'>create dir </div>';
    common_create_menu('files_create', 1, inner_e);
}
function files_show_options(){                                           consolelog_func();
    var fname = files.get_fname();
    var text = fname;
    if (fname.lastIndexOf('.')!=-1) { text = fname.substring(0, fname.indexOf('.')); }
    files.editor_text = text;
    var inner_e = ""; 
    inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_options_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom">'+text+'</div></div>';
    inner_e += '<div id="ffiles_delete_submit"    onclick="files_click_ajax(this.id);" ' +common.style.buttonpos_menu(4,0)+'> delete </div>';
    inner_e += '<div id="ffiles_edit_submit"      onclick="files_click_ajax(this.id);" ' +common.style.buttonpos_menu(7,0)+'> edit name </div>';
    inner_e += '<div id="ffiles_cleanhtml_submit" onclick="files_click_ajax(this.id);" ' +common.style.buttonpos_menu(5,0)+'> html to txt </div>';
    inner_e += '<div id="files_download"  onclick="files_download();"  '        +common.style.buttonpos_menu(3,0)+'> down- load </div>';
    inner_e += '<div id="files_copy"      onclick="files_copy();" '             +common.style.buttonpos_menu(6,0)+'>copy</div>';    
    common_create_menu('files_options', 0, inner_e);
    if (fname.indexOf('.html')==-1){files_disable('ffiles_cleanhtml_submit');}
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
    inner_e+= '<div id="files_usermail"     onclick="" '    +common.style.buttonpos_menu(7,3,4,3)+'> mail data </div>';
    common_create_menu('files_lodin', 0, inner_e);
}
function files_show_addcontact(){                                        consolelog_func();
	if (get_usrname(files.dir)=="guests"){
		common_show_notification('You need to log in to add contact.');
	}else{
		var inner_e="";
		inner_e += '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_addmail_edit" onclick="files_edittext(this.id);" class="text_zoom menu_zoom"> new contact </div></div>';
		inner_e += '<div id="ffiles_addmail_submit"      onclick="files_click_ajax(this.id);" '+common.style.buttonpos_menu(4,0)+'> add contact </div>';
		common_create_menu('files_addmail', 0, inner_e);
	}
}
function files_show_upload(){                                            consolelog_func();
    var inner_e = "";
    inner_e+= '<div '+common.style.buttonpos_menu(0,2)+'><div id="files_upload_name" onclick="" class="text_zoom menu_zoom"></div></div>';
    inner_e+= '<div id="files_upload_choose"  onclick="files_upload(this.id);" '+common.style.buttonpos_menu(4,0)+'>choose file</div>';
    inner_e+= '<div id="files_upload"         onclick="files_upload(this.id);" '+common.style.buttonpos_menu(6,0)+'>upload file</div>';
    common_create_menu('files_upload_area', 0, inner_e);
    document.getElementById('ffiles_upload_choose').onchange = uploadOnChange;
    
    var form = document.getElementById('form_upload');
    var fileSelect = document.getElementById('ffiles_upload_choose');
    var uploadButton = document.getElementById('ffiles_upload_submit');

    form.onsubmit = function(event) {
        event.preventDefault();
        var files = fileSelect.files;
        var formData = new FormData();
        var file = files[0]; 
        
        formData.append('ffiles_upload_choose', file, file.name);
        formData.append('ffiles_upload_submit', 'new');
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'files.php', true);
		xhr.onreadystatechange = function(){
			console.log('UPLOAD state: '+xhr.readyState+' '+xhr.status);
			if (xhr.readyState ==4 && xhr.status == 200){
				var return_data = xhr.responseText;
				files.json_tmp = return_data;
				//console.log('UPLOAD RETURN: '+files.json_tmp);
				files_run();
				files_click_ajax("ffiles_enter_submit", true);
			}
		} 
        xhr.send(formData);
    }  
}
function files_upload(id){
	var names = {"files_upload": "ffiles_upload_submit", 
		         "files_upload_choose": "ffiles_upload_choose"} 
	document.getElementById(names[id]).click(); 
}
function uploadOnChange() {                                              consolelog_func("darkblue");
    var filename = this.value;                                           
    var lastIndex = filename.lastIndexOf("\\");
    if (lastIndex >= 0) {
        filename = filename.substring(lastIndex + 1);
    }
    document.getElementById('files_upload_name').innerHTML = filename;
}

//-- text display functions ---------------------------------------------------------------
function files_show_files(){                                             consolelog_func();
	var files_arr = files.entries;
	
	var wratio = window.innerWidth/window.innerHeight;                   console.log('wratio: '+wratio+' '+window.innerWidth+' '+window.innerHeight);              
	var left_pc = -1; 
	var top_pc=-5.4; 
    var ywidth_pc=22; var yspace_pc=3.7;
    
    var content_width = common.style.get_content_width()/wratio/100*window.innerWidth; 
    var ywidth = ywidth_pc*window.innerHeight/100; 
    var yspace = yspace_pc*window.innerHeight/100;
    var top  = top_pc*window.innerHeight/100;
    var left = left_pc*window.innerWidth/100;
    
    var xwidth = ywidth*1;
    var xspace = yspace*0.8;
                                                          
    var xn = Math.floor((content_width-xspace*2)/(xspace+xwidth));       //console.log('xn: '+xn);	          
    if (xn<1){xn=1};
    var ratio = ( content_width - xwidth*xn )/(xspace*(xn+1.5));
    var pic_width = 0.6*xwidth;                                          //console.log('xwidth: '+xwidth+' ratio: '+ratio);
    xspace = xspace*ratio;
    var i=0; var type=''; 
    var inner_e = "";
	for (i=0; i<files_arr.length; i+=1){                                 
		var n_y = (i-i%xn)/xn;
	    var x = left+ xspace + (xspace+xwidth)* (i%xn);
	    var y = top + (ywidth+yspace)*n_y;  
	    
	    if (i<files.nfolders) { 
			symbol = symbol_folder; 
			title = "dir";
		} else { 
			symbol = symbol_file; 
			title = "txt";
		}
		var style = 'position:absolute;top:'+y+'px; left:'+x+'px; height:'+ywidth+'px; width:'+xwidth+'px;';
		inner_e+= '<div id="fileid_'+i+'" onclick="files_scroll('+i+');"  class="files" style="'+style+'" title="'+title+'" >';
		inner_e+= '<div id="fileid_'+i+'_pic"  class="files_symbol" >'+symbol+'</div>';
		inner_e+= '<div id="fileid_'+i+'_name"  class="files_name" >'+files.entries[i]+'</div> </div>' ;
	}
	document.getElementById('files_array').style.visibility = 'visible';
	document.getElementById('files_array').innerHTML = inner_e;          //console.log(inner_e);
	common_set_fontsize(common.f_fontsize_scale, files);
	
	if (files.subdir=='mail'){                                           //console.log(files.subdir);                        
        var id = 'fileid_'+files.nentry;                                    
        document.getElementById(id).onclick=function() { files_show_addcontact(); } 
        document.getElementById(id+'_pic').innerHTML = symbol_addcontact;
	    document.getElementById(id+'_name').innerHTML = "add contact";    
	}
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
    if (elem) { elem.value = files.iter; } 
    
    console.log('scroll iter: '+files.iter+' | '+files.iter_prev);
    files.get_felem(files.iter).className = 'files-hover';
    if (files.iter_prev != files.iter) {
		files.get_felem(files.iter_prev).className = 'files';
	}
    //files.get_felem_pic(files.iter).className = 'files_symbol sdymbol_txt_hover';
    
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
        document.getElementById('content_box').style.height = '105%';  
    }else{
        elem.style.visibility='visible';
        document.getElementById('content_box').style.height = common.style.textheight_zoom+'%'; 
    }                                                                    
    var name = files.zoom_arr[files.zoom];                               
    elem = document.getElementById('files_zoom'); 
    document.getElementById('zoom_box').style.height = (100 - common.style.textheight_zoom -2.3)+'%';
    document.getElementById('zoom_box').style.top = (common.style.textheight_zoom +3)+'%';
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
                files_click_ajax("ffiles_userlogin_submit");
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
		files_click_ajax("ffiles_userlogin_submit");
	}
    utter(newlogin_messages_en[user_access],0,0,0);
}
function loadDoc(url1, login_function) {                                 //consolelog_func();
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {                              //consolelog_func();
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
    files_click_ajax("ffiles_userlogin_submit");
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
    inner_e = elem.innerHTML;                                            console.log(fname+' | '+files.dir);
    inner_e+= '<a id="link_download" href="'+files.dir+'/'+fname+'" download>'+fname+'</a>';
    elem.innerHTML = inner_e;
    var link = document.getElementById("link_download");
    link.click();
    elem.removeChild(link);
}
function files_copy(){                                                   consolelog_func();
    localStorage.setItem("copy_fname", files.get_fname());
    localStorage.setItem("copy_fdir", files.dir);
}
function files_past(){                                                   consolelog_func();
    document.getElementById("ffiles_copyfname_text").value = localStorage.getItem("copy_fname");
    document.getElementById("ffiles_copyfdir_text").value = localStorage.getItem("copy_fdir"); 
    //document.getElementById("ffiles_past_submit").click(); 
    files_click_ajax("ffiles_past_submit");
}

//------------------------------------------------------------------------

function files_beforunload() {                                           consolelog_func();
	common.cookie_save.call(files); 
	common.cookie_save(); 
}
function files_cleancookie(){                                            consolelog_func();
	cookie_delete_all(); 
	window.location.href = '/index.html'; 
}

function files_welcome(){
	var text = "Hi! <br>This website helps people to read and write. <br><br>";
	text+=     "Check 'readme.txt' file for details. ";
	text+=     "You will see it after closing this window. ";
	text+=     "To open the file click on the file icon and 'check' button to the right. ";
	common_show_notification(text, true);
	//utter_sentence(0, 1, 0, 1);
}

function clean_tmp(){
	//window.location.href = '/script/cron.php';
	//document.getElementById('ffiles_test_submit').click(); 
	files_click_ajax("ffiles_test_submit");
}

