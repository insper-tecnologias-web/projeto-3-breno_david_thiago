import { AvatarDemo } from '../Options/avatar';
import { Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PostsProfile = (props) => {
    
    const handleClick = async() => {
        
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/profile/delete/${props.postId}/`, props.header);
      
            // Handle the response as needed
            console.log('Post successful:', response.data);
            props.getPosts()
      
          } catch (error) {
            console.error('Error posting data:', error);
          }
        };
      
    
    return(
        <div className="flex flex-col mr-4 justify-start grow wrap mt-10 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md rounded-xl border border-solid border-blue-300 border-1">
                <Link className="flex flex-row
            " to = {`/community/${props.postId}`}>
                <AvatarDemo tamanho = "rounded-full h-10 md:h-16 min-w-fit max-w-max border-2 border-white "></AvatarDemo>
                <div className = 'flex flex-col ml-2.5 md:ml-10 wrap'>
                    <div className = 'flex flex-row justify-between items-center mb-4'>
                        <div className='flex flex-row items-center'>
                            <h1 className='mr-2.5 text-black font-bold text-xl md:text-3xl'>{props.user.username}</h1>
                            <h1 className='text-gray-500 font-md text-lg md:text-3xl'l>@{props.user.username}</h1>
                        </div>
                    </div>
                    <p className = 'text-black font-md text-lg md:text-3xl mb-4 break-all'>{props.content}</p>
                    
                </div>
                </Link>
                <button className =" mt-5" onClick={handleClick}><Trash></Trash></button>
        </div>
    )
    }

export default PostsProfile;