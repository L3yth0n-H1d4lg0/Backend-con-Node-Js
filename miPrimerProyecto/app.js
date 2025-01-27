const express = require("express"); //Permite importar el módulo
const bodyParser = require("body-parser");

const app = express();
const puerto = 3001;

const contactos = [
    { id: 1, nombre: "Leython", apellido: "Hidalgo", celular: "0995972282" },
    { id: 2, nombre: "Nikola", apellido: "Tesla", celular: "0995972283" },
    { id: 3, nombre: "Elon", apellido: "Musk", celular: "0997421678" },
];

app.use(bodyParser.json());

app.use("/contactos", (request, response, next) => {
    console.log("ingresa a middleware");
    console.log("headers:", request.headers);
    console.log("body:", request.body);
    next();
});

app.get("/contactos", (request, response) => {

    response.send(contactos);
});

app.post("/contactos", (req, resp) => {
    const newContact = {
        id: contactos.length + 1, // Generar un nuevo ID
        ...req.body,
    };

    contactos.push(newContact);
    resp.status(201).json(newContact);
    console.log(contactos);
});

app.put("/contactos/:idParam", (req, resp) => {
    const id = parseInt(req.params.idParam);
    const index = contactos.findIndex(contacto => contacto.id === id);

    if (index !== -1) {
        contactos[index] = {
            ...contactos[index],
            ...req.body,
        };

        resp.status(200).json(contactos[index]);
    } else {
        resp.status(404).json({ error: "Contacto no encontrado" });
    }
});

app.delete("/contactos/:id", (req, resp) => {
    const id = parseInt(req.params.id); // Convertir el ID a número
    const index = contactos.findIndex(contacto => contacto.id === id);

    if (index !== -1) {
        const deletedContact = contactos.splice(index, 1); // Eliminar el contacto
        resp.status(200).json(deletedContact[0]); // Enviar el contacto eliminado como respuesta
    } else {
        resp.status(404).json({ error: "Contacto no encontrado" });
    }
});


app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + 3001);
});