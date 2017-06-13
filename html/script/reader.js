
var reader = {
    latest_w: "p0s0w0",
    latest_s: "p0s0",
    latest_p: "p0",
    id_prev: "p0s0w0",
    id_curr: "p0s0w0",
    ischanged_text: false,
    ineditor: false,
    
    iter: 0,
    selecttype: 2,
    zoomtype: 0,
    lang: "auto",                             
    
    text_origin: "",
    editor_text: "",
    editor_iter: 0,
    mailtext: "",
    cookie_number: 15,
    fname: "",
    cookie_suffix: "_",
    
    text_parsed: ""
    
}
reader.fname = document.getElementById('file_title').innerText.replace(' ','');
reader.cookie_suffix = "_"+reader.fname;

var word_id=[], sentence_id=[], paragraph_id=[];

//-- run reader ---------------------------------------------------------------------
//-----------------------------------------------------------------------------------
if (get_cookie('isset_'+reader.fname)!='isset'){        //alert('set_cookie');
	set_cookie("isset_"+reader.fname, "isset");
	common.cookie_save.call(reader);
} 
common.cookie_load.call(reader);                                                                 
window.onbeforeunload = common.cookie_save.call(reader);

function reader_clearcookie(){ document.cookie = "isset_"+reader.fname+"=0"; }

reader_run();

function reader_run() {                                                  //alert('reader_run');

    screen_height = window.screen.height+'px';
    screen_width = window.screen.width+'px';
    document.body.style.setProperty('--screen-height', screen_height);
    document.body.style.setProperty('--screen-width', screen_width);     //alert('reader 2');
    
    reader_show_buttons();                                               //alert('buttons');
    create_element('reader_zoom_box','reader_zoom_box', 'base_elements');
    document.getElementById("reader_zoom_box").innerHTML = '<div id="reader_zoom" class="text_zoom">zoom word</div>'
    document.getElementById("base_elements").appendChild(document.getElementById("text_from_file_box"));
    subdir=get_subdir(reader.fname);                                            
    name = get_usrname(reader.fname);                                           //alert('NAME: '+name);
    if (subdir=='mail'){
        var text_allmail = document.getElementById('hidden_mail_all').innerHTML; //alert('allmail: '+text_allmail);
        var text_i = document.getElementById('hidden_text').innerHTML;           //alert('newmail: '+text_i);
        document.getElementById('hidden_text').innerHTML=text_allmail+text_i;
        e=document.getElementsByName(name);
        for (i=0; i<e.length; i++){e[i].className='mail mail_out';}
        contact_name=reader.fname.substr(reader.fname.lastIndexOf('/')+1);             //alert('CONTACT: '+contact_name);
        e=document.getElementsByName(contact_name);
        for (i=0; i<e.length; i++){e[i].className='mail mail_in';}
    }
    
    reader_text();                                                       //alert(word_id); //alert(paragraph_id);
     
    /*                                                                     
    if (localStorage.getItem('back_to_editor')=='1' && ischanged=='0'){  //alert('reader');
        //document.getElementById('reader_menu').click();                //alert('menu');
        document.getElementById('reader_edit').click();                    
        localStorage.setItem('back_to_editor', '0');
    }
    */                                                                   //alert('reader 2');
    reader_select_type(order=0);                                         //alert('select_type');
    reader_set_zoomtype(0);                                              //alert('zoom_type');
     
}

function reader_text(){                                                  //alert(reader.editor_text);
    if (reader.ischanged_text==false){
        text_i = document.getElementById('hidden_text').innerHTML;
        parser = reader_parse_txt(text_i, 0);
        text_parsed = parser[0];                                         //alert('parsed 0 '+text_parsed);
        word_id=parser[1]; sentence_id=parser[2]; paragraph_id=parser[3];
                                                                         //alert('id_final '+sentence_id);
                                                                         //alert('id_final '+word_id+' '+sentence_id+' '+paragraph_id);
        document.getElementById('text_from_file').innerHTML = text_parsed;   //alert('parsed 1 '+text_parsed);
        reader.text_origin = text_i;
        reader.text_parsed = text_parsed;
    }else{
        text = reader.editor_text;
        text_parsed = reader.text_parsed;
        document.getElementById('temp').innerHTML = text_parsed;
        id = reader.id_curr;
        document.getElementById(id).innerHTML = text;                    //alert(text);
        
        text_all_parsed = document.getElementById('temp').innerHTML;     //alert('text_all_parsed '+text_all_parsed);
        text_all_origin = merge_text(text_all_parsed);                   //alert('merged');
        reader.text_origin = text_all_origin;
        
        parser = reader_parse_txt(text_all_origin, 0); 
        text_parsed = parser[0]; 
        word_id=parser[1];  sentence_id=parser[2]; paragraph_id=parser[3];
        document.getElementById('text_from_file').innerHTML = text_parsed;   //alert(text_parsed);
        reader.text_parsed = text_parsed;
        
        reader.ischanged_text = false;
        
        if (subdir=='mail'){
            name = get_usrname(reader.fname);                                   //alert('NAME: '+name);
            text = '<br><div id="mail_temp_title" title="'+name+'" class="mail mail_out mail_temp">'+name+', '+'</div>';
            text+= '<div id="mail_temp_text" title="'+name+'" class="mail mail_out">'+document.getElementById('mail_temp_text').innerHTML+'</div>';
            text=merge_text(text);
        }
        else{text=reader.text_origin;}                  //alert('SAVE: '+text);
        save_file(text);
    }
}                   


