import React from 'react';
import { Box, Grid, Paper, Typography, Chip, Stack } from '@mui/material';
import PsychologyIcon from '@mui/icons-material/Psychology';
import EmptyState from '../shared/EmptyState';
import { IntentResult } from '../../types';

interface IntentTabProps {
  intent: IntentResult | null;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <Paper variant="outlined" sx={{ p: 1.5, borderRadius: 2 }}>
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 0.5, textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10 }}>
        {label}
      </Typography>
      <Typography variant="body2" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
        {value}
      </Typography>
    </Paper>
  );
}

const IntentTab: React.FC<IntentTabProps> = ({ intent }) => {
  if (!intent) {
    return <EmptyState icon={<PsychologyIcon fontSize="inherit" />} message="Intent analysis appears here after generation" />;
  }

  return (
    <Box>
      <Grid container spacing={1.5} mb={2}>
        <Grid item xs={6} sm={3}><InfoCard label="Layout"     value={intent.layout} /></Grid>
        <Grid item xs={6} sm={3}><InfoCard label="Complexity" value={intent.complexity} /></Grid>
        <Grid item xs={6} sm={3}><InfoCard label="Page Title" value={intent.title} /></Grid>
        <Grid item xs={6} sm={3}><InfoCard label="Data Shape" value={intent.data_shape} /></Grid>
      </Grid>

      <Stack spacing={1.5}>
        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10, display: 'block', mb: 0.75 }}>
            Entities Detected
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {intent.entities.map((e) => <Chip key={e} label={e} size="small" color="info" variant="outlined" sx={{ fontSize: 12 }} />)}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10, display: 'block', mb: 0.75 }}>
            Interactions
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {intent.interactions.map((e) => <Chip key={e} label={e} size="small" color="success" variant="outlined" sx={{ fontSize: 12 }} />)}
          </Box>
        </Box>

        <Box>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: 10, display: 'block', mb: 0.75 }}>
            Components Recommended
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {intent.components_needed.map((e) => <Chip key={e} label={e} size="small" color="warning" variant="outlined" sx={{ fontSize: 12 }} />)}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default IntentTab;
