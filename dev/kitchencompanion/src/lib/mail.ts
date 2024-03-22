import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/account-verification/?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "Bon Service <onboarding@bonservice.app>",
    to: [email],
    subject: "Vérification de votre adresse courriel",
    html: `<p>Veuillez cliquer <a href=${verificationLink} >ici</a> pour confirmer votre courriel.</p>`,
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
  const verificationLink = `http://localhost:3000/password-reset/?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "KitchenCompanion <onboarding@resend.dev>",
    to: [email],
    subject: "Changement de mot de passe",
    html: `<p>Veuillez cliquer <a href=${verificationLink} >ici</a> pour réinitialiser votre mot de passe.</p>`,
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
