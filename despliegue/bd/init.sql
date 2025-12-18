CREATE DATABASE IF NOT EXISTS casino_db;
USE casino_db;


-- 1. Tabla CLIENTE 
CREATE TABLE IF NOT EXISTS clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_documento VARCHAR(50) NOT NULL,
    nro_documento VARCHAR(20) NOT NULL UNIQUE,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    bono VARCHAR(1) NOT NULL,
    
    -- Campos de Auditoría 
    user_registro VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL
);

-- 2. Tabla CORREO 
CREATE TABLE IF NOT EXISTS correos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    email_destino VARCHAR(150) NOT NULL,
    asunto VARCHAR(255) NOT NULL,
    estado_envio VARCHAR(50) NOT NULL,

    -- Campos de Auditoría 
    user_registro VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL,

    CONSTRAINT fk_correo_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE CASCADE
);

-- 3. Tabla TOKEN 
CREATE TABLE IF NOT EXISTS tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE,   

    -- Campos de Auditoría 
    user_registro VARCHAR(100) NOT NULL DEFAULT 'SYSTEM',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_registro VARCHAR(45) NULL,
    user_update VARCHAR(100) NULL,
    fecha_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ip_update VARCHAR(45) NULL,

    CONSTRAINT fk_token_cliente FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE SET NULL
);

-- 4. Parametros Globales
CREATE TABLE IF NOT EXISTS parametros_globales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(100) NOT NULL UNIQUE, 
    key_value VARCHAR(255) NOT NULL,
    description VARCHAR(255) NULL, 
    estado BOOLEAN NOT NULL DEFAULT 1,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO parametros_globales (key_name, key_value, description) VALUES
('SEND_EMAIL', 'true', 'Se encarga de habilitar/deshabilitar el envío de correo de bienvenida');