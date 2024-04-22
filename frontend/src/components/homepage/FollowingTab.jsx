import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import useGetUser from "../../hooks/actions/useGetUser";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UsersCardMiniature from "./UsersCardMiniature";
import useGetFollowingUsers from "../../hooks/actions/useGetFollowingUsers";
import { HomepageDataContainer } from "../../styles/homepage";

const FollowingTab = () => {
    const {authUser} = useAuthContext();
    const [following, setFollowing] = useState([]);
    const {loading, getFollowingUsers} = useGetFollowingUsers();
    
    useEffect(() => {
        async function getFollowing () {
            if (!authUser) return null;
            const [success, data] = await getFollowingUsers();
            if (success) {
                setFollowing(data);
            }
        }
        getFollowing();
    }, [authUser]);

    if (loading) return (
        <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
        { !authUser && <Typography mt={2}> Not logged in </Typography> }

        { authUser && following.length === 0 && <Typography mt={2}>Currently not following anyone</Typography> }

        <HomepageDataContainer >
            { authUser && following && following.map((user, idx) => (
                <UsersCardMiniature key={idx} user={user} lastUser={idx === (following?.length - 1)} />
            ))}
        </HomepageDataContainer>
        </>
    )
}

export default FollowingTab;