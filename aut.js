var http = require('http');
var request = require('request');
var cheerio = require('cheerio');
var url = require("url");
var express = require('express');
var app = express();
var httpServer = http.createServer(app);

app.post('/scrape', function (req, res) {
    
	console.log('inside the main method!');


var urlObj = url.parse(req.url, true);
	var siteUrl = urlObj['query']['siteurl'];
	var hookUrl = urlObj['query']['posturl'];
	var itemId  = urlObj['query']['itemid'];
	
	request(siteUrl, function(err, resp, html) {
        if (!err){
         const $ = cheerio.load(html);
		 
         var cat=[];
	     var img=[];
	     var ind=[];
		 var asimg;
		
// Product Title
      $('.assemblyProductDescription').each(function(i,elem) {
        var link = $(this);
        cat[i] = link.text();

       });
  


// Product image url
      $('.assemblyProductImage').each(function(i,elem) {
        var link = $(this).children();
		img[i] = link.attr('href');
        img[i] ="https://parts.vw.com"+img[i];
    
        });



// Product Index
      $('.assemblyProductIndex').each(function(i,elem) {
        var link = $(this);
		ind[i] = link.text();
      
    
       });
 
//Assembly Image

$('#ctl00_Content_PageBody_fullsizeImgAssembly').each(function(i,elem) {
        var link = $(this);
		asimg=link.attr('src');
		asimg="https://parts.vw.com"+asimg;
      
    
       });
 
   

function ob(ind, cat, img, itemId) {
    this.ind = ind;
    this.cat = cat;
    this.img = img;
	this.itemId=itemId;
}

var arrayList=[];
for(var i=0;i<cat.length;i++)
{
var tobject = new ob(ind[i], cat[i], img[i],itemId);
arrayList.push(tobject);
var temp=JSON.stringify(tobject);
//var send='{"ind":"'+ind[i]+'"}'
console.log(hookUrl);
request(hookUrl,{
		method:'POST',
		body: temp,
	});
}

// Update Assembly Image
var aimg = new Array(itemId, asimg );
var temp1=JSON.stringify(aimg);
request("https://secure.globiflow.com/catch/ff7lw0w6l157naq",{
		method:'POST',
		body: temp1
	});



var len=cat.length;
var strjson=JSON.stringify(arrayList);
strjson=strjson.replace(/\r?\n|\r/g, " ");
res.json(JSON.parse('{"list":'+strjson+',"assembly_image":"'+asimg+'","total_item":'+len+'}'));	
//res.json(JSON.parse('{"list":'+strjson+'}'));	


}
	  
	   if(err)
	   {
		  res.json('{"Error" : "No HTML Response"}');
		  
	   }
});
});
console.log("Server about to start")
app.listen(80);
