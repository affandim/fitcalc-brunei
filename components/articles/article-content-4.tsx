import Link from "next/link";

const proseClass = "space-y-5 text-[15px] leading-relaxed text-foreground/75";
const h2 = "font-display text-2xl font-medium text-foreground";
const h3 = "font-display text-xl font-medium text-foreground";
const code = "rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm";
const linkClass = "text-emerald underline-offset-4 hover:underline";

export function HowMuchToSaveEachMonthArticle() {
  return (
    <div className={proseClass}>
      <p>
        "Save more" is advice everyone already knows. The more useful question — and the one
        that actually changes behavior — is "save exactly how much, by when, for what." Turning
        a vague intention into a specific monthly number is mostly a matter of three inputs.
      </p>

      <h2 className={h2}>Step 1: Define the goal precisely</h2>
      <p>
        "Save for emergencies" is vague. "Save $10,000 for a 6-month emergency fund within 2
        years" is a number you can actually plan around. Every savings goal becomes far more
        actionable once it has a specific target amount and a specific deadline attached to it.
      </p>

      <h2 className={h2}>Step 2: Account for what you've already saved</h2>
      <p>
        Existing savings don't just sit still — if they're earning any interest, they're growing
        on their own, which reduces how much new monthly saving is actually required. This is
        the part most back-of-napkin calculations skip, and it can make a meaningful difference
        over a multi-year timeline.
      </p>

      <h2 className={h2}>Step 3: Solve for the monthly number</h2>
      <p>
        The{" "}
        <Link href="/calculators/savings-goal-calculator" className={linkClass}>
          Savings Goal Calculator
        </Link>{" "}
        takes your target, current savings, timeline, and an expected interest rate, and
        calculates the exact monthly contribution needed — properly accounting for the growth of
        both your existing balance and your future contributions.
      </p>
      <p className={code}>
        Required monthly saving = (Target − growth of existing savings) spread across remaining
        months, compounding included
      </p>

      <h3 className={h3}>A simple sanity check: percentage of income</h3>
      <p>
        A commonly cited general guideline is saving roughly 20% of income across all goals
        combined (retirement, emergency fund, specific purchases). If your calculated monthly
        number for one specific goal already exceeds that on its own, it's worth revisiting the
        timeline or target rather than squeezing every other financial priority to make room for
        it.
      </p>

      <h3 className={h3}>Automate it once the number is set</h3>
      <p>
        Once you know the monthly figure, setting up an automatic transfer on payday removes the
        decision from each month — by far the most reliable way most people actually hit a
        savings target consistently, rather than relying on remembering to transfer manually.
      </p>
    </div>
  );
}

export function HowToCalculateMortgagePaymentsArticle() {
  return (
    <div className={proseClass}>
      <p>
        A mortgage payment is more predictable than it might seem — once you know the loan
        amount, interest rate, and term, the monthly payment is fixed by a formula, not a
        negotiation. Understanding that formula means you walk into any lender conversation
        already knowing roughly what to expect.
      </p>

      <h2 className={h2}>Step 1: Know your three inputs</h2>
      <p>
        You need the loan amount (purchase price minus down payment), the annual interest rate,
        and the loan term in years. These three numbers are all the standard amortization
        formula needs.
      </p>

      <h2 className={h2}>Step 2: Apply the payment formula</h2>
      <p className={code}>
        Monthly payment = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)
        <br />
        where P = loan amount, r = monthly interest rate (annual ÷ 12), n = total number of
        monthly payments
      </p>
      <p>
        This formula guarantees the loan balance reaches exactly zero after the final payment,
        regardless of the specific rate or term — it's the same math behind every standard
        fixed-rate mortgage. The{" "}
        <Link href="/calculators/loan-emi-calculator" className={linkClass}>
          Loan EMI Calculator
        </Link>{" "}
        runs this instantly and also shows the total interest paid over the life of the loan,
        which is often a bigger number than people expect.
      </p>

      <h2 className={h2}>Step 3: Check what you can actually afford</h2>
      <p>
        Knowing the payment for a specific loan amount is step one; knowing what you can
        reasonably afford given your income and existing debts is step two. The{" "}
        <Link href="/calculators/mortgage-affordability-calculator" className={linkClass}>
          Mortgage Affordability Calculator
        </Link>{" "}
        uses the standard 28/36 lending guideline to work backward from your income to a maximum
        affordable home price.
      </p>

      <h3 className={h3}>Why total interest can be a shock</h3>
      <p>
        Over a 30-year term, total interest paid can rival or exceed the original loan amount,
        depending on the rate — this isn't a sign of a bad deal, it's the mathematical
        consequence of borrowing a large sum over a long time at a non-zero rate. Shortening the
        term or making extra principal payments are the two main levers for reducing it.
      </p>
    </div>
  );
}

