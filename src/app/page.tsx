import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl opacity-30 bg-[var(--accent)]" />
      </div>

      <SiteNav />
      <Hero />
      <ProjectsSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
