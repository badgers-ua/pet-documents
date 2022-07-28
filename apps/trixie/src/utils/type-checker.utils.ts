/**
 * getType(10)          //==>> number
 * getType("")          //==>> string
 * getType([])          //==>> array
 * getType({})          //==>> object
 * getType(null)        //==>> null
 * getType(undefined)   //==>> undefined
 * getType(true)        //==>> boolean
 * getType(getType)    	//==>> function
 * getType(new Date())  //==>> date
 */
const getType = (obj: any): string =>
  Object.prototype.toString
    .call(obj)
    .match(/.* (.*)\]/)[1]
    .toLowerCase();

export const isNumber = (obj: any) => typeof obj === 'number' && !isNaN(obj);

export const isString = (obj: any) => typeof obj === 'string';

export const isArray = (obj: any) => Array.isArray(obj);

export const isObject = (obj: any) => getType(obj) === 'object';

export const isNull = (obj: any) => getType(obj) === 'null';

export const isUndefined = (obj: any) => getType(obj) === 'undefined';

export const isFunction = (obj: any) => getType(obj) === 'function';

export const isDate = (obj: any) => getType(obj) === 'date';
