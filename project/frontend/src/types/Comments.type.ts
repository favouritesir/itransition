import { DocumentType } from "./Documents.type";
import { UserType } from "./Users.type";

export interface CommentType {
  id?: number;
  document?: number; // or DocumentType for document details
  owner?: number; // or UserType for owner details
  recieveBy?: string;
  replyFor?: number;
  userIdentifire?: string;
  commentForTemplates?: boolean;
  data?: object; // JSON for comment data
  updatedAt?: Date;
  replyDetail?: CommentType;
  documentDetail?: DocumentType;
  ownerDetail?: UserType;
  replies?: CommentType[];
}
