import { CommentType } from "./Comments.type";
import { DocumentType } from "./Documents.type";
import { FolderType } from "./Folders.type";
import { MemberType } from "./Members.type";
import { ProfileType } from "./Profiles.type";
import { ResponseType } from "./Responses.type";
import { SettingsType } from "./Settings.type";
import { SpaceType } from "./Spaces.type";
import { ThemeType } from "./Themes.type";
import { WorkSpaceType } from "./WorkSpaces.type";

export interface UserType {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  active?: boolean;
  blocked?: boolean;
  verified?: boolean;
  proUser?: boolean;
  profile?: ProfileType;
  setting?: SettingsType;
  workspaces?: WorkSpaceType[];
  spaces?: SpaceType[];
  docCreator?: DocumentType[];
  documents?: DocumentType[];
  folders?: FolderType[];
  foldCreator?: FolderType[];
  workSpaceMember?: MemberType[];
  workSpaceOwner?: MemberType[];
  workSpaceHost?: SettingsType[];
  responser?: ResponseType[];
  commenter?: CommentType[];
  themesCreator?: ThemeType[];
}
