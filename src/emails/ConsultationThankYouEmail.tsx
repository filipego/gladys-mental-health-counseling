import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import { defaultLocale, htmlLang, type Locale } from "@/lib/i18n";

// Email clients ignore the site stylesheet, so the neutral values from
// src/app/globals.css are repeated here inline.
const colors = {
  canvas: "#f5f3f0",
  card: "#ffffff",
  border: "#ebe8e4",
  foreground: "#000000",
  body: "#44403b",
  muted: "#68625c",
};

const fontFamily =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const paragraph = {
  margin: "0 0 18px",
  color: colors.body,
  fontSize: "16px",
  lineHeight: "1.65",
};

const footnote = {
  margin: "0 0 8px",
  color: colors.muted,
  fontSize: "12px",
  lineHeight: "1.6",
};

const text = {
  "en-us": {
    preview:
      "I’ve received your consultation request and will be in touch to arrange our free 15-minute call.",
    byline: "Counseling with Gladys Henriquez, MHC-LP",
    greeting: (name: string) => `Dear ${name},`,
    thanks:
      "Thank you for reaching out and taking the first step toward connecting with me.",
    received:
      "I’ve received your consultation request and will contact you using your preferred method to arrange a time for our free 15-minute call.",
    during:
      "During the consultation, you’ll have a chance to tell me a little about what brings you here, ask questions, and get a sense of whether working together feels like a good fit.",
    reminder:
      "Please remember that submitting this form does not schedule an appointment or establish a therapist-client relationship.",
    lookForward: "I look forward to speaking with you.",
    signOff: "Warmly,",
    emergency:
      "This website and consultation form are not monitored for emergencies. If you are in immediate danger, call 911. For mental health crisis support in the U.S., call or text 988.",
    supervision:
      "Counseling services are provided by Gladys under supervision through Being Unbound Mental Health Counseling, PLLC.",
  },
  "es-us": {
    preview:
      "He recibido su solicitud de consulta y me comunicaré con usted para acordar nuestra llamada gratuita de 15 minutos.",
    byline: "Consejería con Gladys Henriquez, MHC-LP",
    greeting: (name: string) => `Hola, ${name}:`,
    thanks:
      "Gracias por comunicarse conmigo y por dar este primer paso.",
    received:
      "He recibido su solicitud de consulta y me comunicaré con usted por el medio que prefiera para acordar un horario para nuestra llamada gratuita de 15 minutos.",
    during:
      "Durante la consulta, tendrá la oportunidad de contarme un poco sobre lo que le trae aquí, hacer preguntas y ver si trabajar juntos le parece una buena opción.",
    reminder:
      "Recuerde que enviar este formulario no programa una cita ni establece una relación entre terapeuta y cliente.",
    lookForward: "Espero poder hablar con usted.",
    signOff: "Cordialmente,",
    emergency:
      "Este sitio web y el formulario de consulta no se supervisan para atender emergencias. Si está en peligro inmediato, llame al 911. Para recibir apoyo en una crisis de salud mental en los EE. UU., llame o envíe un mensaje de texto al 988.",
    supervision:
      "Los servicios de consejería los brinda Gladys bajo supervisión a través de Being Unbound Mental Health Counseling, PLLC.",
  },
};

/** The subject line of the thank-you email in each language. */
export const thankYouSubject: Record<Locale, string> = {
  "en-us": "Thank you for reaching out",
  "es-us": "Gracias por comunicarse conmigo",
};

type ConsultationThankYouEmailProps = {
  firstName: string;
  /** The language of the site the request was sent from */
  lang?: Locale;
  /** Absolute URL of the hosted logo PNG; a text wordmark is used without it. */
  logoSrc?: string;
};

export function ConsultationThankYouEmail({
  firstName,
  lang = defaultLocale,
  logoSrc,
}: ConsultationThankYouEmailProps) {
  const copy = text[lang];

  return (
    <Html lang={htmlLang(lang)}>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "40px 12px",
          backgroundColor: colors.canvas,
          fontFamily,
        }}
      >
        <Container
          style={{
            maxWidth: "560px",
            margin: "0 auto",
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "16px",
          }}
        >
          <Section style={{ padding: "36px 40px 0" }}>
            {logoSrc ? (
              <Img
                alt="Lovely Days"
                height="52"
                src={logoSrc}
                style={{ display: "block", height: "52px", width: "181px", backgroundColor: colors.card }}
                width="181"
              />
            ) : (
              <Text
                style={{
                  margin: 0,
                  color: colors.foreground,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "26px",
                  fontStyle: "italic",
                }}
              >
                Lovely Days
              </Text>
            )}
            <Text
              style={{
                margin: "14px 0 0",
                color: colors.muted,
                fontSize: "13px",
                lineHeight: "1.4",
              }}
            >
              {copy.byline}
            </Text>
            <Hr style={{ margin: "28px 0 32px", borderColor: colors.border }} />
          </Section>

          <Section style={{ padding: "0 40px" }}>
            <Text style={{ ...paragraph, color: colors.foreground }}>
              {copy.greeting(firstName)}
            </Text>
            <Text style={paragraph}>{copy.thanks}</Text>
            <Text style={paragraph}>{copy.received}</Text>
            <Text style={paragraph}>{copy.during}</Text>
            <Text
              style={{
                ...paragraph,
                padding: "2px 0 2px 16px",
                borderLeft: `2px solid ${colors.border}`,
                color: colors.muted,
                fontSize: "15px",
              }}
            >
              {copy.reminder}
            </Text>
            <Text style={paragraph}>{copy.lookForward}</Text>
            <Text style={{ ...paragraph, margin: "28px 0 4px" }}>{copy.signOff}</Text>
            <Text
              style={{
                ...paragraph,
                margin: "0 0 36px",
                color: colors.foreground,
                fontWeight: 500,
              }}
            >
              Gladys Henriquez, MHC-LP
            </Text>
          </Section>

          <Section style={{ padding: "0 40px 32px" }}>
            <Hr style={{ margin: "0 0 20px", borderColor: colors.border }} />
            <Text style={footnote}>{copy.emergency}</Text>
            <Text style={{ ...footnote, margin: 0 }}>{copy.supervision}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
