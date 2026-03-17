export function LogoWall() {
  const logos = [
    "Stripe", "Midjourney", "Perplexity", "Shopify",
    "OpenAI", "Samsung", "Linear", "Instacart"
  ];

  return (
    <section className="py-14 px-6 bg-white overflow-hidden">
      <div className="max-w-[1300px] mx-auto flex flex-col items-center">
        <p className="text-sm font-medium text-[#878787] mb-10 tracking-wide uppercase">
          Trusted by the world's most innovative engineering teams
        </p>
        
        <div className="w-full flex flex-wrap justify-center gap-x-12 gap-y-8 px-4 opacity-50 grayscale">
          {logos.map((logo) => (
            <div 
              key={logo} 
              className="flex items-center justify-center transition-all hover:grayscale-0 hover:opacity-100"
            >
              <span className="font-semibold text-lg md:text-xl tracking-tighter text-black flex items-center gap-1">
                {logo === 'OpenAI' && <div className="w-5 h-5 rounded bg-black mr-1"/>}
                {logo === 'Linear' && <div className="w-5 h-5 rounded-full border-2 border-black mr-1"/>}
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
