const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.post("/registro", (req, res) => {
    const {nombre, apellido, cedula, telefono, fecha_nacimiento, salario, email, sitio_web, contraseña} = req.body;
    if(!nombre || nombre.trim() === ""){
        return res.status(400).json({error:"Por favor, ingresa tu nombre."});
    }
    if(!apellido || apellido.trim() === ""){
        return res.status(400).json({error:"Por favor, ingresa tu apellido."});
    }
    if(!cedula || cedula.trim() === ""){
        return res.status(400).json({error:"Por favor, ingresa tu cedula."});
    }
    if(!telefono || telefono.trim() === ""){
        return res.status(400).json({error:"Por favor, ingresa tu telefono."});
    }
    if(!salario || salario.trim() === ""){
        return res.status(400).json({error:"Por favor, ingresa tu salario."});
    }
    if (!validateFecha(fecha_nacimiento)) {
        return res.status(400).json({ error: "Por favor, ingresa una fecha de nacimiento válido." });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ error: "Por favor, ingresa un correo electrónico válido." });
    }
    if (!sitio_web || sitio_web.trim() === "") {
        return res.status(400).json({ error: "Por favor, ingresa un sitio web válido." });
    }
    if (!contraseña || contraseña.trim() === "") {
        return res.status(400).json({ error: "Por favor, ingresa una contraseña válida." });
    }
    return res.json({ message: "Registro exitoso" });
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateFecha(fecha_nacimiento) {
    const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    if (!dateRegex.test(fecha_nacimiento)) {
        return false;
    }

    const [, dia, mes, anio] = dateRegex.exec(fechaNacimiento);
    const fecha = new Date(`${anio}-${mes}-${dia}`);

    const diaNacimiento = fecha.getDate();
    const mesNacimiento = fecha.getMonth() + 1;
    const anioNacimiento = fecha.getFullYear();

    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth() + 1;
    const anioActual = fechaActual.getFullYear();

    if (anioNacimiento > anioActual) {
        return false;
    } else if (anioNacimiento === anioActual) {
        if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
            return false;
        }
    }

    return true;
}

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});