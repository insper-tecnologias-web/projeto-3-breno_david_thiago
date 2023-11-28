import { useState, useEffect } from 'react';
import axios from "axios";
import { AvatarDemo } from '../Options/avatar';
import bannerImage from '../../assets/banner.png'
import PostsProfile from './PostsProfile';
import Sidebar from './Sidebar';
import CommentsProfile from './CommentsProfile'



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
        axios.get("https://cryptooracle-projeto-3.onrender.com/api/user/info/", header)
          .then((res) => {
            setUsername(res.data['username']);
            setEmail(res.data['email']);
          })},[]);

    const getPosts = () =>{ 
            axios.get("https://cryptooracle-projeto-3.onrender.com/api/posts/user/",header)
            .then((res)=>{
                
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
                    getPosts = {getPosts}
                ></PostsProfile>)
                ))
                    setContent(postContent)}
            })
    }
    useEffect(() => {
        getPosts();
    },[]); // Empty dependency array to run the effect only once on mount

    const handlePostClick = () =>{
        getPosts();
    }

    const handleCommentClick = () =>{
        axios.get("https://cryptooracle-projeto-3.onrender.com/api/comments/user/",header)
            .then((res)=>{
                console.log(res.data)
                if(res.data.length===0){
                    setContent(<p className='flex font-bold mt-48 text-2xl items-center justify-center'>Você ainda não possui nenhum comentário :(</p>)
                }else{const commentContent = ((res.data)
                .slice()
                .reverse()
                .map((comment, index) => (
                
                <CommentsProfile
                    key={index}
                    user={comment.user}
                    content={comment.content}
                    header = {header}
                    commentId = {comment.id}
                    getComments = {handleCommentClick}
                ></CommentsProfile>)
                ))
                setContent(commentContent)}
            })
    }

      return (
        <div className='flex flex-col md:flex-row max-w-screen h-screen'>
            <div>
                <Sidebar/>
            </div>
            <div className='flex-1 overflow-y-auto'>
                <div className='flex flex-col-reverse bg-cover mb-8 h-32 md:h-60 ' style={{ backgroundImage: `url(${bannerImage})`}}>
                <AvatarDemo tamanho = "h-20 md:h-32 md:min-w-fit rounded-full mb-4 ml-4"></AvatarDemo>     
                </div>
                <div className='flex flex-row justify-start'>
                    <div className='flex flex-col'>
                    <p className=' mx-4 md:mx-16 font-bold text-2xl md:text-3xl'>{username}</p>
                    <p className=' mx-4 md:mx-16 text-gray-600 text-md md:text-3xl'>{email}</p>
                    </div>
                </div>
                <div className='flex flex-row sticky top-0 bg-white justify-evenly py-2 mt-4 font-bold text-xl border-y-2 border-gray-400 z-10'>
                    <button className='focus:border-b-4 border-blue-500' onClick={handlePostClick}>Posts</button>
                    <button className='focus:border-b-4 border-blue-500' onClick={handleCommentClick}>Comments</button>
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

