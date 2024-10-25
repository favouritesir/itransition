/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { UserType } from "../types/Users.type";

// Interface for Zustand state
interface UseApp {
  user: UserType | null;
  appState: AppState;
  setUser: (userObj: UserType) => void;
  api: object | null | any;
  setApi: (userObj: UserType) => void;
}

// AppState class for managing app-specific state
class AppState {
  private appState: { [key: string]: any } = {}; // Type for appState object

  push(key: string, value: any) {
    this.appState[key] = value;
  }
  fetch(key: string) {
    return this.appState[key];
  }
  get keys() {
    return Object.keys(this.appState); // Getting all keys
  }

  del(key: string) {
    delete this.appState[key]; // Deleting a key from appState
  }
}

const useApp = create<UseApp>((set) => ({
  user: null, // Initialize as null or a valid UserType object
  setUser: (userObj: UserType) =>
    set((state) => ({
      user: { ...state.user, ...userObj }, // Merging the current user state with the new object
    })),
  appState: new AppState(), // Initializing a new AppState object
  api: null, // Initialize as null or a valid UserType object
  setApi: (api: object) => {
    set((state) => ({
      api: { ...state.api, ...api }, // Merging the current api state with the new object
    }));
  },
}));

export default useApp;
