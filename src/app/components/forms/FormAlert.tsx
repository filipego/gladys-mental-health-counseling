import type { ReactNode } from "react";

import styles from "./ConsultationForm.module.css";

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div className={styles.alert} role="alert">
      <span className={styles.alertMark} aria-hidden="true">
        !
      </span>
      <p>{children}</p>
    </div>
  );
}
