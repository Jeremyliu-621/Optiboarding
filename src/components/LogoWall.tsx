export function LogoWall() {
  const logos = [
    "MongoDB", "HubSpot", "Mpulse", "Prado", "Blaze",
    "TaxGPT", "Nearfleet", "Artemis", "Sevenn", "Finetune", "Spark"
  ];

  return (
    <section className="py-14 px-6 overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        <p className="text-sm font-medium text-[var(--text-muted)] mb-10 tracking-wide uppercase">
          Trusted by engineering teams at
        </p>

        <div className="w-full flex flex-wrap justify-center gap-x-12 gap-y-8 px-4 opacity-40 grayscale">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex items-center justify-center transition-all hover:grayscale-0 hover:opacity-100"
            >
              <span className="font-semibold text-lg md:text-xl tracking-tighter text-[var(--text-primary)]">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
