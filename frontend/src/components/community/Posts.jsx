import { AvatarDemo } from '../Options/avatar';
const Posts = (props) => {
    return(
        <div className = ' flex flex-row grow ml-7 mt-10 mr-4 mx-0.5 md:mx-36 min-w-fit max-w-screen-md rounded-xl border border-solid border-blue-500 p-2.5 md:p-11 border-2'>
                <AvatarDemo></AvatarDemo>
                <div className = 'flex flex-col'>
                    <div className = 'flex flex-row'>
                        <h1>{props.name}</h1>
                        <h1>{props.username}</h1>
                    </div>
                    <p>{props.content}</p>
                </div>
        </div>
    )
}

export default Posts;