function save_file(text){
        document.getElementById('save_text_text_js').value = text; 
        document.getElementById('save_text_submit_js').click();          //alert('saved '+text);
    }
 
function reader_play_pause(){ 
    if (reader_play_counter==0){                                         //alert('paused');
        window.speechSynthesis.resume(); 
        document.getElementById('playpause').innerHTML=symbols_play_pause[1];
        reader_play_counter=1; 
        }
    else if (window.speechSynthesis.speaking ){                          //alert('speaking'); 
        window.speechSynthesis.pause(); 
        document.getElementById('playpause').innerHTML=symbols_play_pause[0];
        reader_play_counter=0; 
    }
    else{reader_utter(1, 0); reader_play_counter=1;}
}

function scrollbut_div(order,stop,onend){
    iter = reader.iter;
    n_select_type = reader.selecttype;
    id_arr = get_id_array();
    max_iter = id_arr.length;
    if (order==1 && iter < max_iter-1 ) { iter += 1; }
    else if (order==0 && iter > -1) { iter -=1; } 
    if (iter==-1){ id='file_title'; } 
    else { id=id_arr[iter]; }
    reader.iter = iter;
    reader.id_curr = id;
    
    if (iter==-1){
        //document.cookie = "latest_w_"+reader.fname+"="+id;
        //document.cookie = "latest_s_"+reader.fname+"="+id;
        //document.cookie = "latest_p_"+reader.fname+"="+id;
        reader.latest_w  = id;
        reader.latest_s  = id;
        reader.latest_p  = id;
    }
    if ((order==1|| order==0) && iter>-1){
        if (n_select_type==0){ 
            //document.cookie = "latest_w_"+reader.fname+"="+id;
            //document.cookie = "latest_s_"+reader.fname+"="+id.substr(0,4);
            //document.cookie = "latest_p_"+reader.fname+"="+id.substr(0,2);
            reader.latest_w = id;
            reader.latest_s = id.substr(0,4);
            reader.latest_p = id.substr(0,2);
        } else if (n_select_type==1){ 
            //document.cookie = "latest_w_"+reader.fname+"="+id+'w0';
            //document.cookie = "latest_s_"+reader.fname+"="+id;
            //document.cookie = "latest_p_"+reader.fname+"="+id.substr(0,2);
            reader.latest_w = id+"w0";
            reader.latest_s = id;
            reader.latest_p = id.substr(0,2);
        } else if (n_select_type==2){ 
            //document.cookie = "latest_w_"+reader.fname+"="+id+'s0w0';
            //document.cookie = "latest_s_"+reader.fname+"="+id+'s0';
            //document.cookie = "latest_p_"+reader.fname+"="+id;
            reader.latest_w = id+"s0w0";
            reader.latest_s = id+"s0";
            reader.latest_p = id;
            }
    }                                                                    //alert('iter: '+iter+' '+get_cookie("latest_w_"+fname)+'  '+get_cookie("latest_s_"+reader.fname)+'  '+get_cookie("latest_p_"+reader.fname));
    reader_utter(stop_i=stop, onend); 
    highlite(); 
    scroll_to(id,'text_from_file_box', title=0);                         //alert('scroll 1');
    //scroll_to(id,'reader_zoom_box',title=1); alert('scroll 2');
    zoom_set_text();  
    //n_zoom_type = parseInt(get_cookie('zoomtype_'+reader.fname));
    //if (n_zoom_type!=0){ scroll_to(id,'reader_zoom_box',title=1); zoom_set_text(); }
    //document.getElementById('word_i').value = document.getElementById(id).innerText; 
    //alert( document.getElementById(id).innerText );
    //reader_if_editable();
    if (iter==-1){ edit_function = ''; edit_class='buttons disabled'; 
        document.getElementById('reader_edit').className='buttons disabled';
        document.getElementById('reader_edit').setAttribute( "onclick", '' );
    } else {
        document.getElementById('reader_edit').className='buttons';
        document.getElementById('reader_edit').setAttribute( "onclick", 'reader_editor(reader_edit)' );
    }
}    
function reader_utter(stop_i, onend) {
    id = get_id();
    iter = reader.iter;
    n_select_type = reader.selecttype;
    lang = reader.lang;
    if (n_select_type==0 || iter==-1 ){ utter(document.getElementById(id).innerText, lang, stop=stop_i, onend); }
    else {
        if (n_select_type==2){ 
            first_iter = sentence_id.indexOf(id+'s0');                   //alert('first '+first_iter);
            if ( iter==paragraph_id.length-1 ){ last_iter=sentence_id.length; }
            else { last_iter = sentence_id.indexOf(paragraph_id[iter+1]+'s0'); }  //alert('last '+last_iter);
            sentence_id_part = sentence_id.slice(first_iter,last_iter);  //alert(sentence_id_part);
            utter_paragraph(id, sentence_id_part, word_id, lang, stop_i, onend); 
             
        }
        if (n_select_type==1){ utter_sentence(id, word_id, lang, stop_i, onend); }
    }
}

