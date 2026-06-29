import Link from "next/link";

const proseClass = "space-y-5 text-[15px] leading-relaxed text-foreground/75";
const h2 = "font-display text-2xl font-medium text-foreground";
const h3 = "font-display text-xl font-medium text-foreground";
const code = "rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm";
const linkClass = "text-emerald underline-offset-4 hover:underline";

export function HowToCalculateBmiArticle() {
  return (
    <div className={proseClass}>
      <p>
        BMI math itself is almost insultingly simple — divide weight by height squared. So when
        people get an unexpected or seemingly wrong BMI result, the formula is rarely the
        problem. The measurements that go into it usually are.
      </p>

      <h2 className={h2}>Step 1: Measure height correctly</h2>
      <p>
        Height should be measured standing fully upright, without shoes, heels together, looking
        straight ahead — not tilted up or down. Measuring first thing in the morning gives a
        very slightly taller reading than later in the day, since minor spinal compression
        accumulates over hours of being upright; the difference is small (a few millimetres) but
        worth being consistent about if you're tracking BMI over time.
      </p>

      <h2 className={h2}>Step 2: Measure weight correctly</h2>
      <p>
        Weigh at a consistent time of day — first thing in the morning, after using the
        bathroom, before eating or drinking, is the most stable and comparable reading. Weight
        can swing by a kilogram or more across a single day due to food, water, and sodium
        intake, so a single measurement at a random time isn't a reliable input for tracking
        purposes, even though it's perfectly fine for a one-off BMI check.
      </p>

      <h2 className={h2}>Step 3: Do the calculation</h2>
      <p className={code}>
        BMI = weight (kg) ÷ height (m)²
      </p>
      <p>
        For example, someone weighing 70kg at a height of 1.75m: 70 ÷ (1.75 × 1.75) = 70 ÷
        3.0625 ≈ 22.9. If you're working in pounds and inches, multiply weight in pounds by 703,
        then divide by height in inches squared — both versions of the formula produce the same
        result, just scaled for different units. The{" "}
        <Link href="/calculators/bmi-calculator" className={linkClass}>
          BMI Calculator
        </Link>{" "}
        on this site handles the unit conversion automatically either way.
      </p>

      <h3 className={h3}>Common mistakes that throw off the result</h3>
      <p>
        Rounding height too aggressively (172cm entered as 170cm) shifts the result more than
        people expect, since height is squared in the formula — small height errors compound.
        Weighing with shoes or heavy clothing on adds a kilogram or more depending on what you're
        wearing. And comparing a same-day "after a big meal" weight against a "first thing in the
        morning" weight from a previous check creates an apples-to-oranges comparison that looks
        like real change when it's just normal fluctuation.
      </p>

      <h3 className={h3}>Once you have the number</h3>
      <p>
        A single accurate BMI calculation is a useful data point, not a verdict. Reading the
        result in context — alongside how your clothes fit, your energy levels, and ideally a
        second measure like{" "}
        <Link href="/calculators/waist-to-height-ratio-calculator" className={linkClass}>
          waist-to-height ratio
        </Link>{" "}
        — gives a far more complete picture than the BMI number on its own.
      </p>
    </div>
  );
}

