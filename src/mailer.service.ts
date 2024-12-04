import {Resend} from 'resend';
import * as process from "node:process";

export class MailerService {
    private readonly mailer: Resend;

    constructor() {
        this.mailer = new Resend(process.env.RESEND_API_KEY);
    }

    async sendCreatedAccountEmail({recipient, firstname}: { recipient: string, firstname: string }) {
        console.log('envoi en cours', recipient);
        try {
            const data = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: [recipient],
                subject: 'Bienvenue a toi !',
                html: `<p>Bonjour <strong>${firstname}</strong>, bienvenue sur SpritzLy !</p>`,
            });
            console.log('envoyé', recipient);
            console.log(data);
        } catch (error) {
            return console.error(error);
        }
    }

    async sendRequestedPasswordEmail({recipient, firstname, token}: { recipient: string, firstname: string, token: string }) {
        console.log('envoi en cours', recipient);
        try {
            const link = `${process.env.FRONTEND_URL}/auth/reset-password?token=${token}`;
            const data = await this.mailer.emails.send({
                from: 'onboarding@resend.dev',
                to: [recipient],
                subject: 'Pour réinitialiser votre mot de passe',
                html: `<p>Bonjour <strong>${firstname}</strong>, voici votre lien de réinitialisation de mot de passe : ${link}</p>`,
            });
            console.log('envoyé', recipient);
            console.log(data);
        } catch (error) {
            return console.error(error);
        }
    }
}
