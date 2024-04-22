import { Avatar, Box, Stack, Typography } from "@mui/material"
import { useAuthContext } from "../../../context/AuthContext";

const CreatePostContentHeader = () => {
    const { authUser: { name, username, profilePic } } = useAuthContext();
    
    return (
        <Stack direction='row' width={'100%'} gap={3} mb={2}>
            <Box display='flex' flexGrow={0}>
            <Avatar 
                name={username}
                title={username}
                src={profilePic}
                sx={{ width:'50px', height: '50px' }}
            />
            </Box>
            <Box display='flex' flexGrow={1} alignItems={'center'} gap={1}>
                <Typography variant="h6">{username}</Typography>
                <img src='/verified.png' style={{ width: '20px', height: '20px' }} />
            </Box>
        </Stack>
    )
}

export default CreatePostContentHeader