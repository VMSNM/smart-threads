import { CircularProgress, Stack } from "@mui/material"
import { FormUpdateProfileButton } from "../../../styles/main"
import { useNavigate } from "react-router-dom";
import useCreateReply from "../../../hooks/actions/useCreateReply";

const CreateReplyContentActions = ({post, setPost, page, formData, setOpenReplyPostModal, setUpdatedReplies}) => {
    const navigate = useNavigate();
    const { loading, createReply } = useCreateReply();

    const handleCreateReply = async () => {
        const [success, data] = await createReply(formData?.text, post?._id);
        if (success) {
            setOpenReplyPostModal(false);
            if (setPost) setPost({...post, replies: [...post.replies, data]});
            setUpdatedReplies((prev) => prev + 1);
        } 
    }

    return (
        <Stack direction={'row'} gap={2} width={'100%'} mt={3}>
            <FormUpdateProfileButton disabled={loading} onClick={() => setOpenReplyPostModal(false)}>
                { loading ? <CircularProgress /> : 'Cancel' }
            </FormUpdateProfileButton>
            <FormUpdateProfileButton disabled={loading} wantedColor={'success'} onClick={handleCreateReply}>
                { loading ? <CircularProgress /> : 'Save' }
            </FormUpdateProfileButton>
        </Stack>
    )
}

export default CreateReplyContentActions;