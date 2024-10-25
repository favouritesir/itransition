import { BlockType } from "./Blocks.type";
import { DocumentType } from "./Documents.type";
import { UserType } from "./Users.type";

export interface ResponseType {
  index?: number;
  pageIndex?: number;
  document?: number; // or DocumentType for document details
  responseBy?: number; // or UserType for responder details
  userIdentifire?: string;
  data?: ResponseDataType; // JSON for response data
  responseStart?: Date;
  responseEnd?: Date;
  blockDetail?: BlockType;
  documentDetail?: DocumentType;
  responserDetail?: UserType;
}
export interface ResponseDataType {}
