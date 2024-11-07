// ============================================================================================
// JSON UTILITY
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : Utility service related to json like bigInt, function etc pursing problem
// Date         : Wednesday, 30 -October-2024 (09:43:43)
// ============================================================================================

export const fixedJsonBigInt = (obj: any) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) => {
      return typeof value === "bigint" ? value.toString() : value;
    })
  );
};
