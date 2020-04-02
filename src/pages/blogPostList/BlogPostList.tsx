import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import useFetchBlogPosts from "../../commonComponents/hooks/useFetchBlogPosts";
import BlogPost from "../../types/BlogPost";
import ReadStates, { ReadState } from "../../types/ReadStates";

import BlogPostListItem from "./components/BlogPostListItem";

import "./blogPostList.scss";
import {
  PAGE_SIZE,
  MARGIN_PAGES_DISPLAYED,
  PAGE_RANGE_DISPLAYED
} from "../../const/pagination";

const BlogPostList: React.FC<{}> = () => {
  const [offset, setOffset] = useState(0);
  const [readStates, setReadStates] = useState<ReadStates>({});
  const { blogPosts, isLoading, error } = useFetchBlogPosts();

  useEffect(() => {
    const newReadStates = blogPosts.reduce(
      (map, { slug }: BlogPost) =>
        slug
          ? {
              ...map,
              [slug]: (localStorage.getItem(slug)
                ? "read"
                : "unread") as ReadState
            }
          : map,
      {} as ReadStates
    );
    setReadStates(newReadStates);
  }, [blogPosts]);

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

  return (
    <div>
      {blogPosts.slice(offset, offset + PAGE_SIZE).map(blogPost => (
        <BlogPostListItem
          key={blogPost.title}
          blogPost={blogPost}
          readState={blogPost.slug ? readStates[blogPost.slug] : "unread"}
        />
      ))}
      <ReactPaginate
        previousLabel="prev"
        nextLabel="next"
        breakLabel="..."
        pageCount={Math.ceil(blogPosts.length / PAGE_SIZE)}
        marginPagesDisplayed={MARGIN_PAGES_DISPLAYED}
        pageRangeDisplayed={PAGE_RANGE_DISPLAYED}
        onPageChange={({ selected }: { selected: number }) =>
          setOffset(Math.ceil(selected * PAGE_SIZE))
        }
        containerClassName="blog-post-list__pagination"
        activeClassName="active"
        activeLinkClassName="active-link"
        disabledClassName="disabled"
      />
    </div>
  );
};

export default BlogPostList;
