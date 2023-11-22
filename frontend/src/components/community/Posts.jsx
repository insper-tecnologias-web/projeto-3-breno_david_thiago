import { AvatarDemo } from '../Options/avatar';
const Posts = (props) => {
    return(
        <div className = ' flex flex-row justify-start grow mt-10 py-4 md:py-11 px-2.5 md:px-7 min-w-full max-w-screen-md rounded-xl border border-solid border-blue-300  border-1'>
                <AvatarDemo className = "min-h-full mr-11"></AvatarDemo>
                <div className = 'flex flex-col ml-2.5 md:ml-4'>
                    <div className = 'flex flex-row items-center mb-4'>
                        <h1 className='mr-2.5 text-black font-bold text-xl md:text-3xl'>{props.user.username}</h1>
                        <h1 className='text-gray-500 font-md text-lg md:text-2xl'l>@{props.user.username}</h1>
                    </div>
                    <p className = 'text-black font-md text-lg md:text-2xl'>{props.content}</p>
                </div>
        </div>
    )
}

export default Posts;