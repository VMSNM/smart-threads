import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Colors } from '../../../styles/theme';
import CreateReplyContent from './CreateReplyContent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  margin: '30px 0 30px 0',
  borderRadius: '10px',
  minHeight: '200px'
};

export default function CreateReplyModal({post, setPost, page, openReplyPostModal, setOpenReplyPostModal, setUpdatedReplies}) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openReplyPostModal}
        onClose={() => setOpenReplyPostModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{background: 'rgb(0,0,0, 0.8)', overflow:'auto' }}
      >
        <Fade in={openReplyPostModal}>
          <Box sx={style}>
            <CreateReplyContent post={post} setPost={setPost} page={page} setOpenReplyPostModal={setOpenReplyPostModal} setUpdatedReplies={setUpdatedReplies} sx={{margin: '30px 0'}} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}