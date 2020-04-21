import React, { Component } from 'react';
//import axios from 'axios';
//
 import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state ={
        posts: [],
        selectedPostId: null,
        error: false

    }

    componentDidMount() {
        axios.get('/posts')
        .then(response => {
            const posts = response.data.slice(0, 4); //restrict the amount of data only from 0 to 3. actually fetch them all, but only stores 4 of them(0, 1, 2, 3, (exclude 4))
            const updatedPosts =  posts.map (post => {
                return {
                    ...post,
                    author: 'Nhan'
                }
            });
            this.setState({posts: updatedPosts});

            // console.log(response);
        })
        .catch(error => {
            console.log(error);
            this.setState({error: true});

        }); 
    }
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }
    render () {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>;// error: true so it will show this line
        if(!this.state.error) {// !true because we use this.setState(error: true)
            posts = this.state.posts.map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                    />;
            });
        }
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;