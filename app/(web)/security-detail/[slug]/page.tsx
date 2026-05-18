"use client";
import SecurityImportance from "@/app/components/detailpages/Security";
import SecurityWhy from "@/app/components/detailpages/WhySecurity";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { listBlogSectionApi } from "@/app/api/web/HomeBlog";

interface BlogDetailPage {
  heroSection: {
    heading: string;
    headingHighlight: string;
    description: string;
    image: string;
    buttonText: string;
    buttonLink: string;
  };
  importanceSection: {
    heading: string;
    headingHighlight: string;
    description: string;
    leftFeatures: { text: string }[];
    rightFeatures: { text: string }[];
  };
}

interface Blog {
  title: string;
  shortDescription: string;
  content: string;
  image: string;
  buttonText: string;
  slug: string;
  isActive: boolean;
  publishedAt: string;
  detailPage?: BlogDetailPage;
}

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await listBlogSectionApi({});
        const allBlogs = data?.[0]?.blogs || [];
        const foundBlog = allBlogs.find((b: Blog) => b.slug === slug);
        setBlog(foundBlog || null);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F26A21]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Blog not found</h1>
        <p className="text-gray-500">
          The requested blog post could not be found.
        </p>
      </div>
    );
  }

  if (!blog.detailPage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Detail page not available</h1>
      </div>
    );
  }

  const { heroSection, importanceSection } = blog.detailPage;

  return (
    <div>
      <SecurityImportance
        title={heroSection?.heading}
        highlight={heroSection?.headingHighlight}
        description={heroSection?.description}
        image={heroSection?.image}
      />
      <SecurityWhy
        title={importanceSection?.heading}
        highlight={importanceSection?.headingHighlight}
        description={importanceSection?.description}
        pointsLeft={importanceSection?.leftFeatures?.map((f) => f.text) || []}
        pointsRight={importanceSection?.rightFeatures?.map((f) => f.text) || []}
      />
    </div>
  );
};

export default BlogDetailPage;
