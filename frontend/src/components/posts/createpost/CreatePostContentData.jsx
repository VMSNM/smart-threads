import { Box, Input, Stack, TextField, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import toast from "react-hot-toast";
import { Colors } from "../../../styles/theme";

const CreatePostContentData = ({ formData, setFormData }) => {
    const [previewImage, setPreviewImage] = useState(false);
    const validatePreview = () => {
      if (formData?.img === '') return toast.error('Please fill the image url field');
      setPreviewImage(true);
    }

    const MAX_CHARS = 500;
    const [remainingChars, setRemaingChars] = useState(MAX_CHARS);

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
      if (name === 'img') {
        setFormData({...formData, [name]: value});
        setPreviewImage(false);
        return;
      }
      const postText = value;
      if (postText.length > MAX_CHARS) {
        const truncatedText = postText.slice(0, MAX_CHARS);
        setFormData({...formData, [name]: truncatedText})
        setRemaingChars(0);
      }
      else {
        setFormData({...formData, [name]: value})
        setRemaingChars(MAX_CHARS - postText.length)
      }
      
    }

    return (
        <>
        <TextField
          id="outlined-multiline-static"
          label="What's on your mind?"
          multiline
          rows={4}
          value={formData?.text}
          name='text'
          sx={{ width: '100%', marginTop: '30px' }}
          onChange={handleFormData}
        />
        <Typography display={'flex'} justifyContent={'flex-end'} mt={1} variant="caption">{remainingChars}/{MAX_CHARS}</Typography>
        { !previewImage && (
          <>
          <Stack direction={'row'} width={'100%'} mt={4} justifyContent={'space-between'} alignItems={'center'} gap={2}>
            <Input
              id="outlined-static"
              label="Image url"
              placeholder="Image url"
              value={formData?.img}
              name='img'
              sx={{ flexGrow: 2 }}
              onChange={handleFormData}
            />
            <ImageIcon sx={{ flexGrow: 0, fontSize: '40px', cursor: 'pointer', ':hover': {color:Colors.shaft} }} onClick={validatePreview} /> 
          </Stack>
          </>
        )}
        
        { previewImage && (
          <>
          <Stack sx={{position: 'relative'}}>
            <CloseIcon sx={{ position:'absolute', top: 20, right: 5, zIndex: 999, fontSize: '40px', cursor: 'pointer', ':hover': {color:Colors.shaft} }} onClick={() => {setFormData({...formData, 'img': ''}); setPreviewImage(false); }} />
            <Box width={'100%'} display={'flex'} justifyContent={'center'} position={'relative'} mt={2} mb={2}>
              <img src={formData?.img} style={{ width: '100%', border: `1px solid ${Colors.light_gray}`, borderRadius: '3px' }} />   
            </Box>
          </Stack>
          </>
        )}
        </>
    )
}

export default CreatePostContentData;