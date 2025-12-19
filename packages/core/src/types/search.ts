export interface SearchItem {
  id: string;
  type: SearchItemType;
  avatar?: string | any;
  name: string;
  category: SearchCategory;
}
export interface SectionData {
  title: string;
  data: any[];
}
export type SearchItemType = "user" | "business";
export type SearchCategory = "send" | "request" | "all";

export const SEARCH_CATEGORIES = {
  SEND: "send" as SearchCategory,
  REQUEST: "request" as SearchCategory,
  ALL: "all" as SearchCategory,
} as const;

export const SEARCH_TYPES = {
  USER: "user" as SearchItemType,
  BUSINESS: "business" as SearchItemType,
} as const;
