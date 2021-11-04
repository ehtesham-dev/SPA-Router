const pathGenerator = () => {
   if(location.hash){
      const hash = location.hash.replace('#', '').split('?')[0]
      const path = (location.pathname ? location.pathname.slice(1) : '')
      return hash + path
   }
   else return location.pathname
}

export default pathGenerator
