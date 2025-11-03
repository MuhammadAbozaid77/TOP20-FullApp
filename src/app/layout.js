"use client";

import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {children}
            </PersistGate>
            <Toaster />
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
