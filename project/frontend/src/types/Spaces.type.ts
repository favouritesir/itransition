import { DocumentType } from "./Documents.type";
import { FolderType } from "./Folders.type";
import { UserType } from "./Users.type";
import { WorkSpaceType } from "./WorkSpaces.type";

export interface SpaceType {
  index?: number;
  workSpace?: number;
  owner?: number; // or UserType for owner details
  name?: string;
  deleted?: boolean;
  settings?: SpaceSettingsType; // JSON for space settings
  ownerDetail?: UserType;
  workspaceDetail?: WorkSpaceType;
  documents?: DocumentType[];
  folders?: FolderType[];
}
export interface SpaceSettingsType {}
