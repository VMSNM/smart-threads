import { useState } from "react"
import toast from "react-hot-toast";

const useLikeDislikePost = () => {
    const [loading, setLoading] = useState(false);

    let success = false;
    const likeDislikePost = async (postID) => {
        setLoading(true);
        try {
            const result = await fetch(`/api/posts/like/${postID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await result.json();
            if (data.error) {
                throw new Error(data.error);
            }
            toast.success(data.message);
            success = true;
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
        return success;
    }
    return { loading, likeDislikePost }
}

export default useLikeDislikePost;