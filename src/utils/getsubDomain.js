// const usecases = [
//     "http://www.miles.onrender.com",
//     "http://www.agency.miles.onrender.com",
//     "http://miles.onrender.com",
//     "http://agency.miles.onrender.com",
//     "http://www.miles.app",
//     "http://www.agency.miles.app",
//     "http://miles.app",
//     "http://agency.miles.app",
//     "agency.miles.app",
//     "www.agency.miles.app",
//     "miles.app",
//     "agency.localhost.et",
//     "agency.localhost",
//     "localhost.et",
//     "localhost",
//   ]

export function getsubDomain(url=window.location.href) {
    const domains = ['.onrender','frontend.dev.','frontend.qa.','frontend.staging.']
  
    let modURL = url;
  
    try {
      modURL = modURL.replace('http://','')
      modURL = modURL.replace('https://','')
  
      domains.forEach(domain => {modURL = modURL.replaceAll(domain,'')})
  
      let hostname = (new URL('http://'+modURL)).hostname;
      let seg = hostname.split('.');
      
      if (seg.length > 2) {
        return seg?.at(-3) !== 'www' ? seg?.at(-3) : null;
      } else if(seg?.at(-1)?.toLowerCase() === 'localhost' && seg.length > 1) {
        return seg[0]
      }
    } catch(ex) {}
    return null; // or any other default value you prefer
}
  