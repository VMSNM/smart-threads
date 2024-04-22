import { useNavigate, useParams } from "react-router-dom";
import UserPost from "./post/UserPost";
import { Stack, Divider, Box, CircularProgress, Typography } from '@mui/material';
import useGetUserPosts from "../../hooks/actions/useGetUserPosts";
import { useEffect, useState } from "react";
import { useUserPostsContext } from "../../context/UserPostsContext";

const UserPosts = () => {
  const {posts, setPosts} = useUserPostsContext();
  const { username } = useParams();
  const { loading, getUserPosts } = useGetUserPosts();

  useEffect(() => {
    const feedPosts = async () => {
      await getUserPosts(username, setPosts);
    }
    feedPosts();
  }, [username]);

  if (loading) return (
    <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
        <CircularProgress />
    </Box>
  );

  if (!posts) return null;

  return (
    <>
    { posts.length === 0 && <Typography variant="body" mt={0}>User has no posts</Typography> }
    { posts && posts.map((post, idx) => (
      <UserPost key={idx} post={post} />
    ))}
    </>
  )
}

export default UserPosts;