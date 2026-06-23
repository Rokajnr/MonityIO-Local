import Link from "next/link";
import Image from "next/image";
import { getGlobalSettings } from "@/api/global";

export default async function Footer() {
  const globalSettings = await getGlobalSettings();

  if (!globalSettings) return null;

  const {
    footerLinks = [],
    copyrightText = ""
  } = globalSettings;

  return (
    <footer className="bg-[#F7F6F2] border-t border-[#DDD9D0] px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 flex-wrap">
        <div className="footer-logo flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="MonityIO"
            width={30}
            height={24}
            className="h-12 w-auto"
          />
        </div>

        {footerLinks.length > 0 && (
          <div className="footer-links flex flex-wrap gap-6 justify-center sm:justify-start">
            {footerLinks.map((link, idx) => (
              <Link
                key={idx}
                href={link.url}
                className="text-xs text-zinc-600 hover:text-zinc-900 transition"
              >
                {link.text}
              </Link>
            ))}
          </div>
        )}

        {copyrightText && (
          <p className="footer-copy text-xs text-zinc-400">{copyrightText}</p>
        )}
      </div>
    </footer>
  );
}
