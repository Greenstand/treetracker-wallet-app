import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomModal from "../ui/common/CustomModal";
import RadioButton from "../ui/common/RadioButton";
import DateRangeInput from "../ui/common/DateRangeInput";
import { Colors } from "@/constants/Colors";

interface WalletFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  dateFilter: "all" | "past90days" | "may" | "2024" | "custom";
  startDate: Date | null;
  endDate: Date | null;
}

export default function WalletFilterModal({
  visible,
  onClose,
  onApplyFilters,
}: WalletFilterModalProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "past90days" | "may" | "2024" | "custom"
  >("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleApply = () => {
    const filters: FilterOptions = {
      dateFilter: selectedFilter,
      startDate,
      endDate,
    };
    onApplyFilters?.(filters);
    onClose();
  };

  const handleReset = () => {
    setSelectedFilter("all");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Filters</Text>
          <TouchableOpacity
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Close filters"
            accessibilityRole="button"
          >
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Filter by date section */}
          <Text style={styles.sectionTitle}>Filter by date</Text>

          <View style={styles.radioGroup}>
            <RadioButton
              label="All"
              selected={selectedFilter === "all"}
              onPress={() => setSelectedFilter("all")}
            />
            <RadioButton
              label="Past 90 days"
              selected={selectedFilter === "past90days"}
              onPress={() => setSelectedFilter("past90days")}
            />
            <RadioButton
              label="May"
              selected={selectedFilter === "may"}
              onPress={() => setSelectedFilter("may")}
            />
            <RadioButton
              label="2024"
              selected={selectedFilter === "2024"}
              onPress={() => setSelectedFilter("2024")}
            />
          </View>

          {/* Date Range Section */}
          <Text style={styles.sectionTitle}>Choose a date range</Text>

          <View style={styles.dateRangeContainer}>
            <DateRangeInput
              label="From"
              value={startDate}
              onChange={setStartDate}
              placeholder="Select start date"
            />
            <DateRangeInput
              label="To"
              value={endDate}
              onChange={setEndDate}
              placeholder="Select end date"
            />
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApply}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Apply filters"
          >
            <Text style={styles.applyButtonText}>APPLY</Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 16,
    marginBottom: 12,
  },
  radioGroup: {
    marginBottom: 8,
  },
  dateRangeContainer: {
    marginTop: 8,
  },
  footer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  applyButton: {
    backgroundColor: Colors.green,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
