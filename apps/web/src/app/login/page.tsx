import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import LinkComponent from "@/components/LinkComponent";
import { Typography, Box } from "@mui/material";

export default function LoginPage() {
    return(
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            p: 2,
        }}
        >
            <Box
            sx={{
            width: "100%",
            maxWidth: 400,
            textAlign: "left",
            }}
            >
                <Typography
                variant="h5"
                sx={{
                    fontSize: "24px",
                    fontWeight: 400,
                    lineHeight: "32.02px",
                    color: "#222629DE",
                    mb: 2,
                }}
                >
                Log in
                </Typography>
            </Box>
            <CustomInput placeholderText="Email"/>
            <CustomInput placeholderText="Password"/>
            <CustomButton text="LOG IN"/>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2">
                    Forgot password?&nbsp;
                </Typography>
                <LinkComponent href="/reset">Reset</LinkComponent>
            </Box>
                <Typography sx={{margin: "12px 0"}} variant="body2">or</Typography>
            <CustomButton text="LOG IN WITH GMAIL"/>
            <CustomButton text="LOG IN WITH FACEBOOK"/>
            <CustomButton text="LOG IN WITH GITHUB"/>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account?&nbsp;
                </Typography>
                <LinkComponent href="/signup">Sign up</LinkComponent>
            </Box>
        </Box>
    )
}