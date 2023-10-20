import { client } from "../../../lib/client";

const baseUrl = 'https://victoria-next.vercel.app/'; // Your Domain name with protocol
const staticPages = [
    '',
    'about',
    'blog',
    'terms-and-conditions',
    'privacy-policy',
  ];

  async function fetchDynamicRoutes() {
    try {
      const servicesQuery = '*[_type == "service"]{slug}';
      const blogPostsQuery = '*[_type == "post"]{slug}';
      const services = await client.fetch(servicesQuery);
      const blogPosts = await client.fetch(blogPostsQuery);
  
      console.log('Services:', services);
      console.log('Blog Posts:', blogPosts);
  
      const servicesRoutes = services.map(service => `/services/${encodeURIComponent(service.slug?.current || "")}`);
      const blogRoutes = blogPosts.map(post => `blog/${encodeURIComponent(post.slug?.current || "")}`);
  
      console.log('Project Routes:', servicesRoutes);
      console.log('Blog Routes:', blogRoutes);
  
      return [...servicesRoutes, ...blogRoutes];
    } catch (error) {
      console.error('Error fetching dynamic routes:', error);
    }
  }
  const sitemapHandler = async (req, res) => {
    const dynamicRoutes = await fetchDynamicRoutes();
    const allRoutes = [...staticPages, ...dynamicRoutes];
  
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes.map(route => `
        <url>
          <loc>${baseUrl}/${route}</loc>
          <changefreq>daily</changefreq>
          <priority>0.7</priority>
        </url>
      `).join('')}
    </urlset>
  `;
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  };

  export default sitemapHandler;