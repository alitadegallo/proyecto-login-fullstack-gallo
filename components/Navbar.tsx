import { useRouter } from "expo-router";
import { Box, Button, HStack, Pressable, Spacer, NativeBaseProvider, extendTheme, Text } from "native-base";

export default function Navbar() {
  const router = useRouter();

  return (
    <Box safeAreaTop bg="muted.800" px={4} py={3}>
      <HStack alignItems="center" space={4}>
        <Pressable onPress={() => router.push("/paginaprincipal")}> 
          <Text color="white" fontSize="lg" fontWeight="bold">
            Envios 
          </Text>
        </Pressable>

        <Spacer />

        <Button
          variant="ghost"
          _text={{ color: "white" }}
          onPress={() => router.push("/paginaprincipal")}
        >
          Inicio
        </Button>
        <Button
          variant="ghost"
          _text={{ color: "white" }}
          onPress={() => router.push("/registrarUsuario")}
        >
          Registrarse
        </Button>
      </HStack>
    </Box>
    
    
  );
}