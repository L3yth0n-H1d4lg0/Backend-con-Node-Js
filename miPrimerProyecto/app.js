const express = require("express"); //Permite importar el módulo
const bodyParser = require("body-parser");

const app = express();
const puerto = 3001;

//______________________________________________________
const { Client } = require("pg");

app.use(bodyParser.json());

app.get("/contactos", (req, res) => {
    const client = new Client({
        user: "postgres",
        host: "192.168.100.73",
        database: "postgres",
        password: "Dsoftware10@",
        port: 5432,
    });

    client.connect()
        .then(() => client.query("select * from contactos"))
        .then(responseQuery => {
            console.log(responseQuery.rows);
            res.send(responseQuery.rows);
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        })
        .finally(() => client.end());
});

app.post("/contactos", (req, res) => {
    const client = new Client({
        user: "postgres",
        host: "192.168.100.73",
        database: "postgres",
        password: "Dsoftware10@",
        port: 5432,
    });

    client.connect()
        .then(() => client.query(
            "insert into contactos(nombre, apellido, celular) values($1, $2, $3)",
            [req.body.nombre, req.body.apellido, req.body.celular]
        ))
        .then(responseQuery => {
            console.log(req.body);
            res.status(201).json(req.body);
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        })
        .finally(() => client.end());
});

app.put("/contactos/:idParam", (req, res) => {
    const client = new Client({
        user: "postgres",
        host: "192.168.100.73",
        database: "postgres",
        password: "Dsoftware10@",
        port: 5432,
    });

    const { idParam } = req.params;

    client.connect()
        .then(() => client.query(
            "update contactos set nombre=$1, apellido=$2, celular=$3 where id=$4",
            [req.body.nombre, req.body.apellido, req.body.celular, idParam]
        ))
        .then(responseQuery => {
            console.log(responseQuery.rows);
            res.status(200).json("Contacto actualizado con éxito");
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        })
        .finally(() => client.end());
});

app.delete("/contactos/:idParam", (req, res) => {
    const client = new Client({
        user: "postgres",
        host: "192.168.100.73",
        database: "postgres",
        password: "Dsoftware10@",
        port: 5432,
    });

    const { idParam } = req.params;

    client.connect()
        .then(() => client.query(
            "delete from contactos where id=$1",
            [idParam]
        ))
        .then(responseQuery => {
            console.log(responseQuery.rows);
            res.status(200).json("Contacto eliminado con éxito");
            client.end();
        })
        .catch(err => {
            console.log(err);
            client.end();
        })
        .finally(() => client.end());
});
//______________________________________________________

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



/*app.post("/contactos", (req, resp) => {
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
});*/


app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + 3001);
});