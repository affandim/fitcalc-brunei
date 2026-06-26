import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Get in touch with the Calckoo team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-emerald">Get in touch</p>
      <h1 className="font-display mt-2 text-3xl font-medium sm:text-4xl">Contact us</h1>
      <p className="mt-6 text-foreground/70 leading-relaxed">
        Spotted an incorrect formula, have a calculator request, or want to partner with us?
        Reach out at{" "}
        <a href="mailto:hello@calckoo.com" className="text-emerald underline-offset-4 hover:underline">
          hello@calckoo.com
        </a>
        .
      </p>
    </div>
  );
}
