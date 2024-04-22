import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { Colors } from "../../../styles/theme";
import useDeletePost from "../../../hooks/actions/useDeletePost";
import { CircularProgress, IconButton } from "@mui/material";
import { useUserPostsContext } from "../../../context/UserPostsContext";

const UserPostDeleteButton = ({ user, post }) => {
    const { authUser } = useAuthContext();
    const { posts, setPosts } = useUserPostsContext();
    const [ownProfile, setOwnProfile] = useState(false);
    const { loading, deletePost } = useDeletePost();
    const navigate = useNavigate();
    const {pathname} = useLocation();

    const handleDeletePost = async () => {
        console.log(post?._id)
        const success = await deletePost(post?._id);
        if (success) setPosts((prev) => prev.filter((p) => p._id !== post?._id));
        if (pathname !== `/${authUser?.username}`) navigate(`/${authUser?.username}`)
    }

    useEffect(() => {
        if ((user?._id === authUser?._id)) setOwnProfile(true);
      }, [user])

    return (
        <>
        { ownProfile && 
            <IconButton title='Delete post' onClick={handleDeletePost} >
                { loading && <CircularProgress size={20} /> }
                { !loading && <DeleteIcon sx={{fontSize:'16px', cursor:'pointer', ":hover": {color: Colors.danger}}} /> }
            </IconButton>
        }
        </>
    )
}

export default UserPostDeleteButton