import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import { DialogContext } from '../ContextAPI/DialogContext';
import { useContext } from 'react';
import '../Style/dialog.css';
import CodeIcon from '@mui/icons-material/Code';

export default function AlertDialog() {
  const { open, handleClose } = useContext(DialogContext);
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogActions className='action-block'>
          <Button onClick={handleClose} autoFocus>
            <ClearIcon fontSize='large' />
          </Button>
        </DialogActions>
        <DialogTitle id="alert-dialog-title">
          {"Server is Down...."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className='content'>
              Since the database for our website is not hosted and is only available on localhost. As a result, you will only be able to access the static content. For a comprehensive demonstration of the website's full functionality, please refer to the accompanying video.
            </div>
            <div className='video-section'>
              <iframe className='demo-video' src="https://www.youtube.com/embed/1qbCtU1GQ78" title="Yatri-view | MERN Stack Project | Travel Blogging Site" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="allowfullscreen"></iframe>

              {/* <iframe className='demo-video' src="https://www.youtube.com/embed/bYk94_i5abcN4M" title="Demonstration Video" frameBorder="2" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen="allowfullscreen"></iframe> */}
            </div>
            <div className='code-section'>
              <span><a href='https://github.com/DeepakSharma72/YatriView-Client' style={{ textDecoration: 'none', color: 'inherit' }} target='_space'>Frontend Code <CodeIcon /></a></span>
              <span><a href='https://github.com/DeepakSharma72/YatriView-Server' style={{ textDecoration: 'none', color: 'inherit' }} target='space'>Backend Code <CodeIcon /></a></span>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}