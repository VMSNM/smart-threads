import { Avatar, Stack, Typography } from "@mui/material";
import { Colors } from "../../styles/theme";
import { useAuthContext } from "../../context/AuthContext";
import { UsersCardContainer } from "../../styles/homepage";
import { useNavigate } from "react-router-dom";
import UsersCardMiniatureFollowing from "./UsersCardMiniatureFollowing";
import { formatDistanceToNow } from 'date-fns';

const UsersCardMiniature = ({user}) => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();

    if (authUser?._id === user?._id) return null;

    return (
        <UsersCardContainer onClick={() => navigate(`/${user?.username}`)} title={'See profile'}>
            <Avatar 
                name={user?.username}
                title={user?.username}
                src={user?.profilePic}
                sx={{ width:'75px', height:'75px' }}
            />
            <Stack>
                <Typography variant="h6">{user?.username}</Typography>
                <Typography variant="subtitle2" color={Colors.success}>{user?.followers.length} followers</Typography>
                <Typography variant="caption" color={Colors.muted}>User since: {formatDistanceToNow(new Date(user?.createdAt))} ago</Typography>
            </Stack>
            

            {/* <UsersCardMiniatureFollowing user={user} /> */}
        </UsersCardContainer>
    )
}

export default UsersCardMiniature;