export interface MemberType {
  id?: number;
  workspaceIndex?: number;
  workSpaceOwner?: number;
  spaces?: number[];
  editor?: boolean[];
  settings?: object; // JSON for member settings
  // workspaceMember?: UserType;
  // workspaceOwnerDetail?: UserType;
  // workspaceDetail?: WorkSpaceType;
}
