import { useState } from "react";
import toast from "react-hot-toast";
import { useUserPostsContext } from "../../context/UserPostsContext";

const useCreatePost = () => {
    const { posts, setPosts } = useUserPostsContext();
    const [loading, setLoading] = useState(false);
    let success = false;
    
    const createPost = async (formData) => {
        setLoading(true);
        const dataValid = validateFormData(formData);
        if (!dataValid) return;
        
        try {
            const result = await fetch('/api/posts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                
            });
            const data = await result.json();
            if (data.error) {
                throw new Error(data.error)
            }
            setPosts([data, ...posts]);
            toast.success('New post created');
            success = true;
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
        return success;
    }
    return { loading, createPost }
}

export default useCreatePost;

const validateFormData = (formData) => {
    if (!formData.text) {
        toast.error('Please fill the text field')
        return false;
    }
    return true;
}