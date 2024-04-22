import { Stack, Box, Typography, Avatar, AvatarGroup, Divider, IconButton } from '@mui/material';
import { Colors } from '../../../styles/theme';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import UserPostDeleteButton from '../post/UserPostDeleteButton';

const CommentsHeader = ({reply, user, post}) => {
  
  if (!reply) return null;
  
  return (
    
    <Stack direction='row' minHeight={'30px'} justifyContent={'space-between'} mb={2} width={'100%'}>
        <Link to={`/${reply?.username}`} title='See profile'>
          <Box display={'flex'} alignItems={'center'} gap={1}>
              <Typography variant='h6' title={`See profile`} sx={{cursor: 'pointer'}} >
                  {reply?.username}
                </Typography>
              <img src='/verified.png' style={{ width: '20px', height: '20px' }} />
          </Box>
        </Link>
        <Box display={'flex'} alignItems={'center'} gap={1}>
            { reply?.createdAt && <Typography variant='subtitle' color={Colors.dim_grey}>{formatDistanceToNow(new Date(post?.createdAt))} ago</Typography> }

            {/* <UserPostDeleteButton user={user} post={post} /> */}
        </Box>
    </Stack>

  )
}

export default CommentsHeader;