const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[] // k are key of object T
): Partial<T> => {
  const finalObj: Partial<T> = {};
  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      //Object.hasOwnProperty.call(main-obj-target,key-to-find)
      finalObj[key] = obj[key];
    }
  }
  return finalObj;
};

export default pick;
