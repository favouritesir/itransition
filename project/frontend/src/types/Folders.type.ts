import { DocumentType } from "./Documents.type";

import { SpaceType } from "./Spaces.type";
import { UserType } from "./Users.type";

export interface FolderType {
  id?: number;
  space?: number;
  creator?: number; // or UserType for creator details
  owner?: number; // or UserType for owner details
  parent?: number; // or FolderType for parent folder
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean;
  // shares?: ShareType; // JSON for folder shares
  settings?: FolderSettingsType; // JSON for folder settings
  creatorDetail?: UserType;
  ownerDetail?: UserType;
  spaceDetail?: SpaceType;
  parentFolderDetails?: FolderType;
  documents?: DocumentType[];
  childFolders?: FolderType[];
}

export interface FolderSettingsType {}