export function HowManyCaloriesToLoseWeightArticle() {
  return (
    <div className={proseClass}>
      <p>
        "Eat fewer calories than you burn" is true and also not very useful on its own — it
        doesn't tell you how many fewer, or how to find your baseline in the first place. Here's
        the actual sequence to get from "I want to lose weight" to a specific daily number.
      </p>

      <h2 className={h2}>Step 1: Find your maintenance calories (TDEE)</h2>
      <p>
        Before you can subtract anything, you need to know what "maintenance" looks like for
        you. Total Daily Energy Expenditure (TDEE) is your real-world maintenance number — BMR
        (resting burn) multiplied by an activity factor. Use the{" "}
        <Link href="/calculators/tdee-calculator" className={linkClass}>
          TDEE Calculator
        </Link>{" "}
        to get this number, being honest rather than aspirational about your actual activity
        level — this is the single most common place people get the next step wrong.
      </p>

      <h2 className={h2}>Step 2: Apply a moderate deficit</h2>
      <p>
        A widely used, sustainable starting point is roughly 500 calories below TDEE, historically
        linked to about 0.5kg of fat loss per week via the rough "3,500 calories per pound of
        fat" approximation. It's not perfectly precise — individual results vary — but it's a
        reasonable, well-tested starting point rather than a guess.
      </p>
      <p className={code}>Target calories = TDEE − 500</p>

      <h2 className={h2}>Step 3: Adjust based on what actually happens</h2>
      <p>
        Track your weight for two to three weeks (using a weekly average, not daily readings,
        which are noisy) and compare against the expected rate of loss. Losing faster than
        expected might mean increasing intake slightly to make the deficit more sustainable;
        losing slower or not at all usually means activity level was overestimated, or intake is
        running higher than tracked. The{" "}
        <Link href="/calculators/calories-calculator" className={linkClass}>
          Calories Calculator
        </Link>{" "}
        does steps 1 and 2 in one pass if you'd rather skip the manual subtraction.
      </p>

      <h3 className={h3}>Why bigger deficits usually backfire</h3>
      <p>
        Larger deficits accelerate short-term loss but increase hunger, reduce training
        performance, and raise the risk of losing muscle alongside fat — and critically, they're
        harder to sustain. A deficit abandoned after ten days isn't actually faster than a
        moderate one sustained for three months; it just front-loads the frustration.
      </p>

      <h3 className={h3}>Protein is the detail most people skip</h3>
      <p>
        Higher protein intake during a deficit helps preserve muscle mass and improves satiety —
        it's the macronutrient most worth getting right even if everything else stays loose. A
        deficit with adequate protein feels meaningfully different than the same deficit without
        it.
      </p>
    </div>
  );
}

export function HowToSaveForDownPaymentArticle() {
  return (
    <div className={proseClass}>
      <p>
        A down payment goal is one of the more motivating savings targets to work toward, mostly
        because it's concrete — there's a real number, a real timeline, and a real outcome at
        the end of it. That concreteness also makes it one of the easier goals to actually plan
        for with math, rather than vague intentions.
      </p>

      <h2 className={h2}>Step 1: Know your real target number</h2>
      <p>
        Down payment requirements vary by loan type and lender, but a common reference point is
        20% of the home's purchase price (lower percentages are often possible, sometimes with
        added insurance costs). If you're eyeing a $400,000 home with a 20% down payment, your
        target is $80,000 — that's the number to plan around, not the home price itself.
      </p>

      <h2 className={h2}>Step 2: Set a timeline</h2>
      <p>
        Be realistic about when you actually want to buy. A 3-year timeline and a 10-year
        timeline produce very different required monthly savings amounts for the same target —
        and an unrealistically short timeline is one of the most common reasons people abandon a
        savings goal partway through.
      </p>

      <h2 className={h2}>Step 3: Work out the required monthly contribution</h2>
      <p>
        This is where most people either guess or avoid the math entirely. The{" "}
        <Link href="/calculators/savings-goal-calculator" className={linkClass}>
          Savings Goal Calculator
        </Link>{" "}
        does this directly: enter your target amount, what you've already saved, your timeline,
        and an expected interest rate, and it solves for the monthly contribution needed to get
        there — accounting for the fact that what you've already saved keeps growing too.
      </p>

      <h3 className={h3}>Where to actually keep the money</h3>
      <p>
        For a goal with a defined, relatively short timeline (under 3-5 years), a high-yield
        savings account is generally more appropriate than investing in the stock market — market
        volatility could mean your down payment fund is meaningfully smaller right when you need
        it, which is a risk most people aren't willing to take for a near-term, specific goal.
      </p>

      <h3 className={h3}>If the monthly number feels too high</h3>
      <p>
        Three levers can bring it down: extending the timeline, targeting a smaller down payment
        percentage (with the trade-off of added mortgage insurance costs), or increasing your
        starting savings before the regular contribution phase begins. Adjusting any of these in
        the calculator shows immediately how much the required monthly number shifts.
      </p>
    </div>
  );
}

