//var mainstring = 'Strawberries cherries. and an angels kiss in spring My summer wine is really made from all these things'
var array=[]; 
var array2;
var mainstring;
var iter = 0;
var position = 0;
var zoom = 5;
var type = 1;
var startFontSize = 20;
//var wnd = document.documentElement.clientHeight;
var wnd = screen.width-40;

var txt='thelongword';

function fill_window(txt){
 var a=0;	
}
 
function read_text_file(file)
{	//alert('button');
	var file = 'test_book.txt';
    var file_i = new XMLHttpRequest();
    file_i.open("GET", file, false);
    //var allText = file_i.responseText;
    //alert(allText);
    //alert(file_i.status);
    file_i.onreadystatechange = function ()
    {
        if(file_i.readyState === 4)
        {
            if(file_i.status === 200 || file_i.status == 0)
            {
                var allText = file_i.responseText;
                alert(allText);
            }
        }
    }
    file_i.send(null);
}
