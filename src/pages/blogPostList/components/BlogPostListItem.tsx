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
  blogPost: { title, slug, createdAt, author },
  readState,
}) => (
  <Link to={"/posts/" + slug} className="blog-post-list-item">
    <div className="blog-post-list-item__container">
      <div className="blog-post-list-item__date">
        <div className="blog-post-list-item__date__container">
          <span className="blog-post-list-item__date__weekday">
            {moment(createdAt).format("dddd")}
          </span>
          <br />
          <span className="blog-post-list-item__date__calendar-date">
            {moment(createdAt).format("D MMM")}
          </span>
        </div>
      </div>
      <div className={classnames("blog-post-list-item__content", readState)}>
        <span className="blog-post-list-item__content__title">{title}</span>
        <br />
        <span className="blog-post-list-item__content__mobile-date">
          {moment(createdAt).format("D MMMM")} &middot;{" "}
        </span>
        <span className="blog-post-list-item__content__author">{author}</span>
        {createdAt.toDateString() === new Date().toDateString() && (
          <div className="blog-post-list-item__content__new-today-badge">
            <span>New today!</span>
          </div>
        )}
      </div>
    </div>
  </Link>
);

export default BlogPostListItem;
