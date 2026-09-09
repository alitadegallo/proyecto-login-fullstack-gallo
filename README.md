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

SQL Server queda disponible en `localhost:3301` con:

- Usuario: `admin`
- Contraseña: `123`
- Base de datos: `GalloDb`

La API crea automáticamente la base `GalloDb` y la tabla `Users` al iniciar. Los usuarios registrados se conservan en el volumen de Docker.

Para abrirla en HeidiSQL usa `Microsoft SQL Server (TCP/IP)`, host `127.0.0.1`, puerto `3301`, usuario `admin`, contraseña `123` y base `GalloDb`.

## Backend

```powershell
Set-Location backend
Copy-Item .env.example .env
npm install
npm run dev
```

API: `http://localhost:3300`

Prueba de conexión: `http://localhost:3000/health`

## Frontend Expo

Desde la raíz del proyecto:

```powershell
npm start
```

Pulsa `w` para web o escanea el QR con Expo Go. Para un teléfono físico, configura la URL de la API usando la IP local de tu computadora en lugar de `localhost`.
