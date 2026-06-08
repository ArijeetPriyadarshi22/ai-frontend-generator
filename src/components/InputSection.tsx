import React from 'react';
import {
  Box, TextField, Button, Typography, Stack, Chip, CircularProgress,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

interface InputSectionProps {
  prompt: string;
  onPromptChange: (val: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const QUICK_PROMPTS = [
  { label: '👤 User Dashboard',    value: 'User management dashboard with filterable DataTable, status badges and 4 KPI stats cards' },
  { label: '📦 Order Management',  value: 'Order management screen with SearchBar, date filter, DataTable of orders and action buttons' },
  { label: '📊 Analytics Page',    value: 'Analytics overview with 4 KPI metric stats cards, line ChartWidget, and recent activity DataTable' },
  { label: '⚙️ Settings Form',     value: 'Settings page with profile FormFields, notification toggles and save/cancel buttons' },
  { label: '🛒 Product Catalog',   value: 'Product catalog with CatalogGrid layout, SearchBar, category filter chips and pagination' },
];

const InputSection: React.FC<InputSectionProps> = ({
  prompt, onPromptChange, onGenerate, onReset, isRunning,
}) => (
  <Box
    sx={{
      px: 2, pt: 1.75, pb: 1.5,
      borderBottom: '1px solid', borderColor: 'divider',
      bgcolor: 'background.paper',
    }}
  >
    {/* Prompt row */}
    <Stack direction="row" spacing={1.25} alignItems="flex-start" mb={1.25}>
      <TextField
        multiline
        minRows={2}
        maxRows={5}
        fullWidth
        placeholder="Describe the screen to generate — e.g. 'User management dashboard with DataTable, status badges, filter panel and KPI stats cards'"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        disabled={isRunning}
        size="small"
        sx={{ '& .MuiInputBase-input': { fontSize: 13 } }}
      />

      <Stack spacing={0.75} flexShrink={0}>
        <Button
          variant="contained"
          onClick={onGenerate}
          disabled={isRunning || !prompt.trim()}
          startIcon={
            isRunning
              ? <CircularProgress size={14} color="inherit" />
              : <PlayArrowIcon fontSize="small" />
          }
          sx={{ whiteSpace: 'nowrap', fontSize: 13, px: 2 }}
        >
          {isRunning ? 'Running…' : 'Generate'}
        </Button>

        <Button
          variant="outlined"
          onClick={onReset}
          disabled={isRunning}
          startIcon={<RefreshIcon fontSize="small" />}
          size="small"
          sx={{ fontSize: 12 }}
        >
          Reset
        </Button>
      </Stack>
    </Stack>

    {/* Quick prompt chips */}
    <Box>
      <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
        Quick prompts:
      </Typography>
      {QUICK_PROMPTS.map((qp) => (
        <Chip
          key={qp.label}
          label={qp.label}
          size="small"
          variant="outlined"
          onClick={() => onPromptChange(qp.value)}
          disabled={isRunning}
          sx={{ mr: 0.75, mb: 0.5, fontSize: 12, cursor: 'pointer' }}
        />
      ))}
    </Box>
  </Box>
);

export default InputSection;
