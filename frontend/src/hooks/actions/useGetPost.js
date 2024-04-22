import { useState } from "react";
import toast from "react-hot-toast";

const useGetPost = () => {
    const [loading, setLoading] = useState(false);
    
    const getPost = async (id, setPosts) => {
        setLoading(true);
        try {
          const result = await fetch(`/api/posts/${id}`);
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
    return { loading, getPost }
}

export default useGetPost;