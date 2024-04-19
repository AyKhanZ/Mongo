import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext"; // Убедитесь, что путь к файлу правильный

export default function App({ Component, pageProps }: AppProps) {
  return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
  );
}