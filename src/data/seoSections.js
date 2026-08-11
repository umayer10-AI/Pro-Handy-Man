export const ALL_TESTIMONIALS = [
  { name: 'Rachel Tan', area: 'Tampines HDB', rating: 5, service: 'Plumbing', text: 'Booked a plumber for a leaking tap in the morning and he was at my flat by afternoon. Very professional, no mess, and the price was exactly what they quoted.' },
  { name: 'David Lim', area: 'Bishan Condo', rating: 5, service: 'Electrical', text: 'Got my new ceiling fan installed and two power points added in one visit. Quick, safe work and they cleaned up after. Will definitely use Pro Handyman SG again.' },
  { name: 'Priya S.', area: 'Jurong West HDB', rating: 5, service: 'Painting', text: 'They repainted our whole living room and kitchen in two days. No drips, clean edges, and the colour looks amazing. Highly recommended for any painting job in Singapore.' },
  { name: 'Marcus Wong', area: 'Sengkang Condo', rating: 5, service: 'Carpentry', text: 'Assembled three IKEA wardrobes for my new home. The handyman was efficient and everything is perfectly level. Great value for the quality of work.' },
  { name: 'Sarah Goh', area: 'Woodlands HDB', rating: 5, service: 'Aircon Servicing', text: 'My aircon was not cooling properly. The technician serviced and topped up the gas in under an hour. Fair pricing and very thorough.' },
  { name: 'James Lee', area: 'Novena Condo', rating: 5, service: 'Flooring', text: 'Had vinyl flooring installed in two bedrooms. Very neat job with clean cuts at every edge. Would definitely recommend for any flooring project in Singapore.' },
  { name: 'Michelle Ong', area: 'Punggol HDB', rating: 5, service: 'Handyman', text: 'Hired them for a bunch of small jobs — door hinge replacement, curtain rod mounting, and a loose towel bar. All sorted in one visit for a very reasonable price.' },
  { name: 'Kevin Yap', area: 'Serangoon HDB', rating: 5, service: 'TV Mounting', text: 'Had my 75-inch TV mounted on the living room wall. Very careful work, hidden cabling, and perfectly level. Looks fantastic. Highly recommend.' },
];

export const AWARDS = [
  { year: '2024', title: 'Best Handyman Service Singapore', body: 'Singapore Business Review', desc: 'Recognised for outstanding service quality, customer satisfaction, and professional standards across residential handyman services in Singapore.' },
  { year: '2023', title: 'Top Rated Home Services Provider', body: 'HDB Homeowners Association', desc: 'Awarded for consistently excellent reviews and responsive service to HDB flat owners across all 26 planning areas of Singapore.' },
  { year: '2023', title: 'Excellence in Customer Service', body: 'Singapore SME Awards', desc: 'Honoured for our transparent pricing, punctuality, and commitment to customer satisfaction in the home services sector.' },
  { year: '2022', title: 'Trusted Trades Professional', body: 'BuildSmart Singapore', desc: 'Certified as a trusted trades professional for consistently upholding safety standards and quality workmanship in Singapore homes.' },
];

export const PORTFOLIO = [
  { title: 'Full HDB Renovation — Tampines 5-room Flat', category: 'Renovation', desc: 'Complete interior renovation covering vinyl flooring, repainting, carpentry built-ins, new lighting, and bathroom retiling for a 5-room HDB flat in Tampines.', img: 'https://images.hostinger.com/082d729a-3acf-4444-b37a-215867459446.png' },
  { title: 'Electrical Rewiring — Bishan Condo', category: 'Electrical', desc: 'Full apartment electrical upgrade including additional power points, LED downlight installation, new distribution board, and safety compliance checks.', img: 'https://images.hostinger.com/5d6917ee-7d9a-4458-9735-8ea768053235.png' },
  { title: 'Bathroom Plumbing Overhaul — Jurong HDB', category: 'Plumbing', desc: 'Complete bathroom plumbing overhaul with new toilet bowl installation, shower mixer replacement, water heater upgrade, and leak-proof pipe resealing.', img: 'https://images.hostinger.com/89d3e65f-cf6e-4c4e-99ad-29131605d4e0.png' },
  { title: 'Living Room & Bedroom Repainting — Sengkang', category: 'Painting', desc: 'Interior painting for a 4-room HDB flat covering living room, master bedroom, and two common rooms. Feature wall accent and clean cut-in edges throughout.', img: 'https://images.hostinger.com/188eb455-10e4-4dd0-8bb7-884c05661cf6.png' },
  { title: 'Custom Built-in Wardrobe — Punggol Condo', category: 'Carpentry', desc: 'Floor-to-ceiling built-in wardrobe in master bedroom with sliding mirror doors, internal organisers, and laminate finish matching existing furniture.', img: 'https://images.hostinger.com/bcfdc562-6b12-443b-904a-9447dd6bbc43.png' },
  { title: 'Multi-unit Aircon Servicing — Woodlands HDB', category: 'Aircon', desc: 'Full aircon service package for a 5-room flat covering 4 indoor units and 2 compressors. Chemical wash, gas top-up, and filter replacement completed in one visit.', img: 'https://images.hostinger.com/37482182-ea88-4d35-a18f-c87b3fef3559.png' },
];

export const LOCATION_DETAILS = [
  { area: 'Tampines', desc: 'Serving all Tampines HDB blocks — Tampines North, Central, East, and West. Fast response for plumbing, electrical, and painting jobs.' },
  { area: 'Woodlands', desc: 'Covering Woodlands Ave, Marsiling, Admiralty, and Sembawang. Same-day handyman slots for urgent repairs in the north.' },
  { area: 'Jurong East & West', desc: 'Full coverage across both Jurong zones — Boon Lay, Lakeside, Tuas. Specialists for HDB and industrial estate home repairs.' },
  { area: 'Sengkang & Punggol', desc: 'New town specialists for Sengkang and Punggol condos and HDB units — furniture assembly, renovation, and general maintenance.' },
  { area: 'Ang Mo Kio', desc: 'Reliable handyman services for AMK Hub area, Bishan, and Toa Payoh corridor. Competitive pricing for all home repairs.' },
  { area: 'Bedok & East Coast', desc: 'Serving Bedok, Pasir Ris, Marine Parade, and Changi. Specialist knowledge of east Singapore HDB and private condo estate types.' },
];

export function reviewsSchema(reviews) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pro Handyman SG.Com',
    url: 'https://prohandymansg.com',
    telephone: '+6585979456',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: reviews.length.toString(),
      bestRating: '5',
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.name },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating.toString() },
      reviewBody: r.text,
    })),
  };
}
