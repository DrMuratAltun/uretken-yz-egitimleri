import { weeks } from '../data/curriculum';

const siteUrl = 'https://drmurataltun.github.io/uretken-yz-egitimleri';

export async function GET() {
  const pages = [
    { url: `${siteUrl}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${siteUrl}/egitmen/`, priority: '0.7', changefreq: 'monthly' },
    ...weeks.map(w => ({
      url: `${siteUrl}/hafta/${w.slug}/`,
      priority: '0.8',
      changefreq: 'monthly',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
