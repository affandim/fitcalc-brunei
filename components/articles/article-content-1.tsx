import Link from "next/link";

const proseClass = "space-y-5 text-[15px] leading-relaxed text-foreground/75";
const h2 = "font-display text-2xl font-medium text-foreground";
const h3 = "font-display text-xl font-medium text-foreground";
const code = "rounded-xl bg-surface-muted px-4 py-3 font-mono text-sm";
const linkClass = "text-emerald underline-offset-4 hover:underline";

export function UnderstandingBmiResultArticle() {
  return (
    <div className={proseClass}>
      <p>
        Few health numbers travel as far outside their original purpose as BMI. It shows up on
        insurance forms, gym intake sheets, and doctor's office scales, almost always presented
        as a single verdict: underweight, normal, overweight, obese. But a BMI reading was never
        designed to be read in isolation, and understanding what it actually captures — and what
        it quietly leaves out — changes how much weight (so to speak) you should put on any one
        result.
      </p>

      <h2 className={h2}>What BMI is actually measuring</h2>
      <p>
        BMI divides your weight in kilograms by the square of your height in metres. That's the
        entire calculation. It doesn't know whether your weight comes from muscle or fat, where
        on your body that weight sits, your age, your ethnicity, or your activity level. It's a
        ratio, nothing more — which is precisely why it's so fast and cheap to calculate at scale,
        and precisely why it's such a blunt instrument for any one individual.
      </p>
      <p>
        At a population level, that bluntness washes out. Across thousands of people, BMI
        correlates reasonably well with body fat percentage and with the risk of conditions like
        type 2 diabetes and cardiovascular disease. That's the level at which BMI was designed to
        operate, and the level at which organizations like the World Health Organization still
        find it useful for comparing obesity trends between countries over time.
      </p>
      <p>
        The trouble starts when a population-level tool gets applied to make a judgment about one
        specific person — you. At the individual level, the same BMI number can describe
        genuinely different bodies and genuinely different health pictures.
      </p>

      <h2 className={h2}>Two people, same BMI, different stories</h2>
      <p>
        Picture two men, both 178cm tall and 85kg, both landing on a BMI of roughly 26.8 —
        technically "overweight" by WHO classification. The first trains five days a week, has
        visible muscle definition, and a waist circumference well under half his height. The
        second is sedentary, carries most of his weight around his midsection, and hasn't
        exercised in years.
      </p>
      <p>
        Their BMI is identical. Their actual cardiometabolic risk almost certainly isn't. This
        isn't a hypothetical edge case — it's the single most common criticism of BMI in the
        medical literature, and it's a fair one. A number that can't distinguish between these two
        men isn't telling you everything you need to know.
      </p>

      <h2 className={h2}>So what should you actually do with your number?</h2>
      <p>
        Treat your BMI as a prompt to look closer, not as a conclusion. If it falls outside the
        18.5–24.9 "normal" band, the next useful step isn't panic or dismissal — it's pulling in
        a second or third data point. A{" "}
        <Link href="/calculators/waist-to-height-ratio-calculator" className={linkClass}>
          waist-to-height ratio
        </Link>{" "}
        takes thirty seconds with a tape measure and tells you something BMI structurally can't:
        how your fat is distributed, which matters more for cardiovascular risk than total weight
        alone. A{" "}
        <Link href="/calculators/body-fat-calculator" className={linkClass}>
          body fat percentage estimate
        </Link>{" "}
        adds another layer, separating lean mass from fat mass.
      </p>
      <p>
        None of these tools, used alone, gives you the full picture. Used together, they triangulate
        toward something much more useful than any single number — including BMI — could provide
        on its own.
      </p>

      <h3 className={h3}>When BMI is least reliable</h3>
      <p>
        A few groups should weight their BMI result especially lightly: athletes and anyone with
        significant muscle mass (BMI will overstate risk), older adults who've lost muscle mass
        relative to fat (BMI can understate risk, since muscle loss can keep weight — and BMI —
        stable while fat percentage actually rises), and pregnant people, for whom standard adult
        BMI bands simply don't apply. Several population studies have also found that people of
        South and East Asian descent face elevated metabolic risk at BMI levels the standard WHO
        thresholds would still classify as normal, which has led some national health bodies to
        recommend lower regional cut-offs.
      </p>

      <h3 className={h3}>The trend matters more than the snapshot</h3>
      <p>
        Weight fluctuates day to day with water retention, food intake, and hormonal cycles — a
        single BMI reading taken on any one morning carries a fair amount of noise. A BMI tracked
        consistently over weeks or months, alongside how your clothes fit and how you feel, tells
        a far more reliable story than any single measurement ever could. If you're going to track
        BMI at all, track the trend line, not the daily number.
      </p>

      <h3 className={h3}>The bottom line</h3>
      <p>
        BMI isn't wrong, exactly — it's incomplete. It was built to flag, at a population scale,
        who might be worth a closer look. Used that way, paired with a couple of other simple
        measurements and read as a trend rather than a verdict, it remains a perfectly reasonable
        starting point. Used as the entire conversation, it asks a single ratio to do a job it was
        never built to handle alone.
      </p>
    </div>
  );
}

