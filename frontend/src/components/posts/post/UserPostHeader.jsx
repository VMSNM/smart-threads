import { Stack, Box, Typography, Avatar, AvatarGroup, Divider, IconButton } from '@mui/material';
import { Colors } from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import UserPostDeleteButton from './UserPostDeleteButton';
import { useUserPostsContext } from '../../../context/UserPostsContext';

const UserPostsHeader = ({user, post}) => {
  if (!user) return null;
  
  return (
    
    <Stack direction='row' minHeight={'30px'} justifyContent={'space-between'} mb={2} width={'100%'}>
        <Link to={`/${user?.username}`} title='See profile'>
          <Box display={'flex'} alignItems={'center'} gap={1}>
              <Typography variant='h6' title={`See profile`} sx={{cursor: 'pointer'}} >
                  {user?.name}
                </Typography>
              <img src='/verified.png' style={{ width: '20px', height: '20px' }} />
          </Box>
        </Link>
        <Box display={'flex'} alignItems={'center'} gap={1}>
            { post?.createdAt && <Typography variant='subtitle' color={Colors.dim_grey}>{formatDistanceToNow(new Date(post?.createdAt))} ago</Typography> }

            <UserPostDeleteButton user={user} post={post} />
        </Box>
    </Stack>

  )
}

export default UserPostsHeader;