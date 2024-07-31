import db from "../../scripts/database"

export const revalidate = 40;

export default function sitemap() {
  return generateDynamicSitemap();
}

async function generateDynamicSitemap() {
  let siteMapResolve = [
    {
      url: 'https://playxdefiant.it',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://playxdefiant.it/news',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: 'https://playxdefiant.it/discord',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://playxdefiant.it/stats',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://playxdefiant.it/privacy',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    },
    {
      url: 'https://playxdefiant.it/terms',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    }
  ];
  
  // GENERO LA SITEMAP PER I POSTS
  const products = await db.all("SELECT uri_article, created_at FROM article WHERE isApproved = 1");
  for(const value of products) {
    siteMapResolve.push(
      {
        url: `https://playxdefiant.it/posts/${value.uri_article}`,
        lastModified: new Date(+value.created_at),
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    )
  }
  return siteMapResolve;
}