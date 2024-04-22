import { Divider, Typography } from '@mui/material';
import { useState } from "react";
import CreatePostContentHeader from '../createpost/CreatePostContentHeader';
import CreateReplyContentData from './CreateReplyContentData';
import CreateReplyContentActions from './CreateReplyContentActions';

const CreateReplyContent = ({post, setPost, page, setOpenReplyPostModal, setUpdatedReplies}) => {
    const [formData, setFormData] = useState({ text: '' })

    return (
        <>
        <CreatePostContentHeader />
        <Divider /> 
        <CreateReplyContentData formData={formData} setFormData={setFormData} />
        <CreateReplyContentActions post={post} setPost={setPost} page={page} formData={formData} setOpenReplyPostModal={setOpenReplyPostModal} setUpdatedReplies={setUpdatedReplies} />
        </>
    )
}

export default CreateReplyContent;