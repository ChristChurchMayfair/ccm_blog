import React from 'react';
import './App.css';
import AllPostFetcher, { GetPostBySlug } from './PostFetcher';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  RouteComponentProps
} from "react-router-dom";
import { Hideable } from './Hideable';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header>
          <div className="logo">
            <Link to={"/"}>
              <svg viewBox="0 0 720 162">
                <use xlinkHref="/ccm-logo-full.svg#full-logo"></use>
              </svg>
            </Link>
          </div>
        </header>
        <main>
          <Switch>
            <Route path="/posts/:slug" component={GetPostBySlug}></Route>
            <Route path="/">
              <div>
                {/* <Hideable uniqueIdentifier={"asdfasssssssaaaadfas"}> */}
                    <p>Welcome to the CCM daily blog!</p>
                    <p>We’ll be posting daily with the aim of building one another up, spurring one another on and helping one another to live for Jesus in this season. We’ll post articles, blog posts and videos that we’ve found helpful from others, as well as creating our own content. Some will help us respond to the particular challenges of Coronavirus, others will look beyond the current situation to engage with issues of doctrine, church life and personal godliness.</p>
                {/* </Hideable> */}
                <AllPostFetcher></AllPostFetcher>
              </div>
            </Route>
          </Switch>
        </main>
        <footer>
        </footer>
      </div>
    </Router>
  );
}

export default App;
