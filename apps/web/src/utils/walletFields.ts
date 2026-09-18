// walletPatchSchema rejects empty strings and an omitted field is a silent
// no-op, so a field that loaded with a value cannot be cleared. One that
// loaded empty stays optional: wallets are created without a display name.
export const walletFieldError = (
  label: string,
  loaded: string,
  current: string,
  min: number,
  max: number,
): string | undefined => {
  const value = current.trim();
  if (loaded.trim() && !value) return `${label} cannot be emptied.`;
  if (value && (value.length < min || value.length > max)) {
    return `Must be ${min}-${max} characters.`;
  }
  return undefined;
};