export function TdeeVsBmrArticle() {
  return (
    <div className={proseClass}>
      <p>
        Open any calorie-tracking app and within a few taps you'll run into both acronyms: BMR
        and TDEE. They sound similar, they're calculated from the same starting inputs, and it's
        genuinely easy to use them interchangeably without quite noticing. They are not
        interchangeable, and mixing them up is one of the more common — and consequential —
        mistakes people make when setting a calorie target.
      </p>

      <h2 className={h2}>BMR: the cost of simply existing</h2>
      <p>
        Basal Metabolic Rate is the energy your body burns to maintain its most basic functions —
        keeping your heart beating, your lungs breathing, your cells repairing themselves — while
        completely at rest, doing nothing else. No walking to the kitchen, no digesting a meal, no
        climbing a flight of stairs. Just existing.
      </p>
      <p>
        For most people, BMR makes up roughly 60-75% of total daily calorie burn, which is a
        sizeable chunk — but it's still only part of the picture, and that's exactly where the
        confusion tends to start.
      </p>

      <h2 className={h2}>TDEE: BMR plus everything else you actually do</h2>
      <p>
        Total Daily Energy Expenditure takes BMR and adds every other source of calorie burn in a
        day: digesting food (the thermic effect of food), deliberate exercise, and all the
        incidental movement of daily life — walking, standing, fidgeting, even shivering. TDEE is
        always a larger number than BMR, often substantially so, because it accounts for an entire
        day of activity that BMR by definition excludes.
      </p>
      <p>This is the relationship in formula form:</p>
      <p className={code}>TDEE = BMR × activity multiplier</p>
      <p>
        The multiplier ranges from around 1.2 for a sedentary lifestyle up to 1.9 for an
        extremely physically demanding one. The gap between the lowest and highest multiplier is
        enormous — for the same person, the difference between a sedentary and a highly active
        lifestyle can easily mean 700-900 additional calories burned per day, which is the
        difference between steady weight gain and steady weight loss at an identical food intake.
      </p>

      <h2 className={h2}>Why the mix-up actually matters</h2>
      <p>
        Here's where the distinction stops being academic. If you calculate your BMR — say,
        1,600 calories — and mistakenly treat that as your daily calorie target, you'll end up
        eating well below what your body actually needs once normal daily activity is factored
        in. That's not a moderate deficit; for most people with even light daily activity, it's a
        substantial one, often larger than intended and harder to sustain than a deliberately
        planned deficit would be.
      </p>
      <p>
        The reverse mistake — treating TDEE as something to eat <em>up to</em> regardless of goal
        — is more benign but still imprecise. TDEE is your maintenance number; eating at it keeps
        weight stable. To lose weight, you need to eat meaningfully below TDEE, not below BMR. To
        gain, above TDEE. BMR mostly exists as a stepping stone to calculate TDEE in the first
        place — it's rarely the number you should be eating to directly.
      </p>

      <h2 className={h2}>Which number should drive your plan?</h2>
      <p>
        For almost everyone, the answer is TDEE. It's the realistic, activity-adjusted number that
        reflects how much energy you actually use in a typical day, and it's the correct baseline
        to adjust up or down from depending on your goal. You can calculate both directly —{" "}
        <Link href="/calculators/bmr-calculator" className={linkClass}>
          BMR here
        </Link>{" "}
        and{" "}
        <Link href="/calculators/tdee-calculator" className={linkClass}>
          TDEE here
        </Link>{" "}
        — or skip straight to a calorie target with the activity level and goal already factored
        in using the{" "}
        <Link href="/calculators/calories-calculator" className={linkClass}>
          Calories Calculator
        </Link>
        .
      </p>

      <h3 className={h3}>A practical way to remember the difference</h3>
      <p>
        BMR is what you'd burn if you stayed in bed all day. TDEE is what you actually burn living
        your actual life. If you're setting a calorie target for weight loss, maintenance, or
        gain, TDEE — not BMR — is the number that answers the question.
      </p>
    </div>
  );
}