export function HowToCreateABudgetArticle() {
  return (
    <div className={proseClass}>
      <p>
        Most budgets fail for a small, predictable set of reasons: too restrictive to sustain,
        too vague to act on, or abandoned the first month something unexpected comes up. A
        budget built to survive contact with real life looks a little different from the
        spreadsheet ideal.
      </p>

      <h2 className={h2}>Step 1: Start from where you actually are</h2>
      <p>
        Before setting targets, track real spending for at least one full month using bank/card
        statements rather than memory — most people underestimate certain categories
        (subscriptions, takeout, small recurring purchases) significantly until they actually
        look. This baseline, not an aspirational ideal, is what a workable budget should be built
        from.
      </p>

      <h2 className={h2}>Step 2: Use a simple allocation framework</h2>
      <p>
        A widely used starting structure is the 50/30/20 split: roughly 50% of income to needs
        (housing, utilities, groceries), 30% to wants (dining out, entertainment), and 20% to
        savings and debt repayment beyond minimums. It's a starting point to adjust, not a rigid
        rule — someone with high housing costs in an expensive city will reasonably need a
        different split.
      </p>

      <h2 className={h2}>Step 3: Build in a buffer for irregular expenses</h2>
      <p>
        Car repairs, annual subscriptions, gifts, medical costs — these don't happen every month
        but they happen every year, and a budget that doesn't account for them at all gets
        "broken" the first time one shows up. Setting aside a small monthly amount specifically
        for irregular expenses prevents this from feeling like a budgeting failure when it's
        actually a predictable, plannable cost.
      </p>

      <h3 className={h3}>Track net worth, not just monthly cash flow</h3>
      <p>
        A monthly budget shows whether you're spending within your means this month. Tracking{" "}
        <Link href="/calculators/net-worth-calculator" className={linkClass}>
          net worth
        </Link>{" "}
        periodically shows whether your overall financial position is actually improving over
        time — a more complete picture than monthly budgeting alone, especially once debt
        repayment and savings growth are both in motion.
      </p>

      <h3 className={h3}>Why flexibility beats perfection</h3>
      <p>
        A budget that allows some discretionary spending without guilt tends to get followed
        longer than one demanding perfect restriction — sustainability matters more than
        theoretical optimization, since a budget abandoned after three weeks provides zero
        benefit regardless of how well-designed it was on paper.
      </p>
    </div>
  );
}

