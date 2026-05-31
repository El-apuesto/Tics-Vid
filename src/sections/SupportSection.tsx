import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starburst, Swirl, ComedyFace } from '@/components/doodles';
import { Button } from '@/components/ui/button';
import { Heart, Coffee, ExternalLink, Facebook, Instagram, Youtube } from 'lucide-react';
import { cashAppTag } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M15.5 4.5v3.5c0 1.7-1.4 3.1-3.1 3.1-.7 0-1.3-.2-1.8-.5v4.3c.5.3 1.1.5 1.8.5 2.4 0 4.3-1.9 4.3-4.3V4.5h-1.2z" />
      <path d="M9.2 16.2c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1h.2v1.2h-.2c-1 0-1.9.8-1.9 1.9s.8 1.9 1.9 1.9 1.9-.8 1.9-1.9V7h1.2v5.2c0 1.7-1.4 3.1-3.1 3.1z" />
    </svg>
  );
}

interface SupportSectionProps {
  onDonateClick?: () => void;
}

export function SupportSection({ onDonateClick: _onDonateClick }: SupportSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="support"
      className="relative min-h-screen bg-secondary py-20 lg:py-32 z-50"
    >
      {/* Decorative elements */}
      <Starburst className="absolute w-24 h-24 left-[5%] top-[10%] opacity-30" />
      <ComedyFace className="absolute w-20 h-20 right-[8%] top-[20%] opacity-25" />
      <Swirl className="absolute w-28 h-28 left-[10%] bottom-[15%] opacity-25" />

      <div className="w-full px-6 lg:px-16 max-w-4xl mx-auto">
        <div ref={contentRef} className="text-center space-y-8">
          {/* Header */}
          <div className="animate-item">
            <h2 className="font-display font-black text-4xl lg:text-6xl tracking-tight mb-4">
              KEEP THE <span className="text-primary">SHOW</span> GOING
            </h2>
          </div>

          {/* Description */}
          <div className="animate-item">
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your support funds content, tours, and free resources for the Tourette&apos;s community.
              Every donation helps spread awareness one laugh at a time.
            </p>
          </div>

          {/* Donation Options */}
          <div className="animate-item grid sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-8">
            {/* Cash App Donation */}
            <div className="bg-card border border-border rounded-xl p-6 text-left hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">One-Time Donation</h3>
                  <p className="text-sm text-muted-foreground">Cash App</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Quick and easy. Every dollar makes a difference.
              </p>
              <a
                href={`https://cash.app/${cashAppTag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full inline-flex justify-center"
              >
                <Heart className="w-5 h-5 mr-2" />
                Donate {cashAppTag}
              </a>
            </div>

            {/* Patreon */}
            <div className="bg-card border border-border rounded-xl p-6 text-left hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Coffee className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Monthly Support</h3>
                  <p className="text-sm text-muted-foreground">Patreon</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Become a patron for exclusive content and behind-the-scenes access.
              </p>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
                onClick={() => window.open('https://patreon.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Become a Patron
              </Button>
            </div>
          </div>

          {/* Social Links */}
          <div className="animate-item mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-all"
            >
              <TikTokIcon className="w-5 h-5" />
              TikTok
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-all"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-all"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary transition-all"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
          </div>

          {/* Impact Statement */}
          <div className="animate-item pt-8">
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-foreground font-medium">
                &quot;Your support helps me reach more venues, create more content, 
                and continue spreading awareness about Tourette&apos;s Syndrome 
                through comedy.&quot;
              </p>
              <p className="text-primary font-bold mt-3">— Zach &quot;Tourette&apos;s&quot; Tippett</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
