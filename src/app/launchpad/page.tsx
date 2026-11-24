import { PageShell } from "@/components/PageShell";
import { Launchpad } from "@/components/sections/Launchpad";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("launchpad", "/launchpad/");

export default function LaunchpadPage() {
  return (
    <PageShell>
      <Launchpad asPage />
    </PageShell>
  );
}
