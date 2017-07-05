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
    cookie_suffix: "_",
    name: 'reader',
    text_parsed: "",
    word_id: [], sentence_id: [], paragraph_id: [],
    
    zoomtype_arr: ['no zoom', 'by word', 'by sentence'],
    
    get_id_array: function(){
        var id_arr = [];
        if (this.selecttype == 1){ id_arr=this.sentence_id; }    
        else if (this.selecttype == 2){ id_arr=this.paragraph_id; }    
        else if (this.selecttype == 0){ id_arr=this.word_id; }                      
        return(id_arr);
    },
    get_id: function(){
        var latest_id;
        var id_arr = this.get_id_array();                                         
        if (this.iter==-1){ latest_id='file_title'; }
        else{ latest_id = id_arr[this.iter]; }                              
        return(latest_id);
    },
    get_id_backup: function(){
        var latest_id;
        if (this.selecttype == 0){ latest_id=this.latest_w; }    
        else if (this.selecttype == 1){ latest_id=this.latest_s; }    
        else if (this.selecttype == 2){ latest_id=this.latest_p; }    
        return(latest_id);
    },
    
}
window.onbeforeunload = reader_beforunload;
function reader_beforunload() { common.cookie_save.call(reader); common.cookie_save(); }
//function reader_clearcookie(){ cookie_delete_all(); }

//-- run reader ---------------------------------------------------------------------
reader.fname = document.getElementById('file_title').innerText.replace(' ','');
reader.cookie_suffix = "_"+reader.fname;

if (cookie_get('isset_'+reader.fname)!='isset'){                         //alert('set_cookie');
    cookie_set("isset_"+reader.fname, "isset");
    common.cookie_save.call(reader);
}else{ common.cookie_load.call(reader); }                                //alert( document.cookie )
common.cookie_load();

reader_run();

function reader_run() {                                                  //alert('reader_run');
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
     
    reader_set_selecttype(order=0);                                         //alert('select_type');
    reader_set_zoomtype(0);                                              //alert('zoom_type');
    common_set_fontsize(common.fontsize, common);
    
    //alert(reader.ineditor);
    //if (reader.ineditor) {reader_editor();}
     
}

function reader_text(){                                                  //alert(reader.editor_text+',   '+reader.ischanged_text);
    if (reader.ischanged_text==false){
        var text = document.getElementById('hidden_text').innerHTML;
        var parser = reader_parse_txt(text, 0);
        var text_parsed = parser[0];                                     //alert('parsed 0 '+text_parsed);
        reader.word_id=parser[1]; reader.sentence_id=parser[2]; reader.paragraph_id=parser[3];
                                                                        
        document.getElementById('text_from_file').innerHTML = text_parsed;   //alert('parsed 1 '+text_parsed);
        reader.text_origin = text;
        reader.text_parsed = text_parsed;
    }else{
        var text = reader.editor_text;
        var text_parsed = reader.text_parsed;
        document.getElementById('temp').innerHTML = text_parsed;         //alert(text_parsed);
        var id = reader.id_curr;                                         //alert(id);
        document.getElementById(id).innerHTML = text;                    //alert(text);
        
        var text_all_parsed = document.getElementById('temp').innerHTML; //alert('text_all_parsed: '+text_all_parsed);
        var text_all_origin = merge_text(text_all_parsed);               //alert('merged: '+text_all_origin);
        reader.text_origin = text_all_origin;
        
        var parser = reader_parse_txt(text_all_origin, 0); 
        var text_parsed = parser[0]; 
        reader.word_id=parser[1];  reader.sentence_id=parser[2]; reader.paragraph_id=parser[3];
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
        reader_save(text);
    }
}                   

function reader_save(text){
        document.getElementById('save_text_text_js').value = text; 
        document.getElementById('save_text_submit_js').click();          //alert('saved '+text);
}
 
//-- reader scroll functions -------------------------------------------------------------------
 
