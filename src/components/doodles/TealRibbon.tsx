import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TealRibbonProps {
  className?: string;
  enterFrom?: 'left' | 'right' | 'top' | 'bottom';
}

export function TealRibbon({ className = '', enterFrom = 'left' }: TealRibbonProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const path = pathRef.current!;
      const length = path.getTotalLength();
      
      // Initial state - hidden
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        opacity: 0
      });

      // Set initial position based on enter direction
      const initialPos = { x: 0, y: 0 };
      switch (enterFrom) {
        case 'left':
          initialPos.x = -100;
          break;
        case 'right':
          initialPos.x = 100;
          break;
        case 'top':
          initialPos.y = -100;
          break;
        case 'bottom':
          initialPos.y = 100;
          break;
      }

      gsap.set(svgRef.current, {
        x: `${initialPos.x}%`,
        y: `${initialPos.y}%`
      });

      // Animate in on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 90%',
          end: 'center center',
          scrub: 0.5,
        }
      });

      tl.to(svgRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      })
      .to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, 0);

      // Fade out as it moves to center
      gsap.to(path, {
        opacity: 0.2,
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'center center',
          end: 'bottom top',
          scrub: true
        }
      });

    }, svgRef);

    return () => ctx.revert();
  }, [enterFrom]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 120 200"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Teal ribbon for Tourette's awareness - continuous line style */}
      <path
        ref={pathRef}
        d="M 60 10 
           C 60 10, 30 30, 30 60 
           C 30 90, 50 100, 60 110 
           C 70 100, 90 90, 90 60 
           C 90 30, 60 10, 60 10
           M 60 110 
           L 60 190
           M 60 130 
           C 45 140, 35 160, 35 180
           M 60 130 
           C 75 140, 85 160, 85 180
           M 40 50 
           C 50 45, 70 45, 80 50
           M 35 70 
           C 50 65, 70 65, 85 70"
        stroke="#2EC3E5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
