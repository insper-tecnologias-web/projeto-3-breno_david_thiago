import { useState, useEffect } from 'react';
import axios from "axios";
import { AvatarDemo } from '../Options/avatar';
import bannerImage from '../../assets/banner.png'
import PostsProfile from './PostsProfile';
import Sidebar from './Sidebar';



export function Profile() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
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
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/user/info/", header)
          .then((res) => {
            setUsername(res.data['username']);
            setEmail(res.data['email']);
          })},[]);

    const getPosts = () =>{ 
            axios.get("http://127.0.0.1:8000/api/posts/user/",header)
            .then((res)=>{
                setPosts(res.data);
            })
    }

    useEffect(() => {
        getPosts();
    }); // Empty dependency array to run the effect only once on mount
    

      return (
        <div className='flex flex-row h-screen'>
            <div className='w-56'>
                <Sidebar/>
            </div>
            <div className='flex-1 mr-8 border-2 border-b-0 border-black overflow-y-auto'>
                <div className='flex flex-col-reverse bg-cover h-64 ' style={{ backgroundImage: `url(${bannerImage})`}}>
                    <AvatarDemo tamanho = "flex justify-center items-center rounded-full h-36 w-36 ml-16 border-2 border-black "></AvatarDemo>
                </div>
                <div className='py-4 border-black border-b-2'>
                    <p className='mx-16 font-bold text-3xl'>{username}</p>
                    <p className='mx-16 text-gray-600'>{email}</p>
                </div>
                <div>
                    <div className='px-4 pb-4'>
                        {posts
                        .slice()
                        .reverse()
                        .map((post, index) => (
                        <PostsProfile
                            key={index} // Unique key based on the reversed index
                            user={post.user}
                            content={post.content}
                        ></PostsProfile>
                        ))}
                    </div>
                </div>
            </div>
        </div>
  )
}

