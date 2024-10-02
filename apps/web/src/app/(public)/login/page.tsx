import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

import SignUpAndInButtons from '@/components/buttons/SignUpAndInButtons';
import LogInForm from '@/components/forms/LogInForm';

const page = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ margin: '2rem 0 3rem' }}>
        <LogInForm />
        <Box
          sx={{
            marginTop: '2rem',
            display: 'flex',
            gap: '0.3rem',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>Forgot password?</Typography>
          <Link
            href="#"
            component={NextLink}
            sx={{ color: 'rgb(97, 137, 47)', textDecoration: 'none' }}
          >
            Reset
          </Link>
        </Box>
      </Box>
      <Box>
        <Typography>Or</Typography>
      </Box>
      <Box
        sx={{
          margin: '3rem',
          width: '100%',
          gap: '1rem',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '493.719px',
        }}
      >
        <SignUpAndInButtons
          text="Log In With Gmail"
          type="submit"
          icon={<EmailIcon />}
        />
        <SignUpAndInButtons
          text="Log In With Facebook"
          type="submit"
          icon={<FacebookIcon />}
        />
        <SignUpAndInButtons
          text="Log In With Github"
          type="submit"
          icon={<GitHubIcon />}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.3rem' }}>
        <Typography>Don't have an account?</Typography>
        <Link
          href="/signup"
          component={NextLink}
          sx={{ color: 'rgb(97, 137, 47)', textDecoration: 'none' }}
        >
          Sign up
        </Link>
      </Box>
    </Container>
  );
};

export default page;
