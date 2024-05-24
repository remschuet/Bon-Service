import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const APP_URL = "http://bonservice.app/";

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${APP_URL}/account-verification/?token=${token}`;
  const previewText =
    "Veuillez vérifier votre adresse courriel pour activer votre compte";
  const divStyle =
    "display: flex; flex-direction: column; align-items: center; gap: 1rem";

  const buttonStyle =
    "background-color: #4CAF50; border: none; color: white; padding: 30px 15px; margin: 4px 2px; cursor: pointer; border-radius: 5px;";

  const { data, error } = await resend.emails.send({
    from: "Bon Service <onboarding@bonservice.app>",
    to: [email],
    subject: "Vérification de votre adresse courriel",
    html: `<div style="${divStyle}">
            <div>
              <h1>Bon Service</h1>
              <p>${previewText}</p>
            </div>
            <div>
              <button style="${buttonStyle}"><a href="${verificationLink}" style="text-align: center; text-decoration: none; font-size: 16px;" >ACTIVEZ VOTRE COMPTE</a></button>
            </div>
            <div>
              <p>Si vous n'avez pas demandé cette vérification, veuillez ignorer ce courriel.</p>
              <p>Merci, et Bon Service!</p>
            </div>
          </div>`,
  });

  if (error) {
    return {
      error:
        "Une erreure est survenue lors de l'envoie du courriel de vérification.",
      status: 400,
    };
  }
  return { success: "Un courriel de vérification à été envoyé", status: 200 };
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const passwordResetLink = `${APP_URL}/password-reset/?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Bon Service <onboarding@bonservice.app>",
    to: [email],
    subject: "Changement de mot de passe",
    html: `<p>Veuillez cliquer <a href=${passwordResetLink} >ici</a> pour réinitialiser votre mot de passe.</p>`,
  });

  if (error) {
    return {
      error: "Une erreure est survenue lors de l'envoie du courriel.",
      status: 400,
    };
  }
  return {
    success:
      "Un courriel avec un lien vers la réinitialisation de votre mot de passe vous à été envoyé.",
    status: 200,
  };
}
