import { Metadata } from "next";
import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetailOrder from "@/components/ProductDetailOrder";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) return {};

  return {
    title: `${product.name} | Boba Express Niamey`,
    description: product.description,
    openGraph: {
      title: `${product.name} - Boba Express`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-[#F5F5F0]">
      <Navbar />
      <div className="max-w-7xl mx-auto py-32 px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`aspect-square relative border-4 border-foreground brutalist-shadow ${product.color}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-secondary font-black uppercase tracking-widest">{product.category}</span>
              <h1 className="text-6xl md:text-8xl font-black font-display uppercase italic leading-none">
                {product.name}
              </h1>
            </div>
            <p className="text-2xl font-medium text-foreground/80 leading-relaxed max-w-xl">
              {product.description}
            </p>
            <ProductDetailOrder product={product} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
