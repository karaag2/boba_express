import { MetadataRoute } from 'next';
import { products } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bobaexpress-niamey.vercel.app';
  
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/menu/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productEntries,
  ];
}
