"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";

import { Button } from "@/app/components/Button";
import { Heading } from "@/app/components/Heading";
import { TextLink } from "@/app/components/TextLink";
import { ChoicePills } from "./ChoicePills";
import { FormAlert } from "./FormAlert";
import { FormField, FormTextarea } from "./FormField";
import { LoadingDots } from "./LoadingDots";
import styles from "./ConsultationForm.module.css";
import {
  consultationSchema,
  type ConsultationFormData,
} from "@/lib/consultation-schema";

export type ConsultationFormCopy = {
  aboutHeading?: string;
  sessionHeading?: string;
  beforeSpeakHeading?: string;
  firstNameLabel?: string;
  contactMethodLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  supportForLabel?: string;
  meetingLabel?: string;
  languageLabel?: string;
  availabilityLabel?: string;
  availabilityHint?: string;
  messageLabel?: string;
  messageHint?: string;
  consentText?: string;
  submitLabel?: string;
  privacyLabel?: string;
  privacyHref?: string;
  validationSummary?: string;
  deliveryUnavailableMessage?: string;
  successEyebrow?: string;
  successHeading?: string;
  successBody?: string;
  resetLabel?: string;
};

const defaults: Required<ConsultationFormCopy> = {
  aboutHeading: "About you",
  sessionHeading: "The session",
  beforeSpeakHeading: "Before we speak (optional)",
  firstNameLabel: "First name",
  contactMethodLabel: "How would you like me to contact you?",
  emailLabel: "Email address",
  phoneLabel: "Phone number",
  supportForLabel: "Who is the support for?",
  meetingLabel: "How would you prefer to meet?",
  languageLabel: "Preferred language",
  availabilityLabel: "When are you usually available for a call?",
  availabilityHint: "Include your time zone if you're outside New York.",
  messageLabel: "Anything you'd like me to know before we speak?",
  messageHint: "A sentence or two is enough. Please leave out medical records and sensitive personal details.",
  consentText: "I understand that this form is for consultation requests and should not be used for emergencies. Sending it does not establish a therapist-client relationship.",
  submitLabel: "Request my consultation",
  privacyLabel: "Read the privacy notice",
  privacyHref: "#privacy-note",
  validationSummary: "Please check the highlighted fields.",
  deliveryUnavailableMessage: "Your request is ready, but online delivery is not configured yet. Please try again later or use the contact details below.",
  successEyebrow: "Request received",
  successHeading: "I received your consultation request.",
  successBody: "I'll contact you by your preferred method to arrange a time for our free 15-minute call. Your appointment is not booked yet.",
  resetLabel: "Start a new request",
};

