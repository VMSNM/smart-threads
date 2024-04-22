import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Divider } from '@mui/material';
import Navbar from "./Navbar";
import { useAuthContext } from "../../../context/AuthContext";

const LogoContainer = styled('img')({
    width: '40px', height:'40px', margin: '30px 0', cursor: 'pointer'
})

const Header = ({ setMode }) => {
    const isDarkTheme = useTheme().palette.mode === 'dark';
    const {authUser} = useAuthContext();

    return (
        <>
        <Box display='flex' justifyContent='center' position={'relative'} alignItems={'center'} mb={2}>
            <LogoContainer 
                src={isDarkTheme ? '/light-logo.svg' : '/dark-logo.svg'} 
                title={isDarkTheme ? 'Light Mode' : 'Dark Mode'} 
                onClick={() => { console.log(authUser); setMode((prev) => prev === 'dark' ? 'light' : 'dark')}}
            />
            <Navbar />
        </Box>
        {/* <Divider /> */}
        </>
    )
}

export default Header;