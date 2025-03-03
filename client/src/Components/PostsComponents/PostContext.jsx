import { useContext, createContext, useState, Children } from "react";

export const PostContext = createContext();

export const PostProvider =  ({children} ) =>{

    const [posts, setPosts] = useState([]);

    return <PostContext.Provider value={{posts, setPosts}}>
          {children}
    </PostContext.Provider>
}


// custome hooks

export const UsePosts = () => useContext(PostContext);