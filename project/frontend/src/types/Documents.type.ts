import { BlockType } from "./Blocks.type";
import { CommentType } from "./Comments.type";
import { FolderType } from "./Folders.type";
import { ShareType } from "./global.types";
import { ResponseType } from "./Responses.type";
import { SpaceType } from "./Spaces.type";
import { UserType } from "./Users.type";

export interface DocumentType {
  id?: number;
  index?: number;
  spaceIndex?: number;
  folder?: number; // or FolderType for folder details
  creator?: number; // or UserType for creator details
  owner?: number; // or UserType for owner details
  docType?: "FORM" | "QUIZ" | "POLL"; // enum for FORM, QUIZ, POLL
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  liveResponse?: boolean;
  deleted?: boolean;
  trashed?: boolean;
  pages?: string[];
  shares?: ShareType; // JSON for shares
  settings?: DocumentSettingsType; // JSON for document settings
  spaceDetail?: SpaceType;
  ownerDetail?: UserType;
  creatorDetail?: UserType;
  folderDetail?: FolderType;
  blocks?: BlockType[];
  responses?: ResponseType[];
  comments?: CommentType[];
}

export interface DocumentSettingsType {}
