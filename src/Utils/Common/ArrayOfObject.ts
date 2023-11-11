/**
 * this function help us to find an object inside an array using a key and it's value
 * @param arrObj an array of objects of type T
 * @param key a key of the type T, with which you find an object inside the array
 * @param value the value of the previous key, you want use for searching
 * @returns the first object inside the array to match that key whit the purposed value
 */
export const findByKey = <T extends object>(
  arrObj: T[],
  key: keyof T,
  value: unknown
) => {
  return arrObj.find((el) => el[key] === value);
};

/**
 * this function help us to find the index of an object inside an array using a key and it's value
 * @param arrObj an array of objects of type T
 * @param key a key of the type T, with which you find an object inside the array
 * @param value the value of the previous key, you want use for searching
 * @returns the index of the first object inside the array to match that key whit the purposed value
 */
export const findIndexByKey = <T extends object>(
  arrObj: T[],
  key: keyof T,
  value: unknown
) => {
  return arrObj.findIndex((el) => el[key] === value);
};
