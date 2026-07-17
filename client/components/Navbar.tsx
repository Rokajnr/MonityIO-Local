import Link from "next/link";
import Image from "next/image";
import { getGlobalSettings } from "@/api/global";
import MobileNav from "@/components/MobileNav";

export default async function Navbar() {
  const globalSettings = await getGlobalSettings();

  if (!globalSettings) return null;

  const {
    navbarLinks = [],
    navbarCtaText,
    navbarCtaLink
  } = globalSettings;

  return (
    <nav id="main-nav" className="fixed top-0 left-0 right-0 z-50 bg-[#F7F6F2]/90 backdrop-blur border-b border-[#DDD9D0]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="MonityIO home" className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="MonityIO"
            width={56}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-600">
          {navbarLinks.map((link, i) => (
            <Link key={i} href={link.url}>
              {link.text}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {navbarCtaLink && navbarCtaText && (
            <Link
              href={navbarCtaLink}
              className="bg-[#E8291C] text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
            >
              {navbarCtaText}
            </Link>
          )}

          <MobileNav
            navbarLinks={navbarLinks}
            navbarCtaText={navbarCtaText}
            navbarCtaLink={navbarCtaLink}
          />
        </div>
      </div>
    </nav>
  );
}