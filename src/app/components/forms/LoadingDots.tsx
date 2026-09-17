import styles from "./ConsultationForm.module.css";

export function LoadingDots() {
  return <span className={styles.loading} aria-hidden="true"><i /><i /><i /></span>;
}
