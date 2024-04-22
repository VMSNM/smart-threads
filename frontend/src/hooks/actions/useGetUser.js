import { useState } from "react";
import toast from "react-hot-toast";

const useGetUser = () => {
    const [loading, setLoading] = useState(false);
    let success = false;
    let data;
    const getUser = async (username, setUser) => {
        setLoading(true);
        try {
            const result = await fetch(`/api/users/profile/${username}`);
            data = await result.json();
            if (data.error) return toast.error(data.error);
            if (setUser) setUser(data);
            success = true;
          } catch (error) {
            toast.error(error);
          } finally {
            setLoading(false);
        }
        return [success, data];
    }
    return { getUser, loading }
}

export default useGetUser;