
console.log(document.title);
//-- reader variables ----------------------------------------------------------------
var reader = {
    latest_w: "p0s0w0", latest_s: "p0s0", latest_p: "p0",
    id_prev: "p0s0w0",
    id_curr: "p0s0w0",
    ischanged_text: false,
    ineditor: false,
    iter: 0,
    selecttype: 2,
    zoomtype: 0,
    
    text_origin: "",
    editor_text: "",
    editor_iter: 0,
    mailtext: "",
    cookie_number: 14,
    
    fname: "",
    readonly: false,
    subdir: "",
    cookie_suffix: "_",
    name: 'reader',
    text_parsed: "",
    word_id: [], sentence_id: [], paragraph_id: [],
    mailnum: 0,
    navigate: 0,
    
    zoomtype_arr: ['no zoom', 'by word', 'by sentence'],
    buttons_php: { "reader_save": "freader_save_submit", 
		           "reader_sendmail": "freader_sendmail_submit"
		           },
	click_php: function(id) {                                            consolelog_func('brown'); 
		document.getElementById(this.buttons_php[id]).click(); 
	},
    get_id_array: function(){                                            consolelog_func('brown'); 
        var id_arr = [];
        if (this.selecttype == 1){ id_arr=this.sentence_id; }    
        else if (this.selecttype == 2){ id_arr=this.paragraph_id; }    
        else if (this.selecttype == 0){ id_arr=this.word_id; }                      
        return(id_arr);
    },
    get_id: function(){                                                  consolelog_func('brown'); 
        var latest_id;
        var id_arr = this.get_id_array();                                         
        if (this.iter==-1){ latest_id='file_title'; }
        else{ latest_id = id_arr[this.iter]; }                              
        return(latest_id);
    },
    get_id_backup: function(){                                           consolelog_func('brown'); 
        var latest_id;
        if (this.selecttype == 0){ latest_id=this.latest_w; }    
        else if (this.selecttype == 1){ latest_id=this.latest_s; }    
        else if (this.selecttype == 2){ latest_id=this.latest_p; }    
        return(latest_id);
    },
    
}
function reader_beforunload() {                                          consolelog_func(); 
	common.cookie_save.call(reader); 
	common.cookie_save(); 
}

//-- run reader ---------------------------------------------------------------------
window.onbeforeunload = reader_beforunload;
reader.fname = document.getElementById('file_title').innerText.replace(' ','');
reader.cookie_suffix = "_"+reader.fname;
reader.readonly = is_inlist(readonlydir);
reader.subdir = get_subdir(reader.fname);   

if (cookie_get('isset_'+reader.fname)!='isset'){                    
    cookie_set("isset_"+reader.fname, "isset");
    common.cookie_save.call(reader);
}else{ common.cookie_load.call(reader); }                            
common.cookie_load();

reader_run();   

