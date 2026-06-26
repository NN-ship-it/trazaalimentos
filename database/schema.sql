-- Base de Datos: Trazaalimentos
CREATE DATABASE IF NOT EXISTS trazaalimentos;
USE trazaalimentos;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol ENUM('PRODUCTOR', 'DISTRIBUIDOR', 'COMERCIANTE', 'CONSUMIDOR', 'ADMINISTRADOR') NOT NULL,
    empresa VARCHAR(100),
    telefono VARCHAR(20),
    ubicacion VARCHAR(200),
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de Certificaciones
CREATE TABLE certificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    fecha_emision DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    organismo VARCHAR(100),
    activa BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Productores (extendida de usuarios)
CREATE TABLE productores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL UNIQUE,
    nombre_empresa VARCHAR(100) NOT NULL,
    numero_registro VARCHAR(50) UNIQUE,
    ubicacion_produccion VARCHAR(200),
    certificaciones_ids JSON,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Productos
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    productor_id INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    fecha_produccion DATE NOT NULL,
    fecha_vencimiento DATE NOT NULL,
    lote_id VARCHAR(50) NOT NULL,
    certificacion_id INT,
    cantidad INT,
    unidad_medida VARCHAR(20),
    codigo_qr VARCHAR(255) UNIQUE,
    estado ENUM('ACTIVO', 'VENDIDO', 'VENCIDO', 'RECHAZADO') DEFAULT 'ACTIVO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (productor_id) REFERENCES usuarios(id),
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id),
    UNIQUE KEY unique_lote (productor_id, lote_id)
);

-- Tabla de Trazabilidad (historial de movimientos)
CREATE TABLE trazabilidad (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    tipo_movimiento ENUM('PRODUCCION', 'TRASLADO', 'RECEPCION', 'VENTA', 'RECHAZO') NOT NULL,
    usuario_id INT NOT NULL,
    fecha_movimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    origen VARCHAR(200),
    destino VARCHAR(200),
    temperatura DECIMAL(5,2),
    condiciones_transporte TEXT,
    observaciones TEXT,
    estado_producto VARCHAR(100),
    ubicacion_actual VARCHAR(200),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Auditoría
CREATE TABLE auditoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    accion VARCHAR(100) NOT NULL,
    tabla_afectada VARCHAR(50),
    id_registro INT,
    detalles TEXT,
    ip_address VARCHAR(50),
    fecha_auditoria TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Tabla de Validaciones de Certificación
CREATE TABLE validaciones_certificacion (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT NOT NULL,
    certificacion_id INT NOT NULL,
    entidad_certificadora_id INT NOT NULL,
    fecha_validacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resultado ENUM('APROBADO', 'RECHAZADO', 'PENDIENTE') DEFAULT 'PENDIENTE',
    comentarios TEXT,
    FOREIGN KEY (producto_id) REFERENCES productos(id),
    FOREIGN KEY (certificacion_id) REFERENCES certificaciones(id),
    FOREIGN KEY (entidad_certificadora_id) REFERENCES usuarios(id)
);

-- Índices para optimización
CREATE INDEX idx_producto_lote ON productos(lote_id);
CREATE INDEX idx_producto_estado ON productos(estado);
CREATE INDEX idx_trazabilidad_producto ON trazabilidad(producto_id);
CREATE INDEX idx_trazabilidad_fecha ON trazabilidad(fecha_movimiento);
CREATE INDEX idx_usuario_rol ON usuarios(rol);
CREATE INDEX idx_auditoria_fecha ON auditoria(fecha_auditoria);

-- Insertar datos de prueba
INSERT INTO usuarios (nombre, email, contrasena, rol, empresa, telefono, ubicacion) VALUES
('Juan Productor', 'juan@productor.com', 'hash_password_123', 'PRODUCTOR', 'Agrícola San Juan', '555-0001', 'Lima, Perú'),
('María Distribuidor', 'maria@distribuidor.com', 'hash_password_123', 'DISTRIBUIDOR', 'Logística MR', '555-0002', 'Callao, Perú'),
('Carlos Comerciante', 'carlos@comerciante.com', 'hash_password_123', 'COMERCIANTE', 'Supermercado El Éxito', '555-0003', 'Lima, Perú'),
('Admin Sistema', 'admin@trazaalimentos.com', 'hash_password_123', 'ADMINISTRADOR', 'Trazaalimentos', '555-0004', 'Lima, Perú');

INSERT INTO certificaciones (nombre, descripcion, codigo, fecha_emision, fecha_vencimiento, organismo) VALUES
('BPA - Buenas Prácticas Agrícolas', 'Certificación de producción responsable', 'BPA-2024-001', '2024-01-15', '2027-01-15', 'MINAGRI'),
('HACCP', 'Análisis de Peligros y Puntos de Control Crítico', 'HACCP-2024-001', '2024-02-20', '2027-02-20', 'FDA');

INSERT INTO productores (usuario_id, nombre_empresa, numero_registro, ubicacion_produccion) VALUES
(1, 'Agrícola San Juan', 'REG-PROD-001', 'Valle del Mantaro, Junín');
