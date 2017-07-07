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
    mailnum: 0,
    
    zoomtype_arr: ['no zoom', 'by word', 'by sentence'],
    buttons_php: { "reader_save": "freader_save_submit", 
		           "reader_sendmail": "freader_sendmail_submit"
		           },
	click_php: function(id) { document.getElementById(this.buttons_php[id]).click(); },
    
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
    var subdir=get_subdir(reader.fname);
    
    if (reader.ischanged_text==false){
        reader_show_buttons();                                               //alert('buttons');
        create_element('text_zoom_box','text_zoom_box', 'base_elements');
        document.getElementById("text_zoom_box").innerHTML = '<div id="reader_zoom" class="text_zoom">zoom word</div>'
        document.getElementById("base_elements").appendChild(document.getElementById("text_from_file_box"));
    }
    if (subdir==='mail' && reader.ischanged_text==false){
        var user_name = get_usrname(reader.fname).replace(" ",""); 
        var contact_name=reader.fname.substr(reader.fname.lastIndexOf('/')+1).replace(" ",""); 
        
        var mail_arr = reader_get_mailarr();                             //alert('mail_arr_parsed: '+mail_arr);
        var text = "", class_i="", name_i="", i=0;
        for (i=0; i<mail_arr.length; i+=1){                              
            name_i = mail_arr[i][1].toString().replace(" ","");          //alert('mail i: |'+name_i+'|');
            if (name_i==user_name) {class_i = 'mail mail_out'; }
            if (name_i==contact_name) {class_i = 'mail mail_in'; }       
            text+= '<div title="void_div" class="mail mail_space">  </div>';    
            text+= '<div title="'+name_i+'" class="'+class_i+' mail_title" >from ' +name_i+', '+mail_arr[i][2]+'</div>';
            text+= '<div title="'+name_i+'" class="'+class_i+'">'+mail_arr[i][3]+'</div>';               
        }
        var msg = document.getElementById('hidden_mail_msg').innerHTML;
        text+= '<div title="void_div" class="mail mail_space">  </div>'; 
        text+= '<div title="'+user_name+'" class="mail mail_out mail_title" >from ' +user_name+', new </div>';
        text+= '<div title="'+user_name+'" class="mail mail_out mail_temp" id="mail_editable">'+msg+'</div>';           //alert('mail_text: '+text);
        text+= '<div title="void_div" style="position:relative;height:11vh;">  </div>'; 
       
        document.getElementById('hidden_text').innerHTML=text;
       
    }
    
    reader_text();                                                       //alert(word_id); //alert(paragraph_id);
    reader_set_selecttype(order=0);                                      //alert('select_type');
    reader_set_zoomtype(0);                                              //alert('zoom_type');
    common_set_fontsize(common.fontsize, common);
    if (subdir==='mail'){
        //document.getElementById('reader_mail').style.visibility = 'visible';
        reader.iter = reader.get_id_array().length-1;                    //alert(reader.iter);
        reader_highlite(); 
        scroll_to(reader.get_id(),'text_from_file_box', title=0);
		
		/*
	    var elem=document.getElementById('text_from_file'); 
		var inner = elem.innerHTML;
		inner+= '<div title="void_div" style="position:relative;height:11vh;">  </div>'; 
		inner+= '<div style="position:relative;left:1%;width:100%;height:19vh;">'; 
		inner+= '<div id="reader_sendmail" onclick="reader_sendmail();" class="buttons" style="position:relative;left:1%;text-align:center;"> send mail </div>';
		inner+= '<div id="reader_refresh"  onclick="reader_refresh();"  class="buttons" style="position:relative;left:80%;top:-17vh;text-align:center;"> refresh </div>';
		inner+= '</div>';
		elem.innerHTML = inner;
		* */
	}
    
}

