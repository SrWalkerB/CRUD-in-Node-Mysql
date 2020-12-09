const bcrypt = require("bcrypt");


module.exports = {

    cruptografar_password: async (password) => {

        const salt = 12;

        return await bcrypt.hash(password, salt);
    }
}