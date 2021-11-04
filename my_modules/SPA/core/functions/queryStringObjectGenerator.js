const queryStringObjectGenerator = () => {

   const fixAndDecode = string => {
      return decodeURIComponent(string.replace(/\+/g, " "));
   }

   const queryRegex = /([^&=]+)=?([^&]*)/g

   let query = window.location.search.substring(1);

   if(window.location.hash){
      query = window.location.hash.replace('#','').split('?')[1]
   }

   let urlParams = {};

   let match
   while (match = queryRegex.exec(query))
      urlParams[fixAndDecode(match[1])] = fixAndDecode(match[2]);

   return urlParams
}

export default queryStringObjectGenerator
