import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

const useUpdateProfile = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuthContext();

    const update = async(formData) => {
        const success = validateFormData(formData);
        if (!success) return;
        setLoading(true)
        try {
            const result = await fetch('/api/users/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                
            });
            const data = await result.json();
            if (data.error) return toast.error(data.error);
            localStorage.setItem('user-threads', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Profile successfully updated');
            navigate(`/${data.username}`)
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false)
        }
    }
    return { loading, update }
}

export default useUpdateProfile;

function validateFormData({name, username, email, password, bio, profilePic}) {
    if (!name || !username || !email) {
        toast.error('Please fill the fields name, username, and email');
        return false;
    }
    if (password && password.length < 4) {
        toast.error('Password must have more than 4 characters');
    }
    return true;
}