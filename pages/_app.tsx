import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function MyApp(props: AppProps) {
  const queryClient = new QueryClient();
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    const jwt = Cookies.get('jwt');  // Adjust based on your auth token storage
    const publicPaths = ['/Login']; // Add all your public routes here

    if (!jwt && !publicPaths.includes(router.pathname)) {
      router.push('/Login');  // Redirect unauthorized users to login
    }
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

