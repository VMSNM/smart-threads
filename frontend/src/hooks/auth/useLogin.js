import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async (formData) => {
        const success = validateFormData(formData);
        if (!success) return;

        setLoading(true);
        try {
            const result = await fetch('/api/users/login', {
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
            toast.success('Successfully logged in');
  
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

function validateFormData({ username, password }) {
    if (!username || !password) {
        toast.error('Please fill all the fields');
        return false;
    }
    return true;
}

export default useLogin;