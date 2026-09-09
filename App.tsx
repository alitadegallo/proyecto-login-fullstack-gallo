import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { NativeBaseProvider } from 'native-base';

import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { apiRequest } from "./src/config/api";

const Spacing = { one: 8, two: 12, three: 16, five: 20 };

async function saveToken(token: string) {
  if (typeof localStorage !== "undefined") localStorage.setItem("token", token);
}

export default function App() {
  // Datos que escribe el usuario y estados visuales del login.
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);
  const [errorLogin, setErrorLogin] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const router = useRouter();
  const showToast = (description: string, type: "success" | "error" = "success") => {
    setToastMessage(description);
    setToastType(type);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Envía credenciales al backend para iniciar sesion y guarda el token, si es exitoso manda un Toast Global para que muestre un mensaje
  const iniciarSesion = async () => {
    try {
      const data = await apiRequest<{ token?: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password: contraseña }),
      });

      if (!data.token) {
        throw new Error("El servidor no devolvió un token de sesión");
      }

      await saveToken(data.token);
      showToast("Inicio de sesión exitoso");
      router.push("/paginaprincipal");
    } catch (error) {
      setEmail("");
      setContraseña("");

      showToast(
        error instanceof Error ? error.message : "Contraseña inválida",
        "error",
      );
    }
  };

  // Formulario para inicio de sesión
  return (
    <View style={styles.container}>
      {toastMessage !== "" && (
        <View style={toastType === "error" ? styles.errorBox : styles.successBox}>
          <Text style={toastType === "error" ? styles.errorText : styles.successText}>
            {toastMessage}
          </Text>
        </View>
      )}

      <Text style={styles.text}>Inicie sesión</Text>

      {/* Correo */}
      <TextInput
        placeholder="Ingrese su email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.textInput}
      />

      {/* Contraseña con secure para que no salga la contraseña al escribir */}
      <TextInput
        placeholder="Ingrese su contraseña"
        value={contraseña}
        onChangeText={setContraseña}
        secureTextEntry={true}
        style={styles.textInput}
      />

      {/* Inicio de sesión */}
      <Pressable
        style={[styles.button, isHoveredLogin && styles.hovered]}
        onPress={iniciarSesion}
        onHoverIn={() => setIsHoveredLogin(true)}
        onHoverOut={() => setIsHoveredLogin(false)}
      >
        <Text style={[styles.buttonText, isHoveredLogin && styles.hoveredText]}>
          Iniciar sesión
        </Text>
      </Pressable>

      {/* Mensaje de error cuando falla */}
      {errorLogin !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorLogin}</Text>
        </View>
      )}

      {/* Botón de registro */}
      <Pressable
        style={[styles.button2, isHoveredRegister && styles.hovered]}
        onPress={() => {
          router.push("/registrarUsuario");
        }}
        onHoverIn={() => setIsHoveredRegister(true)}
        onHoverOut={() => setIsHoveredRegister(false)}
      >
        <Text
          style={[styles.buttonText2, isHoveredRegister && styles.hoveredText]}
        >
          ¿No tiene una cuenta? Regístrese aquí
        </Text>
      </Pressable>

      {/* Mensaje de error cuando falla */}
      {errorLogin !== "" && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{errorLogin}</Text>
        </View>
      )}
    </View>
  );
}

// Estilos del inicio de sesión, incluye el toastGlobal
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
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#000000",
    borderRadius: Spacing.five,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderWidth: 1,
    marginBottom: 16,
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginTop: 20,
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
});
