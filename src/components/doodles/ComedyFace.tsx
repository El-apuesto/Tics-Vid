import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ComedyFaceProps {
  className?: string;
  color?: string;
}

export function ComedyFace({ className = '', color = '#F4F6F8' }: ComedyFaceProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      pathRefs.current.forEach((path, i) => {
        if (!path) return;
        const length = path.getTotalLength();
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          opacity: 0
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: SVGPathElement | null, index: number) => {
    if (el) pathRefs.current[index] = el;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 100"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Face outline */}
      <path
        ref={(el) => addToRefs(el, 0)}
        d="M 20 35 
           C 20 20, 35 10, 50 10 
           C 65 10, 80 20, 80 35 
           C 80 55, 70 75, 50 90 
           C 30 75, 20 55, 20 35"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Left eye - winking */}
      <path
        ref={(el) => addToRefs(el, 1)}
        d="M 32 38 L 42 38"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      
      {/* Right eye - open */}
      <path
        ref={(el) => addToRefs(el, 2)}
        d="M 65 33 A 5 5 0 1 1 65 43 A 5 5 0 1 1 65 33"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Eyebrows */}
      <path
        ref={(el) => addToRefs(el, 3)}
        d="M 30 30 Q 37 25, 44 30"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        ref={(el) => addToRefs(el, 4)}
        d="M 56 28 Q 65 22, 72 28"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Big smile */}
      <path
        ref={(el) => addToRefs(el, 5)}
        d="M 30 55 
           Q 50 80, 70 55 
           Q 50 65, 30 55"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Laugh lines */}
      <path
        ref={(el) => addToRefs(el, 6)}
        d="M 18 45 Q 15 50, 18 55"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        ref={(el) => addToRefs(el, 7)}
        d="M 82 45 Q 85 50, 82 55"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
