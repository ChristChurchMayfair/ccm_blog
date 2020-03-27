import React, { useState, useEffect } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import './PostList.css';
//import BlockContent from '@sanity/block-content-to-react';
const BlockContent = require('@sanity/block-content-to-react')


export type Post = {
    title: string,
    slug: string | undefined,
    author: string,
    text: string,
    createdAt: Date,
    updatedAt: Date,
}


var PostList = (props: { blogs: Post[], postsPerPage: number }) => {
    const [offset, setOffset] = useState(0);
    const [readStates, setReadStates] = useState<{ [slug: string]: string }>({});

    let pageCount = props.blogs.length / props.postsPerPage;

    let handlePageClick = (data: any) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * props.postsPerPage);
        setOffset(offset)
    };

    useEffect(() => {
        let readStates = props.blogs.reduce(function (map: { [slug: string]: string }, blog: Post) {
            if (blog.slug && blog.slug != null) {
                let readState = localStorage.getItem(blog.slug)
                if (readState) {
                    map[blog.slug] = readState
                } else {
                    map[blog.slug] = "unread";
                }
            }
            return map
        }, {})
        console.log(readStates)
        setReadStates(readStates)
    }, [props.blogs])

    return (
        <div className="posts">
            {props.blogs.slice(offset, offset + props.postsPerPage).map((item) => {
                var classNames = "blogEntry"
                if (item.slug) {
                    classNames = classNames + " " + readStates[item.slug]
                }
                return (<div key={item.title} className={classNames}>
                    <Link to={"/posts/" + item.slug}>{item.title}</Link>
                    <div className="date">{moment(item.createdAt).format('LL')}</div>
                    {/* <div><BlockContent blocks={item.text} /></div> */}
                </div>)
            })}
            <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                //   subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                activeLinkClassName={'activelink'}
                disabledClassName={"disabled"}
            />
        </div>
    );
}

export default PostList;

let serializers = {
    hardBreak: false
}

export var PostView = (props: { blog: Post | undefined }) => {

    let markAsReadAfterMilliseconds = 2000;

    useEffect(() => {
        setTimeout(() => {
            if (props.blog && props.blog.slug) {
                console.log("Marking " + props.blog.slug + " as read");
                localStorage.setItem(props.blog.slug, "read")
            }
        }, markAsReadAfterMilliseconds);
    });


    if (props.blog) {
        return (<div className="post">
            <h2 className="title">{props.blog.title}</h2>
            <div>Posted by: <span className="author">{props.blog.author}</span></div>
            <div className="text"><BlockContent blocks={props.blog.text} serializers={serializers} /></div>
            <Link to={"/"}>Back to all posts</Link>
        </div>)
    } else {
        return (<div>No blog post!</div>)

    }
}