import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { createContext, useContext } from 'react';

export const SnackBarContext = createContext();

export function SnackbarProvider(props) {
  const [open, setOpen] = React.useState({ Message: '', MsgType: '', active: false });
  function ActiveSnackBar(msg, msgtype) {
    setOpen({ Message: msg, MsgType: msgtype, active: true });
  }
  return (
    <SnackBarContext.Provider value={{ open, setOpen, ActiveSnackBar }}>
      {props.children}
    </SnackBarContext.Provider>
  )
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomizedSnackbars() {
  const {open, setOpen} = useContext(SnackBarContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen({...open, ['active']: false});
  };

  // success error warning info success
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open.active} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={open.MsgType} sx={{ width: '100%' }}>
          {open.Message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}