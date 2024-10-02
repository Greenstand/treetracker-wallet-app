import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '../components/PropTip';
import Copyright from '../components/Copyright';
import SignUpForm from '@/components/forms/SignUpForm';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js App Router example in TypeScript
        </Typography>
        <Link href="/about" color="secondary" component={NextLink}>
          Go to the about page
        </Link>
        {/* //! Cihan ISSUE #216 SIGN UP !// */}
        <Link href="/signup" color="secondary" component={NextLink}>
          Sign Up Page
        </Link>
        {/* //! Cihan ISSUE #216 SIGN UP !// */}
        {/* /* -------------------------------------------------------------------------- */}
        {/* //! Cihan ISSUE #216 SIGN IN !// */}
        <Link href="/login" color="secondary" component={NextLink}>
          Log In Page
        </Link>
        {/* //! Cihan ISSUE #216 SIGN IN !// */}
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
