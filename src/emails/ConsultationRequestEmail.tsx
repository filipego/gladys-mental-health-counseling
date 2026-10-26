import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

import type { ConsultationFormData } from "@/lib/consultation-schema";

const labels = {
  supportFor: {
    myself: "Myself",
    teenager: "My teenager",
    parent: "Me as a parent",
    unsure: "I'm not sure yet",
  },
  meet: { "in-person": "In person", online: "Online", either: "Either" },
  language: { english: "English", spanish: "Spanish", either: "Either" },
  contactBy: { email: "Email", phone: "Phone" },
} as const;

const fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

/** Internal notification sent to the practice inbox for each request. */
export function ConsultationRequestEmail({ data }: { data: ConsultationFormData }) {
  const rows: [string, string | undefined][] = [
    ["First name", data.firstName],
    ["Preferred contact", data.contactBy && labels.contactBy[data.contactBy]],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Support for", data.supportFor && labels.supportFor[data.supportFor]],
    ["Prefers to meet", data.meet ? labels.meet[data.meet] : undefined],
    ["Preferred language", data.language ? labels.language[data.language] : undefined],
    ["Availability", data.availability],
    ["Message", data.message],
  ];

  return (
    <Html lang="en">
      <Head />
      <Preview>New consultation request from {data.firstName}</Preview>
      <Body style={{ margin: 0, padding: "24px 12px", backgroundColor: "#f5f3f0", fontFamily }}>
        <Container style={{ maxWidth: "560px", margin: "0 auto", padding: "28px 32px", backgroundColor: "#ffffff", border: "1px solid #ebe8e4", borderRadius: "16px" }}>
          <Text style={{ margin: "0 0 20px", fontSize: "20px", fontWeight: 500, color: "#000000" }}>
            New consultation request
          </Text>
          {rows
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <Section key={label} style={{ padding: "10px 0", borderTop: "1px solid #ebe8e4" }}>
                <Text style={{ margin: 0, fontSize: "12px", color: "#68625c" }}>{label}</Text>
                <Text style={{ margin: "2px 0 0", fontSize: "15px", lineHeight: "1.5", color: "#000000", whiteSpace: "pre-wrap" }}>
                  {value}
                </Text>
              </Section>
            ))}
          <Text style={{ margin: "20px 0 0", fontSize: "12px", color: "#68625c" }}>
            Sent from the consultation form. The requester confirmed it is not for emergencies.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
