'use client';
import { Input, InputProps } from "@mui/material";
import { styled } from '@mui/material/styles';

interface CustomInputProps extends InputProps {
    placeholderText: string;
  }

const StyledInput = styled(Input)(({ theme }) => ({
    width: "273px",
    height: "56px",
    padding: theme.spacing(1, 1),
    opacity: "0px",
    backgroundColor: "#f0f0f0",
    marginBottom: "20px"
}));


export default function CustomInput({
    placeholderText,
    ...props
}: CustomInputProps) {
    return (
        <StyledInput
        placeholder={placeholderText}
            {...props}
            />
    )
}


