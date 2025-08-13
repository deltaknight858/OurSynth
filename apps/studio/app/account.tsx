import { z } from 'zod';

// Zod type for a product/component (should match Store page)
const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  isPremium: z.boolean(),
  version: z.string(),
  tags: z.array(z.string()),
  price: z.number().optional(),
});
type Product = z.infer<typeof ProductSchema>;

// Mock user library (replace with Supabase fetch)
const userProducts: Product[] = [
  {
    id: '1',
    slug: 'free-starter-kit',
    title: 'Free Starter Kit',
    summary: 'A free, production-ready starter template.',
    isPremium: false,
    version: '1.0.0',
    tags: ['starter', 'free'],
  },
  {
    id: '2',
    slug: 'pro-dashboard',
    title: 'Pro Dashboard',
    summary: 'Premium dashboard template with analytics.',
    isPremium: true,
    version: '2.1.0',
    tags: ['dashboard', 'premium'],
    price: 49,
  },
];

function LibraryCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border border-cyan-700 bg-black/60 p-6 shadow-lg flex flex-col gap-2 hover:scale-[1.02] transition">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 font-bold text-xl">{product.title}</span>
        {product.isPremium ? (
          <span className="ml-2 px-2 py-1 rounded bg-gradient-to-r from-pink-500 to-cyan-400 text-xs font-semibold text-white shadow">Premium</span>
        ) : (
          <span className="ml-2 px-2 py-1 rounded bg-cyan-800 text-xs font-semibold text-cyan-200">Free</span>
        )}
      </div>
      <div className="text-white/90 text-sm">{product.summary}</div>
      <div className="flex gap-2 mt-2">
        {product.tags.map(tag => (
          <span key={tag} className="bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded text-xs">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-4">
        <a href={`#download-${product.slug}`} className="halo-btn px-4 py-2 rounded-lg text-white bg-cyan-700 hover:bg-cyan-500 transition border border-cyan-400 shadow-neon">
          {product.isPremium ? 'Download' : 'Add to Project'}
        </a>
        <span className="text-xs text-cyan-400">v{product.version}</span>
      </div>
    </div>
  );
}

export default function AccountPage() {
  // Validate data
  userProducts.forEach(p => ProductSchema.parse(p));
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8">
      <h1 className="text-cyan-400 font-bold text-3xl mb-6 drop-shadow-neon">Account / Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {userProducts.map(product => (
          <LibraryCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