function reader_run() {                                                  consolelog_func('darkblue'); 
    var subdir = reader.subdir;                                          consolelog('ischanged_text: '+reader.ischanged_text+', editor_text: '+reader.editor_text);
    var fname = common_make_fname(reader.fname);
    document.getElementById('file_title').innerHTML = '<em style="color:#008000;opacity:0.6;">'+fname[0]+'/ </em>'+fname[1]+'</em>';
    
    if (reader.ischanged_text==false){
        reader_show_buttons();                                             
        create_element('zoom_box','text_zoom_box', 'base_elements');
        document.getElementById("zoom_box").innerHTML = '<div id="reader_zoom" class="text_zoom">zoom word</div>'
        document.getElementById("base_elements").appendChild(document.getElementById("content_box"));
    }
    if (subdir==='mail' && reader.ischanged_text==false){
        var user_name = get_usrname(reader.fname).replace(" ",""); 
        var contact_name=reader.fname.substr(reader.fname.lastIndexOf('/')+1).replace(" ",""); 
        
        var mail_arr = reader_get_mailarr();                            
        var text = "", class_i="", name_i="", i=0;
        for (i=0; i<mail_arr.length; i+=1){                              
            name_i = mail_arr[i][1].toString().replace(" ","");          
            if (name_i==user_name) {class_i = 'mail mail_out'; }
            if (name_i==contact_name) {class_i = 'mail mail_in'; }       
            text+= '<div title="void_div" class="mail mail_space">  </div>';    
            text+= '<div title="'+name_i+'" class="'+class_i+' mail_title" >from ' +name_i+', '+mail_arr[i][2]+'</div>';
            text+= '<div title="'+name_i+'" class="'+class_i+'">'+mail_arr[i][3]+'</div>';               
        }
        var msg = document.getElementById('hidden_mail_msg').innerHTML;
        text+= '<div title="void_div" class="mail mail_space">  </div>'; 
        text+= '<div title="'+user_name+'" class="mail mail_out mail_title" >from ' +user_name+', new </div>';
        text+= '<div title="'+user_name+'" class="mail mail_out mail_temp" id="mail_editable">'+msg+'</div>';         
        text+= '<div title="void_div" style="position:relative;height:11vh;">  </div>'; 
       
        document.getElementById('hidden_text').innerHTML=text;       
    }
    
    reader_text();                                                      
    reader_set_selecttype(order=0);                                  
    reader_set_zoomtype(reader.zoomtype);                                       
    common_set_fontsize(common.fontsize, common);
    if (subdir==='mail'){
        reader.iter = reader.get_id_array().length-1;                  
        reader_highlite(); 
        scroll_to(reader.get_id(),'content_box', title=0);
	}
    
}

function reader_text(){                                                  consolelog_func(); 
    var subdir=reader.subdir;                                            consolelog('subdir: '+subdir+', editor_text: '+reader.editor_text+', ischanged_text: '+reader.ischanged_text);
    var text = "", text_parsed = "";
    var parser = [];
    if (reader.ischanged_text==false){
        text = document.getElementById('hidden_text').innerHTML;         
        parser = reader_parse_html(text);
        text_parsed = parser[0];                                         
        reader.word_id=parser[1]; reader.sentence_id=parser[2]; reader.paragraph_id=parser[3];
                                                                        
        document.getElementById('text_from_file').innerHTML = text_parsed;  
        reader.text_origin = text;
        reader.text_parsed = text_parsed;
    }else{
        if (subdir==='mail'){                                           
            text_parsed = $('#text_from_file').find('#mail_editable').html();     
        }else{
            text_parsed = reader.text_parsed;
        }
        reader.id_curr = reader.get_id();                                
        text = reader.editor_text;                                       
        document.getElementById('temp').innerHTML = text_parsed;         
        var id = reader.id_curr;                                         
        document.getElementById(id).innerHTML = text;                 
        
        var text_all_parsed = document.getElementById('temp').innerHTML; 
        var text_all_origin = merge_text(text_all_parsed);               
    
        reader.ischanged_text = false;
        reader_save(text_all_origin);
    }
}                   

function reader_save(text){                                              consolelog_func(); 
        document.getElementById('freader_save_text').value = text; 
        document.getElementById('freader_save_submit').click();          
}
 
//-- reader scroll functions -------------------------------------------------------------------
 
