import express, { Request, Response } from "express";
import { sendMail } from "./mailer";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req: Request, res: Response) => {
    res.send("🚀 GET funciona!");
});

app.post("/", (req: Request, res: Response) => {
    console.log(req.body); // Aquí recibes los datos del POST
    res.send("🚀 POST recibido!");
});

// ruta para mailer

app.post("/api/cuestionario", async (req: Request, res: Response) => {
    const data = req.body;
    if (!data.nombre || !data.email) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    try {
        await sendMail({
            from: `"Boda x" <${data.email}>`,
            to: "",
            subject: `Nuevo cuestionario de ${data.nombre}`,
            html: `
                <h2>Respuesta del cuestionario</h2>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Cuántos vienen:</strong> ${data.cuantos_vienen}</p>
                <p><strong>Reserva hotel:</strong> ${data.reserva_hotel ? "Sí" : "No"}</p>
                <p><strong>Hotel:</strong> ${data.hotel || "N/A"}</p>
                <p><strong>Alergias:</strong> ${data.alergias || "Ninguna"}</p>
                <p><strong>Comentarios:</strong> ${data.comentarios || "Ninguno"}</p>
            `
        });

        res.json({ message: "Cuestionario enviado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error enviando cuestionario" });
    }
});

// Arrancar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
