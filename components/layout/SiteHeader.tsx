import Link from "next/link";
import { site } from "@/content/site";
import { Utilities } from "./Utilities";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between px-5 py-5 md:px-10 lg:px-14 xl:px-20">
      <Link
        href="/"
        data-track="nav_home"
        className="font-display text-lg font-medium uppercase tracking-tight"
        aria-label={`${site.name} — home`}
      >
        RK
      </Link>
      <div className="hidden md:block">
        <Utilities />
      </div>
      <div className="md:hidden">
        <MobileNav />
      </div>
    </header>
  );
}
