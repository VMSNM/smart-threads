import { Stack, Typography, Divider, Box, CircularProgress } from '@mui/material';
import UserPostSidebar from './UserPostSidebar';
import UserPostsHeader from './UserPostHeader';
import UserPostFooter from './UserPostFooter';
import { PostImageContainer } from '../../../styles/userposts';
import { Link } from 'react-router-dom';
import useGetUser from '../../../hooks/actions/useGetUser';
import { useEffect, useState } from 'react';

const UserPost = ({ post }) => {
    const { loading, getUser } = useGetUser();
    const [user, setUser] = useState();

    useEffect(() => {
        const result = async () => {
            await getUser(post?.postedBy, setUser);
        };
      result();
    }, []);

    if (loading) return (
        <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
        <Stack direction='row' gap={4} mt={0} mb={8}>
            <UserPostSidebar user={user} post={post} loading={loading} />
            <Stack flexGrow={1}>
                <UserPostsHeader user={user} post={post} />
                <Link to={`/${user?.username}/post/${post?._id}`} title='See post'>
                    { post && <Typography variant='body1'>{post?.text}</Typography> }  
                    { post?.img !== '' && <PostImageContainer src={`${post?.img}`} /> }
                </Link>
                <UserPostFooter post={post} />
            </Stack>
        </Stack>
        <Divider orientation='horizontal' sx={{marginBottom: '20px'}} />
        </>
    )
}

export default UserPost;