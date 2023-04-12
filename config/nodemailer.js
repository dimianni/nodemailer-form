import nodemailer from 'nodemailer'

const email = process.env.EMAIL_ZOHO
const pass = process.env.EMAIL_PASS_ZOHO
const host = process.env.HOST_ZOHO

// https://nodemailer.com/usage/
// export const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: email,
//         pass
//     }
// })

// Sending to custom email using SMTP (improvmx)
// export const transporter = nodemailer.createTransport({
//     host: host,
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: email,
//         pass: pass
//     }
// });

// Sending to custom email using SMTP (zoho mail)
export const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: email,
        pass: pass
    }
});

export const mailOptions = {
    from: email,
    to: email
}