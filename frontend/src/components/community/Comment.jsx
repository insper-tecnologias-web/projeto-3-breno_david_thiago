
import { AvatarDemo } from '../Options/avatar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = (props) => {
    const header = props.header;
    const [content,setContent] = useState('');
    const [selectedPost, setSelectedPost] = useState(null)
    
    

    const getPost = async() => {
      
      try {
        // Make a POST request to your server
        
        const response = await axios.get(`https://cryptooracle-projeto-3.onrender.com/api/post/${props.postId}/`, header);
        setSelectedPost(response.data)

      } catch (error) {
        // Handle errors
        console.error('Error posting data:', error);
      }
      
    };

    useEffect(() => {
      getPost();
  }); // Empty dependency array to run the effect only once on mount

   
    
    
    const handleSubmit = async(event) => {
        event.preventDefault();
    
        try {
          // Make a POST request to your server
          const response = await axios.post(`https://cryptooracle-projeto-3.onrender.com/api/comments/${props.postId}/`, { content }, header);
          
    
          // Handle the response as needed
          console.log('Post successful:', response.data);
    
          // Optionally, you can reset the form or perform other actions after a successful post
          setContent('');
        } catch (error) {
          // Handle errors
          console.error('Error posting data:', error);
        }
        getPost();
      };


    if(selectedPost === null) {
      return (
        <div  className = "flex flex-col grow justify-center items-center  border-blue-300 border-2 rounded-xl bg-blue-100 mt-10 mx-0.5 md:mx-96 min-w-[75%] max-w-screen-md" onClick={(e) => e.stopPropagation()}>
          <form 
          className='min-w-full flex flex-col justify-between wrap'
          method="post"
          onSubmit={handleSubmit}
          >
          <input 
          className = " grow focus:outline-none min-w-full min-h-full bg-blue-100 text-xl md:text-3xl border-none py-7 md:py-11 px-11 md:px-16"
          required={true}
          type = "text"
          name = "content"
          placeholder= "Post your response"
          value = {content}
          onChange={(e) => setContent(e.target.value)}
          ></input>
          
          <button
          type = 'submit'
          className = "flex self-end place-content-center bg-black border-blue-100 rounded-2xl border-2 mt-2.5 min-w-[35%] md:min-w-[20%] max-h-14 py-1 md:py-4 shadow-blue-100/50 text-white  text-lg md:text-2xl font-bold mx-2.5 mb-2.5"
          >
          
          <p className = "self-center">Respond</p>

          </button>
          
      </form>
      </div>
      
      )
    }
    return (
        <div  className = "flex flex-col grow justify-center items-center  border-blue-300 border-2 rounded-xl bg-blue-100 mt-10 mx-0.5 md:mx-96 min-w-[75%] max-w-screen-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-row justify-start grow mt-10 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md">
                <AvatarDemo tamanho = ' rounded-full overflow-hidden z-0 h-14 md:h-28'></AvatarDemo>
                <div className='flex flex-col ml-4 md:ml-11'>
                    <div className='flex flex-row items-center mb-4'>
                        <h1 className='mr-2.5 text-black font-bold text-2xl md:text-4xl'>{selectedPost.user.username}</h1>
                        <h1 className='text-gray-500 font-md text-2xl md:text-4xl'>@{selectedPost.user.username}</h1>
                    </div>
                    <p className='text-black font-md text-2xl md:text-4xl break-all'>{selectedPost.content}</p>
                </div>
            </div>
            <form 
                className='min-w-full flex flex-col justify-between wrap'
                method="post"
                onSubmit={handleSubmit}
                >
                <input 
                className = " grow focus:outline-none min-w-full min-h-full bg-blue-100 text-xl md:text-3xl border-none py-7 md:py-11 px-11 md:px-16"
                required={true}
                type = "text"
                name = "content"
                placeholder= "Post your response"
                value = {content}
                onChange={(e) => setContent(e.target.value)}
                ></input>
                
                <button
                type = 'submit'
                className = "flex self-end place-content-center bg-black border-blue-100 rounded-2xl border-2 mt-2.5 min-w-[35%] md:min-w-[20%] max-h-14 py-1 md:py-4 shadow-blue-100/50 text-white  text-lg md:text-2xl font-bold mx-2.5 mb-2.5"
                >
                
                <p className = "self-center">Respond</p>
                </button>
                
        </form>
      </div>
    )
}
export default Comment;