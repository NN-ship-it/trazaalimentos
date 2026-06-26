# 📋 GUÍA COMPLETA - TRAZAALIMENTOS

## 🎯 CASOS DE USO IMPLEMENTADOS

### ✅ 1. REGISTRAR PRODUCTO (PRODUCTOR)
**Acceso:** Pestaña "📝 Registrar Producto"

**Lo que hace:**
- Productor registra un nuevo producto
- Valida datos: nombre, descripción, fechas, lote, certificación, cantidad
- Genera automáticamente código QR
- Registra movimiento inicial (PRODUCCION) en trazabilidad

**Datos que se guardan:**
- ✅ Nombre del producto
- ✅ Descripción detallada
- ✅ Fecha de producción
- ✅ Fecha de vencimiento
- ✅ ID de lote (único)
- ✅ Certificación (BPA, HACCP)
- ✅ Cantidad
- ✅ Unidad de medida
- ✅ Código QR (generado automáticamente)
- ✅ Usuario productor

---

### ✅ 2. REGISTRAR TRASLADO (DISTRIBUIDOR)
**Acceso:** Pestaña "🚚 Registrar Traslado"

**Lo que hace:**
- Distribuidor registra movimiento del producto
- Llena: ID producto, origen, destino, temperatura, condiciones
- Registra en trazabilidad como TRASLADO
- Actualiza ubicación actual

**Datos que se guardan:**
- ✅ ID del producto
- ✅ Origen (de dónde sale)
- ✅ Destino (a dónde va)
- ✅ Temperatura durante transporte
- ✅ Condiciones de transporte (refrigerado, protegido, etc)
- ✅ Observaciones
- ✅ Fecha y hora del traslado
- ✅ Usuario (distribuidor)

---

### ✅ 3. CONFIRMAR RECEPCIÓN (COMERCIANTE)
**Acceso:** Pestaña "📦 Confirmar Recepción"

**Lo que hace:**
- Comerciante confirma llegada del producto
- Registra estado: ACEPTADO, DEFECTUOSO, PARCIALMENTE DAÑADO, RECHAZADO
- Especifica ubicación en punto de venta
- Registra en trazabilidad como RECEPCION

**Datos que se guardan:**
- ✅ ID del producto
- ✅ Estado del producto recibido
- ✅ Ubicación actual (en qué parte del almacén/tienda)
- ✅ Observaciones sobre el estado
- ✅ Fecha y hora de recepción
- ✅ Usuario (comerciante)

---

### ✅ 4. ESCANEAR QR (CONSUMIDOR)
**Acceso:** Pestaña "🔍 Escanear QR"

**Lo que hace:**
- Consumidor escanea código QR del producto
- Ve información completa del producto
- Ve historial completo de trazabilidad
- Ve estado de vencimiento

**Información que se muestra:**
- ✅ Nombre del producto
- ✅ Descripción
- ✅ ID de lote
- ✅ Productor
- ✅ Cantidad
- ✅ Certificación
- ✅ Fecha de producción
- ✅ Fecha de vencimiento
- ✅ Estado del vencimiento (VIGENTE, PRÓXIMO A VENCER, VENCIDO)
- ✅ Historial de trazabilidad completo (PRODUCCION → TRASLADO → RECEPCION)

---

### ✅ 5. VER AUDITORÍA (ADMINISTRADOR)
**Acceso:** Pestaña "🔐 Ver Auditoría"

**Lo que hace:**
- Administrador ve todas las acciones realizadas
- Filtra por tipo de acción
- Ve tabla con todas las operaciones del sistema
- Estadísticas resumen

**Información que se muestra:**
- ✅ Fecha y hora exacta
- ✅ Usuario que realizó la acción
- ✅ Tipo de acción (REGISTRAR_PRODUCTO, REGISTRAR_TRASLADO, etc)
- ✅ Tabla afectada
- ✅ Detalles de la acción
- ✅ Estadísticas: total de productos, traslados, recepciones

---

## 🏗️ ARQUITECTURA DEL PROYECTO

```
TRACDOSALIMENTOS/
│
├── 📱 FRONTEND (React)
│   ├── Navegacion.jsx         → Menú superior con 5 casos de uso
│   ├── RegistrarProducto.jsx  → Formulario para PRODUCTOR
│   ├── RegistrarTraslado.jsx  → Formulario para DISTRIBUIDOR
│   ├── ConfirmarRecepcion.jsx → Formulario para COMERCIANTE
│   ├── EscanearQR.jsx         → Búsqueda para CONSUMIDOR
│   └── VerAuditoria.jsx       → Tabla para ADMINISTRADOR
│
├── 🔧 BACKEND (Spring Boot)
│   ├── Controllers/
│   │   ├── ProductoController    → POST registrar, GET por QR
│   │   ├── TrazabilidadController→ POST traslado, POST recepción
│   │   └── AuditoriaController   → GET todos los registros
│   ├── Services/
│   │   ├── ProductoService       → Lógica registrar producto
│   │   ├── TrazabilidadService   → Lógica traslado y recepción
│   │   └── AuditoriaService      → Lógica auditoría
│   ├── Models/ (Entities)
│   │   ├── Usuario
│   │   ├── Producto
│   │   ├── Trazabilidad
│   │   ├── Certificacion
│   │   └── Auditoria
│   └── Repositories/ (DAO)
│       ├── ProductoRepository
│       ├── TrazabilidadRepository
│       ├── AuditoriaRepository
│       ├── UsuarioRepository
│       └── CertificacionRepository
│
└── 🗄️ DATABASE (MySQL)
    ├── usuarios (4 prueba)
    ├── productos (registros)
    ├── trazabilidad (historial)
    ├── certificaciones (2 disponibles)
    └── auditoria (log de acciones)
```

