import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Terms of Service",
  description: "The terms governing use of Calckoo's calculators and content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-medium">Terms of Service</h1>
      <p className="mt-6 text-foreground/70 leading-relaxed">
        This page will outline the terms governing use of Calckoo&apos;s
        calculators and content. Full terms to be added before launch.
      </p>
    </div>
  );
}