function zoom_set_text(){                                                //alert('zoom_set_text');
    var n_zoom_type = reader.zoomtype;
    var text='empty';
    if (n_zoom_type==1){
        text = document.getElementById(reader.latest_w).innerHTML;
    }else if (n_zoom_type==2){
        text = document.getElementById(reader.latest_s).innerHTML;
    }                                                                    //alert(text);
    var elem=document.getElementById('reader_zoom');
    elem.innerHTML=text;                                                 //alert('zoom_text '+text);
}
function highlite(){                                                     //alert('highlite');
    id_prev = reader.id_prev;
    id = get_id()                                                        //alert('highlite 0 id '+id +' id_prev '+id_prev);
    document.getElementById(id_prev).className='text';
    div = document.getElementById(id);                                   //alert('highlite div '+ div + ' id '+id +' id_prev '+id_prev);
    div.className='text_highlite';                                       //alert('highlite 2');
    reader.id_prev = id;
}


function get_id(){                                                       //alert('get_id()');
    var iter = reader.iter;
    var id_arr = get_id_array();                                             //alert(id_arr);
    if (iter==-1){ latest_id='file_title'; }
    else{ latest_id = id_arr[iter]; }                                    //alert('get_id() done');
    return(latest_id);
}function get_id_array(){                                                //alert('get_id_array()');
    var n_select_type = reader.selecttype;
    if (n_select_type == 1){ id_arr=sentence_id; }    
    else if (n_select_type == 2){ id_arr=paragraph_id; }    
    else if (n_select_type == 0){ id_arr=word_id; }                      //alert('get_id_array() done '+id_arr);
    return(id_arr);
}function get_id_backup(){                                               //alert('get_id_backup()');
    var n_select_type = reader.selecttype;
    if (n_select_type == 0){ latest_id=reader.latest_w; }    
    else if (n_select_type == 1){ latest_id=reader.latest_s; }    
    else if (n_select_type == 2){ latest_id=reader.latest_p; }    
    return(latest_id);
}

function reader_select_type(order){                                      //alert('select');
    n_select_type = reader.selecttype;
    types = ['select <br> .','select <br> . .','select <br> . . .'];
    if (order==1){
        n_select_type = (n_select_type+1)%3;
        reader.selecttype = n_select_type;
        id_arr = get_id_array();  latest_id = get_id_backup();           //alert('selecttype '+iter);
        reader.iter = id_arr.indexOf(latest_id);
    }        
    highlite(); zoom_set_text();                                         //alert('select 1');
    id=get_id(); 
    reader.id_curr = id;
    document.getElementById('reader_selecttype').innerHTML=types[n_select_type];
}

