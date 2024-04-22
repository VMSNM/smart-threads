import styled from "@emotion/styled";
import { Colors } from "../theme";
import { Box, Stack, Button, TextField, Typography, Link } from "@mui/material";

export const AppContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent:'center',
    flexDirection: 'column',
    /* alignItems: 'center', */
    background: theme.palette.mode === 'dark' ? Colors.darkBack : Colors.white,
    maxWidth: '620px',
    margin: '0 auto',
    padding: '20px',
    paddingBottom: '50px'
}))

// FORMS
export const FormContainer = styled(Stack)(({ theme }) => ({
    width: '380px',
    minHeight: '300px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '25px',
    borderRadius: '10px',
    padding: '30px 20px',
    background: theme.palette.mode === 'dark' ? Colors.shaft : Colors.dove_gray,
    color: theme.palette.mode === 'dark' ? Colors.white : Colors.black,
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

export const FormSubmitButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '45px',
    fontSize: '16px',
    padding: '0 15px',
    /* background: theme.palette.mode === 'dark' ? Colors.dove_gray : Colors.shaft, */
    background: Colors.darkBlue,
    color: Colors.white,
}))

export const FormUpdateProfileButton = styled(Button, {
    shouldForwardProp: (props) => props !== 'wantedColor'
})(({ theme, wantedColor }) => ({
    width: '100%',
    height: '45px',
    fontSize: '16px',
    padding: '0 15px',
    /* background: theme.palette.mode === 'dark' ? Colors.dove_gray : Colors.shaft, */
    background: wantedColor === 'success' ? Colors.success : Colors.danger,
    color: Colors.white,
}))

export const FormTitle = styled(Typography)(({ theme }) => ({
    fontSize: '28px',
    color: theme.palette.mode === 'dark' ? Colors.white : Colors.black,
    textAlign: 'center',
    /* marginBottom: '0px' */
}))

export const FormInputText = styled(TextField)(({ theme }) => ({
    width: '100%',
    /* color: theme.palette.mode === 'dark' ? Colors.white : Colors.black,
    textAlign: 'center' */
}))

export const FormLink = styled(Link)(({ theme }) => ({
    color: Colors.darkBlue,
    cursor: 'pointer',
    textDecoration: 'none',
    ":hover": {
        color: theme.palette.mode === 'dark' ? Colors.dim_grey : Colors.shaft,
    }
}))

export const FormShowPasswordIcon = styled(Box)(({ theme }) => ({
    position: 'absolute', 
    right: '10px',
    top: '15px',
    cursor: 'pointer',
    ":hover": {
        fill: Colors.darkBlue,
        color: Colors.darkBlue,
    }
}))