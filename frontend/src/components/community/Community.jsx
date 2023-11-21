import Timeline from "./Timeline";
import Header from "../Header";
import {useState, useEffect} from 'react';
import axios from "axios";

const Community = () => {
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
            console.log(posts)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    useEffect(() => {
        getPosts();
    }); // Empty dependency array to run the effect only once on mount
    return(
        <div>
            <Header></Header>
            <Timeline posts = {posts}></Timeline>
        </div>
        
    )
}
export default Community;