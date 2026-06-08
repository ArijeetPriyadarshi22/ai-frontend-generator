import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { PipelineStep, StepStatus } from '../types';

interface PipelineBarProps {
  steps: PipelineStep[];
}

const DOT_COLOR: Record<StepStatus, string> = {
  idle:    '#9ca3af',
  running: '#f59e0b',
  done:    '#3B6D11',
  error:   '#ef4444',
};

const BG_COLOR: Record<StepStatus, string> = {
  idle:    'transparent',
  running: '#fef3c7',
  done:    '#d1fae5',
  error:   '#fee2e2',
};

const TEXT_COLOR: Record<StepStatus, string> = {
  idle:    '#9ca3af',
  running: '#92400e',
  done:    '#065f46',
  error:   '#991b1b',
};

const StepIndicator: React.FC<{ step: PipelineStep }> = ({ step }) => {
  const { status, label } = step;

  const icon =
    status === 'running' ? (
      <CircularProgress size={10} thickness={5} sx={{ color: '#92400e' }} />
    ) : status === 'done' ? (
      <CheckIcon sx={{ fontSize: 11, color: '#065f46' }} />
    ) : status === 'error' ? (
      <CloseIcon sx={{ fontSize: 11, color: '#991b1b' }} />
    ) : (
      <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: DOT_COLOR[status] }} />
    );

  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', gap: 0.75,
        px: 1.25, py: 0.625,
        borderRadius: 1.5,
        bgcolor: BG_COLOR[status],
        transition: 'all 0.2s',
      }}
    >
      {icon}
      <Typography
        variant="caption"
        fontWeight={500}
        sx={{ color: TEXT_COLOR[status], whiteSpace: 'nowrap', fontSize: 11 }}
      >
        {label}
      </Typography>
    </Box>
  );
};

const PipelineBar: React.FC<PipelineBarProps> = ({ steps }) => (
  <Box
    sx={{
      display: 'flex', alignItems: 'center', gap: 0.25,
      px: 2, py: 1.25,
      bgcolor: 'grey.50',
      borderBottom: '1px solid', borderColor: 'divider',
      overflowX: 'auto',
    }}
  >
    {steps.map((step, idx) => (
      <React.Fragment key={step.id}>
        <StepIndicator step={step} />
        {idx < steps.length - 1 && (
          <Typography sx={{ color: 'text.disabled', fontSize: 16, px: 0.25, userSelect: 'none' }}>›</Typography>
        )}
      </React.Fragment>
    ))}
  </Box>
);

export default PipelineBar;
