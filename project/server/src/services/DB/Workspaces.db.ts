import { WorkSpaceType } from "../../types/WorkSpaces.type";
import { UserType } from "../../types/Users.type";
import prisma from "./prismaClient";
import { userDB } from "./Users.db";

export const WorkSpaces = prisma.workSpaces;

export interface WorkSpacesStateType {
  count?: number;
  current?: WorkSpaceType;
  owner: UserType;
  spaces?: object;
}

class WorkSpacesDB {
  private state: WorkSpacesStateType;

  constructor(user: UserType) {
    this.state = { owner: user };
  }

  //ok
  async totalWorkSpaces() {
    if (this.state.count) return this.state.count;
    this.state.count = await WorkSpaces.count({
      where: { owner: this.state.owner.id },
    });
    return this.state.count;
  }

  //not ok
  async getCurrentWorkSpace() {
    if (this.state.current) return this.state.current;
    const settings = userDB(this.state.owner).getSettings();
    return this.state.current;
  }

  getOwnWorkSpaces() {}
  getWorkspaceByIndex() {}
  getAllWorkSpaces() {}
}
