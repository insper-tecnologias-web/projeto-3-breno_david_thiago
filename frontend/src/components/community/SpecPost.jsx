import { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Header from "../Header";
import { AvatarDemo } from '../Options/avatar';

const SpecPost = (props) => {
  const [postComments, setPostComments] = useState({ post: {}, comments: [] });
  const [content,setContent] = useState('');
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

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Make a POST request to your server
      console.log(header)
      const response = await axios.post(`http://127.0.0.1:8000/api/comments/${props.postId}/`, { content }, header);
      

      // Handle the response as needed
      console.log('Post successful:', response.data);

      // Optionally, you can reset the form or perform other actions after a successful post
      setContent('');
    } catch (error) {
      // Handle errors
      console.error('Error posting data:', error);
    }

    window.location.reload();
  };


  useEffect(() => {
    getPostComments();
  }, [props.postId]); // Dependency added to rerun the effect when props.postId changes

  console.log(postComments.post.user?.username);

  return (
    <div className = 'flex flex-col grow'>
      <Header></Header>
      
      <div className='flex flex-col self-center mx-2 min-h-content min-w-[75%] mt-24 border-blue-300  border-2 overflow-y-scroll rounded-xl bg-blue-100'>
      <div className = "bg-blue-300">
        <h1 className='ml-7 self-start mt-7 font-mono font-black text-2xl md:text-5xl'>POST</h1>
          <div className="flex flex-row justify-start grow mt-10 py-4 md:py-11 px-2.5 md:px-7 bg-blue-300 min-w-full max-w-screen-md">
            <AvatarDemo></AvatarDemo>
            <div className='flex flex-col ml-4 md:ml-11 '>
              <div className='flex flex-row items-center mb-4'>
                <h1 className='mr-2.5 text-black font-bold text-2xl md:text-4xl'>{postComments.post.user?.username}</h1>
                <h1 className='text-gray-500 font-md text-2xl md:text-4xl'>@{postComments.post.user?.username}</h1>
              </div>
              <p className='text-black font-md text-2xl md:text-5xl break-all'>{postComments.post.content}</p>
            </div>
            
          </div>
          </div>

        <form 
                className='min-w-full flex flex-row justify-between border-blue-500 border-1'
                method="post"
                onSubmit={handleSubmit}
                >
                <input 
                className = " grow focus:outline-none  min-h-full bg-blue-100 text-lg md:text-3xl border-none py-7 md:py-11 pl-2 md:px-16"
                type = "text"
                name = "content"
                placeholder= "Post your response"
                value = {content}
                onChange={(e) => setContent(e.target.value)}
                ></input>
                
                <button
                type = 'submit'
                className = "flex self-end place-content-center bg-black border border-blue-300 rounded-2xl border-2 mt-2.5 min-w-[10%] md:min-w-[10%] max-h-16 py-1 px-2 md:py-4 shadow-blue-100/50 text-white  text-sm md:text-2xl font-bold mx-2.5 mb-2.5"
                >
                
                <p className = "self-center">Respond</p>
                </button>
            </form>
        {postComments.comments.map ((comment,index) => (
            <div key = {index} className="flex flex-row justify-start self-center grow py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md border border-blue-200">
            <AvatarDemo></AvatarDemo>
            <div className='flex flex-col ml-4 md:ml-11 wrap'>
              <div className='flex flex-row items-center '>
                <h1 className='mr-2.5 text-black font-bold text-xl md:text-3xl'>{comment.user.username}</h1>
                <h1 className='text-gray-500 font-md text-xl md:text-3xl'>@{comment.user.username}</h1>
              </div>
              <p className='text-black font-md text-xl md:text-3xl break-all'>{comment.content}</p>
            </div>
            </div>
        ))}
    
    </div>
    </div>

  );
};

export default SpecPost;
