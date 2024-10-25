export interface ThemeType {
  id?: number;
  createdBy?: number; // or UserType for creator details
  name?: string;
  forDarkMode?: boolean;
  verified?: boolean;
  deleted?: boolean;
  content?: object; // JSON for theme content
  reviews?: object; // JSON for theme reviews
  // ownerDetail?: UserType;
  // workspaces?: WorkSpaceType[];
}
