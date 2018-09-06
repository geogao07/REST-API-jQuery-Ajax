<div id="container">
	<table id="tableContainer">
	</table>
</div>
<style>
.important {
    font-weight: bold;
    font-size: x-large;
}
table, th, td {
    border: 1px solid black;
}
tr,td{
	
   color: white;
     text-shadow: 2px 2px 4px #000000;

}
.blue {
    color: blue;
}
</style>
<script type="text/javascript">

//console.log('javascript');
$.ajax({

            url: "YourURL/_api/web/lists/getbytitle('FileName')/items?$select=Title,Description,Price,colors,Pictures,In_x0020_Store,Made_x0020_by/Title&$expand=Made_x0020_by",
            type: "GET",
            async: false,
            headers: {
                "accept": "application/json;odata=verbose",
            },
			
            success: function (data) {
				$("#tableContainer").append("<tr><td>"+"Title"+"</td><td>"+"Description"+"</td><td>"+"Price"+"</td><td>"+
				"Color"+"</td><td>"+"Manufacture"+"</td><td>"+"InStore"+"</td><td>"+"PictureURL"+"</td></tr>");
                $.each(data.d.results, function (index, item) {
					//console.log(item);
					var itemTitle=item.Title;
				
					var itemMadeBy=item.Made_x0020_by.Title;
					var itemPrice=item.Price;
					var itemInStore=(item.In_x0020_Store)?"Yes":"No";
				   var tableList="<tr><td>" + itemTitle + "</td><td>"+item.Description+"</td><td>"+itemPrice+
				   "</td><td>"+item.colors+"</td><td>"+itemMadeBy+ "</td><td>"+itemInStore+ "</td><td><img src="+item.Pictures.Url+"/></td></tr>";
				   
				   $("#tableContainer").append(tableList);
				  $("#tableContainer").css("background-color","hsl(225, 75%, 75%)"); 
				  
                })
            }
        });

</script>



