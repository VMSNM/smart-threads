import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const result = await fetch('/api/users/logout', {
                    method: 'POST',
                    headers: { 
                    Accept: 'application/json',
                    'Content-type': 'application/json',
                },
                credentials: 'include',
            });
            const data = await result.json()
            if (data.error) {
                throw new Error(data.error)
            }

            localStorage.removeItem('user-threads')
            setAuthUser(null)
            toast.success('Successfully logged out');
        } catch (error) {
            toast.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout }
}

export default useLogout;