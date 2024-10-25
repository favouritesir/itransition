export interface UiLanguageType {
  id?: number;
  name?: string;
  code?: string;
  deleted?: boolean;
  content?: object; // JSON for language content
  // users?: ProfileType[];
}
