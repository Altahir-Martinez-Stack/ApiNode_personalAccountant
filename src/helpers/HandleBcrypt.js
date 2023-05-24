const bcrypt = require("bcryptjs");

//encryta la contraseña
const encrypt = async (textPplain) => {
  const hash = await bcrypt.hash(textPplain, 10);
  return hash;
};

//comprar la contraseña
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