function reader_set_zoomtype(n_zoomtype){                
    reader.zoomtype = n_zoomtype;
    var bodyStyles = window.getComputedStyle(document.body);
    textheight_zoom = bodyStyles.getPropertyValue('--reader-textheight-zoom'); 
    var elem = document.getElementById("reader_zoom_box");               //alert('zoom2');
    if (n_zoomtype==0){ 
        elem.style.visibility='hidden';
        document.getElementById('text_from_file_box').style.height = '96%';  //alert('zoom3');
    }else{
        elem.style.visibility='visible';
        document.getElementById('text_from_file_box').style.height = textheight_zoom; //alert(textheight_zoom);
    }                                                                    //alert('set_zoomtype');
    zoom_set_text();                                                     //alert('zoom_set_text');
    elem = document.getElementById('reader_zoomtype_zoom');
    if (elem){ elem.innerHTML=zoomtype_arr[n_zoomtype]; }
    elem = document.getElementById('reader_menu_zoomtype_text');
    if (elem){ elem.innerHTML=zoomtype_arr[n_zoomtype]; }                //alert('done');
}
    
//-- buttons -------------------------------------------------------------------------

function reader_show_buttons(){                                          //alert('buttons');
    iter = reader.iter;
    if (iter==-1 || is_inlist(readonlydir)){ edit_function = ''; edit_class='buttons disabled'; }
    else { edit_function='onclick="reader_editor(reader_edit);"'; edit_class='buttons'; }
    
    elem = document.getElementById('reader_buttons_area');
    inner_e = '<div id="reader_menu" class="buttons" onclick="reader_show_menu();"  style="'+reader_button_position(0)+'">menu</div>' ;
    inner_e+= '<div id="reader_edit"     class="'+edit_class+'" '+edit_function+'        style="'+reader_button_position(1)+'">edit</div>' ;
    inner_e+= '<div id="reader_selecttype" class="buttons" onclick="reader_select_type(1);"  style="'+reader_button_position(2)+'">word</div>' ;
    inner_e+= '<div id="prev" class="buttons" onclick="scrollbut_div(0,1,0);"  style="'+reader_button_position(3)+'">'+symbol_prev+'</div>' ;
    inner_e+= '<div id="next" class="buttons" onclick="scrollbut_div(1,1,0);"  style="'+reader_button_position(7)+'">'+symbol_next+'</div>' ;
    
    //inner_e+= '<div id="reader_speed"     class="buttons" onclick=""  style="'+reader_button_position(4)+'">'+symbol_speed+'</div>' ;
    inner_e+= '<div id="reader_mail" class="buttons" onclick="reader_show_mail();"  style="'+reader_button_position(4)+'visibility:hidden;">'+symbol_mail+'</div>' ;
    inner_e+= '<div id="readall"     class="buttons" onclick="scrollbut_div(-1,1,1);"  style="'+reader_button_position(5)+'">'+symbol_readall+'</div>' ;
    inner_e+= '<div id="playpause"   class="buttons" onclick="reader_play_pause()"    style="'+reader_button_position(6)+'">'+symbol_play+'</div>' ;
    elem.innerHTML=inner_e;
    //dir = get_subdir(reader.fname);
    //alert(reader.fname,dir);
    //alert(dir);
}
function reader_show_menu(){
    //lang = get_cookie('lang_'+reader.fname);
    lang = reader.lang;
    n_zoom = reader.zoomtype;
    //inner_e+= '<div id="reader_menu_appearance"        class="buttons disabled" onclick=""   style="left:15%; top:20%;">appearance</div>';
    //inner_e+= '<div id="reader_menu_appearance-common" class="buttons disabled" onclick=""   style="left:35%; top:15%;">appearance-common</div>';
    inner_e = '<div id="reader_menu_clearcookie"  class="buttons"          onclick="reader_clearcookie()"   style="left:15%; top:20%;">clear cookie</div>';
    inner_e+= '<div id="reader_menu_sound"        class="buttons disabled" onclick=""                        style="left:15%;top:60%;">sound</div>';
    inner_e+= '<div id="common_lang_zoom1"    class="buttons_text"                                       style="left:37%;top:20%;">'+lang+'</div>';
    inner_e+= '<div id="common_lang"          class="buttons"          onclick="common_show_lang(1,reader.fname)"      style="left:50%;top:20%;">local lang</div>';
    inner_e+= '<div id="reader_go"                class="buttons disabled" onclick=""                        style="left:70%;top:20%;">go</div>' ;
    inner_e+= '<div id="reader_menu_go-files"     class="buttons"          onclick="goto_files();"           style="left:70%;top:60%;">go home</div>';
    inner_e+= '<div id="reader_menu_zoomtype_text" class="buttons_text"                                      style="left:37%;top:60%;">'+zoomtype_arr[n_zoom]+'</div>' ;
    inner_e+= '<div id="reader_menu_zoomtype"     class="buttons"          onclick="reader_show_zoomtype();" style="left:50%;top:60%;">zoom</div>' ;
    common_create_menu('reader_menu', 0, inner_e);
}
function reader_show_zoomtype(){
    n_zoom = reader.zoomtype;
    inner_e = '<div id="reader_zoomtype_zoombox" class="reader_zoom_box" style="left:20%;top:16%;width:52%;"><div id="reader_zoomtype_zoom" class="text_zoom">'+zoomtype_arr[n_zoom]+'</div></div>';
    inner_e+= '<div id="0"      class="buttons"     onclick="reader_set_zoomtype(this.id)"   style="left:20%; top:60%;">no zoom</div>';
    inner_e+= '<div id="1"      class="buttons"     onclick="reader_set_zoomtype(this.id)"   style="left:45%; top:60%;">by word</div>';
    inner_e+= '<div id="2"      class="buttons"     onclick="reader_set_zoomtype(this.id)"   style="left:70%; top:60%;">by sentence</div>';
    common_create_menu('reader_zoomtype', 1, inner_e);
}
function is_inlist(list){ 
    inlist = false;
    fname_i = document.getElementById('file_title').innerText; 
    for (i=0; i<list.length; i++){ if (fname_i.indexOf(list[i])==fname_i.indexOf('/')){inlist = true;} 
        //alert(fname.indexOf(readonlydir[i])); alert(readonlydir[i]); alert(fname); 
        }
    return(inlist);
}
function goto_files(){ window.location.href = '/index.html'; window.speechSynthesis.cancel(); }

