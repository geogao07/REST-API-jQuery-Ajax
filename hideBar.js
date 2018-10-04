/****************************************
Author: Jia Gao
Version: 1.0
******************************************/
<style>
.space{
	display:inline-block;
	margin-right:20px;
}
</style>
<script>
//global vars for storing text depends on the language
var panelHide="";
var panelShow="";
var indexHide="";
var indexShow="";

$(document).ready(function(){

		if (Condition for English or French) //language check
{
                panelHide="Masquer le panneau de raffinement";
				panelShow="Démontrer le panneau de raffinement";
				filterHide="Masquer les filtres clés";
				filterShow="Démontrer les filtres clés";
}
		else 
{					
				 panelHide="Hide Refinement Panel";
				 panelShow="Show Refinement Panel";
				 filterHide="Hide Key Filters";
				 filterShow="Show Key Filters";
                //English Code here
}
 
	//removeCookies();
//	deleteCookie();

	checkCookies();// check if the current page has the cookie for Key Filter
	displayCookies();//check if the current page has the cookie for refinement panel
	


   $('#hideOrShow').click(function(){
   if ($("#hideOrShow").text()==panelShow)//hide or show dependent on the value of the text
		show();
		else hide();
});


$('#halfHideOrShow').click(function(){
   if ($("#halfHideOrShow").text()==filterShow)//hide or show dependent on the value of the text for Key Filter
		halfShow();
		else halfHide();
});


//hide method and create cookie
	function hide(){
		$("#sideNavBox").hide();
		$("#hideOrShow").text(panelShow);
		$("#halfHideOrShow").hide();// if refinement panel is hidden, Key Filter should also be hidden 
		setCookie("sth","Something",365);
		//document.cookie = "sth=Something; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
	
}

//show method and delete cookie
	function show(){ 
		$("#sideNavBox").show();
		$("#hideOrShow").text(panelHide);
		$("#halfHideOrShow").show();
		deleteCookie();
		//document.cookie = "; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
	
}




//hide Key Filters and create cookie for it
	function halfHide(){
		$("#idKeyFiltersContainer").hide();
		$("#navresizerHorizontalBar").hide();
		$("#halfHideOrShow").text(filterShow);
		setCookie("other","Otherthing",365);
	
	
}

//show Key Filter and delete cookie
	function halfShow(){
		$("#idKeyFiltersContainer").show();
		$("#navresizerHorizontalBar").show();
		$("#halfHideOrShow").text(filterHide);
		deleteOnlyFilter();
	
	
}


//use for secend time log in to the page or more
	function hideWithoutCookie(){
		$("#sideNavBox").hide();
		$("#hideOrShow").text(panelShow);
		$("#halfHideOrShow").text(filterShow);
		$("#halfHideOrShow").hide();
	
}




//use for secend time log in to the page or more
	function halfHideWithoutCookie(){
		$("#idKeyFiltersContainer").hide();
		$("#navresizerHorizontalBar").hide();
		$("#halfHideOrShow").text(filterShow);
		$("#halfHideOrShow").show();
	
}

//add a link to control the refinement panel
//check cookie for refinement panel
	function displayCookies() {
	
	var x=getCookie("sth");

	if (x==null||"")
	{
		x="";
		$("#QCB1 ul:first").append('<li class='+"space"+'><p id='+"hideOrShow"+'>'+
		panelHide+'</p></li>');
		
		//alert (x);
}
	else if (x!="") {
	
		x="sth="+x;
		$("#QCB1 ul:first").append('  <li class='+"space"+'><p id='+"hideOrShow"+'>'+
		panelShow+'</p></li>');
		hideWithoutCookie();
		//alert (x);
}

}


	// Cookie check for Key Filters
	function checkCookies(){
		var y=getCookie("other");
		if (y==null||"")
		{
			y="";
		 	$("#QCB1 ul:first").append('<li class='+"space"+'><p id='+"halfHideOrShow"+'>'+
			filterHide+'</p></li>');
		
			//alert (x);
}
		else if (y!="") {
	
			y="other="+y;

			$("#QCB1 ul:first").append('<li class='+"space"+'><p id='+"halfHideOrShow"+'>'+
			filterShow+'</p></li>');
			halfHideWithoutCookie();
			//alert (y);
}
	
}

});



	function deleteCookie(){
		setCookie("sth","",-1);
	
}
	function deleteOnlyFilter(){
		setCookie("other","",-1);
}





	function getCookie(name) {
	var nameEQ = name + "=";
	//alert(document.cookie);
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1);
	if (c.indexOf(nameEQ) != -1) return c.substring(nameEQ.length,c.length);
}
	return null;
} 


	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	
	
}




</script>