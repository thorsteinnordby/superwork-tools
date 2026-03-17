import Link from "next/link";

const tools = [
  {
    name: "UTM Tag Builder",
    description:
      "Generate campaign-tracked URLs with HubSpot-friendly presets. Copy and go.",
    href: "/tools/utm-tag-builder",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.43a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L5.25 9.94" />
      </svg>
    ),
    badge: "Live",
  },
  {
    name: "ROI Calculator",
    description:
      "Estimate savings and revenue lift from switching to HubSpot.",
    href: "/tools/roi-calculator",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75V18m15-8.25l-7.714 7.714a2.25 2.25 0 01-3.182 0L2.25 9.75" />
      </svg>
    ),
    badge: "Live",
  },
  {
    name: "Sales Maturity Assessment",
    description:
      "Benchmark your sales process against best practices in 3 minutes.",
    href: "#",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    badge: "Coming Soon",
  },
];

export default function HomePage() {
  return (
    <div className="px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="mb-4 inline-block rounded-full bg-sw-green-500 px-3 py-1 text-meta text-sw-midnight-500">
          Free Tools
        </span>
        <h1 className="mb-3 font-heading text-h2 text-sw-neutral-500">
          HubSpot & RevOps Tools
        </h1>
        <p className="mb-12 text-body-primary text-sw-neutral-400">
          Free interactive utilities for marketers, sales ops, and RevOps teams.
          Built by Superwork.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className={`group flex items-center gap-5 rounded-lg border bg-white p-6 shadow-[0_1px_3px_rgba(28,30,49,0.06)] transition-all ${
              tool.href === "#"
                ? "pointer-events-none border-sw-midnight-200 opacity-60"
                : "border-sw-midnight-200 hover:-translate-y-0.5 hover:border-sw-violet-500 hover:shadow-[0_8px_24px_rgba(28,30,49,0.12)]"
            }`}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sw-violet-500/8 text-sw-violet-500">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-heading text-body-base font-bold text-sw-neutral-500">
                  {tool.name}
                </h2>
                <span
                  className={`rounded-full px-2 py-0.5 text-meta ${
                    tool.badge === "Live"
                      ? "bg-sw-green-500/15 text-sw-green-900"
                      : "bg-sw-midnight-100 text-sw-neutral-400"
                  }`}
                >
                  {tool.badge}
                </span>
              </div>
              <p className="text-body-compact text-sw-neutral-400">{tool.description}</p>
            </div>
            {tool.href !== "#" && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5 shrink-0 text-sw-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-sw-violet-500"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
