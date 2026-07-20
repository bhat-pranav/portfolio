import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 opacity-40 motion-reduce:opacity-20 [background-image:radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-30 blur-3xl motion-reduce:opacity-15 motion-reduce:blur-none" />
      </div>

      <SiteNav />
      <Hero />
      <ProjectsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
