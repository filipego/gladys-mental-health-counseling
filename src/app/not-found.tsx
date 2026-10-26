import { Bounded } from "./components/Bounded";
import { ButtonLink } from "./components/ButtonLink";
import { Heading } from "./components/Heading";
import { TextLink } from "./components/TextLink";

export default function NotFound() {
  return (
    <Bounded className="not-found">
      <Heading as="h1" size="xl">
        That page isn&apos;t here.
      </Heading>
      <p className="not-found__body">
        You can head back home or request a consultation.
      </p>
      <div className="not-found__actions">
        <TextLink href="/">Return to Home</TextLink>
        <ButtonLink href="/get-started#consultation" variant="primary">
          Request a free consultation
        </ButtonLink>
      </div>
    </Bounded>
  );
}
