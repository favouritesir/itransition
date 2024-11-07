/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * Title: uiLang Hook
 * Description: to manage the languages of the application
 * Author: Ashikur Rahman SA
 * Date: Monday, 28 -October-2024 (16:06:05)
 *
 */

import { create } from "zustand";

/************************************************************************************************* STATE INTERFACE */
interface langObjType {
  name: string;
  code: string;
  id?: number;
}
export interface langState {
  available?: langObjType[];
  active?: number;
  data: { [key: string]: string };
  set: (callBack: (state: langState) => any) => any;
}
/************************************************************************************************* UI LANGUAGE STORE */
const useLangStore = create<langState>((update) => ({
  active: 0,
  available: [],
  data: {},
  set: (callBack: (state: langState) => any) => update(callBack), // call set({property:value})
}));

/************************************************************************************************* CURRENT UI TEXT STORE */
class currentUiText {
  private currentUiText = new Set();
  pushCurrentText(value: string) {
    this.currentUiText.add(value);
  }
  getCurrentText() {
    return Array.from(this.currentUiText);
  }
}

/************************************************************************************************* ALL UNIQUE UI TEXT FOR CURRENT PAGE */
const useCurrentUiText = create(() => ({
  currentUiText: new currentUiText(),
}));

/************************************************************************************************* MAIN HOOK FOR THE USE UI LANGUAGE */
const useUiLang = () => {
  const { data, set } = useLangStore();
  const { currentUiText } = useCurrentUiText();

  const updateUiLan = (key: string, val: string) => {
    if (!key) return;
    key = key.toLowerCase();
    val = val.toLowerCase();
    set((state: langState) => ({
      data: {
        ...state.data,
        [key]: val,
      },
    }));
  };

  const uiLan = (text: string) => {
    try {
      text = text.trim().toLowerCase();
      if (data[text]) {
        currentUiText.pushCurrentText(text);
        return data[text];
      } else {
        console.log("setNewData");
        updateUiLan(text, text);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { uiLan, updateUiLan, data, currentUiText };
};

export default useUiLang;