---

## 🔄 FLUJO DE DATOS - CASO COMPLETO

### Ejemplo: Tomate fresco de granja a mesa

**1️⃣ PRODUCTOR registra producto**
```
📝 RegistrarProducto → Backend → DB (productos)
                                → Trazabilidad (PRODUCCION)
                                → Genera QR
```

**2️⃣ DISTRIBUIDOR registra traslado**
```
🚚 RegistrarTraslado → Backend → DB (trazabilidad - TRASLADO)
                                → Actualiza ubicación
                                → Registra temperatura
```

**3️⃣ COMERCIANTE confirma recepción**
```
📦 ConfirmarRecepcion → Backend → DB (trazabilidad - RECEPCION)
                                → Actualiza estado producto
                                → Registra ubicación en tienda
```

**4️⃣ CONSUMIDOR escanea QR**
```
🔍 EscanearQR → Backend → BD (busca en trazabilidad)
                        → Retorna historial completo
```

**5️⃣ ADMINISTRADOR audita**
```
🔐 VerAuditoria → Backend → DB (auditoría)
                          → Muestra todas las acciones
```

---

## 📊 ENDPOINTS DEL BACKEND

### Productos
- `POST /api/v1/productos/registrar` - Registrar producto
- `GET /api/v1/productos/qr/{codigoQr}` - Buscar por QR
- `GET /api/v1/productos/productor/{productorId}` - Productos de productor
- `GET /api/v1/productos/{productoId}/trazabilidad` - Historial completo

### Trazabilidad
- `POST /api/v1/trazabilidad/registrar-traslado` - Registrar traslado
- `POST /api/v1/trazabilidad/confirmar-recepcion` - Confirmar recepción
- `GET /api/v1/trazabilidad/historial/{productoId}` - Ver historial

### Auditoría
- `GET /api/v1/auditoria/todos` - Ver todos los registros
- `GET /api/v1/auditoria/usuario/{usuarioId}` - Auditoría de usuario
- `GET /api/v1/auditoria/ultimas?limite=50` - Últimas N acciones

---

## 🚀 CÓMO USAR LA APLICACIÓN

### Paso 1: Registrar Producto
1. Click en "📝 Registrar Producto"
2. Llena el formulario:
   - Nombre: "Tomates Frescos"
   - Descripción: "Tomates de calidad..."
   - Fechas: Hoy y 15 días adelante
   - Lote: "LOTE-2024-001"
   - Certificación: "BPA"
   - Cantidad: "100 kg"
3. Click "Registrar Producto"
4. ¡Se genera el QR!

### Paso 2: Registrar Traslado
1. Click en "🚚 Registrar Traslado"
2. Llena:
   - ID Producto: (el registrado en paso 1)
   - Origen: "Productor en Lima"
   - Destino: "Centro de Distribución - Callao"
   - Temperatura: "15°C"
3. Click "Registrar Traslado"

### Paso 3: Confirmar Recepción
1. Click en "📦 Confirmar Recepción"
2. Llena:
   - ID Producto: (el mismo)
   - Estado: "ACEPTADO"
   - Ubicación: "Almacén Central - Estante A1"
3. Click "Confirmar Recepción"

### Paso 4: Escanear QR (Como Consumidor)
1. Click en "🔍 Escanear QR"
2. Ingresa el código QR o el ID de lote
3. ¡Ve toda la información!
4. Scrollea para ver el historial completo

### Paso 5: Ver Auditoría
1. Click en "🔐 Ver Auditoría"
2. Ve todas las acciones realizadas
3. Filtra por tipo de acción
4. Ve estadísticas

---

## 🎨 INTERFAZ DE USUARIO

- ✅ Responsive (funciona en móvil, tablet, desktop)
- ✅ Validaciones en tiempo real
- ✅ Mensajes de error claros
- ✅ Confirmaciones visuales
- ✅ Timeline visual para trazabilidad
- ✅ Colores por tipo de acción
- ✅ Iconos emoji para fácil identificación

---

## 🔐 SEGURIDAD

- ✅ Validación de datos en frontend y backend
- ✅ JWT preparado (para futuro)
- ✅ CORS configurado
- ✅ Auditoría de todas las acciones
- ✅ Roles diferenciados por actor

---

## 📈 PRÓXIMAS MEJORAS

- [ ] Sistema de login con JWT
- [ ] Escaneo real de QR con cámara
- [ ] Generación de reportes
- [ ] Dashboard analytics
- [ ] Sistema de alertas para vencimientos
- [ ] API para integraciones externas
- [ ] Soporte multi-idioma
- [ ] Sistema de notificaciones en tiempo real

---

## 📞 SOPORTE

Para problemas o preguntas, abre un issue en GitHub.

**¡Gracias por usar Trazaalimentos! 🌾**
