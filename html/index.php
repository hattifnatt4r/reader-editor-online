<?php ini_set('session.gc_maxlifetime', 10); session_start(); ?>
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
<link href='https://fonts.googleapis.com/css?family=Source Sans Pro' rel='stylesheet'> 
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Lato" />
</head>

<body id='body' class='body_bkg' align='top' onresize="files_resize()" >
<?php include 'script/files.php'; ?>    
<div hidden id='hidden_files_nentry' style='position:fixed; top:66%; left:85%'>0</div>
<div hidden id='php_goto'> </div>

<svg width="0" height="0" style="position:absolute">
  <defs>
	<symbol viewBox="0 0 512 512" id="ion-android-folder"><path d="M213.338 96H74.666C51.197 96 32 115.198 32 138.667v234.666C32 396.802 51.197 416 74.666 416h362.668C460.803 416 480 396.802 480 373.333V186.667C480 163.198 460.803 144 437.334 144H256.006l-42.668-48z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-android-document"><path d="M288 48 H136 c-22.092 0-40 17.908-40 40 v336 c0 22.092 17.908 40 40 40 h240 c22.092 0 40-17.908 40-40 V176 L288 48z "></path></symbol>	
		
	<symbol viewBox="0 0 512 512" id="ion-arrow-left-b"><path d="M327.3 98.9l-2.1 1.8-156.5 136c-5.3 4.6-8.6 11.5-8.6 19.2 0 7.7 3.4 14.6 8.6 19.2L324.9 411l2.6 2.3c2.5 1.7 5.5 2.7 8.7 2.7 8.7 0 15.8-7.4 15.8-16.6V112.6c0-9.2-7.1-16.6-15.8-16.6-3.3 0-6.4 1.1-8.9 2.9z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-arrow-right-b"><path d="M184.7 413.1l2.1-1.8 156.5-136c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2L187.1 101l-2.6-2.3C182 97 179 96 175.8 96c-8.7 0-15.8 7.4-15.8 16.6v286.8c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-arrow-up-b"><path d="M413.1 327.3l-1.8-2.1-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6-7.7 0-14.6 3.4-19.2 8.6L101 324.9l-2.3 2.6C97 330 96 333 96 336.2c0 8.7 7.4 15.8 16.6 15.8h286.8c9.2 0 16.6-7.1 16.6-15.8 0-3.3-1.1-6.4-2.9-8.9z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-arrow-down-b"><path d="M98.9 184.7l1.8 2.1 136 156.5c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6L411 187.1l2.3-2.6c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8H112.6c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z"></path></symbol>
    
    <symbol viewBox="0 0 512 512" id="ion-checkmark-round"><path d="M448 71.9c-17.3-13.4-41.5-9.3-54.1 9.1L214 344.2l-99.1-107.3c-14.6-16.6-39.1-17.4-54.7-1.8-15.6 15.5-16.4 41.6-1.7 58.1 0 0 120.4 133.6 137.7 147 17.3 13.4 41.5 9.3 54.1-9.1l206.3-301.7c12.6-18.5 8.7-44.2-8.6-57.5z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-backspace"><path d="M498.941 93.559C490.037 84.654 478.696 80 465.875 80H168c-24.303 0-43.717 9.402-57.706 28.441L0 255.938l110.4 146.528.18.231.184.232c6.904 8.855 14.424 15.701 22.99 20.417C143.883 428.924 155.405 432 168 432h298c26.191 0 46-22.257 46-49V127c0-12.821-4.154-24.537-13.059-33.441zm-85.499 238.748a8.007 8.007 0 0 1 2.372 5.71 7.984 7.984 0 0 1-2.372 5.707l-21.823 21.905a7.973 7.973 0 0 1-5.691 2.371c-2.071 0-4.138-.785-5.695-2.371l-76.23-76.461-76.23 76.461a7.947 7.947 0 0 1-5.695 2.371 7.975 7.975 0 0 1-5.692-2.371l-21.824-21.905a7.99 7.99 0 0 1-2.373-5.707c0-2.148.846-4.2 2.373-5.71L271.098 256l-76.738-76.297c-3.146-3.153-3.146-8.273 0-11.427l21.807-21.919a8.048 8.048 0 0 1 5.696-2.357c2.152 0 4.189.847 5.691 2.357l76.448 75.533 76.447-75.533a8.006 8.006 0 0 1 5.693-2.357c2.143 0 4.179.847 5.695 2.357l21.807 21.919c3.146 3.153 3.146 8.273 0 11.427L336.904 256l76.538 76.307z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-ios-undo"><path d="M447.9 368.2c0-16.8 3.6-83.1-48.7-135.7-35.2-35.4-80.3-53.4-143.3-56.2V96L64 224l192 128v-79.8c40 1.1 62.4 9.1 86.7 20 30.9 13.8 55.3 44 75.8 76.6l19.2 31.2H448c0-10.1-.1-22.9-.1-31.8z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-ios-redo"><path d="M64 400h10.3l19.2-31.2c20.5-32.7 44.9-62.8 75.8-76.6 24.4-10.9 46.7-18.9 86.7-20V352l192-128L256 96v80.3c-63 2.8-108.1 20.7-143.3 56.2C60.4 285.2 64 351.5 64 368.2c.1 8.9 0 21.7 0 31.8z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-android-volume-up"><path d="M64 192v128h85.334L256 431.543V80.458L149.334 192H64zm288 64c0-38.399-21.333-72.407-53.333-88.863v176.636C330.667 328.408 352 294.4 352 256zM298.667 64v44.978C360.531 127.632 405.334 186.882 405.334 256c0 69.119-44.803 128.369-106.667 147.022V448C384 428.254 448 349.257 448 256c0-93.256-64-172.254-149.333-192z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-android-volume-off"><path d="M405.5 256c0 22.717-4.883 44.362-13.603 63.855l31.88 31.88C439.283 323.33 448 290.653 448 256c0-93.256-64-172.254-149-192v44.978C361 127.632 405.5 186.882 405.5 256zM256 80.458l-51.021 52.48L256 183.957zM420.842 396.885L91.116 67.157l-24 24 90.499 90.413-8.28 10.43H64v128h85.334L256 431.543V280l94.915 94.686C335.795 387.443 318 397.213 299 403.022V448c31-7.172 58.996-22.163 82.315-42.809l39.61 39.693 24-24.043-24.002-24.039-.081.083z"></path><path d="M352.188 256c0-38.399-21.188-72.407-53.188-88.863v59.82l50.801 50.801A100.596 100.596 0 0 0 352.188 256z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-email"><path d="M67 148.7c11 5.8 163.8 89.1 169.5 92.1 5.7 3 11.5 4.4 20.5 4.4s14.8-1.4 20.5-4.4c5.7-3 158.5-86.3 169.5-92.1 4.1-2.1 11-5.9 12.5-10.2 2.6-7.6-.2-10.5-11.3-10.5H65.8c-11.1 0-13.9 3-11.3 10.5 1.5 4.4 8.4 8.1 12.5 10.2z"></path><path d="M455.7 153.2c-8.2 4.2-81.8 56.6-130.5 88.1l82.2 92.5c2 2 2.9 4.4 1.8 5.6-1.2 1.1-3.8.5-5.9-1.4l-98.6-83.2c-14.9 9.6-25.4 16.2-27.2 17.2-7.7 3.9-13.1 4.4-20.5 4.4s-12.8-.5-20.5-4.4c-1.9-1-12.3-7.6-27.2-17.2L110.7 338c-2 2-4.7 2.6-5.9 1.4-1.2-1.1-.3-3.6 1.7-5.6l82.1-92.5c-48.7-31.5-123.1-83.9-131.3-88.1-8.8-4.5-9.3.8-9.3 4.9v205c0 9.3 13.7 20.9 23.5 20.9h371c9.8 0 21.5-11.7 21.5-20.9v-205c0-4.2.6-9.4-8.3-4.9z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-android-mail"><path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"></path></symbol>
  
	
    <symbol viewBox="0 0 512 512" id="ion-android-person-add"><path d="M304 256c52.805 0 96-43.201 96-96s-43.195-96-96-96-96 43.201-96 96 43.195 96 96 96zm0 48c-63.598 0-192 32.402-192 96v48h384v-48c0-63.598-128.402-96-192-96zM112 224v-64H80v64H16v32h64v64h32v-64h64v-32h-64z"></path></symbol>
    <symbol viewBox="0 0 512 512" id="ion-person-add"><path d="M429 328v-51h51v-42h-51v-51h-42v51h-51v42h51v51z"></path><path d="M416 448s0-26.4-2.2-40.2c-1.8-10.9-16.9-25.3-81.1-48.9-63.2-23.2-59.3-11.9-59.3-54.6 0-27.7 14.1-11.6 23.1-64.2 3.5-20.7 6.3-6.9 13.9-40.1 4-17.4-2.7-18.7-1.9-27 .8-8.3 1.6-15.7 3.1-32.7 1.8-21-17.7-76.3-87.6-76.3-69.9 0-89.4 55.3-87.5 76.4 1.5 16.9 2.3 24.4 3.1 32.7.8 8.3-5.9 9.6-1.9 27 7.6 33.1 10.4 19.3 13.9 40.1 9 52.6 23.1 36.5 23.1 64.2 0 42.8 3.9 31.5-59.3 54.6-64.2 23.5-79.4 38-81.1 48.9C32 421.6 32 448 32 448h384z"></path></symbol>
	
	
	<symbol viewBox="0 0 512 512" id="ion-pause"><path d="M224 435.8V76.1c0-6.7-5.4-12.1-12.2-12.1h-71.6c-6.8 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.8 0 12.2-5.4 12.2-12.2zM371.8 64h-71.6c-6.7 0-12.2 5.4-12.2 12.1v359.7c0 6.7 5.4 12.2 12.2 12.2h71.6c6.7 0 12.2-5.4 12.2-12.2V76.1c0-6.7-5.4-12.1-12.2-12.1z"></path></symbol>
	<symbol viewBox="0 0 512 512" id="ion-play-pause"> 
		<path d="M34.7 413.1 l2.1-1.8 156.5-136 c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2    L37.1 101l-2.6-2.3    C32 97     29 96     25.8 96c-8.7 0-15.8 7.4-15.8 16.6 v286.8 c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path>
		<path d="M278 96h79v320h-79z  M415 96h79v320h-79z"></path>
	</symbol>
	
	
	<symbol viewBox="0 0 512 512" id="ion-right-right"> 
		<path d=" M84.7 413.1 l2.1-1.8 156.5-136 c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2    L87.1 101l-2.6-2.3    C82 97     79 96     75.8 96c-8.7 0-15.8 7.4-15.8 16.6 v286.8 c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path>
		<path d=" M334.7 413.1 l2.1-1.8 156.5-136 c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2    L337.1 101l-2.6-2.3    C332 97     329 96     325.8 96c-8.7 0-15.8 7.4-15.8 16.6 v286.8 c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path>
	</symbol>
    
    <symbol viewBox="0 0 512 512" id="ion-left-left"> 
		<path d="  M127.3 98.9 l-2.1 1.8-156.5 136c-5.3 4.6-8.6 11.5-8.6 19.2 0 7.7 3.4 14.6 8.6 19.2    L124.9 411 l2.6 2.3 c2.5 1.7 5.5 2.7 8.7 2.7 8.7 0 15.8-7.4 15.8-16.6V112.6c0-9.2-7.1-16.6-15.8-16.6-3.3 0-6.4 1.1-8.9 2.9z"></path>
		<path d="  M427.3 98.9 l-2.1 1.8-156.5 136c-5.3 4.6-8.6 11.5-8.6 19.2 0 7.7 3.4 14.6 8.6 19.2    L424.9 411 l2.6 2.3 c2.5 1.7 5.5 2.7 8.7 2.7 8.7 0 15.8-7.4 15.8-16.6V112.6c0-9.2-7.1-16.6-15.8-16.6-3.3 0-6.4 1.1-8.9 2.9z"></path>
	</symbol>
	
	<symbol viewBox="0 0 512 512" id="ion-left-right"> 
		<path d=" M334.7 413.1 l2.1-1.8 156.5-136 c5.3-4.6 8.6-11.5 8.6-19.2 0-7.7-3.4-14.6-8.6-19.2    L337.1 101l-2.6-2.3    C332 97     329 96     325.8 96c-8.7 0-15.8 7.4-15.8 16.6 v286.8 c0 9.2 7.1 16.6 15.8 16.6 3.3 0 6.4-1.1 8.9-2.9z"></path>
		<path d=" M177.3 98.9 l-2.1 1.8-156.5 136c-5.3 4.6-8.6 11.5-8.6 19.2 0 7.7 3.4 14.6 8.6 19.2    L174.9 411 l2.6 2.3 c2.5 1.7 5.5 2.7 8.7 2.7 8.7 0 15.8-7.4 15.8-16.6V112.6c0-9.2-7.1-16.6-15.8-16.6-3.3 0-6.4 1.1-8.9 2.9z"></path>
	</symbol>
	
	<symbol viewBox="0 0 512 512" id="ion-up-down"> 
		<path d="M413.1    227.3 l-1.8-2.1-136-156.5 c-4.6-5.3-11.5-8.6-19.2-8.6-7.7 0-14.6 3.4-19.2 8.6 L101  224.9 l-2.3 2.6  C97    230 96    233 96    236.2 c0 8.7 7.4 15.8 16.6 15.8 h286.8 c9.2 0 16.6-7.1 16.6-15.8 0-3.3-1.1-6.4-2.9-8.9z"></path>
		<path d="M98.9     334.7 l1.8 2.1 136 156.5 c4.6 5.3 11.5 8.6 19.2 8.6 7.7 0 14.6-3.4 19.2-8.6  L411   337.1 l2.3-2.6 c1.7-2.5 2.7-5.5 2.7-8.7 0-8.7-7.4-15.8-16.6-15.8  H112.6  c-9.2 0-16.6 7.1-16.6 15.8 0 3.3 1.1 6.4 2.9 8.9z"></path>
	</symbol>
	
    
    <!-- etc -->
  </defs>
</svg>


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
<form action="" method="post">  
	<input id="ffiles_test_submit"     type="submit" name="ffiles_test_submit"     value="empty" >
</form>	
</div>

<script language=JavaScript type="text/javascript" src="script/common.js"></script>
<script language=JavaScript type="text/javascript" src="script/files.js"></script>
<script language=JavaScript type="text/javascript" src="script/editor.js"></script>
</body>
</html>
