import React, { useCallback, useMemo, useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePicker, {
  type DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { Colors } from "@/constants/Colors";
import CustomModal from "../ui/common/CustomModal";

type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

const FILTER_OPTIONS = [
  { label: "All", value: "all" },
  { label: "Past 90 days", value: "past90" },
  { label: "May", value: "may" },
  { label: "2024", value: "2024" },
] as const;

type WalletFilterModalProps = {
  visible: boolean;
  onClose: () => void;
  onApply?: (
    value: FilterValue,
    dateRange: { from: string; to: string },
  ) => void;
};

export function WalletFilterModal({
  visible,
  onClose,
  onApply,
}: WalletFilterModalProps) {
  const [selected, setSelected] = useState<FilterValue>("may");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [pickerTarget, setPickerTarget] = useState<"from" | "to" | null>(null);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(new Date());

  const handleApply = () => {
    onApply?.(selected, {
      from: fromDate ? fromDate.toISOString() : "",
      to: toDate ? toDate.toISOString() : "",
    });
    onClose();
  };

  const formatDate = useCallback((value: Date | null) => {
    if (!value) return "";
    return value.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const openPicker = useCallback(
    (target: "from" | "to") => {
      setPickerTarget(target);
      const baseline =
        target === "to"
          ? toDate || fromDate || new Date()
          : fromDate || new Date();
      setTempDate(baseline);
      setPickerVisible(true);
    },
    [fromDate, toDate],
  );

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date?: Date) => {
      const isDismissed = event.type === "dismissed";
      if (isDismissed || !date) {
        return;
      }
      if (Platform.OS === "android") {
        if (pickerTarget === "from") {
          setFromDate(date);
        } else if (pickerTarget === "to") {
          setToDate(date);
        }
        setPickerVisible(false);
        return;
      }

      // iOS: keep picker open and stash selection until user taps Done
      setTempDate(date);
    },
    [pickerTarget],
  );

  const handleConfirm = useCallback(() => {
    if (!pickerTarget) {
      setPickerVisible(false);
      return;
    }
    if (pickerTarget === "from") {
      setFromDate(tempDate);
    } else {
      setToDate(tempDate);
    }
    setPickerVisible(false);
  }, [pickerTarget, tempDate]);

  const handleCancel = useCallback(() => {
    setPickerVisible(false);
  }, []);

  const selectedFromLabel = useMemo(
    () => formatDate(fromDate),
    [formatDate, fromDate],
  );
  const selectedToLabel = useMemo(
    () => formatDate(toDate),
    [formatDate, toDate],
  );

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <View style={styles.header}>
        <Text style={styles.title}>Filters</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close filters"
          onPress={onClose}
          hitSlop={10}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <Ionicons name="close" size={20} color={Colors.charcoal} />
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter by date</Text>
        <View style={styles.radioGroup}>
          {FILTER_OPTIONS.map((option) => (
            <RadioButton
              key={option.value}
              label={option.label}
              checked={selected === option.value}
              onPress={() => setSelected(option.value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose a date range</Text>
        <View style={styles.dateRow}>
          <DateRangeInput
            label="From"
            placeholder="From"
            value={selectedFromLabel}
            onPress={() => openPicker("from")}
          />
          <DateRangeInput
            label="To"
            placeholder="To"
            value={selectedToLabel}
            onPress={() => openPicker("to")}
          />
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Apply filters"
        onPress={handleApply}
        style={({ pressed }) => [
          styles.applyButton,
          pressed && styles.applyButtonPressed,
        ]}
      >
        <Text style={styles.applyLabel}>APPLY</Text>
      </Pressable>

      {pickerVisible && Platform.OS === "android" && (
        <DateTimePicker
          value={tempDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {Platform.OS === "ios" && (
        <Modal
          transparent
          visible={pickerVisible}
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <Pressable style={styles.pickerBackdrop} onPress={handleCancel} />
          <View style={styles.pickerSheet}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              style={styles.iosPicker}
            />
            <View style={styles.pickerActions}>
              <Pressable
                onPress={handleCancel}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text style={styles.pickerActionText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleConfirm}
                style={({ pressed }) => pressed && styles.pressed}
              >
                <Text
                  style={[styles.pickerActionText, styles.pickerActionPrimary]}
                >
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </CustomModal>
  );
}

type RadioButtonProps = {
  label: string;
  checked: boolean;
  onPress: () => void;
};

function RadioButton({ label, checked, onPress }: RadioButtonProps) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.radioButton, pressed && styles.pressed]}
    >
      <View style={[styles.radioOuter, checked && styles.radioOuterChecked]}>
        {checked ? <View style={styles.radioInner} /> : null}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </Pressable>
  );
}

type DateRangeInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onPress: () => void;
};

function DateRangeInput({
  label,
  placeholder,
  value,
  onPress,
}: DateRangeInputProps) {
  return (
    <View style={styles.dateInputWrapper}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Select ${label} date`}
        onPress={onPress}
        style={({ pressed }) => [
          styles.dateInputContainer,
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.dateInput, !value && styles.datePlaceholder]}>
          {value || placeholder}
        </Text>
        <MaterialIcons
          name="calendar-today"
          size={18}
          color={Colors.darkGray}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.charcoal,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.darkGray,
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  section: {
    marginTop: 16,
  },
  radioGroup: {
    gap: 12,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.gray,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  radioOuterChecked: {
    borderColor: Colors.green,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.green,
  },
  radioLabel: {
    fontSize: 15,
    color: Colors.charcoal,
  },
  dateRow: {
    flexDirection: "row",
    gap: 12,
  },
  dateInputWrapper: {
    flex: 1,
    gap: 6,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.darkGray,
  },
  dateInputContainer: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: "#C4C4C4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.charcoal,
  },
  datePlaceholder: {
    color: Colors.darkGray,
  },
  applyButton: {
    marginTop: 24,
    backgroundColor: Colors.green,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    height: 48,
  },
  applyButtonPressed: {
    opacity: 0.85,
  },
  applyLabel: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  pressed: {
    opacity: 0.5,
  },
  pickerBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00000055",
  },
  pickerSheet: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
    paddingTop: 12,
    paddingHorizontal: 12,
    paddingBottom: 4,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  iosPicker: {
    width: "100%",
  },
  pickerActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
    paddingVertical: 10,
  },
  pickerActionText: {
    fontSize: 16,
    color: Colors.darkGray,
  },
  pickerActionPrimary: {
    color: Colors.green,
    fontWeight: "700",
  },
});
