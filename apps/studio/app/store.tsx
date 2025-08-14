import { z } from 'zod';
import Link from 'next/link';
import { useState } from 'react';

// Zod type for a product/component
const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  isPremium: z.boolean(),
  version: z.string(),
  tags: z.array(z.string()),
  price: z.number().optional(),
  changelog: z.string().optional(),
  compatibility: z.string().optional(),
});
type Product = z.infer<typeof ProductSchema>;

// Mock data (replace with CMS or Supabase fetch)
const products: Product[] = [
  {
    id: '1',
    slug: 'free-starter-kit',
    title: 'Free Starter Kit',
    summary: 'A free, production-ready starter template.',
    isPremium: false,
    version: '1.0.0',
    tags: ['starter', 'free'],
    changelog: 'Initial release.',
    compatibility: 'Next.js 14, Node 18+',
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
    changelog: 'Added analytics, improved performance.',
    compatibility: 'Next.js 14, Node 18+',
  },
];

function TemplateCard({ product }: { product: Product }) {
  const [loading, setLoading] = useState(false);
  const handleBuy = () => {
    setLoading(true);
    // Placeholder: Stripe checkout logic
    setTimeout(() => {
      setLoading(false);
      alert('Stripe checkout (placeholder)');
    }, 1200);
  };
  const handleAddToProject = () => {
    setLoading(true);
    // Placeholder: Add to project logic
    setTimeout(() => {
      setLoading(false);
      alert('Added to project (placeholder)');
    }, 1000);
  };
  const handleDownload = () => {
    setLoading(true);
    // Placeholder: Download logic
    setTimeout(() => {
      setLoading(false);
      alert('Download started (placeholder)');
    }, 800);
  };
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
      <div className="flex flex-col gap-1 mt-2 text-xs text-cyan-300">
        <span>Version: <span className="text-cyan-100">{product.version}</span></span>
        {product.changelog && <span>Changelog: <span className="text-cyan-100">{product.changelog}</span></span>}
        {product.compatibility && <span>Compatibility: <span className="text-cyan-100">{product.compatibility}</span></span>}
      </div>
      <div className="flex items-center gap-4 mt-4">
        {product.isPremium ? (
          <button
            className="halo-btn px-4 py-2 rounded-lg text-white bg-cyan-700 hover:bg-cyan-500 transition border border-cyan-400 shadow-neon disabled:opacity-60"
            onClick={handleBuy}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Buy $${product.price}`}
          </button>
        ) : (
          <>
            <button
              className="halo-btn px-4 py-2 rounded-lg text-white bg-cyan-700 hover:bg-cyan-500 transition border border-cyan-400 shadow-neon disabled:opacity-60"
              onClick={handleAddToProject}
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add to Project'}
            </button>
            <button
              className="halo-btn px-4 py-2 rounded-lg text-white bg-cyan-800 hover:bg-cyan-600 transition border border-cyan-400 shadow-neon disabled:opacity-60"
              onClick={handleDownload}
              disabled={loading}
            >
              {loading ? 'Downloading...' : 'Download'}
            </button>
          </>
        )}
        <Link href={`/studio/store/${product.slug}`}>
          <button className="halo-btn px-3 py-2 rounded-lg text-cyan-400 border border-cyan-400 bg-transparent hover:bg-cyan-900/40 shadow-neon text-xs">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function StorePage() {
  // Validate data
  products.forEach(p => ProductSchema.parse(p));
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black p-8">
      <h1 className="text-cyan-400 font-bold text-3xl mb-6 drop-shadow-neon">Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map(product => (
          <TemplateCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
