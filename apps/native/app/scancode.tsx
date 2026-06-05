import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  BarcodeScanningResult,
  CameraView,
  scanFromURLAsync,
  useCameraPermissions,
} from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { SEARCH_CATEGORIES } from "core/src/types/search";
import { THEME } from "@/theme";

interface ParsedQrPayload {
  recipientId?: string;
  recipientName: string;
  recipientAvatar?: string;
}

const getStringValue = (
  record: Record<string, unknown>,
  keys: string[],
): string | undefined => {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return undefined;
};

const parseQrPayload = (rawValue: string): ParsedQrPayload | null => {
  const normalized = rawValue.trim();
  if (!normalized) {
    return null;
  }

  let recipientId: string | undefined;
  let recipientName: string | undefined;
  let recipientAvatar: string | undefined;

  try {
    const parsed = JSON.parse(normalized) as Record<string, unknown>;
    if (parsed && typeof parsed === "object") {
      recipientId = getStringValue(parsed, ["recipientId", "id", "walletId"]);
      recipientName = getStringValue(parsed, [
        "recipientName",
        "name",
        "walletName",
        "displayName",
      ]);
      recipientAvatar = getStringValue(parsed, [
        "recipientAvatar",
        "avatar",
        "avatarUrl",
      ]);
    }
  } catch {
    // Ignore parse errors and continue with other payload formats.
  }

  if (!recipientName) {
    try {
      const parsedUrl = new URL(normalized);
      recipientId =
        recipientId ?? parsedUrl.searchParams.get("recipientId") ?? undefined;
      recipientName = parsedUrl.searchParams.get("recipientName") ?? undefined;
      recipientAvatar =
        recipientAvatar ??
        parsedUrl.searchParams.get("recipientAvatar") ??
        undefined;
    } catch {
      // Ignore URL parse errors and fallback to plain text.
    }
  }

  const finalName = (recipientName ?? normalized).slice(0, 80);

  return {
    recipientId,
    recipientName: finalName,
    recipientAvatar,
  };
};

