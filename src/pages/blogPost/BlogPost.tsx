import React, { useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";

import useFetchBlogPosts from "../../commonComponents/hooks/useFetchBlogPosts";

import "./blogPost.scss";

const BlockContent = require("@sanity/block-content-to-react");

const BlogPost: React.FC<{}> = () => {
  const { slug } = useParams();
  const { blogPosts, isLoading, error } = useFetchBlogPosts({ slug });

  useLayoutEffect(() => {
    if (!isLoading && !error && blogPosts.length === 1 && blogPosts[0].slug) {
      localStorage.setItem(blogPosts[0].slug, "read");
    }
  }, [blogPosts, isLoading, error]);

  // TODO: create error component
  if (error) {
    console.error("Error fetching blog posts", error);
    return (
      <>
        Sorry! There's been a problem - please refresh this page or try again
        later if you keep seeing this!
      </>
    );
  }

  // TODO: create loading component
  if (isLoading) {
    return <>Loading...</>;
  }

  if (blogPosts.length === 0) {
    return <div>No blog post!</div>;
  }

  if (blogPosts.length > 1) {
    console.warn(
      `More than one blog post was returned using the slug, ${slug}:`,
      blogPosts
    );
  }

  return (
    <>
      {blogPosts.map(({ title, author, text }) => (
        <div key={title} className="blog-post">
          <h2 className="blog-post__title">{title}</h2>
          <div>Posted by: {author}</div>
          <div className="blog-post__text">
            <BlockContent blocks={text} serializers={{ hardBreak: false }} />
          </div>
          <div className="blog-post__back-to-posts">
            <Link to={"/"}>&larr; Back to all posts</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogPost;
