import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Navigation from "../modules/Navigation";
import { useRouter } from "next/router";
import theme from "../styles/components/theme";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider theme={theme}>
      <Navigation />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
