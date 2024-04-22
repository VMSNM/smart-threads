import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CreatePostContent from './CreatePostContent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  margin: '30px 0 30px 0',
  borderRadius: '10px'
};

export default function CreatePostModal({openCreatePostModal, setOpenCreatePostModal}) {

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCreatePostModal}
        onClose={() => setOpenCreatePostModal(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{background: 'rgb(0,0,0, 0.8)', overflow:'auto' }}
      >
        <Fade in={openCreatePostModal}>
          <Box sx={style}>
            <CreatePostContent setOpenCreatePostModal={setOpenCreatePostModal} sx={{margin: '30px 0'}} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}