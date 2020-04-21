import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state ={
        loadedPost: null
    }

    componentDidUpdate() {
        if(this.props.id) {
            //To avoid creating infinite loop when fetching data
            // if(this.state.loadedPost && this.state.loadedPost.id !== this.props.id) : this line only succeed if we have 1 post loaded 
            if(!this.state.loadedPost || (this.state.loadedPost.id !== this.props.id)){//make sure that  we only send http request and hence update the state if we actually load the new post
                axios.get('/posts/' + this.props.id)
                .then(response => {
                    // console.log(response);
                    this.setState({loadedPost: response.data});
                    // console.log(this.state.loadedPost) delete method need to complete
                });
            }
           
        }   
    }

    deletePosthandler = () =>{
            axios.delete('/posts/' + this.props.id)
            .then(response=> {
                // console.log(response);
                this.setState({loadedPost: response.data});
            });
        

    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id){
            post = <p style={{textAlign: 'center'}}>Loading...!</p>; // when we get valid prop before we have the valid loadedPost. fetching data is asynchornous, so first we get the id, then later we have loadedPost. But we immediately rerender the DOM after we get Id  
        }
        if(this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick = {this.deletePosthandler}>Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;