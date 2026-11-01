"use client";

import { useParams } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n";
import { Bounded } from "../components/Bounded";
import { ButtonLink } from "../components/ButtonLink";
import { Heading } from "../components/Heading";
import { TextLink } from "../components/TextLink";

export default function NotFound() {
  const { lang } = useParams<{ lang?: string }>();
  const text = getDictionary(isLocale(lang) ? lang : undefined).notFound;

  return (
    <Bounded className="not-found">
      <Heading as="h1" size="xl">
        {text.heading}
      </Heading>
      <p className="not-found__body">{text.body}</p>
      <div className="not-found__actions">
        <TextLink href="/">{text.home}</TextLink>
        <ButtonLink href="/get-started#consultation" variant="primary">
          {text.consultation}
        </ButtonLink>
      </div>
    </Bounded>
  );
}
