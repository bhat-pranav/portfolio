import Image from "next/image";
import type { FeaturedProduct } from "@/types/featured-product";

type FeaturedProductPreviewProps = {
  product: FeaturedProduct;
};

export function FeaturedProductPreview({ product }: FeaturedProductPreviewProps) {
  const media = product.screenshotPath ? (
    <Image
      src={product.screenshotPath}
      alt={`${product.name} preview`}
      fill
      className="object-cover object-top"
      sizes="(max-width: 768px) 100vw, 40vw"
    />
  ) : (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
      <span className="text-xs uppercase tracking-wide text-[var(--muted)]">Screenshot</span>
      <span className="text-sm text-[var(--muted)]">Preview coming soon</span>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--panel)] shadow-sm">
      <div className="relative aspect-[16/10] border-b border-[var(--border)] bg-[color:var(--bg)/0.6]">
        {media}
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-semibold tracking-tight">{product.name}</h2>
          <span className="shrink-0 rounded-full border border-[var(--accent)] px-2 py-0.5 text-xs text-[var(--accent)]">
            {product.status}
          </span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{product.description}</p>

        {product.liveUrl ? (
          <a
            href={product.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block text-sm text-[var(--accent)] hover:underline"
          >
            Open live →
          </a>
        ) : null}
      </div>
    </div>
  );
}
