export function FeatureGrid() {
  return (
    <section className="bg-white px-6 pt-4 pb-16">
      <div className="max-w-[1300px] mx-auto">

        {/* Featured: Large stat + testimonial */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 mb-16">
          {/* Left: Big stat */}
          <div className="md:w-[50%]">
            <h2 className="text-[16px] sm:text-[20px] md:text-[26px] lg:text-[32px] leading-[1.15] tracking-[-0.02em] font-normal text-black">
              40 hrs/week
            </h2>
            <p className="text-[17px] text-[#878787] mt-3">
              saved in code review for a team of 4 developers
            </p>
          </div>

          {/* Right: Quote */}
          <div className="md:w-[50%] flex flex-col justify-center">
            <blockquote className="text-[20px] md:text-[22px] leading-[1.5] text-black font-medium">
              &ldquo;Optibot is like having a Senior AI Engineer on my team.&rdquo;
            </blockquote>
            <div className="mt-4 text-[14px] text-[#878787]">
              Simon B, Nearfleet
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
