import { useState } from "react";
import toast from "react-hot-toast";

const useGetSuggestUsers = () => {
    const [loading, setLoading] = useState(false);

    const getSuggestedUsers = async (setSuggested) => {
        setLoading(true);
        try {
            const result = await fetch(`/api/users/suggested`);
            const data = await result.json();
            if (data.error) return toast.error(data.error);
            setSuggested(data);
          } catch (error) {
            toast.error(error);
          } finally {
            setLoading(false);
        }
    }
    return { getSuggestedUsers, loading }
}

export default useGetSuggestUsers;