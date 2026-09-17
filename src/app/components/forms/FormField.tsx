import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import styles from "./ConsultationForm.module.css";

type BaseProps = { id: string; label: ReactNode; error?: string; hint?: string };

export function FormField({ id, label, error, hint, ...props }: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />
      {hint ? <p className={styles.hint} id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className={styles.error} id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}

export function FormTextarea({ id, label, error, hint, ...props }: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <textarea id={id} aria-invalid={Boolean(error)} aria-describedby={describedBy} {...props} />
      {hint ? <p className={styles.hint} id={`${id}-hint`}>{hint}</p> : null}
      {error ? <p className={styles.error} id={`${id}-error`}>{error}</p> : null}
    </div>
  );
}