function reader_text(){                                                  //alert(reader.editor_text+',   '+reader.ischanged_text);
    var subdir=get_subdir(reader.fname);
    var text = "", text_parsed = "";
    var parser = [];
    if (reader.ischanged_text==false){
        text = document.getElementById('hidden_text').innerHTML;
        parser = reader_parse_html(text);
        text_parsed = parser[0];                                          //alert('parsed 0 '+text_parsed);
        reader.word_id=parser[1]; reader.sentence_id=parser[2]; reader.paragraph_id=parser[3];
                                                                        
        document.getElementById('text_from_file').innerHTML = text_parsed;   //alert('parsed 1 '+text_parsed);
        reader.text_origin = text;
        reader.text_parsed = text_parsed;
    }else{
        if (subdir==='mail'){
            text_parsed = $('#text_from_file').find('#mail_editable').html();   //alert('msg parsed: '+text_parsed);
        }else{
            text_parsed = reader.text_parsed;
        }
        text = reader.editor_text;
        document.getElementById('temp').innerHTML = text_parsed;         //alert('parsed: '+text_parsed);
        var id = reader.id_curr;                                         //alert(id);
        document.getElementById(id).innerHTML = text;                    //alert('parsed: '+text);
        
        var text_all_parsed = document.getElementById('temp').innerHTML; //alert('text_all_parsed: '+text_all_parsed);
        var text_all_origin = merge_text(text_all_parsed);               //alert('merged: '+text_all_origin);
    
        reader.ischanged_text = false;
        reader_save(text_all_origin);
    }
}                   

