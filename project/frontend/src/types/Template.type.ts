export interface TemplateType {
  id?: number;
  title?: string;
  description?: string;
  verified?: boolean;
  deleted?: boolean;
  categories?: number;
  updatedAt?: Date;
  contents?: object; // JSON for template contents
  reviews?: object; // JSON for reviews
}
