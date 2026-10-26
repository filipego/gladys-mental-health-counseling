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

type ConsultationThankYouEmailProps = {
  firstName: string;
  /** Absolute URL of the hosted logo PNG; a text wordmark is used without it. */
  logoSrc?: string;
};

export function ConsultationThankYouEmail({
  firstName,
  logoSrc,
}: ConsultationThankYouEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        I’ve received your consultation request and will be in touch to
        arrange our free 15-minute call.
      </Preview>
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
              Counseling with Gladys Henriquez, MHC-LP
            </Text>
            <Hr style={{ margin: "28px 0 32px", borderColor: colors.border }} />
          </Section>

          <Section style={{ padding: "0 40px" }}>
            <Text style={{ ...paragraph, color: colors.foreground }}>
              Dear {firstName},
            </Text>
            <Text style={paragraph}>
              Thank you for reaching out and taking the first step toward
              connecting with me.
            </Text>
            <Text style={paragraph}>
              I’ve received your consultation request and will contact you
              using your preferred method to arrange a time for our free
              15-minute call.
            </Text>
            <Text style={paragraph}>
              During the consultation, you’ll have a chance to tell me a little
              about what brings you here, ask questions, and get a sense of
              whether working together feels like a good fit.
            </Text>
            <Text
              style={{
                ...paragraph,
                padding: "2px 0 2px 16px",
                borderLeft: `2px solid ${colors.border}`,
                color: colors.muted,
                fontSize: "15px",
              }}
            >
              Please remember that submitting this form does not schedule an
              appointment or establish a therapist-client relationship.
            </Text>
            <Text style={paragraph}>I look forward to speaking with you.</Text>
            <Text style={{ ...paragraph, margin: "28px 0 4px" }}>Warmly,</Text>
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
            <Text style={footnote}>
              This website and consultation form are not monitored for
              emergencies. If you are in immediate danger, call 911. For mental
              health crisis support in the U.S., call or text 988.
            </Text>
            <Text style={{ ...footnote, margin: 0 }}>
              Counseling services are provided by Gladys under supervision
              through Being Unbound Mental Health Counseling, PLLC.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
