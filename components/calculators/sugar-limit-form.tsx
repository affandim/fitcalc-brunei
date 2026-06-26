"use client";

import * as React from "react";
import { calculateSugarLimit } from "@/lib/more-formulas";
import type { Gender } from "@/lib/formulas";
import { formatResult } from "@/lib/utils";
import { SegmentedControl } from "@/components/calculators/form-fields";
import { ResultBigNumber, StatRow } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

export function SugarLimitForm() {
  const [gender, setGender] = React.useState<Gender>("male");
  const result = calculateSugarLimit(gender);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <SegmentedControl
          label="Gender"
          value={gender}
          onChange={setGender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <p className="mt-4 text-xs text-foreground/45">
          This is the American Heart Association's recommended limit for <strong>added</strong>{" "}
          sugar — sugar from naturally sweet whole foods like fruit isn't counted the same way.
        </p>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        <ResultBigNumber value={formatResult(result.gramsPerDay, 0)} unit="g/day" label="Recommended added-sugar limit" />
        <div className="mt-6 w-full">
          <StatRow label="In teaspoons" value={`~${formatResult(result.teaspoonsPerDay, 1)} tsp/day`} />
        </div>
      </Card>
    </div>
  );
}
