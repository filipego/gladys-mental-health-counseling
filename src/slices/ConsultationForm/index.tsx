import { asLink, Content, isFilled } from "@prismicio/client";
import { type SliceComponentProps } from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import {
  ConsultationForm as ConsultationFormFields,
  type ConsultationFormCopy,
} from "@/app/components/forms/ConsultationForm";
import styles from "@/app/components/forms/ConsultationForm.module.css";

/**
 * Props for `ConsultationForm`.
 */
export type ConsultationFormProps =
  SliceComponentProps<Content.ConsultationFormSlice>;

/**
 * Component for "ConsultationForm" Slices.
 */
const ConsultationForm = ({ slice }: ConsultationFormProps) => {
  const copy: ConsultationFormCopy = {
    aboutHeading: slice.primary.about_heading || undefined,
    sessionHeading: slice.primary.session_heading || undefined,
    beforeSpeakHeading: slice.primary.before_speak_heading || undefined,
    availabilityHint: slice.primary.availability_hint || undefined,
    messageHint: slice.primary.message_hint || undefined,
    consentText: slice.primary.consent_text || undefined,
    submitLabel: slice.primary.submit_label || undefined,
    validationSummary: slice.primary.validation_summary || undefined,
    deliveryUnavailableMessage:
      slice.primary.delivery_unavailable_message || undefined,
    successEyebrow: slice.primary.success_eyebrow || undefined,
    successHeading: slice.primary.success_heading || undefined,
    successBody: slice.primary.success_message || undefined,
    resetLabel: slice.primary.reset_label || undefined,
    privacyLabel:
      (isFilled.link(slice.primary.privacy_link) &&
        slice.primary.privacy_link.text) ||
      undefined,
    privacyHref: asLink(slice.primary.privacy_link) || undefined,
  };

  return (
    <section
      className={styles.slice}
      id="request"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded as="div" className={styles.bounded} spacing="none">
        <ConsultationFormFields copy={copy} />
      </Bounded>
    </section>
  );
};

export default ConsultationForm;