function reader_scroll(order,stop,onend){                                consolelog_func('darkblue'); 
    iter = reader.iter;
    n_select_type = reader.selecttype;
    id_arr = reader.get_id_array();
    max_iter = id_arr.length;
    if (order==1 && iter < max_iter-1 ) { iter += 1; }
    else if (order==0 && iter > -1) { iter -=1; } 
    if (iter==-1){ id='file_title'; } 
    else { id=id_arr[iter]; }
    reader.iter = iter;
    reader.id_curr = id;                                                

    if (id_arr.length-1===iter){onend=0;}
    
    if (iter==-1){
        reader.latest_w  = id;
        reader.latest_s  = id;
        reader.latest_p  = id;
    }
    if ((order==1|| order==0) && iter>-1){
        if (n_select_type==0){ 
            reader.latest_w = id;
            reader.latest_s = id.substr(0,4);
            reader.latest_p = id.substr(0,2);
        } else if (n_select_type==1){ 
            reader.latest_w = id+"w0";
            reader.latest_s = id;
            reader.latest_p = id.substr(0,2);
        } else if (n_select_type==2){ 
            reader.latest_w = id+"s0w0";
            reader.latest_s = id+"s0";
            reader.latest_p = id;
            }
    }
    reader_utter(stop_i=stop, onend); 
    reader_highlite(); 
    scroll_to(id,'content_box', title=0);                   
    //scroll_to(id,'text_zoom_box',title=1); alert('scroll 2');
    reader_fill_zoom();  
    
    var subdir=reader.subdir; 
    var mail_notedit = false;
    if(subdir==='mail' && $('#'+id).parents('#mail_editable').length === 0) { mail_notedit=true; } 
    
    if (iter==-1 || mail_notedit===true){ edit_function = ''; edit_class='buttons disabled'; 
        document.getElementById('reader_edit').className='buttons symbol disabled';
        document.getElementById('reader_edit').setAttribute( "onclick", '' );
    } else {
        document.getElementById('reader_edit').className='buttons symbol';
        document.getElementById('reader_edit').setAttribute( "onclick", 'reader_editor(reader_edit)' );
    }
}    
function reader_utter(stop_i, onend) {                                   consolelog_func(); 
    id = reader.get_id();
    iter = reader.iter;
    n_select_type = reader.selecttype;
    if (n_select_type==0 || iter==-1 ){ utter(document.getElementById(id).innerText, stop=stop_i, onend); }
    else {
        if (n_select_type==2){ 
            first_iter = reader.sentence_id.indexOf(id+'s0');                  
            if ( iter==reader.paragraph_id.length-1 ){ last_iter=reader.sentence_id.length; }
            else { last_iter = reader.sentence_id.indexOf(reader.paragraph_id[iter+1]+'s0'); }  
            sentence_id_part = reader.sentence_id.slice(first_iter,last_iter);  
            utter_paragraph(id, sentence_id_part, reader.word_id, stop_i, onend); 
             
        }
        if (n_select_type==1){ 
			var text = document.getElementById(id).innerText;
			utter_sentence(text, stop_i, onend); 
		}
    }
}
function reader_fill_zoom(){                                             consolelog_func(); 
    var n_zoom_type = reader.zoomtype;
    var text='empty';
    if (n_zoom_type==1){
        text = document.getElementById(reader.latest_w).innerHTML;
    }else if (n_zoom_type==2){
        text = document.getElementById(reader.latest_s).innerHTML;
    }                                                                    
    var elem=document.getElementById('reader_zoom');
    elem.innerHTML=text;                                              
}
function reader_highlite(){                                              consolelog_func(); 
    var id_prev = reader.id_prev;                                    
    var id = reader.get_id();                                         
    var elem = document.getElementById(id_prev);
    if (elem){
		elem.className='text';
    }
    div = document.getElementById(id);                              
    div.className='text_highlite';                                 
    reader.id_prev = id;
}

//-- reader play ----------------------------------------------------------------------------------

function reader_play_pause(){                                            consolelog_func(); 
    if (common.play_counter==0){                                       
        window.speechSynthesis.resume(); 
        document.getElementById('playpause').innerHTML=symbols_play_pause[1];
        common.play_counter=1; 
        }
    else if (window.speechSynthesis.speaking ){                        
		if (common.browser!='Firefox'){
			window.speechSynthesis.pause();       
		} else{ window.speechSynthesis.cancel();  }
        document.getElementById('playpause').innerHTML=symbols_play_pause[0];
        common.play_counter=0; 
    }
    else{reader_utter(1, 0); common.play_counter=1;}
}
//-- reader menu functions -----------------------------------------------------------

