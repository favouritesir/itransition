import { UserType } from "./Users.type";

export interface WorkSpaceType {
  index?: number;
  owner?: number; // or UserType if you want to populate owner details
  name?: string;
  code?: number;
  themeIndex?: number;
  deleted?: boolean;
  settings?: WorkSpaceSettingsType; // JSON for workspace settings
  ownerDetail?: UserType;
  // theme?: ThemeType;
  // spaces?: SpaceType[];
  // currentUsers?: SettingsType[];
  // members?: MemberType[];
}

export interface WorkSpaceSettingsType {}
