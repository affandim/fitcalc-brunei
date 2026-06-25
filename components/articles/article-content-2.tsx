import Link from "next/link";

const proseClass = "space-y-5 text-[15px] leading-relaxed text-foreground/75";
const h2 = "font-display text-2xl font-medium text-foreground";
const h3 = "font-display text-xl font-medium text-foreground";
const code = "rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm";
const linkClass = "text-emerald underline-offset-4 hover:underline";

export function ProteinNeedsArticle() {
  return (
    <div className={proseClass}>
      <p>
        Ask three different sources how much protein you need and you'll likely get three
        different answers — and the gap isn't a sign that nutrition science is hopelessly
        contradictory. It's a sign that "how much protein" depends heavily on the question being
        asked underneath it: enough to avoid deficiency, or enough to actually optimize muscle
        and performance.
      </p>

      <h2 className={h2}>The official number is a floor, not a target</h2>
      <p>
        Most national dietary guidelines cite a Recommended Dietary Allowance around 0.8g of
        protein per kilogram of bodyweight per day. This number comes from research designed to
        identify the minimum intake that prevents deficiency in a sedentary adult — it's a safety
        floor, calculated with margin built in, not a number derived from what produces the best
        body composition or training outcomes.
      </p>
      <p>
        That distinction matters enormously, because the 0.8g/kg figure gets repeated so often
        that it's frequently mistaken for an upper-bound recommendation rather than what it
        actually is: a baseline for people doing essentially no structured training.
      </p>

      <h2 className={h2}>What sports nutrition research actually supports</h2>
      <p>
        For anyone training regularly — resistance training in particular — the research
        consensus sits considerably higher than the RDA. A commonly cited range is 1.6 to 2.2
        grams per kilogram of bodyweight per day, with most studies finding intake above roughly
        2.2g/kg delivering little additional benefit for muscle protein synthesis. There's a
        practical ceiling to how much dietary protein the body can put toward building or
        preserving muscle tissue at any given time; beyond that ceiling, extra protein is mostly
        just used for energy, the same as any other macronutrient.
      </p>
      <p>
        This calculator's{" "}
        <Link href="/calculators/protein-calculator" className={linkClass}>
          Protein Calculator
        </Link>{" "}
        scales recommendations across this range based on activity level — sedentary,
        moderately active, active, or athlete — rather than defaulting to the conservative RDA
        figure that applies to almost no one actually using a fitness calculator site.
      </p>

      <h2 className={h2}>Protein needs change during a calorie deficit</h2>
      <p>
        Here's a detail that surprises people: protein needs generally go up, not down, when
        you're eating less overall. During a calorie deficit, adequate protein intake helps
        preserve lean muscle mass that might otherwise be lost alongside fat — your body is more
        likely to break down muscle tissue for energy when it's in an energy deficit and protein
        intake is inadequate. This is part of why "active" and "athlete" targets sit toward the
        higher end of the research range; they're partly insurance against muscle loss during
        periods of reduced calorie intake, not just fuel for building new tissue.
      </p>

      <h2 className={h2}>Timing: does it actually matter?</h2>
      <p>
        Total daily protein is the dominant factor, but how you spread it across the day isn't
        irrelevant. Research on muscle protein synthesis generally supports distributing protein
        across three to four meals, each contributing somewhere in the 20-40g range, rather than
        consuming the same daily total in one or two large meals. The body appears to have a
        practical limit on how much protein it can productively use for muscle building in any
        single feeding window — beyond that, more protein in one sitting doesn't translate to
        proportionally more muscle protein synthesis.
      </p>

      <h3 className={h3}>A practical way to apply this</h3>
      <p>
        Rather than obsessing over exact grams at every meal, a workable rule of thumb is building
        each meal around a protein source first — meat, fish, eggs, dairy, legumes, or a protein
        supplement — and filling in the rest of the plate around it. Hit your daily total
        consistently, distribute it across the day reasonably evenly, and the smaller details
        matter far less than that basic consistency.
      </p>
    </div>
  );
}

