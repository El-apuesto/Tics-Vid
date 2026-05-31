import { useEffect, useState } from 'react';
import { Starburst, Swirl } from '@/components/doodles';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { slideshowImages } from '@/data/siteData';

export function SlideshowSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slideshowImages.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="slideshow" className="relative min-h-[70vh] bg-background py-20 lg:py-28 overflow-hidden">
      <Starburst className="absolute w-20 h-20 left-[5%] top-[10%] opacity-20" />
      <Swirl className="absolute w-24 h-24 right-[8%] top-[10%] opacity-15" />

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight">
            SLIDE THROUGH THE SHOP
          </h2>
          <p className="mt-4 text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Featured designs and product shots you can swap out later with real image links.
          </p>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[auto_200px] items-center">
          <div className="overflow-hidden rounded-3xl border border-border shadow-2xl bg-card">
            <img
              src={slideshowImages[activeSlide].image}
              alt={slideshowImages[activeSlide].label}
              className="w-full h-[420px] lg:h-[520px] object-cover"
            />
            <div className="p-6 bg-background/80 border-t border-border">
              <p className="font-semibold text-lg text-foreground">
                {slideshowImages[activeSlide].label}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {slideshowImages[activeSlide].description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {slideshowImages.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`border rounded-3xl overflow-hidden transition-all duration-300 ${
                  index === activeSlide ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setActiveSlide((prev) => (prev - 1 + slideshowImages.length) % slideshowImages.length)}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-foreground hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveSlide((prev) => (prev + 1) % slideshowImages.length)}
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-3 text-foreground hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
