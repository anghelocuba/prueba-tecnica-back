USE seguridad_db;

-- Tabla para tokens de sesión
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
    ip_update VARCHAR(45) NULL
);

