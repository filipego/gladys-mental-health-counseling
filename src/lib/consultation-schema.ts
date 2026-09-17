import { z } from "zod";

export const contactMethods = ["email", "phone"] as const;
export const supportOptions = ["myself", "teenager", "parent", "unsure"] as const;
export const meetingOptions = ["in-person", "online", "either"] as const;
export const languageOptions = ["english", "spanish", "either"] as const;

export const consultationSchema = z
  .object({
    firstName: z.string().trim().min(1, "Enter your first name.").max(80),
    contactBy: z.enum(["email", "phone"]).optional(),
    email: z.string().trim().max(254).optional().or(z.literal("")),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    supportFor: z.enum(["myself", "teenager", "parent", "unsure"]).optional(),
    meet: z.enum(["in-person", "online", "either"]).optional().or(z.literal("")),
    language: z.enum(["english", "spanish", "either"]).optional().or(z.literal("")),
    availability: z.string().trim().max(240).optional().or(z.literal("")),
    message: z.string().trim().max(2000).optional().or(z.literal("")),
    understand: z.boolean().optional(),
  })
  .superRefine((values, context) => {
    if (!values.contactBy) {
      context.addIssue({ code: "custom", path: ["contactBy"], message: "Choose email or phone." });
    }
    if (values.contactBy === "email") {
      const result = z.string().email("Enter a valid email address so I can contact you.").safeParse(values.email);
      if (!result.success) context.addIssue({ code: "custom", path: ["email"], message: result.error.issues[0]?.message });
    }
    if (values.contactBy === "phone" && !values.phone) {
      context.addIssue({ code: "custom", path: ["phone"], message: "Enter a phone number so I can contact you." });
    }
    if (!values.supportFor) {
      context.addIssue({ code: "custom", path: ["supportFor"], message: "Choose who you are seeking support for." });
    }
    if (!values.understand) {
      context.addIssue({ code: "custom", path: ["understand"], message: "Please confirm that you have read this statement." });
    }
  });

export type ConsultationFormData = z.infer<typeof consultationSchema>;
