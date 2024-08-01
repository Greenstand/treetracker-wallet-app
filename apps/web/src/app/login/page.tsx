"use client";
import CustomForm from "@/components/common/CustomForm";
import { Box } from "@mui/material";

export default function LoginPage() {
  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("logged in");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      <CustomForm variant="login" onSubmit={handleLoginSubmit} />
    </Box>
  );
}
