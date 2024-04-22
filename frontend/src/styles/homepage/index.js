import { Box, Stack, styled } from "@mui/material";
import { Colors } from "../theme";

export const HomepageDataContainer = styled(Box)(({ theme }) => ({
    display:'flex',
    width:'100%',
    flexWrap:'wrap',
    justifyContent:'flex-start',
    alignItems:'center',
    gap:'20px',
    mt: '20px',
}))

export const UsersCardContainer = styled(Stack)(({ theme }) => ({
    cursor:'pointer',
    flexDirection: 'row',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    gap:'20px',
    padding: '20px',
    width: '40%',
    background: theme.palette.mode === 'dark' ? Colors.shaft : Colors.dove_gray,
    borderRadius:'10px',
    transition: '0.5s ease-in-out',
    ':hover': { background: Colors.darkBlue },
}))