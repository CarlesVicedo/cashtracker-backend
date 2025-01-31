import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cahstrackr.com>',
            to: user.email,
            subject:'CasjTrackr confirm account',
            html: `<p>Hello ${user.name}, your account in CashTrackr has ben created.</p>
                <p>Please visit the following link:</p>
                <a href='#'>Confirm account</a>
                <p>and paste the code <b>${user.token}</b></p>`
        })
        console.log('Email sent ', email.messageId)
    }
}