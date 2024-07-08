import db from "../../scripts/database"

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
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: 'https://playxdefiant.it/discord',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.5,
    }
  ];
  
  // GENERO LA SITEMAP PER I POSTS
  const products = await db.all("SELECT uri_article, created_at FROM article");
  for(const value of products) {
    siteMapResolve.push(
      {
        url: `https://playxdefiant.it/posts/${value.uri_article}`,
        lastModified: new Date(+value.created_at),
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    )
  }
  return siteMapResolve;
}