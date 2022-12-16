import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import './styles.css';
import { wrapper } from '@alergiesmanagement/store';

function CustomApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <ToastContainer />
      <Head>
        <title>Welcome to alergies-ui!</title>
      </Head>
      <main className="app">
        <Component {...props.pageProps} />
      </main>
    </Provider>
  );
}

export default CustomApp;
