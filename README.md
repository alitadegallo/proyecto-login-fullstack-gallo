# Proyecto Prueba Login Gallo

Base de proyecto con Expo/React Native, API Node.js y SQL Server.

## Requisitos

- Node.js 20 o superior
- Docker Desktop iniciado
- Expo Go para probar en un teléfono, o un emulador Android

## SQL Server

```powershell
docker compose up -d
```

SQL Server queda disponible en `localhost:1433` con:

- Usuario: `sa`
- Contraseña: `GalloPassword_2026!`
- Base de datos: `GalloDb`

## Backend

```powershell
Set-Location backend
Copy-Item .env.example .env
npm install
npm run dev
```

API: `http://localhost:3000`

Prueba de conexión: `http://localhost:3000/health`

## Frontend Expo

Desde la raíz del proyecto:

```powershell
npm start
```

Pulsa `w` para web o escanea el QR con Expo Go. Para un teléfono físico, configura la URL de la API usando la IP local de tu computadora en lugar de `localhost`.
