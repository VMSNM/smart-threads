import { CircularProgress, Stack } from "@mui/material"
import { FormUpdateProfileButton } from "../../../styles/main"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import useCreatePost from "../../../hooks/actions/useCreatePost";
import { useAuthContext } from "../../../context/AuthContext";
import { useUserPostsContext } from "../../../context/UserPostsContext";

const CreatePostContentActions = ({formData, setOpenCreatePostModal}) => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const { loading, createPost } = useCreatePost();
    const {pathname} = useLocation();

    const handleCreatePost = async () => {
        const success = await createPost(formData);
        if (success) {
            setOpenCreatePostModal(false);
            if (pathname !== `/${authUser?.username}`) navigate(`/${authUser?.username}`);
        } 
    }

    return (
        <Stack direction={'row'} gap={2} width={'100%'} mt={3}>
            <FormUpdateProfileButton disabled={loading} onClick={() => setOpenCreatePostModal(false)}>
                { loading ? <CircularProgress /> : 'Cancel' }
            </FormUpdateProfileButton>
            <FormUpdateProfileButton disabled={loading} wantedColor={'success'} onClick={handleCreatePost}>
                { loading ? <CircularProgress /> : 'Save' }
            </FormUpdateProfileButton>
        </Stack>
    )
}

export default CreatePostContentActions