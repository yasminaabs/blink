// Données produits partagées (mock) utilisées par les pages qui n'ont pas
// encore été branchées à l'API (ProductDetail, CategoryPage). BestSelling et
// ProductCard récupèrent déjà les vrais articles via l'API (voir axios.get
// ".../api/v1/articles/getall").
const products = [
  {
    id: 1,
    image: "/img/cover.svg",
    name: "Classic Monochrome Tees",
    price: 35.0,
    category: "Tops",
    size: "M",
    color: "Blue",
    inStock: true,
    description:
      "Crafted for everyday style, this Classic Tee is the perfect staple for neutral lovers.",
  },
  {
    id: 2,
    image: "/img/cover.svg",
    name: "Monochromatic Wardrobe",
    price: 27.0,
    category: "Tops",
    size: "M",
    color: "Yellow",
    inStock: true,
    description:
      "An essential piece for a minimalist closet. Soft, breathable, and versatile.",
  },
  {
    id: 3,
    image: "/img/cover.svg",
    name: "Essential Neutrals",
    price: 22.0,
    category: "Tops",
    size: "S",
    color: "Green",
    inStock: true,
    description:
      "Your go-to neutral tee that pairs well with any outfit, season after season.",
  },
  {
    id: 4,
    image: "/img/cover.svg",
    name: "ULTRANET Black",
    price: 43.0,
    category: "Tops",
    size: "XL",
    color: "Purple",
    inStock: true,
    description:
      "A bold statement piece in deep black — timeless, durable, and ultra-soft.",
  },
  {
    id: 5,
    image: "/img/cover.svg",
    name: "Elegant Ebony Sweatshirts",
    price: 55.0,
    category: "Tops",
    size: "M",
    color: "Blue",
    inStock: true,
    description: "A cozy sweatshirt with an elegant, minimalist finish.",
  },
  {
    id: 6,
    image: "/img/cover.svg",
    name: "Sleek and Cozy Black",
    price: 57.0,
    category: "Tops",
    size: "M",
    color: "Yellow",
    inStock: true,
    description: "Sleek design meets everyday comfort in this cozy black piece.",
  },
];

export default products;
