import { FormContainer, FormInputText, FormLink, FormShowPasswordIcon, FormSubmitButton, FormTitle } from "../styles/main";
import {  Box, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import useSignup from '../hooks/auth/useSignup';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });

    const { loading, signup } = useSignup();

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleSignup = async () => {
        await signup(formData);
    }

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <FormContainer>
                <FormTitle>Signup</FormTitle>

                <Stack direction={'row'} gap={2}>
                    <FormInputText required type="text" label="Full name" name="name" value={formData.name} onChange={handleFormData} />
                    <FormInputText required type="text" label="Username" name="username" value={formData.username} onChange={handleFormData} />
                </Stack>

                <FormInputText required type="email" label="Email" name="email" value={formData.email} onChange={handleFormData} />

                <Stack direction={'row'} position={'relative'} width={'100%'}>
                    <FormInputText required type={ showPassword ? 'text' : 'password' } label="Password" name="password" value={formData.password} onChange={handleFormData} />
                    <FormShowPasswordIcon>
                        {showPassword ? <VisibilityOff onClick={() => setShowPassword(false)} /> : <Visibility onClick={() => setShowPassword(true)} />}  
                    </FormShowPasswordIcon>
                </Stack>

                <FormSubmitButton disabled={loading} onClick={handleSignup}>
                    { loading ? <CircularProgress /> : 'Signup' }
                </FormSubmitButton>

                <Stack direction={'row'} justifyContent={'flex-start'} alignItems={'center'} gap={1}>
                    <Typography variant="body1" display={'flex'} gap={1}>
                    Already have an account? <FormLink to='/login' onClick={() => navigate('/login')}> Sign up </FormLink>
                    </Typography>
                </Stack>
            </FormContainer>
        </Box>
    )
}

export default Signup;