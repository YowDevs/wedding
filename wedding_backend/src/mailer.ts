import nodemailer from "nodemailer";

// Transporter global (configuración SMTP)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true si usas 465
    auth: {
        user: ``,
        pass: ``,
    },
});

export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

// Función genérica para enviar correo
export const sendMail = async (options: MailOptions) => {
    try {
        const info = await transporter.sendMail(options);
        console.log("Correo enviado:", info.messageId);
        console.log("Vista previa URL:", nodemailer.getTestMessageUrl(info));
        return info;
    } catch (err) {
        console.error("Error enviando correo:", err);
        throw err;
    }
};
