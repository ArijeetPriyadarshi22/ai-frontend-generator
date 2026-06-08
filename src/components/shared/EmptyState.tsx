import React from 'react';
import { Box, Typography } from '@mui/material';

interface EmptyStateProps {
  icon: React.ReactNode;
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, message }) => (
  <Box
    sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', py: 6, gap: 1.5, color: 'text.disabled',
    }}
  >
    <Box sx={{ fontSize: 32 }}>{icon}</Box>
    <Typography variant="body2" color="text.disabled">{message}</Typography>
  </Box>
);

export default EmptyState;
