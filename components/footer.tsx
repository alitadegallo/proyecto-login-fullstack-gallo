import { useRouter } from "expo-router";
import { Box, Button, HStack, Spacer, Text } from "native-base";

export default function Footer() {
  const router = useRouter();

  return (
    <Box safeAreaBottom bg="muted.800" px={4} py={3}>
      <HStack alignItems="center" space={3}>
        <Text color="white" fontSize="sm">
          Mi aplicación
        </Text>
        <Spacer />
        <Button
          size="sm"
          variant="ghost"
          _text={{ color: "white" }}
          onPress={() => router.push("/paginaprincipal")}
        >
          Inicio
        </Button>
        <Button
          size="sm"
          variant="ghost"
          _text={{ color: "white" }}
          onPress={() => router.push("/registrarUsuario")}
        >
          Registro
        </Button>
      </HStack>
    </Box>
  );
}
