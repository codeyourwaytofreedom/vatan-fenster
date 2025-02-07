import Layout_Vatan_Fenster from "@/components/Layout/Layout_Vatan_Fenster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fortawesome/fontawesome-svg-core/styles.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Layout_Vatan_Fenster>
    <Component {...pageProps} />
  </Layout_Vatan_Fenster>;
}
