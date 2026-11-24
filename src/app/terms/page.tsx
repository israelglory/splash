import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { mailto, site } from "@/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms that apply when you use the ${site.name} website.`,
  alternates: { canonical: "/terms/" },
};

// PLACEHOLDER COPY: every section below needs legal review before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="[DATE, TO BE CONFIRMED]">
      <p>
        These Terms of Use apply to your use of this website, operated by {site.name}. Each Splash app has its own terms,
        available in the app and on its website.
      </p>

      <h2>Using this website</h2>
      <p>You may use this website for personal and informational purposes. Please do not misuse it or try to disrupt it.</p>

      <h2>Intellectual property</h2>
      <p>
        The Splash name, the StatusHD and Stitch names, logos and website content belong to {site.name} unless stated
        otherwise. [LEGAL REVIEW: confirm trademark wording.]
      </p>

      <h2>Third-party links</h2>
      <p>This website links to app stores and other sites we do not control. Their own terms apply.</p>

      <h2>Disclaimer and liability</h2>
      <p>[LEGAL REVIEW: add warranty disclaimer and limitation of liability.]</p>

      <h2>Governing law</h2>
      <p>[LEGAL REVIEW: confirm governing law, for example the laws of the Federal Republic of Nigeria.]</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={mailto("Terms question")}>{site.email}</a>. {site.name}, {site.registeredAddress}. {site.registration}
      </p>
    </LegalPage>
  );
}
