import { router } from 'expo-router';
import { Button, Center, Heading, Text, NativeBaseProvider, Box, Container, Toast, useToast } from 'native-base';
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
const Spacing = { one: 8, two: 12, three: 16, five: 20 };

export default function PaginaPrincipal() {
     const [isHoveredCerrarSesion, setIsHoveredCerrarSesion] = useState(false);
  return (
    <Center flex={1}>
      <Heading>Pagina principal</Heading>
      <Text style={styles.text}>Has iniciado sesión correctamente.</Text>

      <Pressable style={[styles.button, isHoveredCerrarSesion && styles.hovered]} 
      
        onHoverIn={() => setIsHoveredCerrarSesion(true)}
        onHoverOut={() => setIsHoveredCerrarSesion(false)} 
        onPress={() => router.replace("/")}>

        <Text style={[styles.buttonText, isHoveredCerrarSesion && styles.hoveredText]}>Cerrar sesión</Text>
        
      </Pressable>
    </Center>
  );
}

// Estilos de registros
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  textInput: {
    borderColor: "gray",
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 20,
    alignItems: "center",
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#000000",
    borderRadius: Spacing.five,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
  },

  buttonText2: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  button2: {
    backgroundColor: "#000000",
    borderRadius: Spacing.five,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    bottom: -250,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  hovered: {
    backgroundColor: "#ffffff",
    borderColor: "#000000",
    borderRadius: Spacing.five,
    borderWidth: 1,
  },

  hoveredText: {
    color: "#000000",
  },
});
