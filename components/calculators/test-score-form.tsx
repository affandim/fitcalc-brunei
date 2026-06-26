"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { calculateTestScore } from "@/lib/life-formulas";
import { formatResult } from "@/lib/utils";
import { NumberField } from "@/components/calculators/form-fields";
import { ResultBigNumber } from "@/components/calculators/result-primitives";
import { Card } from "@/components/ui/card";

const schema = z.object({
  correctAnswers: z.number({ message: "Enter correct answers" }).min(0, "Too low").max(1000, "Too high"),
  totalQuestions: z.number({ message: "Enter total questions" }).min(1, "Too low").max(1000, "Too high"),
});

type FormValues = z.infer<typeof schema>;

export function TestScoreForm() {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { correctAnswers: 42, totalQuestions: 50 },
    mode: "onChange",
  });

  const values = watch();
  const valid = schema.safeParse(values).success;
  const result = valid ? calculateTestScore(values.correctAnswers, values.totalQuestions) : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="p-6">
        <form className="space-y-4">
          <NumberField label="Correct answers" register={register} name="correctAnswers" error={errors.correctAnswers?.message} />
          <NumberField label="Total questions" register={register} name="totalQuestions" error={errors.totalQuestions?.message} />
        </form>
      </Card>

      <Card className="flex flex-col items-center justify-center p-6">
        {result ? (
          <ResultBigNumber value={`${formatResult(result.percentage, 1)}%`} label={`Letter grade: ${result.letterGrade}`} />
        ) : (
          <p className="text-sm text-foreground/50">Enter your score to see the percentage and grade.</p>
        )}
      </Card>
    </div>
  );
}
