const express = require("express"); //Permite importar el módulo
const bodyParser = require("body-parser");

const app = express();
const puerto = 3001;

app.use(bodyParser.json());

app.use("/contactos", (request, response, next) => {
    console.log("ingresa a middleware");
    console.log("headers:", request.headers);
    console.log("body:", request.body);
    next();
});

app.get("/contactos", (request, response) => {
    const contactos = [
        { id: 1, nombre: "Leython", apellido: "Hidalgo", celular: "0995972282" },
        { id: 2, nombre: "Nikola", apellido: "Tesla", celular: "0995972283" },
        { id: 3, nombre: "Elon", apellido: "Musk", celular: "0997421678" },
    ];
    response.send(contactos);
});

app.post("/contactos", (req, resp) => {
    req.body.id = 99;
    resp.send(req.body);
});

app.put("/contactos/:idParam", (req, resp) => {
    const id = req.params.idParam;
    console.log("id", id);
    resp.send("put contactos");
});

app.delete("/contactos/:id", (req, resp) => {
    const id = req.params.id;
    console.log("id:", id);
    resp.send();
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + 3001);
});