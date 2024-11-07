// ============================================================================================
// STRING UTILITIES
// ============================================================================================
// AUTHOR       : Ashikur Rahman
// DESCRIPTION  : All utilities related to string will be added here inShaAllah.
// Date         : Wednesday, 30 -October-2024 (11:12:51)
// ============================================================================================

/************************************************************************************************* TO CAMEL CASE */
export const toCamelCase = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1);
