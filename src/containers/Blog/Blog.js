import React, { Component } from 'react';
//import axios from 'axios';
// import axios from '../../axios';
import  { Route, NavLink,Switch, Redirect } from 'react-router-dom'; //route obj, rout component //Href replaced by Link
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';
import './Blog.css';


class Blog extends Component {
    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul> 
                            <li><NavLink 
                                to ="/posts/" 
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color:'#fa923f',
                                    textDecoration:'underline'
                                }}>Posts</NavLink></li> {/* href: this method will reload the page not rerender the page, so all the current state will be lost*/ }{/* navLink to Specify Which Element in a Navigation Bar Is Active*/ /*override the active class by activeClassName */ }
                            <li><NavLink 
                                to={{ //object //first curly brackets to output dynamic content, second one for object
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* <Route path="/" exact render={ () => <h1>HOME</h1>}/> The exact param disables the partial matching for a route and makes sure that it only returns the route if the path is an EXACT match to the current url. */}
                {/*<Switch> is unique in that it renders a (only one) route exclusively. In contrast, every <Route> that matches the location renders inclusively.*/}
                <Switch>  
                    <Route path="/new-post" component={NewPost} />
                    <Route path="/posts"  component={Posts}  />
                    <Redirect from="/" to ="/posts" /> {/*automatically redirected to url :/posts */}
                </Switch>
                
                {/* <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;