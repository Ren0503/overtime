import React from 'react';
import { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import { Navbar } from 'components/core';
import AuthProvider from 'context/AuthContext';
import ToastProvider from 'context/ToastContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import nProgress from 'nprogress';

dayjs.extend(relativeTime);

Router.events.on('routeChangeStart', () => {
    nProgress.start();
});
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function ShowNavbar() {
    const router = useRouter();
    const show = !['/login', '/register'].includes(router.pathname);

    return show && <Navbar />
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AuthProvider>
            <ToastProvider>
                <ShowNavbar />
                <main className='container'>
                    <Component {...pageProps} />
                </main>
            </ToastProvider>
        </AuthProvider>
    );
};

export default MyApp;