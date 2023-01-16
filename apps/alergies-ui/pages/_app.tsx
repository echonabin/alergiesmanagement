import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { wrapper } from '@alergiesmanagement/store';
import { Layout } from '@alergiesmanagement/components';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

function CustomApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const router = useRouter();
  return (
    <Provider store={store}>
      <ToastContainer />
      <Head>
        <title>Welcome to alergies-ui!</title>
      </Head>
      {!router.pathname.includes('/login') &&
      !router.pathname.includes('/signup') ? (
        <Layout>
          <Component {...props.pageProps} />
        </Layout>
      ) : (
        <Component {...props.pageProps} />
      )}
    </Provider>
  );
}

export default CustomApp;
