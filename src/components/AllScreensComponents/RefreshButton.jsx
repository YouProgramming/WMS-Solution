import React from 'react';
import { Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const RefreshButton = ({ onRefresh }) => {
  return (
    <Button
      variant="contained"
      startIcon={<RefreshIcon />}
      onClick={onRefresh}
      size="medium"
      sx={{
        backgroundColor: '#2563eb',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1d4ed8',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
        },
        '&:active': {
          transform: 'translateY(0)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },
      }}
    >
      Refresh
    </Button>
  );
};

export default RefreshButton;
