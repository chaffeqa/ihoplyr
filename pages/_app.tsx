import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme';

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>ihoplyr</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;
