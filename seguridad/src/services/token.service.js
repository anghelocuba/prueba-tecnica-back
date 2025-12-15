const db = {
    // Simulación de guardar en una tabla de tokens (Token, Fecha, Validez)
    saveToken: (token) => {
        console.log(`[Seguridad] Token ${token} guardado en DB.`);
        // En un entorno real: INSERT INTO tokens (token_value, created_at, is_valid) VALUES (...)
        return true;
    },
    // Simulación de validación (el MS Clientes lo usa)
    findToken: (token) => {
        // En un entorno real: SELECT is_valid FROM tokens WHERE token_value = ?
        return token && token.length === 8; // Simplemente verifica el formato por ahora
    }
};

const generateToken = () => {
    // Genera un número aleatorio de 8 dígitos
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

const generateAndSaveToken = () => {
    const token = generateToken();
    db.saveToken(token);
    return token;
};

const validateToken = (token) => {
    return db.findToken(token);
};

module.exports = {
    generateAndSaveToken,
    validateToken
};