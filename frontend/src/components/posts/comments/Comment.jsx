import { Stack, Typography, Box, Avatar, Divider, Button, IconButton } from '@mui/material';
import UserPostFooter from '../post/UserPostFooter';
import CommentsHeader from './CommentsHeader';

const Comment = ({ reply, user, post, setPost, lastReply }) => {
    
    if (!reply) return null;

    return (
        <>
        <Box display='flex' width={'100%'} gap={2} alignContent={'center'} py={2}>
            <Box display='flex' flexGrow={0}>
                <Avatar 
                    name={reply?.username}
                    title={reply?.username}
                    src={reply?.userProfilePic}
                    sx={{ width:'40px', height: '40px' }}
                />
            </Box>
            <Stack width={'100%'}>
                <Box display='flex' flexGrow={1}>
                    <CommentsHeader reply={reply} user={user} post={post} />
                </Box>
                <Typography variant="body1">{reply?.text}</Typography>
                {/* <UserPostFooter showReplies={false} post={post} /> */}
            </Stack>
        </Box>
        { !lastReply && <Divider sx={{ margin: '20px 0' }}/> }
        </>
    )
}

export default Comment;