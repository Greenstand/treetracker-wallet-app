import { atom } from "jotai";
import {
  SEARCH_CATEGORIES,
  SearchCategory,
  SearchItem,
} from "../../types/search";
import { mockData } from "../../data/mockData";

export const RECENT_SEARCHES_LIMIT = 5;

const filterByCategory = (
  items: SearchItem[],
  category: SearchCategory,
): SearchItem[] => {
  if (category === SEARCH_CATEGORIES.ALL) return items;
  return items.filter(item => item.category === category);
};

const filterByQuery = (items: SearchItem[], query: string): SearchItem[] => {
  if (!query.trim()) return items;

  const lowerQuery = query.toLowerCase();

  return items.filter(item => item.name.toLowerCase().includes(lowerQuery));
};

const sortSearchResults = (
  items: SearchItem[],
  query: string,
): SearchItem[] => {
  if (!query.trim()) return items;

  const lowerQuery = query.toLowerCase();

  return [...items].sort((a, b) => {
    const aStartsWith = a.name.toLowerCase().startsWith(lowerQuery);
    const bStartsWith = b.name.toLowerCase().startsWith(lowerQuery);

    if (aStartsWith && !bStartsWith) return -1;
    if (!aStartsWith && bStartsWith) return 1;

    const aExactMatch = a.name.toLowerCase() === lowerQuery;
    const bExactMatch = b.name.toLowerCase() === lowerQuery;

    if (aExactMatch && !bExactMatch) return -1;
    if (!aExactMatch && bExactMatch) return 1;

    return a.name.localeCompare(b.name);
  });
};

export const searchQueryAtom = atom("");
export const searchLoadingAtom = atom(false);
export const isSearchingAtom = atom(false);
export const recentSearchesAtom = atom<string[]>([]);

export const selectedCategoryAtom = atom<SearchCategory>(SEARCH_CATEGORIES.ALL);
export const showCategoryModalAtom = atom(false);

export const currentCategoryDataAtom = atom(get => {
  const selectedCategory = get(selectedCategoryAtom);
  return filterByCategory(mockData, selectedCategory);
});

export const matchingResultsAtom = atom(get => {
  const query = get(searchQueryAtom);
  const categoryData = get(currentCategoryDataAtom);

  if (!query.trim()) return [];

  const filtered = filterByQuery(categoryData, query);
  return sortSearchResults(filtered, query);
});

export const nonMatchingResultsAtom = atom(get => {
  const query = get(searchQueryAtom);
  const categoryData = get(currentCategoryDataAtom);
  const matchingResults = get(matchingResultsAtom);

  if (!query.trim()) return [];

  const matchingIds = new Set(matchingResults.map(item => item.id));
  return categoryData.filter(item => !matchingIds.has(item.id));
});

export const hasNoResultsAtom = atom(get => {
  const query = get(searchQueryAtom);
  const matchingResults = get(matchingResultsAtom);

  return query.trim().length > 0 && matchingResults.length === 0;
});

export interface SearchDisplayData {
  allData: SearchItem[];
  matchingResults: SearchItem[];
  nonMatchingResults: SearchItem[];
}

export const searchDisplayDataAtom = atom<SearchDisplayData>(get => ({
  allData: get(currentCategoryDataAtom),
  matchingResults: get(matchingResultsAtom),
  nonMatchingResults: get(nonMatchingResultsAtom),
}));

export const selectCategoryAtom = atom(
  null,
  (get, set, category: SearchCategory) => {
    set(selectedCategoryAtom, category);

    set(showCategoryModalAtom, false);

    set(searchQueryAtom, "");
  },
);

export const performSearchAtom = atom<null, [string], void>(
  null,
  (get, set, query) => {
    const currentQuery = get(searchQueryAtom);
    if (query === currentQuery) return;

    set(searchQueryAtom, query);

    if (query.trim()) {
      const recentSearches = get(recentSearchesAtom);
      const updatedRecents = [
        query,
        ...recentSearches.filter(item => item !== query),
      ].slice(0, RECENT_SEARCHES_LIMIT);
      set(recentSearchesAtom, updatedRecents);
    }
  },
);

export const clearSearchAtom = atom<null, [], void>(null, (get, set) => {
  set(searchQueryAtom, "");
  set(isSearchingAtom, false);
  set(searchLoadingAtom, false);
});

export const startSearchAtom = atom(null, (get, set) => {
  set(isSearchingAtom, true);
});

export const cancelSearchAtom = atom(null, (get, set) => {
  set(isSearchingAtom, false);
  set(searchQueryAtom, "");
  set(searchLoadingAtom, false);
});

export const searchStatsAtom = atom(get => {
  const displayData = get(searchDisplayDataAtom);
  const hasNoResults = get(hasNoResultsAtom);
  const query = get(searchQueryAtom);
  const hasQuery = query.trim().length > 0;
  const selectedCategory = get(selectedCategoryAtom);

  return {
    resultsCount: displayData.allData.length,
    matchingCount: displayData.matchingResults.length,
    nonMatchingCount: displayData.nonMatchingResults.length,
    hasQuery,
    hasNoResults,
    selectedCategory,
    isEmpty: hasNoResults,
    showSections: hasQuery && !hasNoResults,
  };
});

export const currentCategoryLabelAtom = atom(get => {
  const category = get(selectedCategoryAtom);

  switch (category) {
    case SEARCH_CATEGORIES.SEND:
      return "Send Money";
    case SEARCH_CATEGORIES.REQUEST:
      return "Request Money";
    case SEARCH_CATEGORIES.ALL:
      return "All Items";
    default:
      return "Select Category";
  }
});
