const stats = [
  { value: "2.4M+", label: "Calculations performed" },
  { value: "150+", label: "Calculators live" },
  { value: "9", label: "Health categories" },
  { value: "3", label: "Languages" },
];

export function StatsBanner() {
  return (
    <section className="relative overflow-hidden bg-emerald-deep py-16 text-sand">
      <div className="vital-tape opacity-25" />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-mono text-3xl font-medium text-mint sm:text-4xl">{s.value}</p>
            <p className="mt-1.5 text-sm text-sand/65">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="vital-tape opacity-25" />
    </section>
  );
}
