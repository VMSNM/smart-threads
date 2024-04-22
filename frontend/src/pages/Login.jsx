import { FormContainer, FormInputText, FormLink, FormShowPasswordIcon, FormSubmitButton, FormTitle } from "../styles/main";
import {  Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import useLogin from '../hooks/auth/useLogin';

const Login = () => {
    const navigate = useNavigate();
    const { loading, login } = useLogin()

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSignup = async () => {
      await login(formData);
    }

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <FormContainer>
                <FormTitle>Login</FormTitle>
                <FormInputText required type="text" label="Username" name="username" value={formData.username} onChange={handleFormData} />

                <Stack direction={'row'} position={'relative'} width={'100%'}>
                    <FormInputText required type={ showPassword ? 'text' : 'password' } label="Password" name="password" value={formData.password} onChange={handleFormData} />
                    <FormShowPasswordIcon>
                        {showPassword ? <VisibilityOff onClick={() => setShowPassword(false)} /> : <Visibility onClick={() => setShowPassword(true)} />}  
                    </FormShowPasswordIcon>
                </Stack>

                <FormSubmitButton disabled={loading} onClick={handleSignup}>
                    { loading ? <CircularProgress /> : 'Login' }
                </FormSubmitButton>

                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                    <Typography variant="body1" display={'flex'} gap={1}>
                    Don't have an account? <FormLink to='/login' onClick={() => navigate('/signup')}> Sign up </FormLink>
                    </Typography>
                </Stack>
            </FormContainer>
        </Box>
    )
}

export default Login;