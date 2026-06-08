import React from 'react';
import { AppBar, Toolbar, Typography, Chip, Box, Stack } from '@mui/material';
import { Memory } from '@mui/icons-material';
import { PipelineStatus } from '../types';

interface TopbarProps {
  pipelineStatus: PipelineStatus;
}

const STATUS_CONFIG: Record<PipelineStatus, { label: string; color: 'default' | 'info' | 'success' | 'error' }> = {
  idle:    { label: 'Pipeline ready',   color: 'default' },
  running: { label: 'Pipeline running', color: 'info'    },
  done:    { label: 'Pipeline done',    color: 'success' },
  error:   { label: 'Pipeline error',   color: 'error'   },
};

const Topbar: React.FC<TopbarProps> = ({ pipelineStatus }) => {
  const { label, color } = STATUS_CONFIG[pipelineStatus];

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar variant="dense" sx={{ minHeight: 52, gap: 1.5 }}>
        <Memory sx={{ color: 'text.secondary', fontSize: 20 }} />

        <Typography variant="subtitle2" fontWeight={500} color="text.primary" sx={{ letterSpacing: '-0.2px' }}>
          CoCreate — AI Frontend Generator
        </Typography>

        <Stack direction="row" spacing={0.75}>
          <Chip label="MCP" size="small" color="info"    variant="outlined" sx={{ height: 20, fontSize: 11 }} />
          <Chip label="RAG" size="small" color="warning" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
          <Chip label="LLM" size="small" color="success" variant="outlined" sx={{ height: 20, fontSize: 11 }} />
        </Stack>

        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 8, height: 8, borderRadius: '50%',
              bgcolor: color === 'success' ? 'success.main'
                     : color === 'error'   ? 'error.main'
                     : color === 'info'    ? 'info.main'
                     : 'text.disabled',
            }}
          />
          <Typography variant="caption" color="text.secondary">{label}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
