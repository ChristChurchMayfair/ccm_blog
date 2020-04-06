import React, { useLayoutEffect, ReactElement } from "react";
import { Link, useParams } from "react-router-dom";

import useFetchBlogPosts from "../../commonComponents/hooks/useFetchBlogPosts";
import Loading from "../../commonComponents/loading/Loading";

import "./blogPost.scss";
import moment from "moment";

/* Sadly the sanity block content to react has no types avaiable */
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

  if (isLoading) {
    return <Loading />;
  }

  if (blogPosts.length === 0) {
    return (
      <div className="blog-post">
        Sorry! Something went wrong and we weren't able to load this blog post!
        <div className="blog-post__back-to-posts">
          <Link to={"/"}>&larr; Back to all posts</Link>
        </div>
      </div>
    );
  }

  if (blogPosts.length > 1) {
    console.warn(
      `More than one blog post was returned using the slug, ${slug}:`,
      blogPosts
    );
  }

  /* Sadly the sanity block content to react has no types avaiable */
  type serializerFunction = (mark:any, children: any) => ReactElement;

  const serializeLink:serializerFunction = ({mark, children}) => {
    return <a href={mark.href} target="_blank" rel="noopener noreferrer">{children}</a>
  }

  const serialisers = { 
    hardBreak: false,
    marks: {
      link: serializeLink
    }
  }

  return (
    <>
      {blogPosts.map(({ title, author, text, createdAt }) => (
        <div key={title} className="blog-post">
          <div className="blog-post__date">
            {moment(createdAt).format("dddd D MMMM YYYY")}
          </div>
          <h2 className="blog-post__title">{title}</h2>
          <div className="blog-post__author">Posted by {author}</div>
          <div className="blog-post__text">
            <BlockContent blocks={text} serializers={serialisers} />
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
