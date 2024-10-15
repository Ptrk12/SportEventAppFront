import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

interface PopupProps {
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  open: boolean;
  handleClose: () => void;
}

const PopupInfo: React.FC<PopupProps> = ({ message, severity, open, handleClose }) => {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <Snackbar
      open={show}
      autoHideDuration={3000} 
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default PopupInfo;
