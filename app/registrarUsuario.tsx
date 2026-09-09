import { useRouter } from 'expo-router';
import { apiRequest } from '../src/config/api';

import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const Spacing = { one: 8, two: 12, three: 16, five: 20 };

export default function RegistrarUsuario() {
  // Valores de los campos del registro
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const router = useRouter();
  const showToast = (description: string, type: "success" | "error" = "success") => {
    setToastMessage(description);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // datos enviados al backend
  const registrar = async () => {
    try {
      await apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name: nombre, email, password }),
      });
      setTimeout(() => router.replace("/"), 3000);
      showToast("Usuario registrado correctamente");
      
    } catch (error) {
      showToast(
        error instanceof Error
          ? error.message
          : "No se pudo registrar el usuario",
        "error",
      );
    }
  };

  // Formulario de creación de usuario
  return (
    <View style={styles.container}>
      {toastMessage !== "" && (
        <View style={toastType === "error" ? styles.errorBox : styles.successBox}>
          <Text style={toastType === "error" ? styles.errorText : styles.successText}>
            {toastMessage}
          </Text>
        </View>
      )}

      <Text style={styles.text}>Registrar usuario</Text>
      {/* Nombre de usuario */}
      <TextInput
        style={styles.textInput}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      {/* Correo */}
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {/* Contraseña con secure para que no se vea */}
      <TextInput
        style={styles.textInput}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Botón de registro */}
      <Pressable style={styles.button} onPress={registrar}>
        <Text style={styles.buttonText}>Registrar</Text>
      </Pressable>
    </View>
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

  successBox: {
    position: "absolute",
    top: 24,
    alignSelf: "center",
    backgroundColor: "#d1fae5",
    borderColor: "#10b981",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    zIndex: 1,
  },

  successText: {
    color: "#065f46",
    fontWeight: "bold",
    textAlign: "center",
  },

  errorBox: {
    position: "absolute",
    top: 24,
    alignSelf: "center",
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    zIndex: 1,
  },

  errorText: {
    color: "#721c24",
    fontWeight: "bold",
    textAlign: "center",
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