function reader_set_selecttype(order, settype){                          consolelog_func(); 
	if (settype===undefined){settype=0;}
    n_select_type = reader.selecttype;
    types = ['select <br> -','select <br> - -','select <br> - - -'];
    if (settype==1){
        n_select_type = (n_select_type+1)%3;
        reader.selecttype = n_select_type;
        id_arr = reader.get_id_array();  latest_id = reader.get_id_backup();      
        reader.iter = id_arr.indexOf(latest_id);
    }else if (settype==2){
		n_select_type = order;
		reader.selecttype = n_select_type;
        id_arr = reader.get_id_array();  latest_id = reader.get_id_backup();      
        reader.iter = id_arr.indexOf(latest_id);
		}        
    reader_highlite(); reader_fill_zoom();                           
    id=reader.get_id(); 
    reader.id_curr = id;                                              
    document.getElementById('reader_selecttype').innerHTML=types[n_select_type];
}

function reader_set_zoomtype(n_zoomtype){                                consolelog_func(); 
    reader.zoomtype = n_zoomtype;
    var bodyStyles = window.getComputedStyle(document.body);
    textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
    var elem = document.getElementById("zoom_box");              
    if (n_zoomtype==0){ 
        elem.style.visibility='hidden';
        document.getElementById('content_box').style.height = '100%'; 
    }else{
        elem.style.visibility='visible';
        document.getElementById('content_box').style.height = common.style.textheight_zoom+'%'; 
    }                                                                    
    reader_fill_zoom();                                                   
    elem = document.getElementById('reader_zoomtype_zoom');
    if (elem){ elem.innerHTML=reader.zoomtype_arr[n_zoomtype]; }
    elem = document.getElementById('reader_menu_zoomtype_text');
    if (elem){ elem.innerHTML=reader.zoomtype_arr[n_zoomtype]; }          
    common.style.resize();
    document.getElementById('zoom_box').style.height = (100 - common.style.textheight_zoom-2)+'%';
    document.getElementById('zoom_box').style.top = (common.style.textheight_zoom +0.2)+'%';
}
    
//-- buttons -------------------------------------------------------------------------
function reader_resize(){                                                consolelog_func(); 
	reader_show_buttons();
	common.style.resize();
}

