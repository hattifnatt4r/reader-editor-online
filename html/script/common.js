
function editor_back(id){
	var elem = document.getElementById(id).parentNode;
	elem.parentNode.removeChild(elem);
	}
	
function create_element(tag, id, cl='', st='', inner='', value='', name='', onclick='', t=''){
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

function replace_all(text, a,b){
	var proceed=1;
	while (proceed==1){
		i = text.indexOf(a);
		if (i==-1) { proceed=0; }
		else { text_i = text.replace(a, b); text = text_i; }
	}
	return(text);
}

function merge_text(text){
	//alert(text);
	var tag = 'em'; var tag_p = 'p';
	closing = '</'+tag+'></'+tag+'></'+tag_p+'>';
	text = replace_all(text, closing, ':nl:')
	//alert('replaced: '+text);
	var proceed = 1;
	while (proceed==1){
		i = text.indexOf('<');
		if (i==-1){ proceed=0; }
		else { i2 = text.indexOf('>');
			text_i = text.substr(0,i)+text.substr(i2+1);
			text = text_i;
			}
		}
	alert('merged: '+text);
	return (text);
	}

function reader_parse_text(text_origin){
	var div_end = '\n'; var div_start = '';
	//alert(text_origin);
	/*
	var i_start=0; var proceed = 1; var i=0;
	while (proceed==1){
		if ( text_origin.substr(-2)==' ' ) { text = text_origin.substr(0,text_origin.length-1); }
		else{ proceed=0; }
		text_origin = text;
		}
		*/
	//var text = text_origin.replace('*nl*', '\n');
	//text_origin = text;
	//var text = text_origin.replace('\n', ' \n ');
	//text_origin = text;
		
	var arr = []; var i_start=0;
	var proceed = 1; var k=0; var i=0; var word='';
	while (proceed==1){
		i = text_origin.indexOf(' ',i_start+1);
		if (i==-1){
			word = text_origin.substr(i_start); proceed=0; }
		else{
			word = text_origin.substr(i_start, i-i_start); i_start = i; }
		arr.push(word);
		//echo ' WORD '.$i.' '.$word;
		//if (word==' '){echo 'EMPTY!!!!!';}
		//if (strpos(word,'\n')!=False){echo 'PARAGRAPH!!!';}
		}
	
	var tag = 'em'; var tag_p = 'p';
	var text = "<"+tag_p+" id='p0'><"+tag+" id='p0s0'><"+tag+" id='p0s0w0'>";
	var i_w = 0; var i_s = 0; var i_p = 0;
	var arr_w=['p0s0w0']; var arr_s=['p0s0']; var arr_p=['p0'];
	//alert(arr);
	//alert(arr.length);
	for (k=0; k<arr.length; k++){
		word=arr[k];
		if (k==arr.length-1){ text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'>'; }
		else{
			//id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
			if ( word.indexOf(':nl:')!=-1 ){ 
			//if ( word.indexOf('\n')!=-1 ){ 
				i_p+=1; i_s=0; i_w=0;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'></'+tag+'></'+tag_p+'><'+tag_p+' id="'+id_p+'"><'+tag+' id="'+id_p+id_s+'"><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_p.push(id_p); arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
			}else if ( word.indexOf('.')!=-1 ){ 
				i_s+=1; i_w=0;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'></'+tag+'><'+tag+' id="'+id_p+id_s+'"><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_s.push(id_p+id_s); arr_w.push(id_p+id_s+id_w);
			}else{ 
				i_w+=1;
				id_p = 'p'+i_p.toString(); id_s='s'+i_s.toString(); id_w='w'+i_w.toString();
				text = text+word+'</'+tag+'><'+tag+' id="'+id_p+id_s+id_w+'">';
				arr_w.push(id_p+id_s+id_w);
			}
		} 
	}
	//text_i = text.replace('*nl*',''); text = text_i;
	text_i = text.replace(/:nl:/g,''); text = text_i;
	alert('parsed:'+text);
	word_id = arr_w;
	sentence_id = arr_s;
	paragraph_id = arr_p;
	return (text);
}


function text_from_file(text){
	//alert('from file!');
    var page_text = read_file('books_test/test_book_3.txt'); 
    //var page_text = 'test test test';
	var text_place = d.getElementById('text_from_file');
	text_place.innerHTML=page_text;
	//alert('from file!');
	//text_place.innerHTML='ghjgjhgjhgj hjhjhk hjkhjhkjhk';
	}

function read_file(file){	
	//var file = 'test_book.txt';
    var file_i = new XMLHttpRequest();
    var allText = 'empty text';
    file_i.onreadystatechange = function ()
    {
	if(file_i.readyState === 4)
		{   if(file_i.status === 200 || file_i.status == 0)
			{   allText = file_i.responseText;
				//return allText;
			}
		}
    }
    file_i.open("GET", file, false);
    file_i.send(null);
    //alert(allText);
    return allText;
	}
