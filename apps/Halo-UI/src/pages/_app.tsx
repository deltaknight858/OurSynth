import type { AppProps } from "next/app";
import ThemeLayout from "@/components/layout/ThemeLayout";
import { HaloErrorBoundary } from "@/components/halo";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeLayout>
      <HaloErrorBoundary 
        onError={(error, errorInfo) => {
          // Log errors in production for monitoring
          if (process.env.NODE_ENV === "production") {
            console.error("Application Error:", error, errorInfo);
            // Here you could send to error tracking service like Sentry
          }
        }}
        showStack={process.env.NODE_ENV === "development"}
      >
        <Component {...pageProps} />
      </HaloErrorBoundary>
    </ThemeLayout>
  );
}