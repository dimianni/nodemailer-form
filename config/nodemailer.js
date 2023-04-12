import nodemailer from 'nodemailer'

const email = process.env.EMAIL
const pass = process.env.EMAIL_PASS
const host = process.env.HOST

// https://nodemailer.com/usage/
// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: email,
//         pass
//     }
// })

// Sending to custom email using SMTP
export const transporter = nodemailer.createTransport({
    host: host,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: email,
        pass: pass
    }
});

export const mailOptions = {
    from: email,
    to: email
}