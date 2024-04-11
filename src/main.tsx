import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './fonts.css';
import './index.css';

async function enableMocking() {
    if (import.meta.env.DEV) {
        const { serviceWorker } = await import('./api/mocks/browser');
        await serviceWorker?.start();
    }
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5000, refetchOnWindowFocus: false }
    }
});

enableMocking()
    .then(() => {
        if (import.meta.env.DEV) {
            console.log('MSW mocking successfully started.');
        }
    })
    .catch(() => {
        if (import.meta.env.DEV) {
            console.error('An error occurred on MSW mock initialization.');
        }
    })
    .finally(() => {
        ReactDOM
            .createRoot(document.getElementById('root')!)
            .render(
                <React.StrictMode>
                    <QueryClientProvider client={queryClient}>
                        <App/>
                    </QueryClientProvider>
                </React.StrictMode>,
            );
    });
