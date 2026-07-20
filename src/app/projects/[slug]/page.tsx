import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/case-study-view";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import {
  getAllCaseStudySlugs,
  getCaseStudyBySlug,
} from "@/data/case-studies";

type ProjectCaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectCaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Project not found",
    };
  }

  const title = study.metaTitle ?? `${study.title} — Pranav Bhat`;
  const description = study.metaDescription ?? study.description;
  const url = `/projects/${study.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: ProjectCaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-0 opacity-40 motion-reduce:opacity-20 [background-image:radial-gradient(circle_at_1px_1px,var(--grid)_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--accent)] opacity-30 blur-3xl motion-reduce:opacity-15 motion-reduce:blur-none" />
      </div>

      <SiteNav />
      <CaseStudyView study={study} />
      <SiteFooter />
    </main>
  );
}
