import { Stack, Box, Avatar, AvatarGroup, Divider, CircularProgress, styled, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Colors } from '../../../styles/theme';

const AvatarForSidebarReplies = styled(Avatar)(({ theme, top, bottom, right, left }) => ({
    position: 'absolute',
    width: '30px',
    height: '30px',
    top: top,
    bottom: bottom,
    right: right,
    left: left
}))

const UserPostSidebar = ({user, post, loading}) => {
    const navigate = useNavigate();
    return (
        <Stack justifyContent={'space-between'} flexGrow={0}>
        { loading ? 
            <>
                <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
                    <CircularProgress />
                </Box>
            </> 
            : 
            <>
                <Link to={`${user?.username}`} title='See profile'>
                    <Avatar 
                        name={user?.username}
                        src={user?.profilePic ? user.profilePic : '/noavatar.png' }
                        sx={{ width:'50px', height: '50px', cursor: 'pointer', ':hover': { border: `1px solid ${Colors.darkBlue}` } }}
                    />
                </Link>
                <Box flexGrow={2} display='flex' justifyContent='center' >
                    <Divider orientation='vertical' variant='middle' width=''/>
                </Box>
                { post?.replies?.length === 0 && <Typography variant='h6' textAlign={'center'}>🥱</Typography> }
                <AvatarGroup max={4} variant='circular' sx={{position:'relative'}}>
                    { post?.replies[0] && (
                        <Link to={`/${post?.replies[0]?.username}`}>
                            <AvatarForSidebarReplies title={post?.replies[0]?.username} src={post?.replies[0]?.userProfilePic} top={'-8px'} left={'7px'}/>
                        </Link>
                    )}

                    { post?.replies[1] && (
                        <Link to={`/${post?.replies[1]?.username}`}>
                            <AvatarForSidebarReplies title={post?.replies[1]?.username} src={post?.replies[1]?.userProfilePic} bottom={0} right={'-10px'} />
                        </Link>
                    )}

                    { post?.replies[2] && (
                        <Link to={`/${post?.replies[2]?.username}`}>
                            <AvatarForSidebarReplies title={post?.replies[2]?.username} src={post?.replies[2]?.userProfilePic} bottom={0} left={'-9px'} />
                        </Link>
                    )}
                    
                </AvatarGroup>
            </> 
        }
        </Stack>
    )
}

export default UserPostSidebar;