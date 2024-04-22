import { IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";

const UsersCardMiniatureFollowing = ({user}) => {
    const { authUser } = useAuthContext();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        setIsFollowing(user?.followers?.includes(authUser?._id));
    }, [user, authUser]);

    if (authUser?._id === user?._id) return null;

    return (
        <IconButton onClick={(e) => e.preventDefault()} title={ isFollowing ? 'Unfollow' : 'Follow' } >
            { isFollowing ? <StarIcon sx={{color:'#FFFF6E'}} /> : <StarBorderIcon sx={{color:'#FFFF6E'}} /> }
        </IconButton>
    )
}

export default UsersCardMiniatureFollowing;