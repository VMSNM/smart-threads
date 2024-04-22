import { useEffect, useState } from "react";
import useGetFeedPosts from "../../hooks/actions/useGetFeedPosts";
import UserPost from "../posts/post/UserPost";
import { useAuthContext } from "../../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";

const FeedTab = () => {
    const { authUser } = useAuthContext();
    const [feedPosts, setFeedPosts] = useState(null);
    const { loading, getFeedPosts } = useGetFeedPosts();

    useEffect(() => {
        if (!authUser) return;
        const feedPosts = async () => {
            await getFeedPosts(setFeedPosts);
        }
        feedPosts();
    }, [authUser]);

    if (!authUser) return <Typography mt={2}> Not logged in </Typography>;

    if (loading) return (
        <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
        { feedPosts?.length === 0 && <Typography mt={0}> No post to feed, not following anyone at the moment </Typography> }
        { feedPosts && feedPosts.map((post, idx) => (
            <UserPost key={idx} post={post} />
        ))}
        </>
    )
}

export default FeedTab;