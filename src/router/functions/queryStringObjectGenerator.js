const queryStringObjectGenerator = () => {

   const fixAndDecode = string => {
      return decodeURIComponent(string.replace(/\+/g, " "));
   }

   const queryRegex = /([^&=]+)=?([^&]*)/g

   const query = window.location.search.substring(1);
   let urlParams = {};

   let match
   while (match = queryRegex.exec(query))
      urlParams[fixAndDecode(match[1])] = fixAndDecode(match[2]);

   return urlParams
}

export default queryStringObjectGenerator
