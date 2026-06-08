import React from 'react';
import { Box, Stack, Typography, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ErrorIcon from '@mui/icons-material/Error';
import VerifiedIcon from '@mui/icons-material/Verified';
import EmptyState from '../shared/EmptyState';
import { ValidationCheck, ValidationStatus } from '../../types';

interface ValidationTabProps {
  validations: ValidationCheck[];
}

const ICON: Record<ValidationStatus, React.ReactNode> = {
  pass: <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />,
  warn: <WarningIcon    sx={{ fontSize: 16, color: 'warning.main' }} />,
  fail: <ErrorIcon      sx={{ fontSize: 16, color: 'error.main'   }} />,
};

const BG: Record<ValidationStatus, string> = {
  pass: '#f0fdf4',
  warn: '#fffbeb',
  fail: '#fef2f2',
};

const BORDER: Record<ValidationStatus, string> = {
  pass: '#bbf7d0',
  warn: '#fde68a',
  fail: '#fecaca',
};

const ValidationTab: React.FC<ValidationTabProps> = ({ validations }) => {
  if (validations.length === 0) {
    return <EmptyState icon={<VerifiedIcon fontSize="inherit" />} message="TypeScript validation results appear here" />;
  }

  const passes  = validations.filter((v) => v.type === 'pass').length;
  const warns   = validations.filter((v) => v.type === 'warn').length;
  const fails   = validations.filter((v) => v.type === 'fail').length;

  return (
    <Box>
      {/* Summary row */}
      <Stack direction="row" spacing={1.5} mb={2}>
        <Paper variant="outlined" sx={{ px: 1.5, py: 1, borderRadius: 2, borderColor: '#bbf7d0', bgcolor: '#f0fdf4', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <CheckCircleIcon sx={{ fontSize: 15, color: 'success.main' }} />
          <Typography variant="caption" fontWeight={500} color="success.dark">{passes} passed</Typography>
        </Paper>
        <Paper variant="outlined" sx={{ px: 1.5, py: 1, borderRadius: 2, borderColor: '#fde68a', bgcolor: '#fffbeb', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <WarningIcon sx={{ fontSize: 15, color: 'warning.main' }} />
          <Typography variant="caption" fontWeight={500} color="warning.dark">{warns} warning{warns !== 1 ? 's' : ''}</Typography>
        </Paper>
        {fails > 0 && (
          <Paper variant="outlined" sx={{ px: 1.5, py: 1, borderRadius: 2, borderColor: '#fecaca', bgcolor: '#fef2f2', display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <ErrorIcon sx={{ fontSize: 15, color: 'error.main' }} />
            <Typography variant="caption" fontWeight={500} color="error.dark">{fails} error{fails !== 1 ? 's' : ''}</Typography>
          </Paper>
        )}
      </Stack>

      {/* Individual checks */}
      <Stack spacing={0.75}>
        {validations.map((v, i) => (
          <Box
            key={i}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1,
              px: 1.5, py: 1,
              borderRadius: 1.5,
              border: `1px solid ${BORDER[v.type]}`,
              bgcolor: BG[v.type],
            }}
          >
            {ICON[v.type]}
            <Typography variant="caption" sx={{ fontSize: 12 }}>{v.msg}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default ValidationTab;
