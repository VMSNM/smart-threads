import { useParams } from "react-router-dom";
import Comments from "../components/posts/comments/Comments";
import UserPostFooter from "../components/posts/post/UserPostFooter";
import UserPostsHeader from "../components/posts/post/UserPostHeader"
import { Colors } from "../styles/theme";
import { PostImageContainer } from "../styles/userposts"
import { Stack, Typography, Box, Avatar, Divider, Button, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import useGetPost from "../hooks/actions/useGetPost";
import useGetUser from "../hooks/actions/useGetUser";

const PostPage = () => {
  const { username, pid } = useParams();
  const [post, setPost] = useState();
  const [user, setUser] = useState(null);
  const { loading, getPost } = useGetPost();
  const [loadingUser, setLoadingUser] = useState(false);
  const { getUser } = useGetUser();

  useEffect(() => {
    const getPostById = async () => {
      await getPost(pid, setPost);
    }
    getPostById();
  }, []);

  useEffect(() => {
    if (!post) return;
    const getUserData = async () => {
      setLoadingUser(true);
      await getUser(username, setUser);
      setLoadingUser(false);
    }
    getUserData();
  }, [post]);
  return (
    <>
      { (loading || loadingUser) && (
          <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
          </Box>
      )}

      {/* POST HEADER AND CONTENT */}
      { (post && user) && (
      <>
        <Stack>
          <Stack direction='row' width={'100%'} gap={2} mb={2}>
            <Box display='flex' flexGrow={0}>
              <Avatar 
                  name={user?.username}
                  title={user?.username}
                  src={user?.profilePic}
                  sx={{ width:'50px', height: '50px' }}
              />
            </Box>
            <Box display='flex' flexGrow={1}>
              <UserPostsHeader user={user} post={post} />
            </Box>
          </Stack>
          <Typography variant='body1'>{post?.text}</Typography>
          <PostImageContainer src={post?.img} />
          <UserPostFooter user={user} post={post} setPost={setPost} page='postPage' />
        </Stack>
        <Divider sx={{ margin: '20px 0' }}/>
        
        {/* POST APP BANNER 👏*/}
        <Stack direction='row' justifyContent='space-between' alignContent='center'>
          <Typography variant="body1" color={Colors.dim_grey}>👏 Get the app to like, reply and post!</Typography>
          <Button variant="contained" sx={{ background: Colors.shaft, color: Colors.white }}>Get</Button>
        </Stack>
        <Divider sx={{ margin: '20px 0' }}/>

        {/* COMMENTS SECTIONS 👏*/}
        <Comments user={user} post={post} setPost={setPost} />
      </>
      )}
    </>
  )
}

export default PostPage