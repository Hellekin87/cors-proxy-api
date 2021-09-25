const jwt = require("jsonwebtoken");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { validationResult } = require('express-validator');

module.exports =  {

   proxied_request: async function (req, res, next) {
      const errors = validationResult(req);
      console.log(errors)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
         console.log("Making proxied request...")
         let url = req.query.url
         let website = await fetchWebiste(url)
         res.status(200).jsonp(website); 
      } catch (error) {
         res.status(400).jsonp({
            "message": error
         }); 
      }

   }

};

const fetchWebiste = (url) => {
   return new Promise(function(resolve, reject) {
       console.log("Getting content from Website:", url)
       var proxy_url = process.env.PROXY_URL + "/" + url;

       var request = new XMLHttpRequest();
       request.open('GET', proxy_url);
       request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
       
       request.onload = function() {
           if (request.status === 200) {
               resolve(request.responseText)
           } else {
               reject(Error('An error occurred while loading page. error code:' + request.statusText));
           }
       };
       request.send();
   });
}


