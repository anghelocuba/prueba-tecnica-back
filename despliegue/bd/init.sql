-- Verificar si la base de datos existe y usarla, si no, crearla
CREATE DATABASE IF NOT EXISTS casino_db;
USE casino_db;
-- --------------------------------------------------------------------------
-- 1. Tabla CLIENTE (Datos personales y detalles de cuenta)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    -- Campos del cliente
    tipo_documento VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    bono VARCHAR(1) NOT NULL ,
    
    -- Campos de Auditoría (Registro)
    user_registro VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    
    -- Campos de Auditoría (Actualización)
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL
);

-- --------------------------------------------------------------------------
-- 2. Tabla CORREO (Registro de envío de correos, vinculado a clientes)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS correos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    email_destino VARCHAR(150) NOT NULL,
    asunto VARCHAR(255) NOT NULL,
    estado_envio VARCHAR(50) NOT NULL ,
    
    -- Clave Foránea
    CONSTRAINT fk_correo_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE,

    -- Campos de Auditoría (Registro)
    user_registro VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    
    -- Campos de Auditoría (Actualización)
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL
);

-- --------------------------------------------------------------------------
-- 3. Tabla TOKEN (Para Microservicio de SEGURIDAD)
-- --------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NULL ,
    token VARCHAR(255) NOT NULL UNIQUE,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE,
    
    -- Clave Foránea (Opcional, depende de tu lógica de seguridad)
    CONSTRAINT fk_token_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE SET NULL, 

    -- Campos de Auditoría (Registro)
    user_registro VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    
    -- Campos de Auditoría (Actualización)
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL
);

