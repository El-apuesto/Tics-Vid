import type { Product, Show, Video } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Tourettes Inc. Logo Tee',
    description: 'Classic logo tee. Bold design, premium comfort. Wear the message.',
    price: 28,
    image: '/product_tshirt_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Hoodie'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '2',
    name: 'Tic & Talk Hoodie',
    description: 'Start conversations. Spread awareness. Stay comfortable.',
    price: 45,
    image: '/product_sweater_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '3',
    name: 'Laugh. Learn. Support. Tee',
    description: 'Our mantra on a tee. Premium quality, meaningful message.',
    price: 28,
    image: '/product_tshirt_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '4',
    name: 'Tourette\'s Warrior Sweatshirt',
    description: 'For the fighters. For the advocates. For everyone.',
    price: 48,
    image: '/product_sweater_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '5',
    name: 'Comedy & Causes Tee',
    description: 'Where laughter meets purpose. Quality you can feel.',
    price: 28,
    image: '/product_tshirt_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '6',
    name: 'Awareness Ambassador Hoodie',
    description: 'Be an ambassador for understanding. Wear it proudly.',
    price: 45,
    image: '/product_sweater_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '7',
    name: 'One Laugh at a Time Tee',
    description: 'Changing perceptions through comedy. One shirt at a time.',
    price: 28,
    image: '/product_tshirt_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: '8',
    name: 'Tourettes Inc. Original',
    description: 'The original. The classic. The statement.',
    price: 30,
    image: '/product_tshirt_1.jpg',
    category: 'apparel',
    variants: ['Men\'s T-Shirt', 'Women\'s T-Shirt', 'Unisex Sweater'],
    printfulUrl: 'https://www.printful.com/'
  }
];

export const accessoryProducts: Product[] = [
  {
    id: 'a1',
    name: 'Message Beanie',
    description: 'A cozy beanie with the Tourettes Inc. logo — stay warm and keep the message visible.',
    price: 22,
    image: '/shop_hoodie.jpg',
    category: 'accessories',
    variants: ['One Size'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: 'a2',
    name: 'Sticker Pack',
    description: 'Spread awareness everywhere you go with premium vinyl stickers.',
    price: 8,
    image: '/product_sticker_1.jpg',
    category: 'accessories',
    variants: ['Standard Pack'],
    printfulUrl: 'https://www.printful.com/'
  },
  {
    id: 'a3',
    name: 'Morning Mug',
    description: 'Start your day with a laugh and a cause — ceramic coffee mug.',
    price: 16,
    image: '/shop_mug.jpg',
    category: 'accessories',
    variants: ['11oz Mug'],
    printfulUrl: 'https://www.printful.com/'
  }
];

export const slideshowImages = [
  {
    id: 's1',
    label: 'Signature Hoodie Shot',
    description: 'Preview one of the bold hoodie designs, ready for print-on-demand fulfillment.',
    image: '/shop_hoodie.jpg',
  },
  {
    id: 's2',
    label: 'Limited Edition Tee',
    description: 'Classic shirt styling that supports the cause and sparks conversation.',
    image: '/product_tshirt_1.jpg',
  },
  {
    id: 's3',
    label: 'Statement Sweater',
    description: 'A cozy crewneck with a message for the road.',
    image: '/product_sweater_1.jpg',
  },
  {
    id: 's4',
    label: 'Everyday Carry',
    description: 'A tote bag or accessory shot shows the small items that make an impact.',
    image: '/product_tote_1.jpg',
  }
];

export const shows: Show[] = [
  {
    id: '1',
    date: 'Mar 15, 2026',
    venue: 'The Laugh Lounge',
    location: 'Austin, TX',
    link: '#'
  },
  {
    id: '2',
    date: 'Mar 28, 2026',
    venue: 'Comedy Cellar',
    location: 'San Antonio, TX',
    link: '#'
  },
  {
    id: '3',
    date: 'Apr 05, 2026',
    venue: 'Virtual Livestream',
    location: 'Twitch',
    link: '#'
  },
  {
    id: '4',
    date: 'Apr 12, 2026',
    venue: 'The Improv',
    location: 'Dallas, TX',
    link: '#'
  }
];

export const videos: Video[] = [
  {
    id: '1',
    title: 'My Tourette\'s Story - Stand Up Set',
    thumbnail: '/video_reel.jpg',
    url: 'https://www.youtube.com/watch?v=NYb64OG_ksg',
    embedUrl: 'https://www.youtube.com/embed/NYb64OG_ksg'
  }
];

export const aboutMeShort = `Hello Humans! my name is Zachariah Tippett — Tourette's stand-up comedian bringing awareness through laughter.`;

export const aboutMeText = `Hello Humans! my name is Zachariah Tippett but, you can call me Tourette's and I have Tourette's Syndrome

Ever since I was a kid, I always wanted to make people laugh! At 15 I started writing jokes, stories, etc. Now I'm 26 and am a full-time stand-up comedian! My dreams are coming true with a big twist! I've been able to come up with a way to make people laugh as well as spread awareness and education to everyone about Tourette's syndrome!

Let's be honest TS is a subject not talked about enough! especially with these fun facts. Did you know 1 in 100 school-aged children have TS! Also, not everyone with TS swears, only 10% of people with TS do! I've been performing at Clubs, events, colleges just anywhere I can go so I can spread the word about Tourette's Syndrome one laugh at a time.`;

export const cashAppTag = '$TourettesInc';
export const emailAddress = 'tourettesinc@gmail.com';
export const location = 'San Antonio, Texas';