function reader_show_buttons(){                                          consolelog_func(); 
    iter = reader.iter;
    if (iter==-1 || reader.readonly){ edit_function = ''; edit_class='buttons symbol disabled'; }
    else { edit_function='onclick="reader_editor(reader_edit);"'; edit_class='buttons symbol'; }
    
    elem = document.getElementById('buttons_area');
    inner_e = '<div id="reader_menu" onclick="reader_show_menu();" '+common.style.buttonpos(0,4)+'>menu</div>' ;
    inner_e+= '<div id="reader_edit" class="'+edit_class+'" '+edit_function+' '+common.style.buttonpos(1,2)+'>edit</div>' ;
    inner_e+= '<div id="reader_selecttype" onclick="reader_set_selecttype(1,1);" '+common.style.buttonpos(5,4)+'>word</div>' ;
    inner_e+= '<div id="prev" onclick="reader_scroll(0,1,0);" '+common.style.buttonpos(3,4)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="next" onclick="reader_scroll(1,1,0);" '+common.style.buttonpos(7,4)+'>'+symbol_next+'</div>' ;
    
    //inner_e+= '<div id="reader_speed"     class="buttons" onclick=""  style="'+reader_button_position(4)+'">'+symbol_speed+'</div>' ;
    inner_e+= '<div id="playpause"   onclick="reader_play_pause();"    ' +common.style.buttonpos(6,4)+'>'+symbol_play+'</div>' ;
    inner_e+= '<div id="reader_navigate"   onclick="reader_show_navigate()" ' +common.style.buttonpos(2,4)+'>'+symbol_up_down+'</div>' ;
    
    var subdir = reader.subdir; 
    if (subdir==='mail'){
		inner_e+= '<div id="reader_mail" onclick="reader_show_mail();" '+common.style.buttonpos(4,2)+'>'+symbol_mail+'</div>' ;
	}else{
		inner_e+= '<div id="readall"     onclick="reader_scroll(-1,1,1);"  '+common.style.buttonpos(4,4)+'>read all</div>' ;
	}
    elem.innerHTML=inner_e;
}
function reader_show_navigate(){                                         consolelog_func(); 
	elem = document.getElementById('nvigate_area');
	inner_e = '';
	inner_e+= '<div id="navigate_0" onclick="reader_navigate(0);" '+common.style.buttonpos_menu(4,0)+'> start </div>' ;
	inner_e+= '<div id="navigate_1" onclick="reader_navigate(0.5);" '+common.style.buttonpos_menu(6,0)+'> mid </div>' ;
	inner_e+= '<div id="navigate_2" onclick="reader_navigate(1);" '+common.style.buttonpos_menu(7,0)+'> end </div>' ;
    common_create_menu('reader_navigate', 0, inner_e);
}
function reader_navigate(order){                                         consolelog_func(); 
	var len = reader.paragraph_id.length;
	if (order===undefined){
		if (reader.navigate===0){
			reader.iter = 0;
		}else if (reader.navigate===1){
			reader.iter = (len-len%2)/2;
		}else if (reader.navigate===2){
			reader.iter = len-1;
		}
		reader.navigate = (reader.navigate+1)%3;
	}else{
		reader.iter = Math.floor(len*order);
		if (reader.iter==len){reader.iter = len-1;}                  
	}
	var id = reader.get_id();                                       
    reader.id_curr = id;
    reader_highlite(); 
    scroll_to(id,'content_box', title=0);
}
function reader_show_menu(){                                             consolelog_func(); 
    var n_zoom = reader.zoomtype; var obj='common';
    inner_e = '';
    inner_e+= '<div id="reader_fontsize"        onclick="common_show_fontsize('+obj+');" '+    common.style.buttonpos_menu(0,0)+'> font size </div>';    
    inner_e+= '<div id="reader_menu_sound"      onclick="" ' +common.style.buttonpos_menu(4,3)+'>sound</div>';
    inner_e+= '<div id="common_lang_both_zoom"  onclick="" ' +common.style.buttonpos_menu(1,1,4,2,0,-1)+'>'+common.langbase+' +<br> '+common.lang+'</div>';
    inner_e+= '<div id="common_lang"            onclick="common_show_lang(1);" '+common.style.buttonpos_menu(2,0)+'>lang</div>';
    inner_e+= '<div id="reader_go"              onclick="" '+common.style.buttonpos_menu(3,3)+'>go</div>' ;
    inner_e+= '<div id="reader_menu_go-files"   onclick="goto_files();" '+common.style.buttonpos_menu(7,0)+'">go home</div>';
    inner_e+= '<div id="reader_menu_zoomtype_text" '+common.style.buttonpos_menu(5,1,4,2,0,-1)+'>'+reader.zoomtype_arr[n_zoom]+'</div>' ;
    inner_e+= '<div id="reader_menu_zoomtype"   onclick="reader_show_zoomtype();" '+common.style.buttonpos_menu(6,0)+'>zoom</div>' ;
    common_create_menu('reader_menu', 0, inner_e);
}
function reader_show_zoomtype(){                                         consolelog_func(); 
    n_zoom = reader.zoomtype;
    inner_e = '<div id="reader_zoomtype_zoombox" '+common.style.buttonpos_menu(0,2)+'><div id="reader_zoomtype_zoom" class="text_zoom menu_zoom">'+reader.zoomtype_arr[n_zoom]+'</div></div>';
    inner_e+= '<div id="0"   onclick="reader_set_zoomtype(this.id)" '+common.style.buttonpos_menu(4,0)+'> no zoom </div>';
    inner_e+= '<div id="1"   onclick="reader_set_zoomtype(this.id)" '+common.style.buttonpos_menu(5,0)+'> by word </div>';
    inner_e+= '<div id="2"   onclick="reader_set_zoomtype(this.id)" '+common.style.buttonpos_menu(6,0)+'> by sentence </div>';
    common_create_menu('reader_zoomtype', 1, inner_e);
}
function is_inlist(list){                                                consolelog_func(); 
    inlist = false;
    fname_i = document.getElementById('file_title').innerText; 
    for (i=0; i<list.length; i++){ 
		if (fname_i.indexOf(list[i])==fname_i.indexOf('/')){inlist = true;} 
    }
    return(inlist);
}
function goto_files(){                                                   consolelog_func(); 
	window.location.href = '/index.php'; 
	window.speechSynthesis.cancel(); 
}

