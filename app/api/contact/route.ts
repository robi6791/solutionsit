import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// 🔹 Ten sam schema co na froncie
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .max(20, "Imię może mieć maksymalnie 20 znaków."),
  email: z
    .string()
    .min(5, "Podaj adres e-mail.")
    .email("Podaj poprawny adres e-mail."),
  message: z
    .string()
    .min(10, "Wiadomość musi mieć co najmniej 10 znaków.")
    .max(100, "Wiadomość może mieć maksymalnie 100 znaków."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export async function POST(req: Request) {
  try {
    const json = await req.json();

    // Walidacja danych z body
    const parseResult = contactSchema.safeParse(json);

    if (!parseResult.success) {
      console.warn("Contact form validation error:", parseResult.error);

      return NextResponse.json(
        {
          ok: false,
          error: "Nieprawidłowe dane formularza.",
          details: parseResult.error.flatten(),
        },
        { status: 400 }
      );
    }

    const { name, email, message } = parseResult.data as ContactFormData;

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_HOST,
      port: Number(process.env.ZOHO_PORT || 465),
      secure: process.env.ZOHO_SECURE === "true",
      auth: {
        user: process.env.ZOHO_USER,
        pass: process.env.ZOHO_PASS,
      },
    });

    // 1️⃣ Mail do Ciebie (na kontakt@...)
    const mailText = `
Nowa wiadomość z formularza kontaktowego:

Imię: ${name}
E-mail nadawcy: ${email}
Treść:
${message}
`;

    await transporter.sendMail({
      from: `"Portfolio – formularz" <${process.env.ZOHO_USER}>`,
      to: process.env.CONTACT_TARGET || process.env.ZOHO_USER,
      replyTo: email,
      subject: `Nowa wiadomość z portfolio od: ${name}`,
      text: mailText,
    });

    // 2️⃣ Mail zwrotny do użytkownika – taki jak Zoho autoresponder

    const confirmText = `
Dziękuję za kontakt.

Otrzymałem Twoją wiadomość i odpowiem najszybciej, jak to możliwe.
W sprawach pilnych proszę o kontakt telefoniczny: +48 502 316 393 lub przez WhatsApp.

*Ta wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać.*

—
Robert Senenko
IT Serwis
Fullstack Developer
DevOps / Administracja serwerami
Wdrażanie aplikacji

Telefon: +48 502 316 393
WhatsApp: +48 502 316 393
Email: kontakt@robisolutionsit.com
WWW: robisolutionsit.com
Facebook: facebook.com/TwojProfil
`;

    const confirmHtml = `
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charSet="UTF-8" />
    <title>Dziękuję za kontakt</title>
  </head>
  <body style="margin:0;padding:0;background-color:#0f172a;">
    <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#e5e7eb;line-height:1.7;padding:24px;background-color:#0f172a;">
      <!-- Treść główna -->
      <div style="margin-bottom:20px;">
        <p style="margin:0 0 12px 0;">
          Dziękuję za kontakt.
        </p>
        <p style="margin:0 0 12px 0;">
          Otrzymałem Twoją wiadomość i odpowiem najszybciej, jak to możliwe.
          W sprawach pilnych proszę o kontakt telefoniczny:
          <strong>+48 502 316 393</strong> lub przez WhatsApp.
        </p>
        <p style="margin:8px 0 0 0;font-size:11px;color:#9ca3af;">
          *Ta wiadomość została wygenerowana automatycznie. Prosimy na nią nie odpowiadać.*
        </p>
      </div>

      <!-- Separator -->
      <div style="border-bottom:1px solid #374151;width:100%;margin:16px 0 12px 0;"></div>

      <!-- Stopka -->
      <table cellpadding="0" cellspacing="0" style="width:100%;max-width:480px;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#e5e7eb;line-height:1.45;">
        <tr>
          <td>
            <!-- Imię + specjalizacje -->
            <div style="font-size:16px;font-weight:bold;color:#f9fafb;">
              Robert Senenko
            </div>
            <div style="font-size:12px;color:#9ca3af;margin-top:4px;">
              IT Serwis<br/>
              Fullstack Developer<br/>
              DevOps / Administracja serwerami<br/>
              Wdrażanie aplikacji
            </div>

            <div style="height:10px;"></div>
            <div style="border-bottom:2px solid #38bdf8;width:60px;"></div>
            <div style="height:12px;"></div>
          </td>
        </tr>

        <tr>
          <td>
            <!-- Dane kontaktowe -->
            <div style="margin-bottom:6px;">
              ▸ <strong>Telefon:</strong> +48 502 316 393
            </div>

            <div style="margin-bottom:6px;">
              ▸ <strong>WhatsApp:</strong>
              <a href="https://wa.me/48502316393" style="color:#38bdf8;text-decoration:none;">
                +48 502 316 393
              </a>
            </div>

            <div style="margin-bottom:6px;">
              ▸ <strong>Email:</strong>
              <a href="mailto:kontakt@robisolutionsit.com" style="color:#38bdf8;text-decoration:none;">
                kontakt@robisolutionsit.com
              </a>
            </div>

            <div style="margin-bottom:6px;">
              ▸ <strong>WWW:</strong>
              <a href="https://robisolutionsit.com" style="color:#38bdf8;text-decoration:none;">
                robisolutionsit.com
              </a>
            </div>

            <div style="margin-bottom:6px;">
              ▸ <strong>Facebook:</strong>
              <a href="https://facebook.com/TwojProfil" style="color:#38bdf8;text-decoration:none;">
                facebook.com/TwojProfil
              </a>
            </div>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;

    // Ten mail jest wysyłany do osoby z formularza
    try {
      await transporter.sendMail({
        from: `"Robi Solutions IT" <${process.env.ZOHO_USER}>`,
        to: email,
        subject: "Dziękuję za kontakt",
        text: confirmText,
        html: confirmHtml,
      });
    } catch (confirmErr) {
      console.error("Nie udało się wysłać maila potwierdzającego:", confirmErr);
      // nie rzucamy błędu dalej – główna wiadomość i tak została wysłana
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("Contact form error:", err);

    return NextResponse.json(
      {
        ok: false,
        error: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
      },
      { status: 500 }
    );
  }
}
