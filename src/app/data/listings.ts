// ─── Shared Listing Data ──────────────────────────────────────────────────────

export interface Listing {
  id: number;
  title: string;
  type: 'Office Space' | 'Convention Hall';
  city: string;
  country: string;
  area: string;
  price: string;
  capacity: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];          // full gallery
  amenities: string[];
  description: string;
  featured?: boolean;
  verified: boolean;
  tag?: string;
}

// ── Shared gallery pools ──────────────────────────────────────────────────────
const OFFICE_EXTRAS = [
  'https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // boardroom
  'https://images.unsplash.com/photo-1761818645915-260598d569a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // coworking desks
  'https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // lobby reception
  'https://images.unsplash.com/photo-1580480119402-67a7bb0a3b72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // breakout lounge
  'https://images.unsplash.com/photo-1683403600126-a3d8a90fbb88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // glass building exterior
];

const HALL_EXTRAS = [
  'https://images.unsplash.com/photo-1761499101631-92cde2434bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // chandeliers
  'https://images.unsplash.com/photo-1761618291331-535983ae4296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // stage lighting
  'https://images.unsplash.com/photo-1776039325240-02916820bfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // conference audience
  'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', // ballroom
];

export const LISTINGS: Listing[] = [
  {
    id: 1,
    title: 'The Summit Office Tower',
    type: 'Office Space',
    city: 'Dhaka', country: 'BD',
    area: 'Gulshan, Dhaka',
    price: '৳8,000 / day',
    capacity: 50,
    rating: 4.9, reviews: 38,
    image: 'https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      ...OFFICE_EXTRAS.slice(0, 4),
    ],
    amenities: ['WiFi', 'AC', 'Parking'],
    description: 'Fully furnished tower office with panoramic views. Ideal for corporate teams and long-term rentals. The space features floor-to-ceiling windows, ergonomic workstations, private meeting pods, and a dedicated reception area. Fibre-optic internet, 24/7 building access, and on-site security are all included.',
    featured: true, verified: true, tag: 'Most Popular',
  },
  {
    id: 2,
    title: 'Grand Convention Palace',
    type: 'Convention Hall',
    city: 'Chittagong', country: 'BD',
    area: 'Agrabad, Chittagong',
    price: '৳25,000 / day',
    capacity: 500,
    rating: 4.8, reviews: 62,
    image: 'https://images.unsplash.com/photo-1736963808405-f60d284c4277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1736963808405-f60d284c4277?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      ...HALL_EXTRAS,
    ],
    amenities: ['Stage', 'Catering', 'Parking', 'AC'],
    description: 'Grand multi-hall convention space with professional AV setup. Perfect for large corporate events and conferences. Includes a main auditorium, three breakout rooms, a VIP lounge, and full banqueting service. State-of-the-art LED walls and simultaneous translation booths are available.',
    featured: true, verified: true, tag: 'Premium',
  },
  {
    id: 3,
    title: 'Skyline Coworking Hub',
    type: 'Office Space',
    city: 'Dhaka', country: 'BD',
    area: 'Banani, Dhaka',
    price: '৳4,500 / day',
    capacity: 30,
    rating: 4.7, reviews: 24,
    image: 'https://images.unsplash.com/photo-1748050869375-a38a7bd50735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1748050869375-a38a7bd50735?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      OFFICE_EXTRAS[1],
      OFFICE_EXTRAS[0],
      OFFICE_EXTRAS[3],
      OFFICE_EXTRAS[4],
    ],
    amenities: ['WiFi', 'AC', 'Projector'],
    description: 'Modern open-plan coworking space with high-speed internet and dedicated meeting rooms. Features hot desks, private phone booths, a chill lounge, and unlimited barista-style coffee. Ideal for startups, remote teams, and freelancers seeking a premium daily workspace.',
    verified: true,
  },
  {
    id: 4,
    title: 'Royal Banquet & Events',
    type: 'Convention Hall',
    city: 'Sylhet', country: 'BD',
    area: 'Zindabazar, Sylhet',
    price: '৳35,000 / day',
    capacity: 800,
    rating: 4.9, reviews: 91,
    image: 'https://images.unsplash.com/photo-1746739802412-d33c159958d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1746739802412-d33c159958d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      HALL_EXTRAS[0],
      HALL_EXTRAS[2],
      HALL_EXTRAS[1],
      HALL_EXTRAS[3],
    ],
    amenities: ['Stage', 'Catering', 'AC', 'Projector'],
    description: 'Prestigious banquet hall with elegant décor. Hosts large weddings, galas, and government events. The venue boasts crystal chandeliers, a grand stage with professional lighting rig, full in-house catering for up to 800 guests, and dedicated event coordinators.',
    featured: true, verified: true, tag: 'Exclusive',
  },
  {
    id: 5,
    title: 'The Nexus Boardroom',
    type: 'Office Space',
    city: 'Dhaka', country: 'BD',
    area: 'Motijheel, Dhaka',
    price: '৳3,000 / day',
    capacity: 20,
    rating: 4.6, reviews: 17,
    image: 'https://images.unsplash.com/photo-1771147372634-976f022c0033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1771147372634-976f022c0033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      OFFICE_EXTRAS[0],
      OFFICE_EXTRAS[2],
      OFFICE_EXTRAS[3],
      OFFICE_EXTRAS[4],
    ],
    amenities: ['WiFi', 'Projector', 'AC'],
    description: "Compact executive boardroom in Dhaka's financial district. Ideal for investor meetings and strategy sessions. Equipped with a 4K conference display, video-calling suite, whiteboard walls, and secured NDA-ready WiFi for sensitive negotiations.",
    verified: true,
  },
  {
    id: 6,
    title: 'Crystal Event Center',
    type: 'Convention Hall',
    city: 'Dubai', country: 'UAE',
    area: 'Business Bay, Dubai',
    price: 'AED 15,000 / day',
    capacity: 300,
    rating: 5.0, reviews: 44,
    image: 'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1759519238029-689e99c6d19e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      HALL_EXTRAS[0],
      HALL_EXTRAS[1],
      HALL_EXTRAS[3],
      HALL_EXTRAS[2],
    ],
    amenities: ['Stage', 'AC', 'Parking', 'Catering'],
    description: 'World-class event venue in the heart of Dubai. Crystal chandeliers, full catering, and concierge service. The center includes a rooftop terrace, private VIP entrance, branded step-and-repeat backdrop, and a dedicated events management team on call 24/7.',
    featured: true, verified: true, tag: 'Top Rated',
  },
  {
    id: 7,
    title: 'Rooftop Executive Suite',
    type: 'Office Space',
    city: 'Dhaka', country: 'BD',
    area: 'Dhanmondi, Dhaka',
    price: '৳5,000 / day',
    capacity: 15,
    rating: 4.8, reviews: 29,
    image: 'https://images.unsplash.com/photo-1761815937101-f32643eaa17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1761815937101-f32643eaa17e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      'https://images.unsplash.com/photo-1774280898104-d329acaae7b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      OFFICE_EXTRAS[0],
      OFFICE_EXTRAS[3],
      OFFICE_EXTRAS[4],
    ],
    amenities: ['WiFi', 'AC', 'Parking'],
    description: 'Unique rooftop office with open-air terrace and city skyline views. Great for creative teams. The suite includes a glass-partitioned indoor workspace, a furnished terrace for breakout sessions, a kitchenette, and covered parking in the building basement.',
    verified: true,
  },
  {
    id: 8,
    title: 'Metro Conference Hall',
    type: 'Convention Hall',
    city: 'Khulna', country: 'BD',
    area: 'KDA Avenue, Khulna',
    price: '৳12,000 / day',
    capacity: 200,
    rating: 4.5, reviews: 19,
    image: 'https://images.unsplash.com/photo-1505845753232-f74a87b62db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1505845753232-f74a87b62db6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      HALL_EXTRAS[2],
      HALL_EXTRAS[1],
      HALL_EXTRAS[0],
    ],
    amenities: ['Stage', 'Projector', 'AC'],
    description: 'Central Khulna conference facility with theater-style seating and full AV support. Hosts seminars, product launches, and training events. The hall is equipped with a tiered seating plan, dual projection screens, and a green room for speakers.',
    verified: true,
  },
  {
    id: 9,
    title: 'Innovation Loft',
    type: 'Office Space',
    city: 'Chittagong', country: 'BD',
    area: 'Halishahar, Chittagong',
    price: '৳6,000 / day',
    capacity: 40,
    rating: 4.7, reviews: 33,
    image: 'https://images.unsplash.com/photo-1761818645928-47e5dad8ec76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1761818645928-47e5dad8ec76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      OFFICE_EXTRAS[1],
      OFFICE_EXTRAS[3],
      OFFICE_EXTRAS[2],
      OFFICE_EXTRAS[4],
    ],
    amenities: ['WiFi', 'AC', 'Parking'],
    description: "Industrial-chic loft space in Chittagong's emerging innovation district. Flexible desk arrangements. The loft features exposed-brick walls, movable pod desks, a maker-space corner with 3D printer access, and a soundproofed podcast studio.",
    verified: true,
  },
  {
    id: 10,
    title: 'Prestige Convention Arena',
    type: 'Convention Hall',
    city: 'Dhaka', country: 'BD',
    area: 'Bashundhara, Dhaka',
    price: '৳60,000 / day',
    capacity: 1000,
    rating: 4.9, reviews: 78,
    image: 'https://images.unsplash.com/photo-1776590759233-7d4765a7d5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1776590759233-7d4765a7d5d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      HALL_EXTRAS[1],
      HALL_EXTRAS[2],
      HALL_EXTRAS[0],
      HALL_EXTRAS[3],
    ],
    amenities: ['Stage', 'Catering', 'Parking', 'Projector', 'AC'],
    description: "Dhaka's largest private convention arena. Hosts national summits, trade expos, and award ceremonies. The arena spans 3 floors with a 1,000-seat main hall, 6 breakout conference rooms, a media centre, a full-service restaurant, and an underground car park for 300 vehicles.",
    featured: true, verified: true, tag: 'Landmark',
  },
  {
    id: 11,
    title: 'The Glass Office',
    type: 'Office Space',
    city: 'London', country: 'UK',
    area: 'Canary Wharf, London',
    price: '£800 / day',
    capacity: 25,
    rating: 4.8, reviews: 41,
    image: 'https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      OFFICE_EXTRAS[4],
      OFFICE_EXTRAS[0],
      OFFICE_EXTRAS[2],
      OFFICE_EXTRAS[3],
    ],
    amenities: ['WiFi', 'AC', 'Projector'],
    description: 'Sleek glass-walled office in Canary Wharf with Thames views. Serviced and fully connected. Includes a dedicated receptionist, post & courier handling, use of shared premium lounges, and proximity to Elizabeth line stations for effortless commuting.',
    verified: true,
  },
  {
    id: 12,
    title: 'Harbour View Events',
    type: 'Convention Hall',
    city: 'Chittagong', country: 'BD',
    area: 'Port Area, Chittagong',
    price: '৳20,000 / day',
    capacity: 400,
    rating: 4.6, reviews: 52,
    image: 'https://images.unsplash.com/photo-1746739802412-d33c159958d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1746739802412-d33c159958d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200',
      HALL_EXTRAS[3],
      HALL_EXTRAS[0],
      HALL_EXTRAS[2],
    ],
    amenities: ['Stage', 'Catering', 'Parking'],
    description: 'Scenic event hall overlooking Chittagong harbour. Popular for product launches and corporate dinners. Floor-to-ceiling harbour-facing windows, a floating stage, in-house sommelier service, and an outdoor terrace with panoramic sea views.',
    verified: true,
  },
];
