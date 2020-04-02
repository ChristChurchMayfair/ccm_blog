import classnames from "classnames";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";

import BlogPost from "../../../types/BlogPost";
import { ReadState } from "../../../types/ReadStates";

import "./blogPostListItem.scss";

interface BlogPostListItemProps {
  blogPost: BlogPost;
  readState: ReadState;
}

const BlogPostListItem: React.FC<BlogPostListItemProps> = ({
  blogPost: { title, slug, createdAt },
  readState
}) => (
  <div className={classnames("blog-post-list-item", readState)}>
    <Link to={"/posts/" + slug} className="blog-post-list-item__title-link">
      {title}
    </Link>
    <div className="blog-post-list-item__date">
      {moment(createdAt).format("LL")}
    </div>
  </div>
);

export default BlogPostListItem;
