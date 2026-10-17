import Link from "next/link";
import { announcement } from "@/data/site";

export function AnnouncementBar() {
  if (!announcement.enabled) return null;

  return (
    <div className="relative z-[51] bg-navy-deep text-ivory">
      <p className="px-4 py-2.5 text-center text-[0.68rem] tracking-[0.2em] uppercase">
        <Link href={announcement.href} className="hover:opacity-80">
          {announcement.message}
        </Link>
      </p>
    </div>
  );
}
