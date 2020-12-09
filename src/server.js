const express = require("express");
const customExpress = require("./Config/customExpress");

const app = express();

const PORT = 4560;


app.use(customExpress);


app.listen(PORT, () => {
    console.log(`Servidor rodando, PORT: ${PORT}`);
})