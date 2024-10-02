import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import SignUpForm from '@/components/forms/SignUpForm';
import SignUpAndInButtons from '@/components/buttons/SignUpAndInButtons';

const page = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        maxWidth: '493.719px',
      }}
    >
      <Box sx={{ margin: '2rem 0 3rem ' }}>
        <SignUpForm />
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
        }}
      >
        <SignUpAndInButtons
          text="Sign Up With Gmail"
          type="submit"
          icon={<EmailIcon />}
        />
        <SignUpAndInButtons
          text="Sign Up With Facebook"
          type="submit"
          icon={<FacebookIcon />}
        />
        <SignUpAndInButtons
          text="Sign Up With Github"
          type="submit"
          icon={<GitHubIcon />}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: '0.3rem' }}>
        <Typography>Have an Account?</Typography>
        <Link
          href="/login"
          component={NextLink}
          sx={{ color: 'rgb(97, 137, 47)', textDecoration: 'none' }}
        >
          Log in
        </Link>
      </Box>

      <Box
        sx={{
          marginTop: '2rem',
          gap: '0.3rem',
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Typography>By continuing, I agree to Greenstand's</Typography>
        <Link
          href="#"
          component={NextLink}
          sx={{ color: 'rgb(97, 137, 47)', textDecoration: 'none' }}
        >
          Privacy Policy{' '}
        </Link>
        <Typography>and</Typography>
        <Link
          href="#"
          component={NextLink}
          sx={{ color: 'rgb(97, 137, 47)', textDecoration: 'none' }}
        >
          Term of Use
        </Link>
      </Box>
    </Container>
  );
};

export default page;
