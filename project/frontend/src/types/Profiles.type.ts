import { UserType } from "./Users.type";

export interface ProfileType {
  id?: number;
  fullName?: string;
  phone?: string[];
  address?: object; // JSON object for address
  birthDate?: Date;
  gender?: "MALE" | "FEMALE" | "OTHER" | "ORGS";
  languageIndex?: number;
  countryIndex?: number;
  createdAt?: Date;
  updatedAt?: Date;
  others?: object; // JSON for other profile details
  // languageDetail?: UiLanguageType;
  userDetails?: UserType;
}
