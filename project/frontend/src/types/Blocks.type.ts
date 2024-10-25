import { DocumentType } from "./Documents.type";
import { ResponseType } from "./Responses.type";

export interface BlockType {
  index?: number;
  name?: string;
  pageIndex?: number;
  document?: number; // or DocumentType for document details
  widthRatio?: number;
  titleField?: BlockTitleType; // JSON for title field
  responseField?: BlockResponseType; // JSON for response field
  settings?: BlockSettingsType; // JSON for block settings
  updatedBy?: number;
  updatedAt?: Date;
  documentDetail?: DocumentType;
  responses?: ResponseType[];
}

export interface BlockTitleType {}
export interface BlockResponseType {}
export interface BlockSettingsType {}
