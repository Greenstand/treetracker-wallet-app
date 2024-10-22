'use client';

import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface LogInFormData {
  email: string;
  password: string;
}

const LogInForm: React.FC = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for the state of the button

  // Show/hide password operation
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // The process of submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sending to backend will come here (API integration)
    console.log('Form Data:', formData);
  };

  // Validate email and password on each form data change
  useEffect(() => {
    // Button activation logic
    const isFormValid: boolean = formData.password !== ''; // TypeScript is instructed that this is a boolean

    setIsButtonDisabled(!isFormValid); // If the form is not valid the button becomes disabled
  }, [formData]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="center"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Log in
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
          required
          // Custom styles to change the focus color
          sx={{
            '& .MuiFilledInput-root:after': {
              borderBottomColor: 'rgb(97, 137, 47)', // Set focus underline color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgb(97, 137, 47)', // Set label color when focused
            },
          }}
        />
        <TextField
          variant="filled"
          label="Password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          // Custom styles to change the focus color
          sx={{
            '& .MuiFilledInput-root:after': {
              borderBottomColor: 'rgb(97, 137, 47)', // Set focus underline color
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'rgb(97, 137, 47)', // Set label color when focused
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          style={{
            marginTop: '1rem',
            backgroundColor: isButtonDisabled ? '#a9a9a9' : 'rgb(97, 137, 47)', // Disabled and active colors
            // color: isButtonDisabled ? '#ffffff' : '#ffffff', // Text color
          }}
          disabled={isButtonDisabled} // Button disabled status
        >
          Log In
        </Button>
      </form>
    </Box>
  );
};

export default LogInForm;
