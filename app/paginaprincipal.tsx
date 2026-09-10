import { router } from 'expo-router';
import { Center, Heading, Text } from 'native-base';
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import Card from "../components/cards";
const Spacing = { one: 8, two: 12, three: 16, five: 20 };

const cards = [
  {
    image: "https://images.unsplash.com/photo-1742070122889-1505dd7a93b8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Carretilla elevadora Verde",
    subtitle: "India",
    description: "Enviasda desde India el 22/10/2026",
  },
  {
    image: "https://images.unsplash.com/photo-1650296820622-270ea3efe404?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Mini cargadora",
    subtitle: "Estados Unidos",
    description: "El 22/10/2026 se enviara al puerto maritimo desde Estados Unidos",
  },
  {
    image: "https://images.unsplash.com/photo-1763665814546-27c2c003317e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Montecargas",
    subtitle: "En china",
    description: "Sale del puerto maritimo el 22/10/2026",
  },
];

export default function PaginaPrincipal() {
     const [isHoveredCerrarSesion, setIsHoveredCerrarSesion] = useState(false);
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Center>
        <Heading>Bienvenido</Heading>
        <Text style={styles.text}>Has iniciado sesión correctamente.</Text>

        {cards.map((card) => (
          <Card key={card.title} {...card} />
        ))}

        <Pressable
          style={[styles.button, isHoveredCerrarSesion && styles.hovered]}
          onHoverIn={() => setIsHoveredCerrarSesion(true)}
          onHoverOut={() => setIsHoveredCerrarSesion(false)}
          onPress={() => router.replace("/")}
        >
          <Text style={[styles.buttonText, isHoveredCerrarSesion && styles.hoveredText]}>
            Cerrar sesión
          </Text>
        </Pressable>
      </Center>
    </ScrollView>
  );
};

// Estilos de registros
const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingVertical: 24,
  },

  container: {
    flex: 1,
    backgroundColor: "#412727",
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  textInput: {
    borderColor: "black", 
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
