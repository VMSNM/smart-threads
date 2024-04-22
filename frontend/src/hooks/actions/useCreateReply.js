import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const useCreateReply = () => {
    const [loading, setLoading] = useState(false);
    const { pid } = useParams();
    let success = false;
    let data = null;
    
    const createReply = async (text, postId = pid) => {
        setLoading(true);

        const dataValid = validateFormData(text);
        if (!dataValid) { setLoading(false); return; }
        try {
            const result = await fetch(`/api/posts/reply/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({text}),
                
            });
            data = await result.json();
            if (data.error) {
                throw new Error(data.error)
            }
            toast.success('Reply created successfully');
            success = true;
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
        return [success, data];
    }
    return { loading, createReply }
}

export default useCreateReply;

const validateFormData = (text) => {
    if (!text) {
        toast.error('Please fill the text field')
        return false;
    }
    return true;
}