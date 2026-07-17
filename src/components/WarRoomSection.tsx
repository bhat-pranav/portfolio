import { SectionHeader } from "@/components/SectionHeader";

const operations = [
  {
    title: "Execution Loop",
    bullets: ["MVP → ship", "Instrument + measure", "Iterate with focus"],
  },
  {
    title: "Systems Thinking",
    bullets: ["Constraints + tradeoffs", "Reliability mindset", "Simple over clever"],
  },
  {
    title: "Communication",
    bullets: ["Tight docs", "Clear updates", "No ambiguity in handoffs"],
  },
];

export function WarRoomSection() {
  return (
    <section id="war" className="mx-auto max-w-5xl px-5 py-14">
      <SectionHeader label="[ WAR ROOM ]" title="How I operate" />

      <div className="grid gap-4 md:grid-cols-3">
        {operations.map((p) => (
          <div
            key={p.title}
            className="rounded-xl border border-[var(--border)] bg-[var(--panel)] p-5"
          >
            <h3 className="font-semibold">{p.title}</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
