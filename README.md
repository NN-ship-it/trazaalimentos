# 🌾 Trazaalimentos - Sistema de Trazabilidad de Alimentos

Sistema web completo para rastrear alimentos desde producción hasta consumidor, utilizando códigos QR para garantizar seguridad alimentaria y transparencia en la cadena de suministro.

## 📋 Características

- ✅ Registro de productos con certificaciones
- ✅ Generación automática de códigos QR
- ✅ Trazabilidad completa (Productor → Distribuidor → Comerciante → Consumidor)
- ✅ Auditoría de registros por administrador
- ✅ Consulta de datos por consumidor escaneando QR
- ✅ Sistema de roles y autenticación

## 🛠️ Stack Tecnológico

- **Frontend**: React 18
- **Backend**: Spring Boot 3
- **Base de Datos**: MySQL 8
- **Autenticación**: JWT
- **QR**: QRCode.js y ZXing

## 📁 Estructura del Proyecto

```
trazaalimentos/
├── backend/                 # Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── frontend/                # React
│   ├── src/
│   ├── public/
│   └── package.json
├── database/                # Scripts SQL
│   └── schema.sql
└── README.md
```

## 🚀 Casos de Uso Implementados

### 1. Registrar Producto (PRODUCTOR)
- Nombre del producto
- Descripción
- Fecha de producción
- Fecha de vencimiento
- ID Lote
- Certificaciones
- Datos del productor
- Genera QR automáticamente

### 2. Registrar Traslado (DISTRIBUIDOR)
- Registra movimiento del producto
- Fecha, origen, destino
- Condiciones de transporte

### 3. Confirmar Recepción (COMERCIANTE)
- Confirma recepción del lote
- Estado del producto
- Actualiza estado para venta

### 4. Escanear QR (CONSUMIDOR)
- Visualiza datos completos del producto
- Histórico de trazabilidad
- Certificaciones

### 5. Auditar Registros (ADMINISTRADOR)
- Control de todos los registros
- Asignación de roles
- Validación de certificaciones

## 🔧 Instalación y Configuración

### Base de Datos
```bash
# Crear base de datos
mysql -u root -p < database/schema.sql
```

### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📖 Documentación

- [Backend - Guía de Configuración](./backend/README.md)
- [Frontend - Guía de Configuración](./frontend/README.md)
- [API REST - Endpoints](./backend/docs/API.md)

## 👥 Actores del Sistema

| Actor | Función |
|-------|---------|
| **PRODUCTOR** | Registra productos y genera QR |
| **DISTRIBUIDOR** | Registra traslados y movimientos |
| **COMERCIANTE** | Confirma recepción y estado de venta |
| **CONSUMIDOR** | Escanea QR y consulta información |
| **ADMINISTRADOR** | Audita registros y gestiona usuarios |

## 📝 Licencia

MIT

## 👨‍💻 Autor

NN-ship-it

---

**Estado**: En desarrollo 🚧
