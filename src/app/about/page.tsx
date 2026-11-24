import { PageShell } from "@/components/PageShell";
import { About, Principles } from "@/components/sections/About";
import { Reach } from "@/components/sections/Reach";
import { Team } from "@/components/sections/Team";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("about", "/about/");

export default function AboutPage() {
  return (
    <PageShell>
      <About index="01" asPage />
      <Principles index="02" />
      <Reach index="03" />
      <Team index="04" />
    </PageShell>
  );
}