function reader_editor(){                                                consolelog_func("darkblue"); 
    text_all = document.getElementById('text_from_file').innerHTML;
    reader.text_parsed = text_all;
    id = reader.get_id();
    text = document.getElementById(id).innerHTML;
    text_plane = merge_text(text); 
    reader.ineditor = true;                                    
    editor_run('reader', text_plane);
}

//-- mail --------------------------------------------------------------------

function reader_if_editable(){                                           consolelog_func(); 
    id = reader.latest_p;
    title = document.getElementById(id).getAttribute('title');          
    if (parse_words(title).indexOf('editable')!=-1){editable=true;}
    else {editable=false;}
    return(editable);
}


function reader_show_mail(){                                             consolelog_func(); 
    var inner_e = '';
    inner_e += '<div id="reader_sendmail" onclick="reader.click_php(this.id);" '+common.style.buttonpos_menu(4,0)+'> send mail </div>';
    inner_e += '<div id="reader_refresh"  onclick="reader_refresh();" '         +common.style.buttonpos_menu(6,0)+'> refresh </div>';
    common_create_menu('reader_mail', 0, inner_e);
    
    var username = get_usrname(reader.fname);                          
    var date = Date(); 
    date = date.substr(date.indexOf(' '));                              
    date = date.substr(0,date.indexOf('GMT')-1);
    var text = $('#text_from_file').find('#mail_editable').html();    
    text = merge_text(text);                                      
    var m_num = "|m_n_u_m|", m_from="|m_f_r_o_m|", m_time="|m_t_i_m_e|", m_text="|m_t_e_x_t|";
    text = m_num+reader.mailnum+m_from+username+m_time+date+m_text+text ;                  
    document.getElementById('freader_save_text').value=text;  
}
function reader_refresh() {                                              consolelog_func(); 
	window.location.href = '/reader.php';
}

function reader_get_mailarr(){                                           consolelog_func(); 
    var archive = document.getElementById('hidden_mail_archive').innerHTML;  
    if (archive.toString().replace(" ","")=="") {return [];}
    
    var mail_arr = [];
    
    var m_num = "|m_n_u_m|", m_from="|m_f_r_o_m|", m_time="|m_t_i_m_e|", m_text="|m_t_e_x_t|";
    var proceed=true, i=0, i_start=0, i_end=0;
    i = archive.indexOf(m_num);
    while (proceed){
        i_end = archive.indexOf(m_num,i+1);
        i_start = i;
        if (i_end===-1){i_end=archive.length; proceed=false;}
        else{ i = i_end; }
        mail_arr.push(archive.substring(i_start, i_end));
    }                                                                    
                                                                        
    var msg=""; 
    for (i=0; i<mail_arr.length; i+=1){                                
        msg = mail_arr[i];                                               
        var mail_i = ['','','',''];
        mail_i[0] = parseInt( msg.substring( msg.indexOf(m_num) +m_num.length,  msg.indexOf(m_from) ) );
        mail_i[1] = msg.substring( msg.indexOf(m_from)+m_from.length, msg.indexOf(m_time) ).toString().replace(" ","");
        mail_i[2] = msg.substring( msg.indexOf(m_time)+m_time.length, msg.indexOf(m_text) );
        mail_i[3] = msg.substring( msg.indexOf(m_text)+m_text.length, msg.length );
        mail_arr[i] = mail_i;
    }                                                                  
    
    reader.mailnum = parseInt(mail_arr[mail_arr.length-1][0])+1;       
    return(mail_arr);
}
