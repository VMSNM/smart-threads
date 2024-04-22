import { useState } from "react";
import toast from "react-hot-toast";

const useFollow = () => {
    const [loading, setLoading] = useState(false);

    const follow = async (userToFollow) => {
        let success = false;
        setLoading(true);

        try {
            const result = await fetch(`/api/users/follow/${userToFollow}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
            });
            const data = await result.json();
            if (data.error) return toast.error(data.error);

            success = true;
          } catch (error) {
            toast.error(error);
          } finally {
            setLoading(false);
        }
        return success;
    }
    return { follow, loading }
}

export default useFollow;