import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async (formData) => {

        const success = validateFormData(formData);
        if (!success) return;
        setLoading(true);
        try {
            const result = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await result.json();
            if (data.error) return toast.error(data.error);

            localStorage.setItem('user-threads', JSON.stringify(data));
            setAuthUser(data);
            toast.success('Successfully registered');

        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, signup }
}

function validateFormData({ name, username, email, password }) {
    if (!name || !username || !email || !password) {
        toast.error('Please fill all the fields');
        return false;
    }
    if (password.length < 4) {
        toast.error(`Password must be at least 4 characters`)
        return false;
    }
    return true;
}

export default useSignup;