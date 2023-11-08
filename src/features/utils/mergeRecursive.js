export default function mergeRecursive(o1, o2,config) {
  let obj1 = o1;
  let obj2 = o2;

  const options = {
    createNew: true,
    ...config
  }

  for (var p in obj2) {
    try {
      // Property in destination object set; update its value.
      if ( obj2[p].constructor===Object ) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);

      } else {
        if(!obj1.hasOwnProperty(p))
          throw new Error(`Property '${p}' does not exist in obj1`)

        if(obj1[p] === null || obj1[p] === '')
          if(obj2[p] !== null)
          obj1[p] = obj2[p];

      }

    } catch(e) {
      // Property in destination object not set; create it and set its value.
      // console.log(e)
      if(obj2[p] !== null && options.createNew)
        obj1[p] = obj2[p];

    }
  }

  return obj1;
}


export function mergeObjects(obj1, obj2) {
  if (obj1 === null || obj1 === undefined) {
    return obj2;
  }

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    return obj1.concat(obj2);
  }

  let result = {};
  let keys = Object.keys(obj1).concat(Object.keys(obj2));
  keys.forEach((key) => {
    if (key in obj1 && key in obj2) {
      if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
          result[key] = obj1[key].concat(obj2[key]);
        } else {
          result[key] = mergeObjects(obj1[key], obj2[key]);
        }
      } else {
        result[key] = obj2[key];
      }
    } else if (key in obj1) {
      if (obj1[key] === null || obj1[key] === undefined) {
        result[key] = obj2[key];
      } else {
        result[key] = obj1[key];
      }
    } else {
      result[key] = obj2[key];
    }
  });
   return result;
}