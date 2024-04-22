import { useState } from "react";
import toast from "react-hot-toast";

const useGetFollowers = () => {
    const [loading, setLoading] = useState(false);
    let success = false;
    let data;
    const getFollowers = async () => {
        setLoading(true);
        try {
            const result = await fetch(`/api/users/followers`);
            data = await result.json();
            if (data.error) return toast.error(data.error);
            success = true;
            
          } catch (error) {
            toast.error(error);
          } finally {
            setLoading(false);
        }
        return [success, data];
    }
    return { getFollowers, loading }
}

export default useGetFollowers;