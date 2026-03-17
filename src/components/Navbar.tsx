import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-sw-midnight-500 px-8 py-3.5 shadow-nav">
      <Link href="/" aria-label="Superwork">
        <Image
          src="/logo.svg"
          alt="Superwork"
          width={154}
          height={36}
          priority
        />
      </Link>
      <div className="flex items-center gap-3">
        {/* Secondary CTA - Book a Demo */}
        <a
          href="#"
          className="btn inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-5 py-2.5 text-white transition-all hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
        >
          Book a Demo
        </a>
        {/* Primary CTA - Schedule a Call */}
        <a
          href="#"
          className="btn inline-flex items-center gap-1.5 rounded-lg bg-sw-green-500 px-5 py-2.5 text-sw-midnight-500 transition-all hover:-translate-y-0.5 hover:bg-sw-green-700 hover:shadow-btn-green"
        >
          Schedule a Call
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </nav>
  );
}
