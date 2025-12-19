import { SEARCH_CATEGORIES, SEARCH_TYPES, SearchItem } from "../types/search";

const image = "https://reactnative.dev/img/tiny_logo.png";
export const mockData: SearchItem[] = [
  // Users for "send" category
  {
    id: "1",
    name: "John Doe",
    type: SEARCH_TYPES.USER,
    avatar: null,
    category: SEARCH_CATEGORIES.SEND,
  },
  {
    id: "2",
    name: "Jane Smith",
    type: SEARCH_TYPES.USER,
    avatar: image,
    category: SEARCH_CATEGORIES.SEND,
  },
  {
    id: "3",
    name: "Bob Johnson",
    type: SEARCH_TYPES.USER,
    avatar: null,
    category: SEARCH_CATEGORIES.SEND,
  },
  {
    id: "4",
    name: "Mary Brown",
    type: SEARCH_TYPES.USER,
    avatar: image,
    category: SEARCH_CATEGORIES.SEND,
  },
  {
    id: "5",
    name: "Mark Wilson",
    type: SEARCH_TYPES.USER,
    avatar: null,
    category: SEARCH_CATEGORIES.SEND,
  },

  // Businesses for "request" category
  {
    id: "6",
    name: "GreenStand",
    type: SEARCH_TYPES.BUSINESS,
    avatar: null,
    category: SEARCH_CATEGORIES.REQUEST,
  },
  {
    id: "7",
    name: "Grocery Store",
    type: SEARCH_TYPES.BUSINESS,
    avatar: image,
    category: SEARCH_CATEGORIES.REQUEST,
  },
  {
    id: "8",
    name: "Food Court",
    type: SEARCH_TYPES.BUSINESS,
    avatar: image,
    category: SEARCH_CATEGORIES.REQUEST,
  },
  {
    id: "9",
    name: "Shopping Mall",
    type: SEARCH_TYPES.BUSINESS,
    avatar: null,
    category: SEARCH_CATEGORIES.REQUEST,
  },
  {
    id: "10",
    name: "Local Market",
    type: SEARCH_TYPES.BUSINESS,
    avatar: null,
    category: SEARCH_CATEGORIES.REQUEST,
  },
];
