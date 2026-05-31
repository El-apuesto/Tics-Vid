import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, Underline, ComedyFace } from '@/components/doodles';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { shows, aboutMeShort } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const showsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems && contentItems.length > 0) {
        gsap.fromTo(
          contentItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Shows animation
      const showItems = showsRef.current?.querySelectorAll('.show-item');
      if (showItems && showItems.length > 0) {
        gsap.fromTo(
          showItems,
          { x: 30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: showsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen bg-background py-20 lg:py-32 z-20"
    >
      {/* Decorative doodles */}
      <ComedyFace className="absolute w-24 h-24 right-[5%] top-[10%] opacity-40" />
      <Arrow className="absolute w-16 h-16 left-[8%] bottom-[20%] opacity-30" direction="down" />

      <div className="w-full px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 lg:mb-16">
          <h2 className="animate-item font-display font-black text-4xl lg:text-5xl tracking-tight mb-4">
            MEET <span className="text-primary">ZACH</span>
          </h2>
          <Underline className="animate-item" width={200} color="#2EC3E5" />
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - About Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="animate-item">
              <p className="text-xl lg:text-2xl font-bold leading-relaxed text-foreground">
                {aboutMeShort}
              </p>
            </div>

            <div className="animate-item">
              <a
                href="https://www.google.com/search?q=Zachariah+Tippett"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Google Me
              </a>
            </div>

            <div className="animate-item space-y-4 text-muted-foreground">
              <p>
                Short, honest, and direct — this is the voice behind the show.
              </p>
              <p>
                Scroll right to see the next dates and book a show near you.
              </p>
            </div>
          </div>

          {/* Right Column - Shows List */}
          <div ref={showsRef} id="shows" className="space-y-6">
            <div className="show-item">
              <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight mb-6">
                UPCOMING <span className="text-primary">SHOWS</span>
              </h3>
            </div>

            {/* Shows List - Only Next 3 Shows */}
            <div className="space-y-4">
              {shows.slice(0, 3).map((show) => (
                <div
                  key={show.id}
                  className="show-item group bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Calendar className="w-4 h-4" />
                        <span>{show.date}</span>
                      </div>
                      <h4 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {show.venue}
                      </h4>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{show.location}</span>
                      </div>
                    </div>
                    <a
                      href={show.link}
                      className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* See All Link */}
            <div className="show-item pt-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                See all dates
                <Arrow direction="right" className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
