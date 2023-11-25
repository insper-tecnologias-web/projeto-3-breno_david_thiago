
import Posts from "./Posts"
import Header from "../Header"
import axios from "axios"
import { useState } from "react";



const Timeline = (props) => {
  const posts = props.posts;
  const [content,setContent] = useState('');
  const header = props.header;
 

 

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      // Make a POST request to your server
      console.log(header)
      const response = await axios.post('http://127.0.0.1:8000/api/posts/', { content }, header);

      // Handle the response as needed
      console.log('Post successful:', response.data);

      // Optionally, you can reset the form or perform other actions after a successful post
      setContent('');
    } catch (error) {
      // Handle errors
      console.error('Error posting data:', error);
    }
  };

  
  return (
    <div className="flex flex-col grow items-center max-w-screen-3xl min-w-screen-sm mx-4 md:mx-64">
      <h1 className='ml-7 justify-self-center mt-20 mb-10 mr-4 font-mono font-black text-xl md:text-4xl'>Share your crypto ideas</h1>
      <form 
        className = "flex flex-col grow justify-evenly mt-10 mx-0.5 md:mx-96 min-w-[75%] max-w-screen-md" 
        method="post"
        onSubmit={handleSubmit}
        >

        <input 
          className = "min-w-[75%] min-h-full border border-2 text-xl border-white hover:border-blue-300 rounded-xl py-7 md:py-11 px-11 md:px-16"
          type = "text"
          name = "content"
          placeholder="Share your ideas!"
          value = {content}
          onChange={(e) => setContent(e.target.value)}
        ></input>
        <button
          type = 'submit'
          className = " flex place-content-center aling-center bg-blue-500 border rounded-xl border-1 mt-2.5 min-w-[25%] md:min-w-[10%] max-h-14 py-2.5 md:py-7 self-end shadow-blue-100/50 text-white  text-lg md:text-2xl font-bold"
        >
          <p className = "self-center">Post</p>
        </button>
        
      </form>
      <h1 className='ml-7 self-center mt-20 md:mt-32 mb-10 mr-4 font-mono font-black text-xl md:text-4xl'>See the latest community posts</h1>
      
      {posts
        .slice()
        .reverse()
        .map((post, index) => (
          <Posts
            key={index} // Unique key based on the reversed index
            user={post.user}
            content={post.content}
            postId = {post.id}
            toggleFunction = {props.toggleFunction}
            selectPost= {props.selectPost}
            visibility = {props.visibility}
            
          ></Posts>
        ))}
    </div>
  );
};

export default Timeline;
