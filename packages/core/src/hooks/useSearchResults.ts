import { useMemo } from "react";
import { useAtom } from "jotai";
import {
  searchDisplayDataAtom,
  searchStatsAtom,
  selectedCategoryAtom,
  currentCategoryLabelAtom,
} from "../atoms/search";
import { SectionData } from "../types/search";

export const useSearchResults = () => {
  const [displayData] = useAtom(searchDisplayDataAtom);
  const [stats] = useAtom(searchStatsAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [currentCategoryLabel] = useAtom(currentCategoryLabelAtom);

  const sections = useMemo((): SectionData[] => {
    if (stats.hasNoResults) {
      return [];
    }

    if (stats.showSections) {
      const result: SectionData[] = [];

      if (displayData.matchingResults.length > 0) {
        result.push({
          title: `Matching Results (${displayData.matchingResults.length})`,
          data: displayData.matchingResults,
        });
      }

      if (displayData.nonMatchingResults.length > 0) {
        result.push({
          title: `Other Results (${displayData.nonMatchingResults.length})`,
          data: displayData.nonMatchingResults,
        });
      }

      return result;
    } else {
      return [
        {
          title: `${currentCategoryLabel} (${stats.resultsCount})`,
          data: displayData.allData,
        },
      ];
    }
  }, [displayData, stats, currentCategoryLabel]);

  return {
    sections,
    hasNoResults: stats.hasNoResults,
    selectedCategory,
    currentCategoryLabel,
  };
};
