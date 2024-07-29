import CustomButton from "@/components/CustomButton";
import Input from "@/components/Input";
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
                    fontFamily: "Roboto",
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
            <Input/>
            <Input/>
            <CustomButton text="Test"/>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2">
                    Forgot password?&nbsp;
                </Typography>
                <LinkComponent href="/reset">Reset</LinkComponent>
            </Box>
                <Typography variant="body2">or</Typography>
            <CustomButton text="Test"/>
            <CustomButton text="Test"/>
            <CustomButton text="Test"/>
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Typography variant="body2">
                    Don't have an account?&nbsp;
                </Typography>
                <LinkComponent href="/signup">Sign up</LinkComponent>
            </Box>
        </Box>
    )
}