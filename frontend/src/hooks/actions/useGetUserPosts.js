import { useState } from "react";
import toast from "react-hot-toast";

const useGetUserPosts = () => {
    const [loading, setLoading] = useState(false);
    
    const getUserPosts = async (username, setPosts) => {
        setLoading(true);
        try {
          const result = await fetch(`/api/posts/user/${username}`);
          const data = await result.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setPosts(data);
        } catch (error) {
          toast.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getUserPosts }
}

export default useGetUserPosts;