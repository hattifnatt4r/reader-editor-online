<?php session_start(); ?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, target-densitydpi=device-dpi"> -->
<html LANG=ru> 
<title> files </title>
<link rel="stylesheet"  href="style/common.css" />
<script language=JavaScript type="text/javascript" src="script/plugins/jquery-3.1.1.min.js"></script>
<script language=JavaScript type="text/javascript" src="script/plugins/jquery.foggy.min.js"></script>
<script src="http://api.wipmania.com/jsonp?callback=jsonpCallback" type="text/javascript"></script>

<link type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
<link href='https://fonts.googleapis.com/css?family=Jura' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=PT Serif Caption' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Ubuntu' rel='stylesheet'> 

<link href='https://fonts.googleapis.com/css?family=Kameron' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Khula' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Rasa' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=Swanky and Moo Moo' rel='stylesheet'> 
</head>

<body id='body' class='body_bkg' align='top' onresize="files_resize()" >
<?php include 'script/files.php'; ?>    
<div hidden id='hidden_files_nentry' style='position:fixed; top:66%; left:85%'>0</div>
<div hidden id='php_goto'> </div>
<!-- <div style='position:fixed;top:77%;left:0%;width:100%;height:1%; border: dashed 0.3vh #8a8a5c;  box-sizing:border-box;'> </div> -->
<!-- <a hidden href="reader.php"> go to reader</a> -->

<div id='base_elements'>
    <div id='buttons_area' class='buttons_area'></div>
</div>
<div id='created_elements'></div>
<div id='editor_base_elements'></div>
<div id='editor_created_elements'></div>


<div hidden id="files_forms"> 
<form action="" method="post">  
	<input id="ffiles_iter"          type="text"   name="ffiles_iter"          value="empty" >
	<input id="ffiles_edit_text"     type="text"   name="ffiles_edit_text"     value="empty" >
	<input id="ffiles_edit_submit"   type="submit" name="ffiles_edit_submit"   value="empty" >
	<input id="ffiles_enter_submit"  type="submit" name="ffiles_enter_submit"  value="empty" >
	<input id="ffiles_delete_submit" type="submit" name="ffiles_delete_submit" value="empty" >
	<input id="ffiles_cleanhtml_submit" type="submit" name="ffiles_cleanhtml_submit" value="empty" >
	
	<input id="ffiles_createtxt_submit" type="submit" name="ffiles_createtxt_submit" value="empty" >
	<input id="ffiles_createdir_submit" type="submit" name="ffiles_createdir_submit" value="empty" >
	
	<input id="ffiles_mail_submit"     type="submit" name="ffiles_usermail_submit" value="empty" >
	<input id="ffiles_addmail_submit"  type="submit" name="ffiles_addmail_submit"  value="empty" >
	<input id="ffiles_download_submit" type="submit" name="ffiles_download_submit" value="empty" >
</form>
<form action="" method="post">  
	<input id="ffiles_username"    type="text" name="ffiles_username"    value="empty" >
	<input id="ffiles_userpass"    type="text" name="ffiles_userpass"    value="empty" >
	<input id="ffiles_userlogin_submit"    type="submit" name="ffiles_userlogin_submit"    value="empty" >
	<input id="ffiles_usermail_submit"     type="submit" name="ffiles_usermail_submit"     value="empty" >
</form>	
<form action="" method="post" enctype="multipart/form-data">
	<input id="ffiles_upload_choose"   type="file"   name="ffiles_upload_choose"     value="empty" >
	<input id="ffiles_upload_submit"   type="submit" name="ffiles_upload_submit"     value="empty" >
</form>
<form action="" method="post">  
	<input id="ffiles_copyfname_text"  type="text"   name="ffiles_copyfname_text"  value="" >
	<input id="ffiles_copyfdir_text"   type="text"   name="ffiles_copyfdir_text"   value="" >
	<input id="ffiles_past_submit"     type="submit" name="ffiles_past_submit"     value="empty" >
</form>	
</div>

<script language=JavaScript type="text/javascript" src="script/common.js"></script>
<script language=JavaScript type="text/javascript" src="script/files.js"></script>
<script language=JavaScript type="text/javascript" src="script/editor.js"></script>
</body>
</html>
