"use client";

import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import MessageIcon from '@mui/icons-material/Message';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

const actions = [
  { icon: <MessageIcon />, name: 'Line', link: 'https://lin.ee/eMhqQpj' },
  { icon: <FacebookIcon />, name: 'Facebook', link: 'https://www.facebook.com/profile.php?id=61571963492436' },
  { icon: <EmailIcon />, name: 'Email', link: 'mailto:Truetelemart@hotmail.com' },
];

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

export default function BasicSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const handleClick = (action: { name: string; link: string }) => {
    if (action.link.startsWith('tel:')) {
      const phoneNumber = action.link.replace('tel:', '');
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(phoneNumber)
          .then(() => {
            setMessage('คัดลอกเบอร์โทรเรียบร้อยแล้ว');
            setOpen(true);
          })
          .catch(() => {
            setMessage('เกิดข้อผิดพลาดในการคัดลอกเบอร์โทร');
            setOpen(true);
          });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setMessage('คัดลอกเบอร์โทรเรียบร้อยแล้ว');
          setOpen(true);
       
        } catch (err) {
          console.error(err);
          setMessage('ไม่สามารถคัดลอกเบอร์โทรได้');
          setOpen(true);
        }
        document.body.removeChild(textArea);
      }
    } else {
      window.open(action.link, '_blank', 'noopener,noreferrer');
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        '& .MuiSpeedDial-fab': {
          bgcolor: '#FB4141',
          '&:hover': {
            bgcolor: '#343131',
          },
        },
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<ContactSupportIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleClick(action)}
          />
        ))}
      </SpeedDial>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
