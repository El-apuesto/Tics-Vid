import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Arrow, Underline, TealRibbon } from '@/components/doodles';
import { ShoppingBag } from 'lucide-react';
import { products, accessoryProducts } from '@/data/siteData';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product }: { product: Product }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div className="product-card group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Variants */}
        <div className="flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant}
              onClick={() => setSelectedVariant(variant)}
              className={`px-3 py-1 text-xs font-semibold rounded-full border transition-all ${
                selectedVariant === variant
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent text-muted-foreground border-border hover:border-primary'
              }`}
            >
              {variant}
            </button>
          ))}
        </div>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-black text-xl text-primary">${product.price}</span>
          
          <a
            href={product.printfulUrl || 'https://www.printful.com/'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Buy on Printful
          </a>
        </div>
      </div>
    </div>
  );
}

export function ProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const apparelRef = useRef<HTMLDivElement>(null);
  const accessoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Apparel section animation
      const apparelCards = apparelRef.current?.querySelectorAll('.product-card');
      if (apparelCards && apparelCards.length > 0) {
        gsap.fromTo(
          apparelCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: apparelRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Accessories section animation
      const accessoryCards = accessoriesRef.current?.querySelectorAll('.product-card');
      if (accessoryCards && accessoryCards.length > 0) {
        gsap.fromTo(
          accessoryCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: accessoriesRef.current,
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
      id="shop"
      className="relative min-h-screen bg-background py-20 lg:py-32 z-40"
    >
      {/* Decorative elements */}
      <TealRibbon className="absolute w-20 h-32 left-[3%] top-[20%] opacity-30" enterFrom="left" />
      <Arrow className="absolute w-16 h-16 right-[5%] top-[15%] opacity-30" direction="left" />

      <div className="w-full px-6 lg:px-16 max-w-7xl mx-auto space-y-20 lg:space-y-32">
        {/* Wear the Message */}
        <div ref={apparelRef}>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display font-black text-4xl lg:text-6xl tracking-tight mb-4">
              WEAR THE <span className="text-primary">MESSAGE</span>
            </h2>
            <Underline className="mx-auto" width={250} color="#2EC3E5" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Bold tees and hoodies that speak up. Choose a statement piece built for comfort and impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Just Funny */}
        <div>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight mb-4">
              JUST <span className="text-primary">FUNNY</span>
            </h2>
            <Underline className="mx-auto" width={280} color="#2EC3E5" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Funny tees and hoodies with punchy designs for fans of comedy, awareness, and real talk.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(4, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Essentials Collection */}
        <div ref={accessoriesRef}>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-display font-black text-4xl lg:text-5xl tracking-tight mb-4">
              ESSENTIALS
            </h2>
            <Underline className="mx-auto" width={240} color="#2EC3E5" />
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              A beanie, sticker pack, and coffee mug — everyday pieces that support the show and the cause.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {accessoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
