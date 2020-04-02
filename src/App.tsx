import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import BlogPostList from "./pages/blogPostList/BlogPostList";
import BlogPost from "./pages/blogPost/BlogPost";

import "./app.scss";

const App: React.FC = () => (
  <Router>
    <div className="app">
      <div className="app__intro-section">
        <header>
          <div className="logo">
            <Link to={"/"}>
              <svg viewBox="0 0 720 162">
                <use xlinkHref="/ccm-logo-full.svg#full-logo"></use>
              </svg>
            </Link>
          </div>
        </header>
        <div className="app__intro-section__copy">
          <h1>Welcome to the CCM daily blog!</h1>
          <div>
            <p>
              We’ll be posting daily with the aim of building one another up,
              spurring one another on and helping one another to live for Jesus
              in this season.
            </p>
            <p>
              We’ll post articles, blog posts and videos that we’ve found
              helpful from others, as well as creating our own content.
            </p>
            <p>
              Some will help us respond to the particular challenges of
              Coronavirus, others will look beyond the current situation to
              engage with issues of doctrine, church life and personal
              godliness.
            </p>
          </div>
        </div>
      </div>
      <main>
        <div>
          <Switch>
            <Route path="/posts/:slug" component={BlogPost}></Route>
            <Route path="/">
              <BlogPostList />
            </Route>
          </Switch>
        </div>
      </main>
      <footer></footer>
    </div>
  </Router>
);

export default App;
