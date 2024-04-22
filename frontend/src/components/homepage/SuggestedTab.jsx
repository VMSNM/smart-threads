import React, { useEffect, useState } from 'react'
import useGetSuggestUsers from '../../hooks/actions/useGetSuggestedUsers';
import { Box, CircularProgress, Typography } from '@mui/material';
import UsersCardMiniature from './UsersCardMiniature';
import { Link } from 'react-router-dom';
import { HomepageDataContainer } from '../../styles/homepage';

const SuggestedTab = () => {
    const [suggested, setSuggested] = useState(null);
    const { loading, getSuggestedUsers } = useGetSuggestUsers();

    useEffect(() => {
        const getUsers = async () => {
            await getSuggestedUsers(setSuggested);
        }
        getUsers();
    }, []);
    
    if (loading) return (
        <Box display={'flex'} width={'100%'} height={'300px'} alignItems={'center'} justifyContent={'center'}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
        <HomepageDataContainer >
            { suggested && suggested.map((user, idx) => (
                <UsersCardMiniature key={idx} user={user} lastUser={idx === (suggested?.length - 1)}/>
            ))}
        </HomepageDataContainer>
        </>
    )
}

export default SuggestedTab