export function ConsultationForm({ copy: incomingCopy }: { copy?: ConsultationFormCopy }) {
  const copy = { ...defaults, ...incomingCopy };
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationSchema),
    defaultValues: { contactBy: undefined, supportFor: undefined, understand: false },
    mode: "onSubmit",
  });
  const contactBy = useWatch({ control, name: "contactBy" });
  const supportFor = useWatch({ control, name: "supportFor" });
  const meet = useWatch({ control, name: "meet" });
  const language = useWatch({ control, name: "language" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const resetForm = () => {
    reset({ contactBy: undefined, supportFor: undefined, understand: false });
    setStatus("idle");
  };

  const onSubmit: SubmitHandler<ConsultationFormData> = async (values) => {
    setStatus("idle");
    if (
      process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("consultation-preview") ===
        "success"
    ) {
      setStatus("success");
      return;
    }
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <span className={styles.successMark} aria-hidden="true">✓</span>
        <div className={styles.successCopy}>
          <p className={styles.successEyebrow}>{copy.successEyebrow}</p>
          <Heading as="h2" color="inverse" size="sm">{copy.successHeading}</Heading>
          <p>{copy.successBody}</p>
          <Button className={styles.successAction} type="button" variant="inverse" onClick={resetForm}>
            {copy.resetLabel}
          </Button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;
  return (
    <form className={styles.root} noValidate onSubmit={handleSubmit(onSubmit)}>
      <section className={styles.band}>
        {errorCount > 0 ? <FormAlert>{copy.validationSummary}</FormAlert> : null}
        <Heading as="h2" className={styles.title} color="inverse" size="sm">{copy.aboutHeading}</Heading>
        <div className={styles.grid}>
          <FormField id="firstName" label={copy.firstNameLabel} autoComplete="given-name" {...register("firstName")} error={errors.firstName?.message} />
          <fieldset>
            <legend className={styles.legend}>{copy.contactMethodLabel}</legend>
            <ChoicePills name="contactBy" value={contactBy} onChange={(value) => setValue("contactBy", value as ConsultationFormData["contactBy"], { shouldValidate: true })} options={[{ value: "email", label: "Email" }, { value: "phone", label: "Phone" }]} describedBy={errors.contactBy ? "contactBy-error" : undefined} invalid={Boolean(errors.contactBy)} />
            {errors.contactBy ? <p className={styles.error} id="contactBy-error">{errors.contactBy.message}</p> : null}
          </fieldset>
          <FormField id="email" label={copy.emailLabel} type="email" autoComplete="email" required={contactBy === "email"} {...register("email")} error={errors.email?.message} />
          <FormField id="phone" label={copy.phoneLabel} type="tel" autoComplete="tel" required={contactBy === "phone"} {...register("phone")} error={errors.phone?.message} />
        </div>
      </section>
      <section className={styles.band}>
        <Heading as="h2" className={styles.title} color="inverse" size="sm">{copy.sessionHeading}</Heading>
        <div className={styles.grid}>
          <fieldset><legend className={styles.legend}>{copy.supportForLabel}</legend><ChoicePills name="supportFor" value={supportFor} onChange={(value) => setValue("supportFor", value as ConsultationFormData["supportFor"], { shouldValidate: true })} options={[{ value: "myself", label: "Myself" }, { value: "teenager", label: "My teenager" }, { value: "parent", label: "Me as a parent" }, { value: "unsure", label: "I'm not sure yet" }]} />{errors.supportFor ? <p className={styles.error}>{errors.supportFor.message}</p> : null}</fieldset>
          <fieldset><legend className={styles.legend}>{copy.meetingLabel} <span className={styles.hint}>(optional)</span></legend><ChoicePills name="meet" value={meet} onChange={(value) => setValue("meet", value as ConsultationFormData["meet"])} options={[{ value: "in-person", label: "In person" }, { value: "online", label: "Online" }, { value: "either", label: "Either" }]} /></fieldset>
          <fieldset><legend className={styles.legend}>{copy.languageLabel} <span className={styles.hint}>(optional)</span></legend><ChoicePills name="language" value={language} onChange={(value) => setValue("language", value as ConsultationFormData["language"])} options={[{ value: "english", label: "English" }, { value: "spanish", label: "Spanish" }, { value: "either", label: "Either" }]} /></fieldset>
          <FormField id="availability" label={<>{copy.availabilityLabel} <span className={styles.hint}>(optional)</span></>} {...register("availability")} hint={copy.availabilityHint} error={errors.availability?.message} />
        </div>
      </section>
      <section className={styles.band}><Heading as="h2" className={styles.title} color="inverse" size="sm">{copy.beforeSpeakHeading}</Heading><div className={styles.grid}><FormTextarea id="message" label={copy.messageLabel} {...register("message")} hint={copy.messageHint} error={errors.message?.message} /></div></section>
      <div className={styles.foot}>
        <label className={styles.check}><input type="checkbox" {...register("understand")} /><span>{copy.consentText}</span></label>
        {errors.understand ? <p className={styles.error}>{errors.understand.message}</p> : null}
        {status === "error" ? <FormAlert>{copy.deliveryUnavailableMessage}</FormAlert> : null}
        <div className={styles.actions}><Button className={styles.submit} type="submit" variant="inverse" disabled={isSubmitting}>{isSubmitting ? <>Sending your request <LoadingDots /></> : copy.submitLabel}</Button><TextLink href={copy.privacyHref} tone="light" className={styles.privacy}>{copy.privacyLabel}</TextLink></div>
      </div>
    </form>
  );
}
