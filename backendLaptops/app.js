const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const puerto = 1369;

const laptops = [
    { id: 1, marca: "Lenovo", procesador: "Intel Core i5", memoria: "16GB", disco: "1TB" },
    { id: 2, marca: "Hp", procesador: "Intel Core i3", memoria: "8GB", disco: "208GB" },
    { id: 3, marca: "Dell", procesador: "Ryzen 5", memoria: "8GB", disco: "500GB" },
];

app.use(bodyParser.json());

app.use("/laptops", (req, resp, next) => {
    console.log("body:", req.body);
    next();
});

app.post("/laptops", (req, resp) => {
    const nuevaLaptop = {
        id: laptops.length + 1, // Generar un nuevo ID
        ...req.body,
    };

    laptops.push(nuevaLaptop);
    resp.status(201).json(nuevaLaptop);
    console.log(laptops);
});

app.get("/laptops/:id", (req, resp) => {
    const id = req.params.id;
    const laptop = {
        id: id,
        marca: "Toshiba",
        procesador: "Intel Core i7",
        memoria: "16GB",
        disco: "1TB",
    };
    resp.send(laptop);
});


app.get("/laptops", (request, response) => {
    response.send(laptops);
});

app.put("/laptops/:id", (req, resp) => {
    const id = req.params.id;
    console.log("id", id);
    resp.send(req.body);
});

app.delete("/laptops/:id", (req, resp) => {
    const id = req.params.id;
    console.log("id:", id);
    resp.send();
});

app.listen(puerto, () => {
    console.log("Servidor listo en el puerto " + puerto);
});