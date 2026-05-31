import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Starburst, Swirl } from '@/components/doodles';
import { Button } from '@/components/ui/button';
import { Play, Youtube, Gauge } from 'lucide-react';
import { videos } from '@/data/siteData';

gsap.registerPlugin(ScrollTrigger);

export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        videoContainerRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );

      const contentItems = contentRef.current?.querySelectorAll('.animate-item');
      if (contentItems && contentItems.length > 0) {
        scrollTl.fromTo(
          contentItems,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
          0.1
        );
      }

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        videoContainerRef.current,
        { scale: 1, opacity: 1 },
        { scale: 0.9, opacity: 0.3, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        { y: '-5vh', opacity: 0.3, ease: 'power2.in' },
        0.72
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredVideo = videos[0];

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.contentWindow?.postMessage(
        { event: 'command', func: 'setPlaybackRate', args: [speed] },
        '*'
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      id="video"
      className="section-pinned bg-background flex items-center justify-center z-30"
    >
      {/* Decorative elements */}
      <Starburst className="absolute w-20 h-20 left-[5%] top-[15%] opacity-40" />
      <Swirl className="absolute w-24 h-24 right-[8%] bottom-[15%] opacity-35" />

      <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-16 py-20">
        {/* Content */}
        <div ref={contentRef} className="text-center mb-8 lg:mb-12">
          <h2 className="animate-item font-display font-black text-4xl lg:text-6xl tracking-tight mb-4">
            WATCH THE <span className="text-primary">SET</span>
          </h2>
          <p className="animate-item text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            A tight 10 about tics, timing, and taking back the narrative.
          </p>
        </div>

        {/* Video Container */}
        <div
          ref={videoContainerRef}
          className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white/10"
        >
          {!isPlaying ? (
            <>
              {/* Thumbnail */}
              <img
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="group relative"
                >
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-primary">
                    <Play className="w-8 h-8 lg:w-10 lg:h-10 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                </button>
              </div>
            </>
          ) : (
            <div className="relative w-full h-full">
              <iframe
                ref={iframeRef}
                src={`${featuredVideo.embedUrl}?enablejsapi=1&modestbranding=1&rel=0&showinfo=0&controls=1&iv_load_policy=3`}
                title={featuredVideo.title}
                className="w-full h-full"
                style={{ transform: 'scale(1.3)', marginTop: '-60px' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 flex gap-2 bg-black/70 rounded-lg p-2">
                <Gauge className="w-4 h-4 text-white" />
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleSpeedChange(speed)}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      playbackSpeed === speed
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-8 lg:mt-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
            onClick={() => window.open('https://youtube.com', '_blank')}
          >
            <Youtube className="w-5 h-5 mr-2" />
            Subscribe on YouTube
          </Button>
        </div>
      </div>
    </section>
  );
}
