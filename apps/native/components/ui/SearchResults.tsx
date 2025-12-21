import EmptyState from "@components/ui/common/EmptyState";
import React from "react";
import { SectionList } from "react-native";
import { useSearchResults } from "core/src/hooks";
import SearchResultItem from "./SearchResultItem";

const SearchResults = () => {
  const { sections, hasNoResults } = useSearchResults();

  if (hasNoResults) {
    return <EmptyState />;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={({ item }) => <SearchResultItem item={item} />}
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