function reader_scroll(order,stop,onend){                                //alert('scroll: '+order+' '+stop+' '+onend);
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
    scroll_to(id,'text_from_file_box', title=0);                         //alert('scroll 1');
    //scroll_to(id,'reader_zoom_box',title=1); alert('scroll 2');
    reader_fill_zoom();  
    if (iter==-1){ edit_function = ''; edit_class='buttons disabled'; 
        document.getElementById('reader_edit').className='buttons disabled';
        document.getElementById('reader_edit').setAttribute( "onclick", '' );
    } else {
        document.getElementById('reader_edit').className='buttons';
        document.getElementById('reader_edit').setAttribute( "onclick", 'reader_editor(reader_edit)' );
    }
}    
function reader_utter(stop_i, onend) {
    id = reader.get_id();
    iter = reader.iter;
    n_select_type = reader.selecttype;
    if (n_select_type==0 || iter==-1 ){ utter(document.getElementById(id).innerText, stop=stop_i, onend); }
    else {
        if (n_select_type==2){ 
            first_iter = reader.sentence_id.indexOf(id+'s0');                   //alert('first '+first_iter);
            if ( iter==reader.paragraph_id.length-1 ){ last_iter=reader.sentence_id.length; }
            else { last_iter = reader.sentence_id.indexOf(reader.paragraph_id[iter+1]+'s0'); }  //alert('last '+last_iter);
            sentence_id_part = reader.sentence_id.slice(first_iter,last_iter);  //alert(sentence_id_part);
            utter_paragraph(id, sentence_id_part, reader.word_id, stop_i, onend); 
             
        }
        if (n_select_type==1){ utter_sentence(id, reader.word_id, stop_i, onend); }
    }
}
function reader_fill_zoom(){                                                //alert('reader_fill_zoom');
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
function reader_highlite(){                                                     //alert('reader_highlite');
    id_prev = reader.id_prev;
    id = reader.get_id()                                                        //alert('reader_highlite 0 id '+id +' id_prev '+id_prev);
    document.getElementById(id_prev).className='text';
    div = document.getElementById(id);                                   //alert('reader_highlite div '+ div + ' id '+id +' id_prev '+id_prev);
    div.className='text_highlite';                                       //alert('highlite 2');
    reader.id_prev = id;
}

//-- reader play ----------------------------------------------------------------------------------

function reader_play_pause(){ 
    if (common.play_counter==0){                                         //alert('paused');
        window.speechSynthesis.resume(); 
        document.getElementById('playpause').innerHTML=symbols_play_pause[1];
        common.play_counter=1; 
        }
    else if (window.speechSynthesis.speaking ){                          //alert('speaking'); 
        window.speechSynthesis.pause(); 
        document.getElementById('playpause').innerHTML=symbols_play_pause[0];
        common.play_counter=0; 
    }
    else{reader_utter(1, 0); common.play_counter=1;}
}
//-- reader menu functions -----------------------------------------------------------

function reader_set_selecttype(order){                                      //alert('select');
    n_select_type = reader.selecttype;
    types = ['select <br> -','select <br> - -','select <br> - - -'];
    if (order==1){
        n_select_type = (n_select_type+1)%3;
        reader.selecttype = n_select_type;
        id_arr = reader.get_id_array();  latest_id = reader.get_id_backup();           //alert('selecttype '+iter);
        reader.iter = id_arr.indexOf(latest_id);
    }        
    reader_highlite(); reader_fill_zoom();                                         //alert('select 1');
    id=reader.get_id(); 
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
    reader_fill_zoom();                                                     //alert('reader_fill_zoom');
    elem = document.getElementById('reader_zoomtype_zoom');
    if (elem){ elem.innerHTML=reader.zoomtype_arr[n_zoomtype]; }
    elem = document.getElementById('reader_menu_zoomtype_text');
    if (elem){ elem.innerHTML=reader.zoomtype_arr[n_zoomtype]; }                //alert('done');
}
    
//-- buttons -------------------------------------------------------------------------

function reader_show_buttons(){                                          //alert('buttons');
    iter = reader.iter;
    if (iter==-1 || is_inlist(readonlydir)){ edit_function = ''; edit_class='buttons disabled'; }
    else { edit_function='onclick="reader_editor(reader_edit);"'; edit_class='buttons'; }
    
    elem = document.getElementById('reader_buttons_area');
    inner_e = '<div id="reader_menu" class="buttons" onclick="reader_show_menu();" '+common_buttonpos(0)+'>menu</div>' ;
    inner_e+= '<div id="reader_edit"     class="'+edit_class+'" '+edit_function+' '+common_buttonpos(1)+'>edit</div>' ;
    inner_e+= '<div id="reader_selecttype" class="buttons" onclick="reader_set_selecttype(1);" '+common_buttonpos(2)+'>word</div>' ;
    inner_e+= '<div id="prev" class="buttons" onclick="reader_scroll(0,1,0);" '+common_buttonpos(3)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="next" class="buttons" onclick="reader_scroll(1,1,0);" '+common_buttonpos(7)+'>'+symbol_next+'</div>' ;
    
    //inner_e+= '<div id="reader_speed"     class="buttons" onclick=""  style="'+reader_button_position(4)+'">'+symbol_speed+'</div>' ;
    inner_e+= '<div id="reader_mail" class="buttons" onclick="reader_show_mail();" '+common_buttonpos(4)+'>'+symbol_mail+'</div>' ;
    inner_e+= '<div id="readall"     class="buttons" onclick="reader_scroll(-1,1,1);"  '+common_buttonpos(5)+'>'+symbol_readall+'</div>' ;
    inner_e+= '<div id="playpause"   class="buttons" onclick="reader_play_pause()"    '+common_buttonpos(6)+'>'+symbol_play+'</div>' ;
    elem.innerHTML=inner_e;
    //dir = get_subdir(reader.fname);
    //alert(reader.fname,dir);
    //alert(dir);
}
function reader_show_menu(){
    var n_zoom = reader.zoomtype; var obj='common';
    inner_e = '';
    inner_e+= '<div id="reader_fontsize"     class="buttons"  onclick="common_show_fontsize('+obj+');" '+    common_buttonpos_menu(0,0)+'> font size </div>';    
    inner_e+= '<div id="reader_menu_sound"   class="buttons disabled" onclick=""                        style="left:15%;top:60%;">sound</div>';
    inner_e+= '<div id="common_lang_zoom1"   class="buttons_text"                                       style="left:37%;top:20%;">'+common.lang+'</div>';
    inner_e+= '<div id="common_lang"         class="buttons"          onclick="common_show_lang(1, false)"      style="left:50%;top:20%;">local lang</div>';
    inner_e+= '<div id="reader_go"                class="buttons disabled" onclick=""                        style="left:70%;top:20%;">go</div>' ;
    inner_e+= '<div id="reader_menu_go-files"     class="buttons"          onclick="goto_files();"           style="left:70%;top:60%;">go home</div>';
    inner_e+= '<div id="reader_menu_zoomtype_text" class="buttons_text"                                      style="left:37%;top:60%;">'+reader.zoomtype_arr[n_zoom]+'</div>' ;
    inner_e+= '<div id="reader_menu_zoomtype"     class="buttons"          onclick="reader_show_zoomtype();" style="left:50%;top:60%;">zoom</div>' ;
    common_create_menu('reader_menu', 0, inner_e);
}
function reader_show_zoomtype(){
    n_zoom = reader.zoomtype;
    inner_e = '<div id="reader_zoomtype_zoombox" class="reader_zoom_box" style="left:20%;top:16%;width:52%;"><div id="reader_zoomtype_zoom" class="text_zoom">'+reader.zoomtype_arr[n_zoom]+'</div></div>';
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

function reader_editor(){                                                //alert('to_editor');
    text_all = document.getElementById('text_from_file').innerHTML;
    reader.text_parsed = text_all;
    id = reader.get_id();
    text = document.getElementById(id).innerHTML;
    text_plane = merge_text(text); 
    reader.ineditor = true;                                      //alert(text_plane);
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
    
