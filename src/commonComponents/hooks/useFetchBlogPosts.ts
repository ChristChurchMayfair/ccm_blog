import { useState, useEffect } from "react";

import BlogPost from "../../types/BlogPost";
import client from "../../const/client";

interface BlogPostsFilters {
  slug?: string;
}

interface FetchBlogPostsResult {
  blogPosts: BlogPost[];
  isLoading: boolean;
  error: any;
}

const sanityBlogEntryToPost = (obj: any): BlogPost => ({
  title: obj.title,
  slug: obj.slug ? obj.slug.current : undefined,
  author: obj.author.name,
  text: obj.text,
  createdAt: new Date(obj._createdAt),
  updatedAt: new Date(obj._updatedAt)
});

const useFetchBlogPosts = (
  filters: BlogPostsFilters = {}
): FetchBlogPostsResult => {
  const { slug } = filters;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await client.fetch(
          `*[_type == "blog_entry"${
            slug ? "  && slug.current == $slug" : ""
          }] | order(_createdAt desc){ ..., author-> }`,
          {
            ...(slug && { slug })
          }
        );
        if (mounted) {
          setBlogPosts(response.map(sanityBlogEntryToPost));
          setIsLoading(false);
        }
      } catch (e) {
        if (mounted) {
          setError(e);
          setIsLoading(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  return {
    blogPosts,
    isLoading,
    error
  };
};

// TODO: write tests for this
export default useFetchBlogPosts;
