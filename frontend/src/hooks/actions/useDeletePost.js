import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeletePost = () => {
    const [loading, setLoading] = useState(false);
    let success = false;

    const deletePost = async (postID) => {
        setLoading(true);
        try {
            const result = await fetch(`/api/posts/${postID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await result.json();
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('Post successfully deleted')
            success = true;
            console.log(data);

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
        return success;
    }
    return { loading, deletePost }
}

export default useDeletePost;

const validateFormData = (formData) => {
    if (!formData.text) {
        toast.error('Please fill the text field')
        return false;
    }
    return true;
}