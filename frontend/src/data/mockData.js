export const MOCK_REVIEWS = [
  {
    id: 1,
    userName: 'Maria Santos',
    rating: 5,
    comment: 'My dog absolutely loves this! He used to be a picky eater but not anymore.',
    date: '2024-03-15'
  },
  {
    id: 2,
    userName: 'John Doe',
    rating: 4,
    comment: 'Great quality, but the packaging was a bit damaged upon arrival.',
    date: '2024-03-10'
  },
  {
    id: 3,
    userName: 'Elena Reyes',
    rating: 5,
    comment: 'Excellent service and the product is exactly as described. Highly recommended!',
    date: '2024-03-05'
  },
  {
    id: 4,
    userName: 'Miguel Cruz',
    rating: 3,
    comment: 'It is okay, but I expected it to be a bit bigger for the price.',
    date: '2024-02-28'
  }
];

export const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Adult Dog Food',
    category: 'Dog Food',
    price: 2500,
    image: '/images/mnvybq1v-v6t6rlx.png',
    rating: 4.8,
    reviewCount: 124,
    description: 'High-quality premium dog food for adult dogs with all essential nutrients. Formulated by veterinarians to provide optimal health and energy.',
    brand: 'PawPremium',
    reviews: MOCK_REVIEWS
  },
  {
    id: 2,
    name: 'Professional Grooming Kit',
    category: 'Grooming Kit',
    price: 1850,
    image: '/images/mnvybq1v-eugcbf9.png',
    rating: 4.2,
    reviewCount: 85,
    description: 'Complete professional grooming kit for all pet types. Includes stainless steel scissors, clippers, and various brushes.',
    brand: 'GroomPro',
    reviews: MOCK_REVIEWS.slice(0, 2)
  },
  {
    id: 3,
    name: 'Interactive Feather Cat Toy',
    category: 'Cat Toy',
    price: 800,
    image: '/images/mnvybq1v-mjzc7js.png',
    rating: 4.5,
    reviewCount: 210,
    description: 'Interactive feather toy for cats to keep them entertained and active. Stimulates natural hunting instincts.',
    brand: 'PlaySafe',
    reviews: MOCK_REVIEWS.slice(1, 4)
  },
  {
    id: 4,
    name: 'Organic Bird Seeds',
    category: 'Bird Food',
    price: 700,
    image: '/images/mnvybq1v-v6t6rlx.png',
    rating: 4.0,
    reviewCount: 45,
    description: 'Organic bird seeds for healthy and happy birds. 100% natural and free from pesticides.',
    brand: 'NatureFeed',
    reviews: MOCK_REVIEWS.slice(0, 1)
  },
  {
    id: 5,
    name: 'Orthopedic Fluffy Pet Bed',
    category: 'Pet Bed',
    price: 4800,
    image: '/images/mnvybq1v-dce60t4.png',
    rating: 4.9,
    reviewCount: 56,
    description: 'Orthopedic fluffy pet bed for maximum comfort. Perfect for older pets or those with joint issues.',
    brand: 'ComfortPaws',
    reviews: MOCK_REVIEWS
  },
  {
    id: 6,
    name: 'Heavy Duty Dog Leash',
    category: 'Accessories',
    price: 1300,
    image: '/images/mnvybq1w-a4pxonk.png',
    rating: 4.7,
    reviewCount: 92,
    description: 'Heavy duty dog leash for strong pullers. Made with mountain climbing rope for ultimate durability.',
    brand: 'ToughPaws',
    reviews: MOCK_REVIEWS.slice(2, 4)
  }
];

export const MOCK_TRANSFORMATIONS = [
  {
    id: 1,
    petName: 'Buster',
    breed: 'Golden Retriever',
    service: 'Full Grooming & Spa',
    beforeImage: '/images/golden1.png', // Placeholder, using existing images for logic
    afterImage: '/images/golden2.png'   // Placeholder
  },
  {
    id: 2,
    petName: 'Misty',
    breed: 'Persian Cat',
    service: 'Bath & De-shedding',
    beforeImage: '/images/persian1.png',
    afterImage: '/images/persian2.png'
  },
  {
    id: 3,
    petName: 'Charlie',
    breed: 'Poodle Mix',
    service: 'Hair Trim & Styling',
    beforeImage: '/images/poodle1.png',
    afterImage: '/images/poodle2.png'
  }
];

