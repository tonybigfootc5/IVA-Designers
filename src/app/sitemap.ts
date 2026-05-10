import type { MetadataRoute } from "next";
import { blogPosts, featuredCourses } from "@/lib/data/mock-platform";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/courses", "/pricing", "/blog", "/login"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));

  const courseRoutes = featuredCourses.map((course) => ({
    url: `${siteConfig.url}/learn/${course.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog#${post.slug}`,
    lastModified: new Date(post.publishedAt),
  }));

  return [...routes, ...courseRoutes, ...blogRoutes];
}
