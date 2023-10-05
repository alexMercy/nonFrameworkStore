export type Pizza = {
  id: string;
  title: string;
  description: string;
  priceUSD: number;
  image: string;
  thumb: string;
};

export const pizzas: Pizza[] = [
  {
    id: '1',
    title: 'Pepperoni',
    description: 'description of Pepperoni',
    priceUSD: 13.99,
    image: 'https://cdn.papajohns.ru//images/catalog/thumbs/cart/Pepperoni-Traditional.webp',
    thumb: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/Pepperoni-traditional.webp',
  },
  {
    id: '2',
    title: 'Bavarian',
    priceUSD: 11.99,
    description: 'description of Bavarian',
    image: 'https://cdn.papajohns.ru//images/catalog/thumbs/cart/5e89c23fd801dbae3b3a2148293a9042.webp',
    thumb: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/92bc6bca0b58b92c4bad051716d7af4d.webp',
  },
  {
    id: '3',
    title: "Papa's favourite",
    priceUSD: 15.99,
    description: 'description of Papa’s favourite',
    image: 'https://cdn.papajohns.ru//images/catalog/thumbs/cart/Johns-Favorite-Traditional.webp',
    thumb: 'https://cdn.papajohns.ru//images/catalog/thumbs/full/Johns-favorite-traditional.webp',
  },
];