export default function ScanCodeScreen() {
  const router = useRouter();
  const { colors, spacing, typography } = THEME;
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [, requestMediaLibraryPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [isScanLocked, setIsScanLocked] = useState(false);
  const [isReadingGalleryImage, setIsReadingGalleryImage] = useState(false);

  const navigateToTransferEntry = useCallback(
    (payload: ParsedQrPayload) => {
      router.replace({
        pathname: "/transfer/entry",
        params: {
          mode: SEARCH_CATEGORIES.SEND,
          recipientId: payload.recipientId,
          recipientName: payload.recipientName,
          recipientAvatar: payload.recipientAvatar,
        },
      });
    },
    [router],
  );

  const handleDecodedValue = useCallback(
    (rawValue: string) => {
      const payload = parseQrPayload(rawValue);

      if (!payload) {
        Alert.alert(
          "Invalid QR",
          "This QR code does not contain readable recipient data.",
        );
        setIsScanLocked(false);
        return;
      }

      navigateToTransferEntry(payload);
    },
    [navigateToTransferEntry],
  );

  const ensureCameraPermission = useCallback(async () => {
    if (cameraPermission?.granted) {
      return true;
    }

    const permissionResponse = await requestCameraPermission();
    if (!permissionResponse.granted) {
      Alert.alert(
        "Camera permission required",
        "Allow camera access to scan QR codes.",
      );
      return false;
    }

    return true;
  }, [cameraPermission?.granted, requestCameraPermission]);

  const handleScanCodePress = useCallback(async () => {
    setIsScanLocked(false);
    await ensureCameraPermission();
  }, [ensureCameraPermission]);

  const handleCameraScan = useCallback(
    (result: BarcodeScanningResult) => {
      if (isScanLocked || !result.data) {
        return;
      }

      setIsScanLocked(true);
      handleDecodedValue(result.data);
    },
    [handleDecodedValue, isScanLocked],
  );

  const handleGalleryPress = useCallback(async () => {
    if (isReadingGalleryImage) {
      return;
    }

    try {
      const permissionResponse = await requestMediaLibraryPermission();
      if (!permissionResponse.granted) {
        Alert.alert(
          "Gallery permission required",
          "Allow gallery access to upload a QR image.",
        );
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: false,
        quality: 1,
      });

      if (pickerResult.canceled || !pickerResult.assets[0]?.uri) {
        return;
      }

      setIsReadingGalleryImage(true);
      setIsScanLocked(true);

      const scanResults = await scanFromURLAsync(pickerResult.assets[0].uri, [
        "qr",
      ]);
      const qrData = scanResults[0]?.data;

      if (!qrData) {
        Alert.alert(
          "No QR found",
          "Please select an image that contains a QR code.",
        );
        setIsScanLocked(false);
        return;
      }

      handleDecodedValue(qrData);
    } catch {
      Alert.alert("Unable to read image", "Try again with another QR image.");
      setIsScanLocked(false);
    } finally {
      setIsReadingGalleryImage(false);
    }
  }, [
    handleDecodedValue,
    isReadingGalleryImage,
    requestMediaLibraryPermission,
  ]);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/transfer");
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={styles.root}>
        <View style={[styles.headerRow, { paddingHorizontal: spacing.lg }]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back"
            onPress={handleBackPress}
            hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.gray600} />
          </Pressable>
        </View>

        <View style={[styles.topBand, { backgroundColor: colors.gray100 }]} />

        <View style={[styles.content, { paddingHorizontal: spacing.xl }]}>
          <View style={styles.actionRow}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Scan code"
              onPress={handleScanCodePress}
              style={[
                styles.actionButton,
                styles.primaryActionButton,
                {
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  marginRight: spacing.md,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: typography.size.base,
                  fontFamily: typography.weight.medium,
                }}
              >
                SCAN CODE
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Request tokens"
              onPress={() =>
                router.replace({
                  pathname: "/transfer",
                  params: { mode: SEARCH_CATEGORIES.REQUEST },
                })
              }
              style={[
                styles.actionButton,
                styles.secondaryActionButton,
                {
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.primary,
                  fontSize: typography.size.base,
                  fontFamily: typography.weight.medium,
                }}
              >
                REQ TOKENS
              </Text>
            </Pressable>
          </View>

          <View
            style={[
              styles.scannerPlaceholder,
              {
                backgroundColor: colors.gray200,
                borderRadius: spacing.md,
                marginTop: spacing.lg,
              },
            ]}
          >
            {cameraPermission?.granted ? (
              <CameraView
                style={styles.cameraView}
                facing="back"
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                onBarcodeScanned={isScanLocked ? undefined : handleCameraScan}
              />
            ) : (
              <View style={styles.permissionStateContainer}>
                <MaterialIcons
                  name="qr-code-scanner"
                  size={42}
                  color={colors.gray500}
                />
                <Text
                  style={{
                    color: colors.gray600,
                    fontSize: typography.size.sm,
                    fontFamily: typography.weight.regular,
                    marginTop: spacing.sm,
                    marginBottom: spacing.md,
                    textAlign: "center",
                  }}
                >
                  Camera access is needed to scan QR codes.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Allow camera"
                  onPress={handleScanCodePress}
                  style={[
                    styles.permissionButton,
                    {
                      backgroundColor: colors.primary,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: typography.size.sm,
                      fontFamily: typography.weight.medium,
                    }}
                  >
                    ALLOW CAMERA
                  </Text>
                </Pressable>
              </View>
            )}
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open gallery"
            onPress={handleGalleryPress}
            disabled={isReadingGalleryImage}
            style={styles.galleryAction}
          >
            <View
              style={[
                styles.galleryIcon,
                {
                  backgroundColor: colors.gray300,
                  opacity: isReadingGalleryImage ? 0.7 : 1,
                },
              ]}
            >
              {isReadingGalleryImage ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <MaterialIcons
                  name="photo-library"
                  size={24}
                  color={colors.white}
                />
              )}
            </View>
            <Text
              style={{
                marginTop: spacing.xs,
                color: colors.gray600,
                fontSize: typography.size.base,
                fontFamily: typography.weight.regular,
              }}
            >
              Gallery
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  root: {
    flex: 1,
  },
  headerRow: {
    height: 52,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  topBand: {
    height: 64,
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -44,
  },
  actionButton: {
    minHeight: 44,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryActionButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  secondaryActionButton: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  scannerPlaceholder: {
    width: "100%",
    maxWidth: 320,
    aspectRatio: 1,
    overflow: "hidden",
  },
  cameraView: {
    width: "100%",
    height: "100%",
  },
  permissionStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  permissionButton: {
    minHeight: 36,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  galleryAction: {
    marginTop: "auto",
    marginBottom: 72,
    alignItems: "center",
  },
  galleryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