function reader_save(text){
        document.getElementById('freader_save_text').value = text; 
        document.getElementById('freader_save_submit').click();          //alert('saved '+text);
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
    //scroll_to(id,'text_zoom_box',title=1); alert('scroll 2');
    reader_fill_zoom();  
    
    var subdir=get_subdir(reader.fname);
    var mail_notedit = false;
    if(subdir==='mail' && $('#'+id).parents('#mail_editable').length === 0) { mail_notedit=true; }  //alert(mail_notedit);
    
    if (iter==-1 || mail_notedit===true){ edit_function = ''; edit_class='buttons disabled'; 
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
    var elem = document.getElementById("text_zoom_box");               //alert('zoom2');
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
    inner_e = '<div id="reader_menu" onclick="reader_show_menu();" '+common_buttonpos(0)+'>menu</div>' ;
    inner_e+= '<div id="reader_edit" class="'+edit_class+'" '+edit_function+' '+common_buttonpos(1)+'>edit</div>' ;
    inner_e+= '<div id="reader_selecttype" onclick="reader_set_selecttype(1);" '+common_buttonpos(2)+'>word</div>' ;
    inner_e+= '<div id="prev" onclick="reader_scroll(0,1,0);" '+common_buttonpos(3)+'>'+symbol_prev+'</div>' ;
    inner_e+= '<div id="next" onclick="reader_scroll(1,1,0);" '+common_buttonpos(7)+'>'+symbol_next+'</div>' ;
    
    //inner_e+= '<div id="reader_speed"     class="buttons" onclick=""  style="'+reader_button_position(4)+'">'+symbol_speed+'</div>' ;
    inner_e+= '<div id="playpause"   onclick="reader_play_pause();"    ' +common_buttonpos(6)+'>'+symbol_play+'</div>' ;
    inner_e+= '<div id="reader_navigate"   onclick="" ' +common_buttonpos(5,1)+'> navi- gate </div>' ;
    
    var subdir = get_subdir(reader.fname);
    if (subdir==='mail'){
		inner_e+= '<div id="reader_mail" onclick="reader_show_mail();" '+common_buttonpos(4)+'>'+symbol_mail+'</div>' ;
	}else{
		inner_e+= '<div id="readall"     onclick="reader_scroll(-1,1,1);"  '+common_buttonpos(4)+'>'+symbol_readall+'</div>' ;
	}
    elem.innerHTML=inner_e;
}
function reader_show_menu(){
    var n_zoom = reader.zoomtype; var obj='common';
    inner_e = '';
    inner_e+= '<div id="reader_fontsize"        onclick="common_show_fontsize('+obj+');" '+    common_buttonpos_menu(0,0)+'> font size </div>';    
    inner_e+= '<div id="reader_menu_sound"      onclick="" ' +common_buttonpos_menu(4,3)+'>sound</div>';
    inner_e+= '<div id="common_lang_both_zoom"  onclick="" ' +common_buttonpos_menu(1,1,4,2,0,-1)+'>'+common.langbase+' +<br> '+common.lang+'</div>';
    inner_e+= '<div id="common_lang"            onclick="common_show_lang(1);" '+common_buttonpos_menu(2,0)+'>local lang</div>';
    inner_e+= '<div id="reader_go"              onclick="" '+common_buttonpos_menu(3,3)+'>go</div>' ;
    inner_e+= '<div id="reader_menu_go-files"   onclick="goto_files();" '+common_buttonpos_menu(7,0)+'">go home</div>';
    inner_e+= '<div id="reader_menu_zoomtype_text" '+common_buttonpos_menu(5,1,4,2,0,-1)+'>'+reader.zoomtype_arr[n_zoom]+'</div>' ;
    inner_e+= '<div id="reader_menu_zoomtype"   onclick="reader_show_zoomtype();" '+common_buttonpos_menu(6,0)+'>zoom</div>' ;
    common_create_menu('reader_menu', 0, inner_e);
}
function reader_show_zoomtype(){
    n_zoom = reader.zoomtype;
    inner_e = '<div id="reader_zoomtype_zoombox" '+common_buttonpos_menu(0,2)+'><div id="reader_zoomtype_zoom" class="text_zoom menu_zoom">'+reader.zoomtype_arr[n_zoom]+'</div></div>';
    inner_e+= '<div id="0"   onclick="reader_set_zoomtype(this.id)" '+common_buttonpos_menu(4,0)+'> no zoom </div>';
    inner_e+= '<div id="1"   onclick="reader_set_zoomtype(this.id)" '+common_buttonpos_menu(5,0)+'> by word </div>';
    inner_e+= '<div id="2"   onclick="reader_set_zoomtype(this.id)" '+common_buttonpos_menu(6,0)+'> by sentence </div>';
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

function reader_if_editable(){
    id = reader.latest_p;
    title = document.getElementById(id).getAttribute('title');           //alert(parse_words(id+' '+title));
    if (parse_words(title).indexOf('editable')!=-1){editable=true;}
    else {editable=false;}
    return(editable);
}


function reader_show_mail(){
    var inner_e = '';
    inner_e += '<div id="reader_sendmail" onclick="reader.click_php(this.id);" '+common_buttonpos_menu(4,0)+'> send mail </div>';
    inner_e += '<div id="reader_refresh"  onclick="reader_refresh();" '         +common_buttonpos_menu(6,0)+'> refresh </div>';
    common_create_menu('reader_mail', 0, inner_e);
    
    var username = get_usrname(reader.fname);                            //alert('NAME: '+username);
    var date = Date(); 
    date = date.substr(date.indexOf(' '));                               //alert('date: '+date);
    date = date.substr(0,date.indexOf('GMT')-1);
    var text = $('#text_from_file').find('#mail_editable').html();     //alert('msg parsed: '+text);
    text = merge_text(text);                                      
    var m_num = "|m_n_u_m|", m_from="|m_f_r_o_m|", m_time="|m_t_i_m_e|", m_text="|m_t_e_x_t|";
    text = m_num+reader.mailnum+m_from+username+m_time+date+m_text+text ;                  
    document.getElementById('freader_save_text').value=text;  
}
/*
function reader_sendmail() {
	var username = get_usrname(reader.fname);                            //alert('NAME: '+username);
    var date = Date(); 
    date = date.substr(date.indexOf(' '));                               //alert('date: '+date);
    date = date.substr(0,date.indexOf('GMT')-1);
    var text = $('#text_from_file').find('#mail_editable').html();     //alert('msg parsed: '+text);
    text = merge_text(text);                                      
    var m_num = "|m_n_u_m|", m_from="|m_f_r_o_m|", m_time="|m_t_i_m_e|", m_text="|m_t_e_x_t|";
    text = m_num+reader.mailnum+m_from+username+m_time+date+m_text+text ;                  
    document.getElementById('freader_save_text').value=text;  
    document.getElementById("freader_sendmail_submit").click(); 
} */
function reader_refresh() {window.location.href = '/reader.html';}

function reader_get_mailarr(){
    var archive = document.getElementById('hidden_mail_archive').innerHTML;  //alert(archive);
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
    }                                                                    //alert('mail_arr: '+mail_arr.length);
                                                                         //alert('mail_arr: '+mail_arr);
    var msg=""; 
    for (i=0; i<mail_arr.length; i+=1){                                  //alert(i);
        msg = mail_arr[i];                                               //alert(msg);
        var mail_i = ['','','',''];
        mail_i[0] = parseInt( msg.substring( msg.indexOf(m_num) +m_num.length,  msg.indexOf(m_from) ) );
        mail_i[1] = msg.substring( msg.indexOf(m_from)+m_from.length, msg.indexOf(m_time) ).toString().replace(" ","");
        mail_i[2] = msg.substring( msg.indexOf(m_time)+m_time.length, msg.indexOf(m_text) );
        mail_i[3] = msg.substring( msg.indexOf(m_text)+m_text.length, msg.length );
        mail_arr[i] = mail_i;
    }                                                                    //alert('mail_arr_parsed: '+mail_arr);
    
    reader.mailnum = parseInt(mail_arr[mail_arr.length-1][0])+1;         //alert('mailnum: '+reader.mailnum);
    return(mail_arr);
}
