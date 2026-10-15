import { Box, Typography } from "@mui/material";

type Props = {
  imageUrl?: string | null;
  speciesName?: string | null;
  isLoading?: boolean;
  hasError?: boolean;
};

export function TokenTree({
  imageUrl,
  speciesName,
  isLoading,
  hasError,
}: Props) {
  return (
    <Box data-test="token-tree">
      <Box
        sx={{
          width: "100%",
          height: 160,
          borderRadius: 1,
          overflow: "hidden",
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={speciesName ?? "Tree"}
            data-test="token-tree-photo"
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            data-test="token-tree-placeholder"
          >
            {isLoading
              ? "Loading…"
              : hasError
                ? "Could not load the tree"
                : "No photo for this tree"}
          </Typography>
        )}
      </Box>
      {speciesName && (
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
          data-test="token-tree-species"
        >
          {speciesName}
        </Typography>
      )}
    </Box>
  );
}
