/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface UseApp {
  appState: {
    state: { [key: string]: any };
    push: (key: string, value: any) => void;
    fetch: (key: string) => any;
    del: (key: string) => void;
  };
}

const useApp = create<UseApp>((set) => ({
  appState: {
    state: {},
    push: (key: string, value: any) =>
      set((state) => ({
        appState: {
          ...state.appState,
          state: { ...state.appState.state, [key]: value },
        },
      })),
    fetch: (key: string) => useApp.getState().appState.state[key],
    del: (key: string) =>
      set((state) => {
        const newState = { ...state.appState.state };
        delete newState[key];
        return { appState: { ...state.appState, state: newState } };
      }),
  },
}));

export default useApp;

// its realy posible to simplify the store for our application
export const useAnythig = create<any>((update) => ({
  set: (callBack: any) => update(callBack), // call set({property:value})
}));
