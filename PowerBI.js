<style>

#powerBINavigation
{
	width:100%;
}

[id^="nodesBI"]
{
	float: left;
	width: 150px;
	height: 25px;
	text-align: center;
    border-style: solid;
    border-width: 1px;
    border-color: rgba(153, 153, 153, 0.5);
    background-color: rgba(209, 209, 209, 0.75);
    margin-right: 5px;
    padding: 2px;
}

[id^="nodesBI"]:hover
{
	 background-color: rgba(140, 115, 115, 0.5);
}

#iframeContainer
{
	width: 100%;
	height: 1000px;
}

#powerBIIframe
{
	width: 100%;
	height: 1000px;
}

.selectedNode
{
	background-color: rgba(115, 140, 128, 0.5);
}

</style>

<div style="padding: 5px 0 0 5px; height: 50px; width: 150px;position:relative;left:100;top:0" id="cate">
Category
</div>

<div id="powerBINavigation">

</div>

<div id="iframeContainer">
	<iframe id="powerBIIframe">
	</iframe>
</div>


<script type="text/javascript">

//Query the PowerBI list and build the navigation list

		var incementItems = 1; 

        var siteURL = _spPageContextInfo.siteAbsoluteUrl;
		var restURL="";
		
	  
	  createSelect();
	  
	  
	function createSelect(){  
	 $.ajax({  
            url: siteURL + "/_api/web/lists/getbytitle('YourTitle')/items?$select=Title",
            method: "GET",   
            headers: { "Accept":  "application/json; odata=verbose"  },  
            success: function  (data) {  
			var inputElement = '<select id="cat"> <option  value=""></option>';  
                $.each(data.d.results, function (index, item) {
				
				// creating the dropdown select
				
				var itemId = item.Title,  
                   itemVal = item.Title;
				   
				   if(index==0){
				   
				inputElement += '<option value="'  + itemId + '"selected>'  + itemId + '</option>'; 
				}
				
				
				
					else
					{
					inputElement += '<option value="'  + itemId + '">' +itemId+ '</option>';  
					}
				});
				inputElement += '</select>';  
                $('#cate').append(inputElement);  
				// this is the method for switching options in the dropdown select
				
				$('#cat').on('change', function() {
				$currentVal=$(this).val();
				
				//console.log($currentVal);
				
				restURL= siteURL+"/_api/web/lists/getbytitle('YourTitle')/items?$select=Title,URL,Category/Title&$expand=Category&$filter=Category/Title eq '" + $currentVal + "'";
				
				display();
			})
			},
			
            error: function  (data) {  
                failure(data);  
           }  
		   })

}
			
			
			function display(){
				
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
			
				$("#powerBINavigation").html("");
				
                $.each(data.d.results, function (index, item) {
                    
                    var reportTitle = item.Title;
                    reportURL = item.URL.Url;
					var nodeID = "nodesBI" + incementItems;

                    var htmlNode = "<div id='" + nodeID + "' src='" + reportURL + "'>" + reportTitle + "</div>";
					$("#powerBINavigation").append(htmlNode);

                })

            },
            error: function (data) {

               alert('Error');
			  
            }
			
      })
	$("div[id^='nodesBI']").click(function(){
    //functions goes here
			}

</script> 





		
		

		
		
		
		
		
		

	