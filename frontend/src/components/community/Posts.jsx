import { AvatarDemo } from '../Options/avatar';
const Posts = (props) => {
    return(
        <div className = ' flex flex-row justify-start grow ml-7 mt-10 mr-4 mx-0.5 md:mx-36 min-w-fit max-w-screen-md rounded-xl border border-solid border-blue-500 p-2.5 md:px-64 py-11 border-2'>
                <AvatarDemo></AvatarDemo>
                <div className = 'flex flex-col'>
                    <div className = 'flex flex-row items-center'>
                        <h1 className='mr-2.5 text-black font-bold text-lg md:text-2xl'>{props.user.username}</h1>
                        <h1 className='text-gray-500 font-md text-md md:text-xl'l>@{props.user.username}</h1>
                    </div>
                    <p>{props.content}</p>
                </div>
        </div>
    )
}

export default Posts;