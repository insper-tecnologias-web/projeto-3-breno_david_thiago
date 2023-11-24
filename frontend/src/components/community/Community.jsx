import Timeline from "./Timeline";
import Header from "../Header";
import {useState, useEffect} from 'react';
import axios from "axios";
import Comment from "./Comment";
import { useAsyncError } from "react-router-dom";
import Posts from "./Posts";

const Community = () => {
    const [isFormVisible, setFormVisibility] = useState(false);
    const [selectedPost, setSelectedPost] = useState();

    const toggleFormVisibility = () => {
        setFormVisibility(!isFormVisible);
        console.log(isFormVisible)
        
    }

    const selectPosts = (posts) => {
        setPosts(posts)
    }

    const selectPost = (i) => {
        setSelectedPost(i);
        console.log(selectedPost)
    }
    const [posts, setPosts] = useState([]);
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token
      };
    
      const [token, setToken] = useState(getToken());
    
      function get_header(){
        const options = {
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization' : `Token ${token}`}
        };
        return options
    }
    
    const header = get_header()

    const getPosts= async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/posts/",header);
            setPosts(res.data);
            
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    useEffect(() => {
        getPosts();
    }); // Empty dependency array to run the effect only once on mount
    return (
        <div className="relative h-screen">
          {/* Blurred content */}
          <div onClick = {() => {setFormVisibility(false)}} className={`${isFormVisible ? 'blur-sm' : ''}`}>
            <Header className="z-10"></Header>
            <Timeline
              posts={posts}
              header={header}
              toggleFunction={toggleFormVisibility}
              visibility={isFormVisible}
              selectPost = {selectPost}
              selectPosts = {selectPosts}
              className="z-5"
            ></Timeline>
          </div>
      
          {/* Comment component */}
          {isFormVisible && (
            <div className="fixed bottom-20 left-0 right-0 md:right-[15%] mx-auto mb-8 z-30">
              <Comment className="justify-self-center" posts = {posts} selectedPost = {selectedPost} header ={header}/>
            </div>
          )}
        </div>
      );
      
      
}
export default Community;