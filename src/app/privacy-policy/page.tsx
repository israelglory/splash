import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { mailto, site } from "@/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  alternates: { canonical: "/privacy-policy/" },
};

// PLACEHOLDER COPY: every section below needs legal review before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="[DATE, TO BE CONFIRMED]">
      <p>
        This Privacy Policy explains how {site.name} (&ldquo;Splash&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
        personal information when you visit this website. Each Splash app has its own privacy policy, available in the
        app and on its website.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>Information you give us, such as your email address when you register interest in Splash Launchpad or email us.</li>
        <li>Basic usage information, such as pages visited and device type, if analytics are enabled on this site.</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To reply to your messages and send updates you asked for.</li>
        <li>To understand how the website is used so we can improve it.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Service providers</h2>
      <p>[LEGAL REVIEW: list email, hosting and analytics providers once confirmed.]</p>

      <h2>Data retention</h2>
      <p>[LEGAL REVIEW: state how long data is kept.]</p>

      <h2>Your rights</h2>
      <p>
        [LEGAL REVIEW: describe rights under the Nigeria Data Protection Act 2023 and other applicable laws, such as access,
        correction and deletion.]
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to <a href={mailto("Privacy question")}>{site.email}</a>. {site.name}, {site.registeredAddress}. {site.registration}
      </p>
    </LegalPage>
  );
}
