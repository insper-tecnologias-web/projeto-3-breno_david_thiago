import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Header from "../Header";
import { AvatarDemo } from '../Options/avatar';

const SpecPost = (props) => {
  const [postComments, setPostComments] = useState({ post: {}, comments: [] });

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  function get_header() {
    const options = {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Token ${token}` }
    };
    return options;
  }

  const header = get_header();

  const getPostComments = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/comments/${props.postId}`, header);
      setPostComments({ post: res.data[1], comments: res.data[0] });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostComments();
  }, [props.postId]); // Dependency added to rerun the effect when props.postId changes

  console.log(postComments.post.user?.username);

  return (
    <div>
      <Header></Header>
      <div className='flex flex-col'>
        <div className="flex flex-row justify-start grow mt-10 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md">
          <AvatarDemo></AvatarDemo>
          <div className='flex flex-col ml-4 md:ml-11'>
            <div className='flex flex-row items-center mb-4'>
              <h1 className='mr-2.5 text-black font-bold text-2xl md:text-4xl'>{postComments.post.user?.username}</h1>
              <h1 className='text-gray-500 font-md text-2xl md:text-4xl'>@{postComments.post.user?.username}</h1>
            </div>
            <p className='text-black font-md text-2xl md:text-4xl'>{postComments.post.content}</p>
          </div>
        </div>
        {postComments.comments.map ((comment,index) => (
            <div key = {index} className="flex flex-row justify-start grow mt-10 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md">
            <AvatarDemo></AvatarDemo>
            <div className='flex flex-col ml-4 md:ml-11'>
              <div className='flex flex-row items-center mb-4'>
                <h1 className='mr-2.5 text-black font-bold text-2xl md:text-4xl'>{comment.user.username}</h1>
                <h1 className='text-gray-500 font-md text-2xl md:text-4xl'>@{comment.user.username}</h1>
              </div>
              <p className='text-black font-md text-2xl md:text-4xl'>{comment.content}</p>
            </div>
            </div>
        ))}
    
    </div>
    </div>

  );
};

export default SpecPost;
