import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
/************************************************************************************************* CONFIG */

interface DecodedToken extends JwtPayload {
  id: string;
}

export const passHash = (str: any, slt: number = 10) => {
  try {
    return { hash: bcrypt.hashSync(str, slt) };
  } catch (err) {
    return { err };
  }
};

export const passVerify = (pass: string, hash: string) => {
  try {
    return { isVerified: bcrypt.compareSync(pass, hash) };
  } catch (err) {
    return { err };
  }
};

export const generateHash = (
  data: any,
  formate: "base64" | "binary" | "hex" | "base64url" = "hex",
  alg:
    | "md5"
    | "sha3-256"
    | "sha1"
    | "sha256"
    | "sha512"
    | "sha3-256"
    | "sha3-224"
    | "sha3-384"
    | "sha3-512"
    | "whirlpool" = "sha3-256"
) => {
  return crypto.createHash(alg).update(data).digest(formate);
};

export const generateRandomNumber = (a: number, b?: any): number => {
  return b ? crypto.randomInt(a) : crypto.randomInt(a, b);
};

export const decodeJWT = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
  } catch (error) {
    throw new Error("Error decoding token:");
  }
};
