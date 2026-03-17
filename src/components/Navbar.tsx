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
        {/* Primary CTA - Book a Demo */}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full bg-sw-green-500 px-6 py-3 font-body text-base font-semibold text-sw-midnight-500 transition-all hover:bg-sw-green-700"
        >
          Book a demo
        </a>
        {/* Secondary CTA - Sign In */}
        <a
          href="#"
          className="inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-transparent px-6 py-3 font-body text-base font-semibold text-white transition-all hover:bg-white/10"
        >
          Sign in
        </a>
      </div>
    </nav>
  );
}
