
import Posts from "./Posts"
import Header from "../Header"
import axios from "axios"


const Timeline = (props) => {
  const posts = props.posts;

  return (
    <div className="flex flex-col grow items-center max-w-screen-3xl min-w-screen-sm mx-0.5 md:mx-20">
      {posts
        .slice()
        .reverse()
        .map((post, index) => (
          <Posts
            key={index} // Unique key based on the reversed index
            user={post.user}
            content={post.content}
          ></Posts>
        ))}
    </div>
  );
};

export default Timeline;
