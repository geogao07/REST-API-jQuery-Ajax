
<style>
#form1{
float:left;
border: 1px solid #aaa;
margin-left:50px;
padding: 0.5em 0 0.17em 0;
color: #000;
font: normal 150%/1.5 sans-serif;
}
#form2{
	margin-left:500px;
}
#titleLine{
	border-bottom: 1px solid #aaa;
}

/*remove the default arrow of select box*/
select::-ms-expand {
    display: none;
}


/* css style for selectName box and add new symbol of arrow at the right side of select box*/
.selectClass {
  font-size: 16px !important;
  font-weight: bold !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: url("http://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/br_down.png") white no-repeat 98.5%;
  position: relative;
  overflow:hidden;
  border: 1px solid black;
  min-width: 250px;
  border-radius: 5px;
  box-shadow: 1px 1px 11px #330033;
  background-color:#DCDCDC ;
  padding:0px 20px 0px 15px;
  

}

#tableContainer{

 border-collapse: separate;
    border-spacing: 30px;
}



</style>

<div id="container">
<div id="form1">
<div id="titleLine" class="text1">
Find a Field Support Representative
</div>
<div id="area">
<div class="text">Area</div>
</div>
<div id="country">
<div class="text">Country</div>
</div>
<div id="or">
OR
</div>
<div id="name">
<div class="text">Name</div>
</div>
</div>
<div id="form2">
<table id="tableContainer">
results goes here!!!
	</table>
</div>
</div>

<script type="text/javascript">
		var siteURL = _spPageContextInfo.siteAbsoluteUrl;
		var restURL="";
		var personNameForSelect="";
		var itemName="";
		var itemEmail="";
		var itemPhoto="";
		var itemId="";
		var itemMobilePhone="";
		var itemWorkPhone="";
		var defaultVaule="";
		var tableList="";
		
$(document).ready(function() {
	//create the select box for searching names
		createSelectName();
	function createSelectName(){
		 $.ajax({  
            url: siteURL + "/Wiki/_api/web/lists/getbytitle('Frontline%20Contact%20List')/items?$filter=Title eq'Frontline support'&$select=Team_x0020_Member&$orderby=Team_x0020_Member asc",
            method: "GET",   
            headers: { "Accept":  "application/json; odata=verbose"  },  
            success: function  (data) {  
			var inputElement = '<select id="selectName" class="selectClass"> <option value="" disabled selected>select</option>';  
                $.each(data.d.results, function (index, item) {
				
				//get names of the person
					personNameForSelect = item.Team_x0020_Member;
					
					inputElement += '<option value="'  + personNameForSelect + '">' +personNameForSelect+ '</option>';  
					
				
				});
				//close the select tag
				inputElement += '</select>';  
                $('#name').append(inputElement);  
				
				
				$('#selectName').on('change', function() {
				$currentVal=$(this).val();
				
				
				restURL= siteURL+"/Wiki/_api/web/lists/getbytitle('Frontline%20Contact%20List')/items?$filter=Title eq'Frontline support' and Team_x0020_Member eq'" + $currentVal + "'";
				//get info of the select person
				getInfo();
			})

			},
			
            error: function  (data) {  
                console.log(data);  
           }  
		   })

	}
	
	
	
	function getInfo(){
		
				$.ajax({
				
			//restURL is a filtered url depends on the selection
			
            url: restURL,
            type: "GET",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
            },
            success: function (data) {
			//clean the html first
				
                $.each(data.d.results, function (index, item) {
                    itemName=item.Team_x0020_Member;
					itemId=item.Id;
					//get all other infos
                    getOtherInfo();
                    
                })
				

            },
            error: function (data) {

               alert('Failed to query list. Please check that the PowerBI list exists and is populated.');
			  
            }
			
      })
	}
	
	
	function getOtherInfo()
	 {
		$.ajax({  
            url: siteURL+"/Wiki/_api/web/siteuserinfolist/items?$filter=Id eq "+itemId,
             type: "GET",  
			 
            headers:  
             {  
               "ACCEPT": "application/json;odata=verbose",
               
            },  
           
            success: function(data) 
			{
				$.each(data.d.results, function (index, item) 
				{	
					
					itemWorkPhone=item.WorkPhone;
					itemEmail=item.EMail;
					
					if(item.MobilePhone==null)
					{
						itemMobilePhone="N/A";
					}
					else{
						itemMobilePhone=item.MobilePhone;
					}
					
					
					if(item.Picture==null)
				{	
			
					itemPhoto=siteURL+"/Wiki/_layouts/15/images/personplaceholder.96x96x32.png";
					
				}
				else{
					
					itemPhoto=item.Picture.Url;
				}
					
					createResult();
			})
			},
				error: function(error) {  
                console.log(JSON.stringify(error));  
				
            }  
        });   
	 }
	 
	 
	 
	 
	 function createResult(){
		 $("#tableContainer").html("");
		 tableList="<tr><td><img src="+"'"+itemPhoto+"'"+"height=50px"+"/></td><td><div>" + itemName + "</div><div>"+"Email:"+itemEmail+"</div></td><td><div>Work: "
		 +itemWorkPhone+"</div><div>Cell: "+itemMobilePhone+"</div></td></tr>";
				    
				  $("#tableContainer").append(tableList);
				  
	 }
	
})




</script>