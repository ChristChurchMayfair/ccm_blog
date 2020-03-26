import React, { useState, useEffect } from "react";
import client from './Client'
import PostList, { Post, PostView } from "./PostList";
import { RouteComponentProps, useParams } from "react-router-dom";

function SanityBlogEntryToPost(obj: any): Post {
  return {
      title: obj.title,
      slug: obj.slug? obj.slug.current:undefined,
      author: obj.author.name,
      text: obj.text,
      createdAt: new Date(obj._createdAt),
      updatedAt: new Date(obj._updatedAt),
  }
}

export var GetPostBySlug = () => {
  let { slug } = useParams();
  const [blog, setBlog] = useState<Post>();
  const [isLoading, setIsLoading] = useState(true);
  const [wasErrorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    const fetchBlogEntries = async () => {
      try {
        //console.log(match.params.slug);
        const response = await client.fetch(`*[_type == "blog_entry" && slug.current == $slug][0] { ..., author-> }`, {slug: slug});
        
        console.log(response);
        setBlog(SanityBlogEntryToPost(response));
        setIsLoading(false)
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setErrorLoading(true);
      }
    };
    fetchBlogEntries();
  },[]);

  if (isLoading) {
    return (<div>Loading</div>)
  } else if (wasErrorLoading) {
    return (<div>error loading</div>)
  } else {
    return (<PostView blog={blog}></PostView>)
  }
}

function AllPostFetcher() {
  // Declare a new state variable, which we'll call "count"
  const [blogs, setBlogs] = useState(new Array<Post>());
  const [isLoading, setIsLoading] = useState(true);
  const [wasErrorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setBlogs([]);
        const response = await client.fetch(`*[_type == "blog_entry"] | order(_createdAt desc){ ..., author-> }`);
        
        console.log(response);
        setBlogs(response.map((sanityObj: Object) => SanityBlogEntryToPost(sanityObj)));
        setIsLoading(false)
      } catch (e) {
        console.log(e);
        setIsLoading(false);
        setErrorLoading(true);
      }
    };
    fetchUsers();
  },[]);

  if (isLoading) {
    return (<div>Loading</div>)
  } else if (wasErrorLoading) {
    return (<div>error loading</div>)
  } else {
    return (<PostList postsPerPage={20} blogs={blogs}></PostList>)
  }
}

export default AllPostFetcher;