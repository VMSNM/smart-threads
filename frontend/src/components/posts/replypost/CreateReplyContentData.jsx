import { Box, Input, Stack, TextField, Typography } from "@mui/material";
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import toast from "react-hot-toast";
import { Colors } from "../../../styles/theme";

const CreateReplyContentData = ({ formData, setFormData }) => {
    const MAX_CHARS = 500;
    const [remainingChars, setRemaingChars] = useState(MAX_CHARS);

    const handleFormData = (e) => {
      e.preventDefault();
      const { name, value } = e.target;
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
        </>
    )
}

export default CreateReplyContentData;