

const generateToken = () => {
    // Genera un número aleatorio de 8 dígitos
    return Math.floor(10000000 + Math.random() * 90000000).toString();
};

/*const generateAndSaveToken = () => {
    const token = generateToken();
    db.saveToken(token);
    return token;
};

const validateToken = (token) => {
    return db.findToken(token);
};
*/
module.exports = {
    //generateAndSaveToken,
    //validateToken
};