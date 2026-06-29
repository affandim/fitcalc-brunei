import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { ImplantationForm } from "@/components/calculators/implantation-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "implantation-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Implantation Calculator — Estimate Your Implantation Window",
  description: "Estimate when implantation likely occurs, based on your ovulation date.",
  path: "/calculators/implantation-calculator",
});

const faqs = [
  {
    question: "Why is implantation timing a window rather than a single day?",
    answer:
      "Research on implantation timing finds it occurs across a range — most commonly 6 to 10 days after ovulation — rather than on one fixed day for everyone, which is why this calculator shows a range instead of a single date.",
  },
  {
    question: "Are implantation symptoms reliable signs of pregnancy?",
    answer:
      "Many commonly cited 'implantation symptoms' (mild cramping, light spotting) overlap significantly with normal premenstrual symptoms, making them unreliable as a standalone indicator. A pregnancy test, timed appropriately, is a far more reliable way to confirm pregnancy than symptom-watching alone.",
  },
  {
    question: "How does this relate to when I should take a pregnancy test?",
    answer:
      "hCG, the hormone pregnancy tests detect, begins rising only after implantation occurs — which is why even the earliest sensitive pregnancy tests aren't reliable until several days after the implantation window closes. The Pregnancy Test Calculator on this site uses this relationship to suggest appropriate testing timing.",
  },
];

export default function ImplantationCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <ImplantationForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Understanding the implantation window
      </h2>
      <p>
        Implantation — when a fertilized egg attaches to the uterine lining — is a key early
        milestone in pregnancy, and the moment hCG production begins. Research tracking
        implantation timing across many cycles has found it typically occurs in a window roughly
        6 to 10 days after ovulation, rather than on a single universal day.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why symptoms aren't a reliable signal</h3>
      <p>
        Light spotting and mild cramping are sometimes attributed to implantation, but both
        overlap substantially with normal premenstrual symptoms that have nothing to do with
        pregnancy. Relying on symptom-watching to determine pregnancy status is considerably less
        reliable than a properly timed pregnancy test.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Connecting implantation to test timing</h3>
      <p>
        Because hCG only starts being produced after implantation, and needs several days to
        reach a reliably detectable level, the implantation window itself is generally too early
        to test — which is why pregnancy tests are recommended closer to the day of a missed
        period rather than immediately after the estimated implantation window.
      </p>
    </article>
  );
}
