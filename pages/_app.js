import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "../modules/Navigation";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <Navigation />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
