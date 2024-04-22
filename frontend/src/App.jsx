import './App.css';
import { Typography, Button, Box, Container, CssBaseline } from '@mui/material';
import { AppContainer } from './styles/main';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';
// Pages
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import UpdatePage from './pages/UpdatePage';
import PostPage from './pages/PostPage';
// Components
import Header from './components/header/headerlogo/Header';


function App() {
    const [mode, setMode] = useState('dark');
    const myTheme = createTheme({ palette: { mode: mode } });
    const { authUser } = useAuthContext();

    return (
      <ThemeProvider theme={myTheme}>
        <CssBaseline>
          <Box bgcolor={'background.default'} color={'text.primary'}>
            <AppContainer>
              <Header setMode={setMode} />
              <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/signup' element={authUser ? <Navigate to={'/'} /> : <Signup />} />
                <Route path='/login' element={authUser ? <Navigate to={'/'} /> : <Login />} />
                <Route path='/update' element={authUser ? <UpdatePage />  : <Navigate to={'/'} />} />
                <Route path='/:username' element={<UserPage />} />
                <Route path='/:username/post/:pid' element={<PostPage />} />
              </Routes>
            </AppContainer>
            <Toaster />
          </Box>
        </CssBaseline>
      </ThemeProvider>
    )
}

export default App;