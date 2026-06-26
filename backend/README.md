# Trazaalimentos - Sistema de Trazabilidad de Alimentos

## 📦 Instalación y Configuración

### Backend (Spring Boot)

#### Requisitos
- Java 17 o superior
- Maven 3.6+
- MySQL 8.0+

#### Pasos de instalación

1. **Crear la base de datos**
```bash
mysql -u root -p < database/schema.sql
```

2. **Configurar la conexión a la BD** (backend/src/main/resources/application.yml)
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/trazaalimentos
    username: root
    password: tu_contraseña
```

3. **Compilar e instalar dependencias**
```bash
cd backend
mvn clean install
```

4. **Ejecutar la aplicación**
```bash
mvn spring-boot:run
```

El backend estará disponible en: http://localhost:8080/api

### Frontend (React)

#### Requisitos
- Node.js 16+ y npm

#### Pasos de instalación

1. **Instalar dependencias**
```bash
cd frontend
npm install
```

2. **Iniciar la aplicación**
```bash
npm start
```

El frontend estará disponible en: http://localhost:3000

## 🚀 Características Implementadas

### ✅ Caso de Uso 1: Registrar Producto (PRODUCTOR)

**Backend:**
- Endpoint: `POST /api/v1/productos/registrar`
- Validación de datos del formulario
- Generación automática de código QR
- Registro en tabla de trazabilidad (PRODUCCION)
- Manejo de errores y respuestas

**Frontend:**
- Formulario completo con validaciones
- Campos: nombre, descripción, fechas, lote, certificación, cantidad
- Visualización del QR generado
- Opción de descarga del QR
- Interfaz responsive

**Datos Registrados:**
- ✓ Nombre del producto
- ✓ Descripción
- ✓ Fecha de producción
- ✓ Fecha de vencimiento
- ✓ ID de lote
- ✓ Certificación
- ✓ Cantidad
- ✓ Código QR (generado automáticamente)

## 🗄️ Estructura de Tablas

### usuarios
Almacena información de todos los actores del sistema

### productos
Registro de cada producto con su información completa

### trazabilidad
Histórico de movimientos de cada producto

### certificaciones
Certificaciones válidas del sistema

## 🔌 Endpoints Disponibles

### Productos
- `POST /v1/productos/registrar` - Registrar nuevo producto
- `GET /v1/productos/qr/{codigoQr}` - Obtener producto por QR
- `GET /v1/productos/productor/{productorId}` - Obtener productos de un productor
- `GET /v1/productos/{productoId}/trazabilidad` - Obtener trazabilidad de un producto

## 🎯 Próximos Casos de Uso

- [ ] Registrar Traslado (DISTRIBUIDOR)
- [ ] Confirmar Recepción (COMERCIANTE)
- [ ] Escanear QR (CONSUMIDOR)
- [ ] Auditar Registros (ADMINISTRADOR)
- [ ] Sistema de Autenticación (JWT)

## 📝 Notas de Desarrollo

- JWT Secret: Cambiar en producción (application.yml)
- CORS configurado para http://localhost:3000
- Base de datos se actualiza automáticamente (ddl-auto: update)

## 🆘 Troubleshooting

**Error de conexión a BD:**
- Verificar que MySQL está corriendo
- Verificar credenciales en application.yml
- Verificar que la base de datos fue creada

**Error de CORS:**
- Verificar que el frontend está en http://localhost:3000
- Verificar que el backend está en http://localhost:8080

**Error al generar QR:**
- Verificar que ZXing está correctamente configurado
- Revisar logs de la aplicación

## 📧 Contacto y Soporte

Para reportar issues o sugerencias, abre un issue en el repositorio.

---
**Estado**: En desarrollo 🚧
**Versión**: 1.0.0