export function HeartRateZonesArticle() {
  return (
    <div className={proseClass}>
      <p>
        Walk into most gyms and you'll see the same pattern on the cardio machines: everyone
        settling into roughly the same moderate, slightly-out-of-breath-but-still-talkable pace,
        for roughly the same 30-45 minutes, regardless of what they're actually training for.
        It's not wrong, exactly — but it's also one intensity, used for every goal, which is a bit
        like using the same gear on a bike no matter the terrain.
      </p>
      <p>
        Heart rate zones exist to fix that. They split training intensity into distinct bands,
        each tied to a different physiological effect, and training deliberately across multiple
        zones — rather than living in one comfortable middle zone — tends to produce better
        results for almost every cardio-related goal, from general health to competitive
        endurance performance.
      </p>

      <h2 className={h2}>Where the zones come from</h2>
      <p>
        Every zone system starts from an estimate of your maximum heart rate. The old standby —
        220 minus your age — has been around for decades, but it was never based on a rigorous
        study; it originated as a rough observation, not a validated formula. More recent research,
        particularly a large 2001 meta-analysis by Tanaka and colleagues covering over 18,000
        people, produced a more accurate alternative: 208 minus 0.7 times your age. It's the
        formula used throughout this site's{" "}
        <Link href="/calculators/heart-rate-zone-calculator" className={linkClass}>
          Heart Rate Zone Calculator
        </Link>
        , and it tends to track real measured max heart rates more closely across a wider age
        range than the older rule of thumb.
      </p>
      <p>
        From there, zones are simply percentage bands of that maximum — typically five of them,
        moving from light recovery effort up to all-out maximal exertion.
      </p>

      <h2 className={h2}>What each zone is actually good for</h2>
      <p>
        <strong className="text-foreground">Zone 1 (50-60% of max)</strong> is barely-there
        effort — a relaxed walk, active recovery between hard sessions, or a genuine rest day that
        still involves moving. It's not meant to feel challenging.
      </p>
      <p>
        <strong className="text-foreground">Zone 2 (60-70%)</strong> is the zone most endurance
        coaches talk about constantly, and for good reason. It's sustainable for long durations,
        conversational in pace, and a major driver of aerobic base fitness — the kind of
        underlying engine that supports performance at every other intensity. It's also, somewhat
        counterintuitively, often under-trained by people who assume harder always means better.
      </p>
      <p>
        <strong className="text-foreground">Zone 3 (70-80%)</strong> is moderately hard — the
        classic "comfortably uncomfortable" pace most people gravitate toward by default. It
        improves cardiovascular efficiency but, trained exclusively, tends to deliver a smaller
        return relative to the fatigue it generates compared with a more deliberate mix of zone 2
        and zones 4-5.
      </p>
      <p>
        <strong className="text-foreground">Zone 4 (80-90%)</strong> is genuinely hard —
        threshold-style effort that builds the capacity to sustain high intensity for longer,
        and meaningfully improves lactate tolerance.
      </p>
      <p>
        <strong className="text-foreground">Zone 5 (90-100%)</strong> is maximal effort,
        sustainable only in short bursts — sprint work, high-intensity intervals, the kind of
        effort that's over almost as soon as it starts.
      </p>

      <h2 className={h2}>Why "polarized" training tends to outperform the middle ground</h2>
      <p>
        A recurring finding across endurance training research is that athletes who spend the
        large majority of their training time in zones 1-2, with a smaller deliberate dose of
        hard zone 4-5 work, and comparatively little time in zone 3, tend to see better
        improvements than those who spend most of their training time in that "moderate but
        not actually easy" zone 3 middle ground. This pattern is often called polarized training,
        and while the exact ideal split varies by sport and individual, the broad principle —
        easy should feel genuinely easy, and hard should feel genuinely hard — holds up well
        across a wide range of training contexts.
      </p>

      <h2 className={h2}>Getting started without overcomplicating it</h2>
      <p>
        You don't need a heart rate monitor strapped on for every single session to benefit from
        this framework. Even just knowing your rough zone boundaries and occasionally checking in
        — is this run actually easy, or have I drifted into zone 3 again? — is often enough to
        start correcting the most common pattern: doing everything at the same moderate effort and
        wondering why progress has stalled.
      </p>
    </div>
  );
}
