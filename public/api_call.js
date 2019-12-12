function executeSearch()
{
    var hash="";
    //Write Loading text to the screen
    document.getElementById('output_text').innerHTML = "<img class='loading' src='loading.gif'/>";

    //Get the User Query
    var user_query = document.getElementById('user_url_input').value;
        console.log(user_query);

    //Get the User Length Input
    var user_length = document.getElementById('user_length_input').value;
        console.log(user_length);

    ///GENERATE HASH///
		var append = user_query + user_length;
		console.log("APPEND IS: " + append);
		
		var hash_call = "https://api.hashify.net/hash/sha256/hex?value=" + append;
				console.log("hash call is: " + hash_call);
		
		$.getJSON(hash_call, function(data){
				hash = data.Digest;
				console.log("hash is: " + hash);
				var MDBSearchURL = "./searches/" + hash;
				$.getJSON(MDBSearchURL, function (Mdata) {
					if (!Mdata.error) {
						console.log("Data from MongoDB " + MDBSearchURL + " is :");
						console.log(Mdata);
						document.getElementById('output_text').innerHTML = Mdata.data + "<br/><br/><a id='citeButton' href='http://www.easybib.com/mla8/website-citation/search?q=" + user_query + "' target='_blank'>Cite it on EasyBib</a>";
						
					} else {
						console.log(Mdata.error);
						//API Key access
						var api_key = "892355EAD9"
						//Note: Doing this is a ROYALLY shite idea, and shoud not be allowed anywhere near production if we end up paying for credits.
						//Another Note: Each API key generated via an email will grant 100 free calls per day. Theoretically, we can generate like 100 keys and rotate them out whenever one key's API Call Limit is reached.
		
						//Proxy server to bypass active JSON object injection/XSS filter
						var cors_anywhere_proxy = "https://cors-anywhere.herokuapp.com/";
		
						//Piece together API Call
						var api_call = cors_anywhere_proxy + "http://api.smmry.com/&SM_API_KEY=" + api_key + "&SM_LENGTH=" + user_length + "&SM_URL=" + user_query;
						//Retrieve JSON info from API Call
						$.getJSON(api_call, function (data) {
							console.log(data);
							console.log(data.sm_api_content);

							//Look for error
							if (data.sm_api_error) {
								document.getElementById('output_text').innerHTML = "<span class='Error'>ERROR: " + data.sm_api_message + "<br/>Please try a different website.</span>";
							} else {
								var jsonData = {
									hash: hash,
									data: data.sm_api_content
								}
								$.ajax({
										method: "POST",
										url: "./searches",
										data: JSON.stringify(jsonData),
										contentType: "application/json; charset=utf-8",
										dataType: "json",
										success: function(response, textStatus, jqXHR) {
											console.log("Success");
										},
										error: function(jqXHR, textStatus, errorThrown){
											console.error("Error Sending Data To Server.");
											alert(textStatus, errorThrown);
										}
								});
								console.log(jsonData);

								//Output Summarized Content
								var summarized_content = data.sm_api_content;
								document.getElementById('output_text').innerHTML = summarized_content + "<br/><br/><a id='citeButton' href='http://www.easybib.com/mla8/website-citation/search?q=" + user_query + "' target='_blank'>Cite it on EasyBib</a>";
							}
						});
					}
				});
		})
}

//Creates dropdown selector. Courtesy of: https://stackoverflow.com/questions/10142643/easy-way-to-add-drop-down-menu-with-1-100-without-doing-100-different-options
$(function(){
    var $select = $(".user_length_input");
    for (i=5;i<=40;i++){
        $select.append($('<option></option>').val(i).html(i))
    }
});
