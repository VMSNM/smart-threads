import { createContext, useContext, useState } from "react";

export const UserPostsContext = createContext();

export const useUserPostsContext = () => {
    return useContext(UserPostsContext);
}

export const UserPostsContextProvider = ({ children }) => {
    const [posts, setPosts] = useState(null);
    return <UserPostsContext.Provider value={{posts, setPosts}}>
        {children}
    </UserPostsContext.Provider>
}