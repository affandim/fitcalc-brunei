import type { Metadata } from "next";
import { calculators } from "@/data/calculators";
import { CalculatorShell } from "@/components/calculators/calculator-shell";
import { PregnancyTestForm } from "@/components/calculators/pregnancy-test-form";
import { buildPageMetadata } from "@/lib/seo";

const calculator = calculators.find((c) => c.slug === "pregnancy-test-calculator")!;

export const metadata: Metadata = buildPageMetadata({
  title: "Pregnancy Test Calculator — When to Take a Test",
  description: "Find the earliest possible day and the most reliable day to take a pregnancy test.",
  path: "/calculators/pregnancy-test-calculator",
});

const faqs = [
  {
    question: "Why does testing too early risk a false negative?",
    answer:
      "Pregnancy tests detect hCG, a hormone that rises after implantation. Levels are low in early pregnancy and take time to build up to a detectable level — testing before hCG has risen enough can show a negative result even in an actual pregnancy.",
  },
  {
    question: "What's the difference between 'earliest possible' and 'most reliable'?",
    answer:
      "The earliest date reflects when a sensitive early test might detect pregnancy at the lowest reliably-tested hCG levels. The recommended date — the day of your missed period — gives hCG more time to rise, substantially reducing the false-negative risk.",
  },
  {
    question: "What if my result is negative but my period still hasn't arrived?",
    answer:
      "Testing again a few days later, with first-morning urine (when hCG is most concentrated), is the standard next step. If your period still doesn't arrive and tests remain negative, checking in with a healthcare provider is a reasonable next step.",
  },
];

export default function PregnancyTestCalculatorPage() {
  return (
    <CalculatorShell calculator={calculator} faqs={faqs} article={<Article />}>
      <PregnancyTestForm />
    </CalculatorShell>
  );
}

function Article() {
  return (
    <article className="space-y-5 text-[15px] leading-relaxed text-foreground/75">
      <h2 className="font-display text-2xl font-medium text-foreground">
        Timing a pregnancy test for the most reliable result
      </h2>
      <p>
        Home pregnancy tests detect human chorionic gonadotropin (hCG), a hormone produced after
        a fertilized egg implants in the uterus — typically around 6 to 10 days after ovulation.
        hCG levels start low and roughly double every two to three days in early pregnancy, which
        is why timing matters so much for getting a reliable result.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Why earlier isn't always better</h3>
      <p>
        Testing too early — before hCG has had time to rise to a detectable level — is the most
        common cause of a false negative in someone who is actually pregnant. Even "early
        result" tests advertised as highly sensitive can miss a very early pregnancy if hCG
        hasn't risen enough yet.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">The most reliable single day</h3>
      <p>
        Testing on the day of a missed period — when hCG has had the most time to accumulate
        since implantation — gives the most reliable result for a single test. If your cycle is
        irregular, this date is naturally less certain, which is part of why a negative result
        with a still-missing period is usually worth a repeat test a few days later.
      </p>
      <h3 className="font-display text-xl font-medium text-foreground">Getting the most accurate reading</h3>
      <p>
        First-morning urine is generally the most concentrated, giving hCG the best chance of
        reaching a detectable threshold if testing early. Following the specific test's
        instructions exactly — including how long to wait before reading the result — also
        matters more than people often expect.
      </p>
    </article>
  );
}
