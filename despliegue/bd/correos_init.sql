USE correos_db;

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
    ip_update VARCHAR(45) NULL
);