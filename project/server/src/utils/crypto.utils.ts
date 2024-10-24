import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}

export const bHash = (str: any, slt: number = 10) => {
  bcrypt.hashSync(str, slt);
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
