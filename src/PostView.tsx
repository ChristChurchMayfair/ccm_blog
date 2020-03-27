import { useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "./Post";
const BlockContent = require('@sanity/block-content-to-react')

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