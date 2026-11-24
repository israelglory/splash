import { PageShell } from "@/components/PageShell";
import { WorkWithUs } from "@/components/sections/Contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("contact", "/contact/");

export default function ContactPage() {
  return (
    <PageShell>
      <WorkWithUs asPage />
    </PageShell>
  );
}
