import { Divider } from '@mui/material';
import { useState } from "react";
import CreatePostContentHeader from "./CreatePostContentHeader";
import CreatePostContentActions from "./CreatePostContentActions";
import CreatePostContentData from "./CreatePostContentData";

const CreatePostContent = ({setOpenCreatePostModal}) => {
    const [formData, setFormData] = useState({ text: '', img: '' })

    return (
        <>
        <CreatePostContentHeader />
        <Divider />
        <CreatePostContentData formData={formData} setFormData={setFormData} />
        <CreatePostContentActions formData={formData} setOpenCreatePostModal={setOpenCreatePostModal} />
        </>
    )
}

export default CreatePostContent;