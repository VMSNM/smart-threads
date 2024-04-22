import { Stack, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { Colors } from '../../../styles/theme';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LoopBorderOutlinedIcon from '@mui/icons-material/Loop';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import toast from 'react-hot-toast';
import useLikeDislikePost from '../../../hooks/actions/useLikeDislikePost';
import CreateReplyModal from '../replypost/CreateReplyModal';

const UserPostFooter = ({ post, setPost, page, showReplies = true }) => {
    const { authUser } = useAuthContext();
    const [liked, setLiked] = useState(post?.likes.includes(authUser?._id));
    const [updatedLikes, setUpdatedLikes] = useState(post?.likes.length)
    const { loading, likeDislikePost } = useLikeDislikePost();

    const handleLikes = async () => {
        if (!authUser) return toast.error('You must be logged in to like a post')
        const success = await likeDislikePost(post?._id);
        if (success) {
            setLiked((prev) => !prev);
            liked ? setUpdatedLikes((prev) => prev - 1) : setUpdatedLikes((prev) => prev + 1)
        }
    }

    const [openReplyPostModal, setOpenReplyPostModal] = useState(false);
    const [updatedReplies, setUpdatedReplies] = useState(post?.replies.length);

    return (
        <Stack onClick={(e) => e.preventDefault()}>
            <Box display='flex' gap={1} mt={2} mb={1}>
                <IconButton onClick={handleLikes} sx={{padding: 0}}>
                    { loading ? 
                        <CircularProgress size={20} /> : 
                        <>
                        { liked ? <FavoriteIcon sx={{color: Colors.danger}} /> : <FavoriteBorderOutlinedIcon /> }
                        </> 
                    }
                </IconButton>

                <CreateReplyModal post={post} setPost={setPost} page={page} openReplyPostModal={openReplyPostModal} setOpenReplyPostModal={setOpenReplyPostModal} setUpdatedReplies={setUpdatedReplies} />
                <IconButton 
                    sx={{padding: 0}}
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenReplyPostModal(true);
                    }}
                >
                    <ChatBubbleOutlineOutlinedIcon />
                </IconButton>

                <IconButton sx={{padding: 0}}><LoopBorderOutlinedIcon /></IconButton>
                <IconButton sx={{padding: 0}}><NearMeOutlinedIcon /></IconButton>
            </Box>
            <Box display='flex' gap={1} alignItems={'center'} mt={1}>
                { showReplies ? 
                    <>
                        <Typography variant='body2' color={Colors.dim_grey}>{updatedReplies} replies</Typography>
                        <Box width={'5px'} height={'5px'} borderRadius={'50%'} sx={{ background: Colors.dim_grey }}/>
                    </> 
                    : <></> 
                }
                <Typography variant='body2' color={Colors.dim_grey}>{updatedLikes} likes</Typography>
            </Box>
        </Stack>
    )
}

export default UserPostFooter;