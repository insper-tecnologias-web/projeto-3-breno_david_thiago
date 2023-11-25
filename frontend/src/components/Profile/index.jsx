import { useState, useEffect } from 'react';
import axios from "axios";
import { AvatarDemo } from '../Options/avatar';
import bannerImage from '../../assets/banner.png'
import PostsProfile from './PostsProfile';
import Sidebar from './Sidebar';



export function Profile() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [content, setContent] = useState(null);
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
                console.log(res.data.length)
                if(res.data.length===0){
                    setContent(<p className='flex font-bold mt-48 text-2xl items-center justify-center'>Você ainda não possui nenhum post :(</p>)
                }else{const postContent = ((res.data)
                .slice()
                .reverse()
                .map((post, index) => (
                    
                <PostsProfile
                    key={index}
                    user={post.user}
                    content={post.content}
                    header = {header}
                    postId = {post.id}
                ></PostsProfile>)
                ))
                    setContent(postContent)}
            })
    }
    useEffect(() => {
        getPosts();
    },[]); // Empty dependency array to run the effect only once on mount

      return (
        <div className='flex flex-row h-screen'>
            <div className='w-56'>
                <Sidebar/>
            </div>
            <div className='flex-1 mr-8 border-2 border-y-0 border-black overflow-y-auto'>
                <div className='flex flex-col-reverse bg-cover h-64 ' style={{ backgroundImage: `url(${bannerImage})`}}>
                    <AvatarDemo tamanho = "flex justify-center items-center rounded-full h-36 w-36 ml-16 border-2 border-white "></AvatarDemo>
                </div>
                <div className='py-4'>
                    <p className='mx-16 font-bold text-3xl'>{username}</p>
                    <p className='mx-16 text-gray-600'>{email}</p>
                </div>
                <div>
                    <div className='px-4 pb-4'>
                        {content}
                    </div>
                </div>
            </div>
        </div>
  )
}

