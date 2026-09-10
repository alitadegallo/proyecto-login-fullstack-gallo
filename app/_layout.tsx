import { Stack } from "expo-router";
import { Box, extendTheme, NativeBaseProvider } from "native-base";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
});

export default function RootLayout() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <Navbar />
      <Box flex={1}>
        <Stack screenOptions={{ headerShown: false }} />
      </Box>
      <Footer />
    </NativeBaseProvider>
  );
}