export function HowToCalculateBodyFatPercentageArticle() {
  return (
    <div className={proseClass}>
      <p>
        Body fat percentage gives a more complete picture than weight or BMI alone, since it
        separates fat mass from everything else (muscle, bone, water). The most accessible
        method that doesn't require special equipment is the US Navy circumference method —
        here's how to do it properly.
      </p>

      <h2 className={h2}>Step 1: Take the right measurements</h2>
      <p>
        You'll need neck circumference (measured just below the larynx, tape sloping slightly
        downward at the front), waist circumference (at the narrowest point, usually just above
        the belly button), and for women, hip circumference (at the widest point) as well. Height
        is also required.
      </p>

      <h2 className={h2}>Step 2: Measure carefully, not just quickly</h2>
      <p>
        Measure at the same time of day for consistency (mornings, before eating, tend to be most
        stable), without pulling the tape tight enough to compress skin, and standing in a
        relaxed, natural posture. Inconsistent technique between measurements is the most common
        source of misleading "changes" that aren't real.
      </p>

      <h2 className={h2}>Step 3: Apply the formula (or skip to the calculator)</h2>
      <p className={code}>
        Men: BF% = 495 / (1.0324 − 0.19077×log₁₀(waist−neck) + 0.15456×log₁₀(height)) − 450
        <br />
        Women: BF% = 495 / (1.29579 − 0.35004×log₁₀(waist+hip−neck) + 0.221×log₁₀(height)) − 450
      </p>
      <p>
        The{" "}
        <Link href="/calculators/body-fat-calculator" className={linkClass}>
          Body Fat Calculator
        </Link>{" "}
        handles this calculation directly from your measurements, so you don't need to work
        through the logarithms by hand.
      </p>

      <h3 className={h3}>How accurate is this, really?</h3>
      <p>
        Validation studies comparing this method against underwater weighing typically find it
        accurate to within about 3-4% body fat for most adults — good enough to track meaningful
        trends over weeks and months, even though it's an estimate rather than a lab-grade
        measurement.
      </p>

      <h3 className={h3}>Track the trend, not any single reading</h3>
      <p>
        Like most body composition measurements, a single reading carries some noise. Measuring
        consistently every few weeks and watching the trend line tells a far more reliable story
        than treating any one measurement as definitive.
      </p>
    </div>
  );
}

export function HowToEstimateRetirementSavingsArticle() {
  return (
    <div className={proseClass}>
      <p>
        Retirement savings goals can feel abstract precisely because the deadline is decades
        away — but the math behind getting there is the same compound growth math that applies
        to any long-term goal, just stretched over a longer timeline where the effect of
        compounding becomes dramatic.
      </p>

      <h2 className={h2}>Step 1: Estimate what you'll need</h2>
      <p>
        A commonly cited rule of thumb is that you'll need roughly 25 times your desired annual
        retirement spending saved (based on a 4% annual withdrawal rate assumption). If you want
        $40,000/year in retirement income from savings, that points to a target of roughly $1
        million — a useful starting estimate, though personal circumstances (other income
        sources, expected lifestyle, healthcare costs) shift the real number.
      </p>

      <h2 className={h2}>Step 2: Work out what you need to save now</h2>
      <p>
        With a target number and a timeline (years until retirement), the question becomes: how
        much do I need to contribute regularly, given expected investment growth, to reach that
        target? This is exactly what compound interest math answers.
      </p>
      <p className={code}>
        FV = P × (1+r)ⁿ + PMT × (((1+r)ⁿ − 1) ÷ r)
        <br />
        where P = current savings, PMT = regular contribution, r = rate per period, n = number of
        periods
      </p>
      <p>
        The{" "}
        <Link href="/calculators/compound-interest-calculator" className={linkClass}>
          Compound Interest Calculator
        </Link>{" "}
        runs this projection directly — enter your current savings, planned monthly
        contribution, an expected average return, and your time horizon, and it shows the
        projected future value alongside a year-by-year growth chart.
      </p>

      <h3 className={h3}>Why starting earlier matters disproportionately</h3>
      <p>
        Because compounding is exponential, not linear, the gap between starting at 25 versus 35
        is far larger than ten years' worth of contributions alone would suggest — the early
        contributions have ten extra years to compound, which often accounts for a substantial
        share of the eventual difference in final balance.
      </p>

      <h3 className={h3}>Revisit the number periodically</h3>
      <p>
        Expected returns, retirement timeline, and lifestyle expectations all shift over years
        and decades. Treat any retirement projection as a working estimate to revisit every few
        years — not a number calculated once in your twenties and never reconsidered.
      </p>
    </div>
  );
}
