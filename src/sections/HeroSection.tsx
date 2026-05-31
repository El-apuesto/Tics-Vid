import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starburst, TealRibbon, ComedyFace } from '@/components/doodles';
import { ExternalLink, ChevronDown, Play, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const heroVideo = {
  id: 'NYb64OG_ksg',
  title: 'Tourette\'s Stand-Up Highlight',
  thumbnail: 'https://img.youtube.com/vi/NYb64OG_ksg/maxresdefault.jpg',
  embedUrl:
    'https://www.youtube.com/embed/NYb64OG_ksg?autoplay=1&mute=1&loop=1&playlist=NYb64OG_ksg&controls=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&showinfo=0',
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const blurbRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const loadTl = gsap.timeline({ delay: 0.2 });

      loadTl.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );

      loadTl.fromTo(
        blurbRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      scrollTl.fromTo(
        heroRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        blurbRef.current,
        { y: 0, opacity: 1 },
        { y: '5vh', opacity: 0.3, ease: 'power2.in' },
        0.72
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-background flex flex-col z-10"
    >
      {/* Teal ribbons entering from edges */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <TealRibbon 
          className="absolute w-24 h-40 left-[5%] top-[15%] opacity-60" 
          enterFrom="left" 
        />
        <TealRibbon 
          className="absolute w-20 h-32 right-[8%] top-[50%] opacity-50" 
          enterFrom="right" 
        />
      </div>

      {/* Doodles */}
      <Starburst className="absolute w-20 h-20 left-[8%] top-[20%] opacity-70" />
      <ComedyFace className="absolute w-16 h-16 right-[10%] top-[25%] opacity-60" />

      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 lg:px-8 py-16 lg:py-20">
        <div ref={heroRef} className="w-full max-w-6xl">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-black">
            <iframe
              src={heroVideo.embedUrl}
              title={heroVideo.title}
              className="absolute inset-0 w-full h-full"
              style={{ transform: 'scale(1.3)', marginTop: '-60px' }}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white max-w-3xl">
              <p className="text-xl lg:text-3xl font-black leading-snug">
                Zachariah Tippett — Tourette's comedian bringing truth, laughter, and awareness to every stage.
              </p>
              <p className="mt-4 text-sm lg:text-base text-white/75 max-w-2xl">
                Real stories. Real tics. Real laughter. Watch the set, then scroll down for shows, merch, and ways to support.
              </p>
            </div>
          </div>

          <div ref={blurbRef} className="mt-8 flex flex-col items-center gap-4 text-center">
            <p className="max-w-3xl text-lg lg:text-xl text-foreground font-medium leading-relaxed">
              Tourette’s Syndrome meets stand-up in a bold, honest set that makes people laugh and learn.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.google.com/search?q=Zachariah+Tippett"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                Google Me
              </a>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={scrollToAbout}
                className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
              >
                See Upcoming Shows
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