function reader_editor(){
    text_all = document.getElementById('text_from_file').innerHTML;
    reader.text_parsed = text_all;
    id = get_id();
    text = document.getElementById(id).innerHTML;
    text_plane = merge_text(text);                                       //alert(text_plane);
    editor_run('reader', text_plane);
}

//-- mail --------------------------------------------------------------------
dir = get_subdir(reader.fname);
if (dir=='mail'){
    color = '#e0e2e4';
    document.getElementById('reader_mail').style.visibility = 'visible';
    //document.getElementById('text_from_file_box').style.backgroundColor = color;
    //document.getElementById('text_from_file').style.backgroundColor = color;
}

function reader_if_editable(){
    id = reader.latest_p;
    title = document.getElementById(id).getAttribute('title');           //alert(parse_words(id+' '+title));
    if (parse_words(title).indexOf('editable')!=-1){editable=true;}
    else {editable=false;}
    return(editable);
}

function reader_show_mail(){
    inner_e = '<div hidden id="files_sendmail_form"> ';
    inner_e+= '<form action="" method="post">';
    inner_e+= '<input type="text"   id="sendmail_text_id"     name="sendmail_text_name"   value="empty" style="width:0%;height:0%;">';
    inner_e+= '<input type="submit" id="sendmail_submit_id"   name="sendmail_submit_name" value="empty" ></div>';
    inner_e+= '<div id="reader_sendmail"  class="buttons" onclick="reader_mail_send();"   style="left:15%; top:50%;">send</div>';
    inner_e+= '<div id="reader_mail_update"   class="buttons disabled" onclick=""   style="left:40%; top:50%;">update</div>';
    common_create_menu('reader_mail', 0, inner_e);
    
    name = get_usrname(reader.fname);                                           //alert('NAME: '+name);
    date = Date(); date=date.substr(date.indexOf(' ')); date = date.substr(0,date.indexOf('GMT')-1);
    text2 = '<br><div name="'+name+'" class="mail mail_out">'+name+': '+date+'</div>';
    text2+= '<div name="'+name+'" class="mail mail_out">'+document.getElementById('mail_temp_text').innerHTML+'</div>';
    text2=merge_text(text2);
    document.getElementById('sendmail_text_id').value=text2;             //alert('TEXT 2: '+text2);
}
function reader_mail_send(){
    /*
    //alert('mail');
    //id_arr=paragraph_id;
    name = get_usrname(reader.fname); alert(name);
    text_new = ' <br> <div id="mail_temp_title" title="'+name+'" class="mail mail_out mail_temp"> '+name+': not sent yet </div> <div id="mail_temp_text" title="'+name+'" class="mail mail_out"> abc </div>';
    //document.cookie = "mailtext_"+reader.fname+"= ";
    text = document.getElementById('hidden_text').innerHTML;
    //text = localStorage.getItem('text_origin');
    alert(text+text_new);
    parser = reader_parse_pdf(text+text_new); 
    text_parsed = parser[0]; 
    var word_id=parser[1];     var sentence_id=parser[2]; var paragraph_id=parser[3];
    document.getElementById('text_from_file').innerHTML = text_parsed;
    alert(text_parsed);
    */
    document.getElementById('sendmail_submit_id').click(); 
}
    