export function WaistToHeightVsBmiArticle() {
  return (
    <div className={proseClass}>
      <p>
        BMI gets most of the attention, but it's far from the only simple screening tool for
        weight-related health risk — and in a fair amount of recent research, it isn't even the
        best one. Waist-to-height ratio has quietly built a strong case as a more informative
        alternative, particularly for cardiovascular and metabolic risk. Here's how the two
        actually compare, and where each one still falls short.
      </p>

      <h2 className={h2}>What each one is built to measure</h2>
      <p>
        BMI compares total body weight to height, with no information about where that weight
        sits on the body. Waist-to-height ratio compares waist circumference — a direct measure
        of central, abdominal fat — to height. The practical difference is significant: two
        people with an identical BMI can have very different waist measurements, and that
        difference often matters more for actual health risk than the BMI number itself.
      </p>

      <h2 className={h2}>Why abdominal fat carries extra weight, so to speak</h2>
      <p>
        Visceral fat — the fat stored around abdominal organs rather than just under the skin — is
        more metabolically active than subcutaneous fat stored elsewhere on the body, and it's
        more strongly linked to insulin resistance, type 2 diabetes, and cardiovascular disease.
        Two people of identical total body fat percentage can carry meaningfully different
        cardiometabolic risk depending on how much of that fat sits centrally versus peripherally.
        BMI has no way to see this difference; waist-to-height ratio, by design, does.
      </p>
      <p>
        Several large studies comparing the two metrics directly have found waist-to-height ratio
        a stronger predictor of cardiovascular and metabolic risk than BMI, particularly for
        identifying risk in people whose BMI falls in the "normal" range but who still carry
        meaningful central fat — sometimes informally described as being "skinny fat."
      </p>

      <h2 className={h2}>The case for waist-to-height ratio's simplicity</h2>
      <p>
        Beyond the accuracy argument, waist-to-height ratio has a practical advantage: one
        threshold works reasonably well across a wide range of ages and both sexes. BMI requires
        separate reference charts for children, adjusted considerations for older adults, and
        arguably should use different thresholds for different ethnic populations. Waist-to-height
        ratio's "keep your waist under half your height" guidance, while not perfectly universal
        either, generalizes more cleanly than BMI's age- and population-specific complexity.
      </p>

      <h2 className={h2}>Where waist-to-height ratio falls short</h2>
      <p>
        It isn't a perfect replacement. Waist circumference is more prone to measurement error
        than height and weight — small differences in exactly where you place the tape, whether
        you've just eaten, or how tightly you pull the tape can shift the reading more than a
        bathroom scale would for weight. It also says nothing about muscle mass, fitness level, or
        overall body composition beyond central fat specifically. Like BMI, it's a screening
        tool, not a diagnosis.
      </p>

      <h2 className={h2}>Using both together</h2>
      <p>
        The strongest approach isn't choosing one over the other — it's using both as
        complementary data points. Calculate your{" "}
        <Link href="/calculators/bmi-calculator" className={linkClass}>
          BMI
        </Link>{" "}
        and your{" "}
        <Link href="/calculators/waist-to-height-ratio-calculator" className={linkClass}>
          waist-to-height ratio
        </Link>{" "}
        together. If they broadly agree, that's a reasonably consistent signal. If they
        disagree — a normal BMI with an elevated waist-to-height ratio, for instance — that
        disagreement itself is useful information worth paying attention to, more useful than
        either number would have been alone.
      </p>
    </div>
  );
}

export function CalorieDeficitGuideArticle() {
  return (
    <div className={proseClass}>
      <p>
        The mechanics of a calorie deficit are almost insultingly simple: eat less energy than
        your body uses, and weight goes down. Anyone who's actually tried to sustain one for more
        than a few weeks knows the real challenge has nothing to do with understanding that
        equation and everything to do with living inside it without it becoming miserable. This
        is a practical guide to setting one up so it's actually sustainable.
      </p>

      <h2 className={h2}>Start from a real number, not a guess</h2>
      <p>
        Before picking a deficit, you need an honest estimate of your maintenance calories — your
        TDEE. Guessing low and accidentally creating a much larger deficit than intended is one of
        the most common reasons people feel unnecessarily hungry and abandon a plan early. Use
        the{" "}
        <Link href="/calculators/tdee-calculator" className={linkClass}>
          TDEE Calculator
        </Link>{" "}
        to get a realistic baseline, being honest rather than aspirational about your actual
        activity level.
      </p>

      <h2 className={h2}>How big should the deficit actually be?</h2>
      <p>
        A widely used, moderate starting point is roughly 500 calories below TDEE, historically
        associated with about 0.5kg of fat loss per week based on the rough "3,500 calories per
        pound of fat" approximation. It's not a perfectly precise rule — individual results vary
        with metabolism, water retention, and adherence — but as a starting point, it strikes a
        reasonable balance between visible progress and day-to-day sustainability.
      </p>
      <p>
        Larger deficits accelerate short-term weight loss but come with real costs: increased
        hunger, reduced training performance, a higher risk of losing muscle alongside fat, and
        — critically — a much higher dropout rate. A deficit you can't sustain for more than two
        weeks isn't actually faster in any way that matters; it just front-loads frustration.
      </p>

      <h2 className={h2}>Protein is your insurance policy</h2>
      <p>
        Of everything you can control during a deficit, protein intake has perhaps the strongest
        evidence behind it for protecting what you actually want to keep: muscle mass, satiety,
        and general adherence. Higher protein intake during a deficit is consistently associated
        with better preservation of lean tissue and, for many people, better hunger control than
        an equivalent deficit achieved by cutting protein along with everything else. The{" "}
        <Link href="/calculators/protein-calculator" className={linkClass}>
          Protein Calculator
        </Link>{" "}
        on this site scales recommendations specifically for active goals, which is the relevant
        range during a deficit.
      </p>

      <h2 className={h2}>Expect the scale to lie to you sometimes</h2>
      <p>
        Day-to-day weight fluctuates by a kilogram or more from water retention, sodium intake,
        hormonal cycles, and digestive contents — none of which has anything to do with actual
        fat loss. Weighing daily and looking at the weekly average, rather than reacting to any
        single morning's number, removes most of the noise and prevents the common spiral of
        panicking over a normal fluctuation and abandoning an otherwise working plan.
      </p>

      <h2 className={h2}>Recalculate as your weight changes</h2>
      <p>
        As you lose weight, your BMR and TDEE both drop — a smaller body simply needs less energy
        to maintain itself. A deficit that felt right at the start can quietly shrink as your
        maintenance calories fall, which is why it's worth recalculating every few weeks rather
        than fixing one number at the beginning and assuming it stays accurate for months.
      </p>

      <h3 className={h3}>The honest version of "what actually works"</h3>
      <p>
        The deficit that works best isn't the mathematically fastest one — it's the one you can
        actually maintain consistently for long enough to matter. A moderate, well-fed approach
        sustained for three months reliably outperforms an aggressive one abandoned after ten
        days, even though the aggressive plan looks better on paper for exactly as long as someone
        sticks to it.
      </p>
    </div>
  );
}
