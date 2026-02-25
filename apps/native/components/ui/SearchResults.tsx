import EmptyState from "@components/ui/common/EmptyState";
import React from "react";
import { SectionList } from "react-native";
import { useSearchResults } from "core/src/hooks";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsProps {
  onItemPress?: (item: any) => void;
}

const SearchResults = ({ onItemPress }: SearchResultsProps) => {
  const { sections, hasNoResults } = useSearchResults();

  if (hasNoResults) {
    return <EmptyState />;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={({ item }) => (
        <SearchResultItem item={item} onPress={onItemPress} />
      )}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={<EmptyState />}
      initialNumToRender={8}
      maxToRenderPerBatch={5}
      windowSize={10}
      updateCellsBatchingPeriod={50}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default SearchResults;
