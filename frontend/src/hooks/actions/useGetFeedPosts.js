import { useState } from "react";
import toast from "react-hot-toast";

const useGetFeedPosts = () => {
    const [loading, setLoading] = useState(false);
    
    const getFeedPosts = async (setFeedPosts) => {
        setLoading(true);
        try {
          const result = await fetch(`/api/posts/feed`);
          const data = await result.json();
          if (data.error) {
            throw new Error(data.error);
          }
          setFeedPosts(data);
        } catch (error) {
          toast.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getFeedPosts }
}

export default useGetFeedPosts;