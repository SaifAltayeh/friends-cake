import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { SearchModal } from "@/components/layout/SearchModal";
import { Footer } from "@/components/layout/Footer";
import { ToastStack } from "@/components/layout/ToastStack";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { RouteEffects } from "@/components/layout/RouteEffects";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-navy focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <RouteEffects />
      <div className="pointer-events-auto fixed inset-x-0 top-0 z-[60] pt-[env(safe-area-inset-top)]">
        <AnnouncementBar />
        <Header />
      </div>
      <MobileNav />
      <SearchModal />
      <CartDrawer />
      <ToastStack />
      <main
        id="main-content"
        className="flex-1 pt-[calc(7.25rem+env(safe-area-inset-top))] has-[#cake-journey]:pt-0 has-[#page-hero]:pt-0 sm:pt-28"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
