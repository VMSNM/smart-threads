import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from '@mui/material';
import React from 'react';
import toast from 'react-hot-toast';

const UserHeaderOptionsButton = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const copyURL = () => {
        setAnchorEl(null);
        const currentURL = window.location.href;
        navigator.clipboard.writeText(currentURL)
            .then(() => { toast.success('Profile copied to clipboard') })
            .catch((error) => toast.error(`Something went wrong - ${error}`));
    }

    return (
        <>
            <IconButton onClick={(e) => {e.preventDefault(); setAnchorEl(e.currentTarget)}}>
                <MoreHorizIcon sx={{ border: '2px solid white', borderRadius: '50%', fontSize: '18px' }} />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={copyURL}>Copy link</MenuItem>
            </Menu>
        </>
    )
}

export default UserHeaderOptionsButton