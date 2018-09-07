<script type="text/javascript">
var dataContent = { '__metadata': { 'type': 'SP.Data.List'},
                    'Title': "newTitle",
					'Pictures':
                         {
                        '__metadata': { 'type': 'Sp.sometype' },
                        'Description': 'url' ,
						'Url': 'url '  
                        }

                    };

var urlSite = "urlsite/_api/web/lists/getbytitle('urlist')/items";

$.ajax({
        url:urlSite,
            type: "POST", 
            async: false,
			
            headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    //"IF-MATCH": "*",
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    //"X-HTTP-Method": "MERGE"
        },
            data: JSON.stringify(dataContent),

            success: function(data){
                            console.log("Successfully Added!");        
        },
            error: function(data,error) {
                                   console.log(data);
                                    console.log(urlSite);
        }
    });
</script>

<script type="text/javascript">
var dataContent = { '__metadata': { 'type': 'SP.Data.list'},
                    'Title': "titleNew2"
                    };

var urlSite = "url/_api/web/lists/getbytitle('urListName')/items(index)";

$.ajax({
        url:urlSite,
            type: "POST", 
            async: false,
			
            headers: {
                    "ACCEPT": "application/json;odata=verbose",
                    "content-type": "application/json;odata=verbose",
                    "IF-MATCH": "*",
					"X-RequestDigest": $("#__REQUESTDIGEST").val(),
                    "X-HTTP-Method": "MERGE"
        },
            data: JSON.stringify(dataContent),

            success: function(data){
                            console.log("success");        
        },
            error: function(data,error) {
                                   console.log(data);
                                    console.log(urlSite);
        }
    });
</script>


<script type="text/javascript">
//var dataContent = { '__metadata': { 'type': 'SP.Data.List'}

                   
              //      };

var urlSite = "url/_api/web/lists/getbytitle('urList')/items(index)";

$.ajax({
	url:urlSite,
	type: 'delete',
    headers: {
    
    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    'accept': "application/json;odata=verbose",
    'content-type': "application/json;odata=verbose",
	 "IF-MATCH": "*",
	"X-HTTP-Method":"DELETE"


    
        },
            //data: JSON.stringify(dataContent),

            success: function(data){
                            console.log("Deleted");        
        },
            error: function(data,error) {
                                   console.log(data);
                                    console.log(urlSite);
        }
    });
</script>



