import React from 'react';
import { Box, Paper, Typography, Chip, LinearProgress, Stack } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';
import EmptyState from '../shared/EmptyState';
import { ComponentSpec } from '../../types';

interface RagTabProps {
  retrieved: ComponentSpec[];
}

const FW_COLOR: Record<string, 'default' | 'primary' | 'secondary' | 'info' | 'warning'> = {
  'MUI':           'info',
  'React':         'primary',
  'Stencil.js':    'secondary',
  'MUI+React':     'info',
  'React+Chart.js':'warning',
};

const RagTab: React.FC<RagTabProps> = ({ retrieved }) => {
  if (retrieved.length === 0) {
    return <EmptyState icon={<StorageIcon fontSize="inherit" />} message="RAG-retrieved components appear here" />;
  }

  return (
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: 11 }}>
        Ranked by cosine similarity to prompt embedding · threshold 0.12
      </Typography>

      <Stack spacing={1}>
        {retrieved.map((comp) => {
          const pct = Math.round((comp.score ?? 0) * 100);
          return (
            <Paper key={comp.name} variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                {/* Left: name + desc + props */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.4 }}>
                    <Typography variant="body2" fontWeight={600}>{comp.name}</Typography>
                    <Chip
                      label={comp.fw}
                      size="small"
                      color={FW_COLOR[comp.fw] ?? 'default'}
                      variant="outlined"
                      sx={{ height: 18, fontSize: 10 }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" display="block" mb={0.5}>
                    {comp.desc}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" sx={{ fontFamily: 'monospace', fontSize: 11 }}>
                    {comp.props.slice(0, 2).join(' · ')}
                  </Typography>
                </Box>

                {/* Right: score bar */}
                <Box sx={{ width: 72, flexShrink: 0, textAlign: 'right' }}>
                  <Typography variant="caption" fontWeight={600} color={pct >= 70 ? 'success.main' : pct >= 40 ? 'warning.main' : 'text.secondary'}>
                    {pct}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    color={pct >= 70 ? 'success' : pct >= 40 ? 'warning' : 'inherit'}
                    sx={{ mt: 0.5, borderRadius: 1, height: 5 }}
                  />
                </Box>
              </Box>
            </Paper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default RagTab;
