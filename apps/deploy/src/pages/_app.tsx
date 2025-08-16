import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import GlobalBottomNavBar from 'packages/ui/src/components/GlobalBottomNavBar';
// import CommandCenter from 'packages/ui/src/components/CommandCenter';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      {/* <CommandCenter appContext="deploy" /> */}
      {/* <GlobalBottomNavBar /> */}
    </>
  );
}
