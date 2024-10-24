import { generateRandomNumber } from "./crypto.utils";

export const UTCmillis = () => Date.now();
export const UTCmicros = () =>
  Date.now() * 1000 + generateRandomNumber(100, 1000);
