import Link from "next/link";

const tools = [
  {
    name: "UTM Tag Builder",
    description:
      "Generate campaign-tracked URLs with HubSpot-friendly presets. Copy and go.",
    href: "/tools/utm-tag-builder",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "ROI Calculator",
    description:
      "Estimate savings and revenue lift from switching to HubSpot.",
    href: "/tools/roi-calculator",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
        <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
      </svg>
    ),
  },
  {
    name: "RevOps Maturity Assessment",
    description:
      "Evaluate your RevOps across 5 dimensions. Discover your gaps and strengths in 3 minutes.",
    href: "/tools/revops-assessment",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
      </svg>
    ),
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
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sw-green-500/20 to-sw-green-500/10 text-sw-midnight-500">
              {tool.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h2 className="font-heading text-body-base font-bold text-sw-neutral-500">
                  {tool.name}
                </h2>
                {tool.badge && (
                  <span className="rounded-full bg-sw-midnight-100 px-2 py-0.5 text-meta text-sw-neutral-400">
                    {tool.badge}
                  </span>
                )}
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
