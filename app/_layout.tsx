import { Stack } from "expo-router";
import { Box, NativeBaseProvider } from "native-base";
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <Navbar />
      <Box flex={1}>
        <Stack screenOptions={{ headerShown: false }} />
      </Box>
      <Footer />
    </NativeBaseProvider>
  );
}
