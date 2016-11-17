<?php

function parse_text($text_origin){
	$arr = array();
	$i_start=0;
	$proceed = 1;
	$k=0;
	while ($proceed==1){
		$k+=1;
		$i = strpos($text_origin,' ',$i_start+1);
		//echo ' III-'.$i;
		if ($i==False){
			$word = substr($text_origin,$i_start);
			$proceed=0; }
		else{
			$word = substr($text_origin,$i_start,$i-$i_start); 
			$i_start = $i;
			}
		array_push($arr, $word);
		//echo ' WORD '.$i.' '.$word;
		if ($word==' '){echo 'EMPTY!!!!!';}
		if (strpos($word,'\n')!=False){echo 'PARAGRAPH!!!';}
		}
	//$tag = 'mark style="background-color: rgba(0,0,0,0);"';
	$tag = 'em';
	//$text = '<div id="p0"><em id="p0s0"><em id="p0s0w0">';
	$text = "<div id='p0'><$tag id='s0'><$tag id='w0'>";
	$i_w = 1; $i_s = 1; $i_p = 1;
	//$arr_w=['p0s0w0']; $arr_s=['p0s0']; $arr_p=['p0'];
	$arr_w=['w0']; $arr_s=['s0']; $arr_p=['p0'];
	for ($k=0; $k<count($arr); $k++){
		$word=$arr[$k];
		
		if ($k==count($arr)-1){ $text = $text.$word."</$tag></$tag></div>";}

		else{
			if ( strpos($word,'\n')!=False ){ 
				//$text = $text.'|'.$word.'|'."</$tag></$tag></div><div id=p$i_p><$tag id=p$i_p"."s$i_s><$tag id=p$i_p"."s$i_s"."w$i_w>";
				$text = $text.$word."</$tag></$tag></div><div id=p$i_p><$tag id=s$i_s><$tag id=w$i_w>";
				array_push($arr_p, "p$i_p");
				$i_p+=1; $i_s+=1; $i_w+=1;
				}
			elseif ( strpos($word,'.')!=False ){ 
				//$text = $text.'|'.$word.'|'."</$tag></$tag><$tag id=p$i_p"."s$i_s><$tag id=p$i_p"."s$i_s"."w$i_w>";
				$text = $text.$word."</$tag></$tag><$tag id=s$i_s><$tag id=w$i_w>";
				array_push($arr_s, "p$i_p"."s$i_s");
				$i_s+=1; $i_w+=1;
				}
			else{ 
				//$text = $text.'|'.$word.'|'."</$tag><$tag id=p$i_p"."s$i_s"."w$i_w>";
				$text = $text.$word."</$tag><$tag id=w$i_w>";
				array_push($arr_w, "p$i_p"."s$i_s"."w$i_w");
				$i_w+=1;
				}
			}
			 
		}
	//echo $text;
	//echo "<div style='position:fixed; top:20%; left:15%'>".$text."</div>";
	//echo "<div style='position:fixed; top:20%; left:1%'>".htmlspecialchars($text)."</div>";
	//echo "$lt ".$text."$gt";
	//echo htmlspecialchars($text);
	//echo "<div id='hidden_array_p' style='position:fixed; top:40%; left:85%'>$arr_p</div>";
	//echo "<div id='hidden_array_s' style='position:fixed; top:42%; left:85%'>$arr_s</div>";
	//echo "<div id='hidden_array_w' style='position:fixed; top:44%; left:85%'>".htmlspecialchars($arr_w)."</div>";
	//echo "<div id='text_from_file' class='buttons' style='width:83%; height:95%; left:1%; top:2%;background-color: rgba(255,255,255,0.1);' >  $text </div>";
	return ($text);
}



?>
