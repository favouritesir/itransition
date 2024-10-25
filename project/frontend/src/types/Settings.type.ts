import { DocumentType } from "./Documents.type";
import { UserType } from "./Users.type";

export interface SettingsType {
  id?: number;
  currentDoc?: number;
  ltr?: boolean;
  hour24?: boolean;
  light?: boolean;
  others?: SettingsOthersType; // JSON for other settings

  userDetails?: UserType;
  docDetails?: DocumentType;
}
export interface SettingsOthersType {}
