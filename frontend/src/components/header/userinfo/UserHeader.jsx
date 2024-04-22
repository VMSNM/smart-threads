import { Stack, Typography, Box, Avatar, IconButton, CircularProgress, Button } from '@mui/material';
import { Colors } from '../../../styles/theme';
import { Link, useParams } from 'react-router-dom';
import { HeaderNameAvatarWrapper, HeaderNameWrapper, HeaderFollowersLinks, HeaderTabs, HeaderTabWrapper } from '../../../styles/userheader';
import UserHeaderOptionsButton from './UserHeaderOptionsButton';
import { useTheme } from '@emotion/react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UserHeaderFollow from './UserHeaderFollow';
import useGetUser from '../../../hooks/actions/useGetUser';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useUserPageContext } from '../../../context/UserPageContext';
import CreatePostModal from '../../posts/createpost/CreatePostModal';

const UserHeader = () => {
    const isDarkTheme = useTheme().palette.mode === 'dark';
    const { authUser } = useAuthContext();
    const { user } = useUserPageContext();
    
    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);

    return (
        <Stack alignItems={'flex-start'} mb={4}>
            <HeaderNameAvatarWrapper>
                <HeaderNameWrapper>
                    <Typography variant='h5' fontWeight={'bold'}>{user?.name}</Typography>
                    <Box display={'flex'} gap={1} alignItems={'center'} justifyContent={'center'} mt={1}>
                        <Typography variant='body2'>@{user?.username}</Typography>
                        <Typography variant='caption' sx={{ padding: '2px 5px', background: Colors.primary, borderRadius: '3px' }}>threads.next</Typography>
                    </Box>
                </HeaderNameWrapper>
                <Avatar 
                    name={user?.name}
                    title={user?.name}
                    src={user?.profilePic}
                    sx={{ width:'100px', height: '100px' }}
                />
            </HeaderNameAvatarWrapper>
            <Typography variant='body1'>{user?.bio}</Typography>
            <HeaderFollowersLinks>
                <Box display={'flex'} gap={1} alignItems={'center'}>
                    <Typography variant='body2' color={Colors.dim_grey}>{user?.followers?.length} followers</Typography>
                    <Box width={'5px'} height={'5px'} borderRadius={'50%'} sx={{ background: Colors.dim_grey }}/>
                    <Link to={'/'} sx={{ textDecoration: 'none' }}>
                        <Typography variant='body2' color={Colors.dim_grey}>instagram.com</Typography>
                    </Link>
                </Box>
                <Box display={'flex'} position={'relative'} alignItems={'center'}>
                    { authUser?._id === user?._id  && (
                        <>
                        <CreatePostModal openCreatePostModal={openCreatePostModal} setOpenCreatePostModal={setOpenCreatePostModal} />
                        <IconButton title='Create new post' onClick={() => setOpenCreatePostModal(true)}>
                            <PostAddIcon />
                        </IconButton>
                        </>
                    )}
                    <UserHeaderFollow />
                    <UserHeaderOptionsButton />
                </Box>
            </HeaderFollowersLinks>

            <HeaderTabs>
                <HeaderTabWrapper colorWanted={isDarkTheme ? Colors.white : Colors.dark}>
                    <Typography variant='body1' fontWeight='bold'>Threads</Typography>
                </HeaderTabWrapper>
                <HeaderTabWrapper colorWanted={Colors.dim_grey}>
                    <Typography variant='body1' fontWeight='bold' color={Colors.dim_grey}>Replies</Typography>
                </HeaderTabWrapper>
            </HeaderTabs>
        </Stack>
    )
}

export default UserHeader;