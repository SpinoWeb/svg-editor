// class Utils
class Utils {
  constructor() {}

  //
  colors = () => {
    return {
      background: "#FFFFFF",
      surface: "#FFFFFF",
      primary: "#6200EE",
      secondary: "#03DAC6",
      error: "#B00020",
      info: "#2196F3",
      success: "#4CAF50",
      warning: "#FB8C00",
    };
  };

  // chech debug / development mode
  debug = () => {
    //return process.env.NODE_ENV === "development" ? true : false;
    return import.meta.env.DEV;
  };

  // generate uuid of custom number of chars
  uuid = (len: number = -1) => {
    //console.log("Utils > uuid", len);
    const numberOfChars = len ? (len > 0 && len <= 36 ? len : 36) : 36;
    //console.log("Utils > uuid", len, numberOfChars);
    // c13b68cc-64cd-4a23-9f04-bf5325347466

    let dt = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );

    //console.log("Mixin > _create_UUID > uuid", uuid);
    return uuid.substring(0, numberOfChars);
  };

  numFormat = (n: number, d: number = -1) => {
    const pow = d > -1 ? Math.pow(10, d) : 0;
    //console.log(pow);

    return Math.round(n * pow) / pow;
  };

  // create a slug starting from a string
  // https://gabrieleromanato.com/2023/08/come-creare-uno-slug-a-partire-da-una-stringa-con-javascript
  createSlug = (str: string) => {
    return str
      .replace(/[^\w\s-]/g, "")
      .trim() // removeSpecialCharacters
      .toLowerCase() // convertToLowerCase
      .replace(/\s+/g, "-") // replaceSpacesWithHyphens
      .replace(/-+/g, "-"); // removeMultipleHyphens
  };

  // clone object / array
  clone = (obj: any = {}) => {
    return JSON.parse(JSON.stringify(obj));
  };

  // groupby objects in an array
  groupBy = (xs: any, key: string) => {
    return xs.reduce(function (rv: any, x: any) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  // get difference between two objects
  getDifferenceBetween2Objects0 = (a: any, b: any) =>
    Object.fromEntries(
      Object.entries(b).filter(([key, val]) => key in a && a[key] !== val)
    );

  getDifferenceBetween2Objects = (a: any, b: any) =>
    Object.entries(b)
      .filter(([key, val]) => a[key] !== val && key in a)
      .reduce((a, [key, v]) => ({ ...a, [key]: v }), {});

  // check if two arrays are equal
  // https://gomakethings.com/how-to-check-if-two-arrays-are-equal-with-vanilla-js/
  arraysMatch = (arr1: any = [], arr2: any = []) => {
    //console.log("Utils > arraysMatch > (arr1, arr2) : ", arr1, arr2);

    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) return false;

    // https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
    for (let i = 0, l = arr1.length; i < l; i++) {
      // Check if we have nested arrays
      if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
        // recurse into the nested arrays
        if (!arr1[i].equals(arr2[i])) return false;
      } else if (arr1[i] != arr2[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;

    // Check if all items exist and are in the same order
    /*for (var i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) return false;
            }
        
            // Otherwise, return true
            return true;*/
  };

  // check if object has all keys
  objHasKeys = (obj: any = {}, keys: any = []) => {
    //console.log("Utils > objHasKeys > (obj, keys)", obj, keys);

    // keys : string or array of string
    let arr: Array<string> = Array.isArray(keys) ? keys : [keys];

    // init flag, i
    let flag: boolean = true,
      i: number = 0;

    // check
    while (flag && i < arr.length) {
      let key = arr[i];
      //flag = obj.hasOwnProperty(key) ? true : false;
      flag = typeof obj[key] != "undefined" ? true : false;
      i++;
    }

    return flag;
  };

  // Merge two objects with same keys without duplicates
  //https://stackoverflow.com/questions/76166284/merge-two-objects-with-same-keys-without-duplicates
  mergeObj = (...objs: any[]) => {
    const keys: Array<string> = objs.map((o) => Object.keys(o)).flat();
    return keys.reduce((result: any, key: string) => {
      result[key] = [...new Set(objs.map((o) => o[key]).flat())];
      return result;
    }, {});
  };
}
// export
export { Utils };
