import { AvatarDemo } from '../Options/avatar';
import { MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Posts = (props) => { 
    const handleClick = (event) => {
        
        props.toggleFunction();
        props.selectPost(props.postId);
        event.stopPropagation();
    };
    

    return (
        
        <div className="flex flex-col justify-start grow mt-10 mb-4 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md rounded-xl border border-solid border-blue-300 border-1">
            <Link className="flex flex-row
            " to = {`/community/${props.postId}`}>
                <AvatarDemo tamanho = ' h-10 md:h-20 md:min-w-fit rounded-full'></AvatarDemo>
                <div className='flex flex-col ml-4 md:ml-11'>
                    <div className='flex flex-row items-center mb-4'>
                        <h1 className='mr-2.5 text-black font-bold text-xl md:text-3xl'>{props.user.username}</h1>
                        <h1 className='text-gray-500 font-md text-lg md:text-2xl'>@{props.user.username}</h1>
                    </div>
                    <p className='text-black font-md text-lg md:text-2xl break-all'>{props.content}</p>
                    </div>
            </Link>
                <div className='flex items-center justify-center w-8 h-8 hover:bg-gray-500 hover:bg-opacity-60 hover:rounded-full active:bg-gray-500 mt-2.5'>
                    <button onClick={handleClick}><MessageCircle></MessageCircle></button>
                </div>
            <div/>
            </div>
           
        
        
    );
}

export default Posts;
