import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state ={
        posts: []
    }

    componentDidMount() {
        axios.get('http://jsonplaceholder.typicode.com/posts')
        .then(response => {
            const posts = response.data.slice(); //restrict the amount of data only from 0 to 3. actually fetch them all, but only stores 4 of them(0, 1, 2, 3, (exclude 4))
            const updatedPosts =  posts.map (post => {
                return {
                    ...post,
                    author: 'Nhan'
                }
            });
            this.setState({posts: updatedPosts});

            // console.log(response);
        });
    }
    render () {
        const posts = this.state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author}/>
        });
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;