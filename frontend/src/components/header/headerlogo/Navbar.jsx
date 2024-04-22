import { Avatar, Divider, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../../hooks/auth/useLogout';
import CreatePostModal from '../../posts/createpost/CreatePostModal';

const Navbar = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { authUser } = useAuthContext();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    return (
        <>
        <IconButton title='Feed' sx={{ position: 'absolute', top: '30px', left: 0 }} onClick={() => navigate('/')} >
            <HomeIcon />
        </IconButton>

        <Stack direction={'row'} sx={{ position: 'absolute', top: '30px', right: 0 }} alignItems={'center'} >
            { authUser && 
                <Avatar 
                    src={authUser?.profilePic}
                    sx={{width:'40px', height:'40px', cursor:'pointer'}}
                    onClick={(e) => {e.preventDefault(); setAnchorEl(e.currentTarget)}} 
                /> 
            }
            { !authUser && (
                <IconButton onClick={(e) => {e.preventDefault(); setAnchorEl(e.currentTarget)}} >
                    <MenuIcon />
                </IconButton>
            )}
        </Stack>

        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            MenuListProps={{'aria-labelledby': 'basic-button'}} sx={{ marginTop:'10px' }}
        >
            { authUser &&  <MenuItem onClick={() => { setAnchorEl(null); navigate(`/${authUser.username}`) }}>My Page</MenuItem> }
            { authUser &&  <MenuItem onClick={() => { setAnchorEl(null); navigate('/update') }}>Update Profile</MenuItem> }
            { authUser &&  <Divider variant='middle' /> }
            { authUser &&  <MenuItem onClick={() => { setAnchorEl(null); logout(); navigate('/') }}>Logout</MenuItem> }
            { !authUser &&  <MenuItem onClick={() => { setAnchorEl(null); navigate('/login') }}>Login</MenuItem> }
        </Menu>
        </>
    )
}

export default Navbar