import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import UsersCardMiniature from "./UsersCardMiniature";
import useGetFollowers from "../../hooks/actions/useGetFollowers";
import { HomepageDataContainer } from "../../styles/homepage";

const FollowersTab = () => {
    const {authUser} = useAuthContext();

    const [followers, setFollowers] = useState([]);
    const {loading, getFollowers} = useGetFollowers();

    useEffect(() => {
        async function getFollowersUsers () {
            if (!authUser) return null;
            const [success, data] = await getFollowers();
            if (success) {
                setFollowers(data);
            }
        }
        getFollowersUsers();
    }, [authUser]);

    if (loading) return (
        <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
        { !authUser && <Typography mt={2}> Not logged in </Typography> }

        { authUser && followers.length === 0 && <Typography mt={2}>Currently no one is following you</Typography> }

        <HomepageDataContainer >
            { authUser && followers && followers.map((user, idx) => (
                    <UsersCardMiniature key={idx} user={user} lastUser={idx === (followers?.length - 1)} />
            ))}
        </HomepageDataContainer>
        </>
    )
}

export default FollowersTab;