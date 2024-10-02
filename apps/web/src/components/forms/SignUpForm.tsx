'use client';

import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [isButtonDisabled, setIsButtonDisabled] = useState(true); // State for the state of the button
  const [emailError, setEmailError] = useState(''); // E-mail error state
  const [passwordError, setPasswordError] = useState(''); // Password error state

  // Email format validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    return emailRegex.test(email);
  };

  // Password validation (at least 8 characters)
  const validatePassword = (password: string) => {
    return password.length >= 8; // At least 8 characters
  };

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
    // Password verification
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Sending to backend will come here (API integration)
    console.log('Form Data:', formData);
  };

  // Validate email and password on each form data change
  useEffect(() => {
    // Email validation
    if (formData.email && !validateEmail(formData.email)) {
      setEmailError('Error: Email is incorrect');
    } else {
      setEmailError('');
    }

    // Password validation
    if (formData.password && !validatePassword(formData.password)) {
      setPasswordError('Minimum length 8 characters');
    } else {
      setPasswordError('');
    }

    // Button activation logic
    const isFormValid =
      formData.name !== '' &&
      emailError === '' &&
      passwordError === '' &&
      formData.password !== '' &&
      formData.confirmPassword !== '' &&
      formData.password === formData.confirmPassword;

    setIsButtonDisabled(!isFormValid); // If the form is not valid the button becomes disabled
  }, [formData, emailError, passwordError]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="start"
      justifyContent="center"
      width="100%"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="filled"
          label="Name"
          name="name"
          value={formData.name}
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
        />
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
          error={!!emailError}
          helperText={emailError}
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
          error={!!passwordError}
          // helperText={passwordError}
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
        {/* This will display the password validation message */}
        <FormHelperText
          sx={{
            color: 'rgb(97, 137, 47)', // Always green
          }}
        >
          {passwordError}
        </FormHelperText>
        {/* This will display the password validation message */}
        <TextField
          variant="filled"
          label="Confirm Password"
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
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
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
