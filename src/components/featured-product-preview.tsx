import Image from "next/image";
import type { FeaturedProduct } from "@/types/featured-product";

type FeaturedProductPreviewProps = {
  product: FeaturedProduct;
  priority?: boolean;
};

export function FeaturedProductPreview({
  product,
  priority = false,
}: FeaturedProductPreviewProps) {
  const media = product.screenshotPath ? (
    <Image
      src={product.screenshotPath}
      alt={`${product.name} product interface showing job description and resume inputs`}
      fill
      className="object-contain object-top"
      sizes="(max-width: 768px) 100vw, 40vw"
      priority={priority}
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
      <span className="text-xs uppercase tracking-wide text-[var(--muted)]">Screenshot</span>
      <span className="text-sm text-[var(--muted)]">Preview coming soon</span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] shadow-sm">
      <div className="relative aspect-[4/5] max-h-[28rem] w-full border-b border-[var(--border)] bg-[color:var(--bg)/0.6] sm:aspect-[5/6] sm:max-h-[32rem]">
        {media}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <p className="font-semibold tracking-tight text-[var(--text)]">{product.name}</p>
          <span className="shrink-0 rounded-full border border-[var(--accent)] px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
            Status: {product.status}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{product.description}</p>

        {product.liveUrl ? (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-10 items-center text-sm text-[var(--accent)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            Open live product
            <span aria-hidden="true"> →</span>
          </a>
        ) : null}
      </div>
    </div>
  );
}
