import { FormContainer, FormInputText, FormLink, FormShowPasswordIcon, FormSubmitButton, FormTitle, FormUpdateProfileButton } from "../styles/main";
import {  Avatar, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useState } from "react";
import useSignup from '../hooks/auth/useSignup';
import { useAuthContext } from "../context/AuthContext";
import { Colors } from "../styles/theme";
import useUpdateProfile from "../hooks/actions/useUpdateProfile";

const UpdatePage = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: authUser.name, username: authUser.username, email: authUser.email, bio: authUser.bio, password: '', profilePic: authUser.profilePic });
    
    const { loading, update } = useUpdateProfile();

    const handleFormData = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleUpdateProfile = async () => {
        await update(formData);
    }
    
    return (
        <Box display={'flex'} justifyContent={'center'}>
            <FormContainer>
                <FormTitle>Update Profile</FormTitle>

                <Stack direction={'row'} gap={2} width={'100%'} mb={2} alignItems={'center'}>
                    <Avatar
                        name='Mark Zuckerberg'
                        title='Mark Zuckerberg'
                        src={authUser.profilePic !== '' ? authUser.profilePic : '/noavatar.png'}
                        sx={{ width:'80px', height: '80px', display: 'flex', flexGrow: 0 }}
                    />
                    <Button sx={{display: 'flex', flexGrow: 1, height: '40px', background: Colors.dim_grey, color: 'white'}}>Change Avatar</Button>
                </Stack>

                <Stack direction={'row'} gap={2}>
                    <FormInputText required type="text" label="Full name" name="name" value={formData.name} onChange={handleFormData} />
                    <FormInputText required type="text" label="Username" name="username" value={formData.username} onChange={handleFormData} />
                </Stack>

                <FormInputText required type="email" label="Email" name="email" value={formData.email} onChange={handleFormData} />

                <FormInputText required type="text" label="Bio" name="bio" value={formData.bio} onChange={handleFormData} />

                <Stack direction={'row'} position={'relative'} width={'100%'}>
                    <FormInputText required type={ showPassword ? 'text' : 'password' } label="Password" name="password" value={formData.password} onChange={handleFormData} />
                    <FormShowPasswordIcon>
                        {showPassword ? <VisibilityOff onClick={() => setShowPassword(false)} /> : <Visibility onClick={() => setShowPassword(true)} />}  
                    </FormShowPasswordIcon>
                </Stack>

                <Stack direction={'row'} gap={2} width={'100%'}>
                    <FormUpdateProfileButton disabled={loading} onClick={() => navigate('/')}>
                        { loading ? <CircularProgress /> : 'Cancel' }
                    </FormUpdateProfileButton>
                    <FormUpdateProfileButton disabled={loading} onClick={handleUpdateProfile} wantedColor={'success'}>
                        { loading ? <CircularProgress /> : 'Save' }
                    </FormUpdateProfileButton>
                </Stack>
            </FormContainer>
        </Box>
    )
}

export default UpdatePage;