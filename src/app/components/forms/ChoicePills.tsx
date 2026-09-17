import type { ReactNode } from "react";
import styles from "./ConsultationForm.module.css";

export type ChoicePillOption = { value: string; label: ReactNode };

type ChoicePillsProps = {
  name: string;
  options: ChoicePillOption[];
  value?: string;
  onChange: (value: string) => void;
  describedBy?: string;
  invalid?: boolean;
};

export function ChoicePills({ name, options, value, onChange, describedBy, invalid = false }: ChoicePillsProps) {
  return (
    <div className={styles.choices} role="radiogroup" aria-describedby={describedBy} aria-invalid={invalid}>
      {options.map((option) => (
        <label className={styles.pill} key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