export function HowToCalculateDailyCalorieNeedsArticle() {
  return (
    <div className={proseClass}>
      <p>
        "How many calories do I need?" sounds like a single question, but it's actually two
        steps stacked on top of each other — and skipping the first step is why a lot of people
        end up with a target that doesn't match how they actually feel or perform.
      </p>

      <h2 className={h2}>Step 1: Calculate your BMR</h2>
      <p>
        Basal Metabolic Rate is what your body burns at complete rest — no movement, no
        digestion, just staying alive. The most accurate widely-used formula for this is
        Mifflin-St Jeor, which uses weight, height, age, and gender:
      </p>
      <p className={code}>
        Men: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5
        <br />
        Women: BMR = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161
      </p>
      <p>
        The{" "}
        <Link href="/calculators/bmr-calculator" className={linkClass}>
          BMR Calculator
        </Link>{" "}
        does this instantly, but knowing the formula helps make sense of what the activity
        multiplier in the next step is actually adjusting.
      </p>

      <h2 className={h2}>Step 2: Multiply by your activity level</h2>
      <p>
        BMR alone understates real needs because it excludes all movement. Multiplying by an
        activity factor — from 1.2 (sedentary) up to 1.9 (extremely active) — converts it into
        TDEE, the number that reflects your actual daily burn.
      </p>
      <p className={code}>Daily calorie needs (TDEE) = BMR × activity multiplier</p>

      <h3 className={h3}>The step people get wrong most often</h3>
      <p>
        Overestimating activity level. Going to the gym three times a week alongside an
        otherwise desk-based, low-movement lifestyle is "lightly active," not "very active" —
        and picking too high a multiplier inflates the calorie target, which quietly undermines
        any weight goal built on top of it.
      </p>

      <h3 className={h3}>Skip the two-step math if you want</h3>
      <p>
        The{" "}
        <Link href="/calculators/tdee-calculator" className={linkClass}>
          TDEE Calculator
        </Link>{" "}
        combines both steps directly — enter your details and activity level once, and it
        returns the final daily number without needing to calculate BMR separately first.
      </p>
    </div>
  );
}

export function HowToFindIdealBodyWeightArticle() {
  return (
    <div className={proseClass}>
      <p>
        Type "ideal body weight" into a search bar and you'll get several different formulas,
        each giving a slightly different number for the same height. That's not a bug — it's
        because "ideal weight" formulas were built for different purposes, and none of them is a
        universal, individually precise answer.
      </p>

      <h2 className={h2}>Step 1: Understand what these formulas actually do</h2>
      <p>
        Most ideal weight formulas — Devine, Robinson, Miller, Hamwi — were originally developed
        for clinical purposes like drug dosing, where using a population-average "ideal" weight
        avoided over- or under-dosing patients at the extremes of height. They were never
        designed to capture individual variation in frame size or muscle mass.
      </p>

      <h2 className={h2}>Step 2: Calculate using a standard formula</h2>
      <p>This site uses the Devine formula, one of the most widely referenced:</p>
      <p className={code}>
        Men: IBW(kg) = 50 + 2.3 × (height in inches − 60)
        <br />
        Women: IBW(kg) = 45.5 + 2.3 × (height in inches − 60)
      </p>
      <p>
        The{" "}
        <Link href="/calculators/ideal-weight-calculator" className={linkClass}>
          Ideal Weight Calculator
        </Link>{" "}
        runs this automatically and also shows a ±10% range rather than a single number, which
        is the more honest way to use the result.
      </p>

      <h2 className={h2}>Step 3: Treat the result as a range, not a target</h2>
      <p>
        Because the formula only uses height, two people of the same height with very different
        builds get the identical "ideal weight" — even though their genuinely healthy weights
        might differ by ten kilograms or more. Using the ±10% range, and weighing it against how
        you actually feel and perform, is far more useful than chasing the exact number.
      </p>

      <h3 className={h3}>A better combination than any single formula</h3>
      <p>
        Pairing ideal weight with{" "}
        <Link href="/calculators/bmi-calculator" className={linkClass}>
          BMI
        </Link>{" "}
        and, if you want a frame-size adjustment, a{" "}
        <Link href="/calculators/frame-size-calculator" className={linkClass}>
          body frame size
        </Link>{" "}
        check gives a more complete picture than relying on one number-only formula in isolation.
      </p>
    </div>
  );
}
