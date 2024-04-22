import styled from "@emotion/styled";
import { Stack, Box } from '@mui/material';
import { Colors } from "../theme";

export const HeaderNameAvatarWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%'
})

export const HeaderNameWrapper = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: 1
})

export const HeaderFollowersLinks = styled(Stack)({
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    margin: '20px 0'
})

export const HeaderTabs = styled(Stack)({
    flexDirection:'row', 
    width: '100%', 
    justifyContent: 'space-between'
})

export const HeaderTabWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'colorWanted'
})(({ theme, colorWanted }) => ({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    cursor: 'pointer',
    borderBottom: `1px solid ${colorWanted}`
}))